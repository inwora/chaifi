import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart, Plus, Minus, BarChart3, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MobileNav from "@/components/ui/mobile-nav";
import type { MenuItem, CartItem } from "@shared/schema";

export default function MenuPage() {
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [cart, setCart] = useState<CartItem[]>([]);

  const { data: menuItems = [], isLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu"],
  });

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(menuItems.map(item => item.category)));
    return ["All Items", ...uniqueCategories.sort()];
  }, [menuItems]);

  const filteredItems = selectedCategory === "All Items"
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const removeFromCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing && existing.quantity > 1) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else if (existing && existing.quantity === 1) {
        return prev.filter(cartItem => cartItem.id !== item.id);
      }
      return prev;
    });
  };

  const getItemQuantity = (itemId: string): number => {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const goToPayment = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/payment");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary truncate" data-testid="menu-title">Menu</h1>
            <p className="text-sm sm:text-base text-muted-foreground" data-testid="menu-subtitle">Select items to add to your order</p>
          </div>
          <div className="flex items-center justify-between sm:justify-end">
            <div className="sm:hidden">
              <h2 className="text-lg font-semibold text-secondary">
                {cartCount > 0 && `${cartCount} item${cartCount > 1 ? 's' : ''} in cart`}
              </h2>
            </div>
            <MobileNav 
              cartCount={cartCount}
              onSearchClick={() => navigate("/search")}
              onDashboardClick={() => navigate("/dashboard")}
              onCartClick={goToPayment}
              isCartDisabled={cartCount === 0}
            />
          </div>
        </div>

        {/* Menu Categories */}
        <div className="mb-6">
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="whitespace-nowrap text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2 flex-shrink-0 min-w-max"
                data-testid={`button-category-${category.toLowerCase().replace(' ', '-')}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
              data-testid={`card-menu-item-${item.id}`}
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-40 sm:h-48 object-cover"
                data-testid={`img-menu-item-${item.id}`}
              />
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-secondary mb-1 text-sm sm:text-base line-clamp-1" data-testid={`text-item-name-${item.id}`}>
                  {item.name}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm mb-3 line-clamp-2" data-testid={`text-item-description-${item.id}`}>
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-bold text-primary" data-testid={`text-item-price-${item.id}`}>
                    ₹{item.price}
                  </span>
                  <div className="flex items-center gap-2">
                    {getItemQuantity(item.id) > 0 && (
                      <Button
                        onClick={() => removeFromCart(item)}
                        size="sm"
                        variant="outline"
                        className="w-9 h-9 sm:w-8 sm:h-8 rounded-full p-0 border-2 touch-manipulation"
                        data-testid={`button-decrease-${item.id}`}
                      >
                        <Minus size={16} className="sm:size-14" />
                      </Button>
                    )}
                    {getItemQuantity(item.id) > 0 && (
                      <span 
                        className="min-w-[2rem] text-center font-semibold text-primary text-sm sm:text-base"
                        data-testid={`text-quantity-${item.id}`}
                      >
                        {getItemQuantity(item.id)}
                      </span>
                    )}
                    <Button
                      onClick={() => addToCart(item)}
                      size="sm"
                      className="bg-primary text-primary-foreground w-9 h-9 sm:w-8 sm:h-8 rounded-full hover:bg-accent transition-colors p-0 touch-manipulation"
                      data-testid={`button-add-to-cart-${item.id}`}
                    >
                      <Plus size={18} className="sm:size-16" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg" data-testid="text-no-items">
              No items found in this category.
            </p>
          </div>
        )}

        {/* Powered by Innowara */}
        <div className="mt-8 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-sm border border-border p-4 flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Innowara Logo" 
              className="w-12 h-12 object-contain"
              onError={(e) => {
                // Fallback if image doesn't load
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Powered by</p>
              <p className="font-semibold text-primary">Inowara</p>
              <p className="text-xs text-muted-foreground">IT Solutions - Web & Mobile Apps</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
