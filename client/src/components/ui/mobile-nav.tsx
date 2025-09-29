import { useState } from "react";
import { Menu, X, ShoppingCart, Search, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

interface MobileNavProps {
  cartCount: number;
  onSearchClick: () => void;
  onDashboardClick: () => void;
  onCartClick: () => void;
  isCartDisabled?: boolean;
}

export default function MobileNav({ 
  cartCount, 
  onSearchClick, 
  onDashboardClick, 
  onCartClick, 
  isCartDisabled = false 
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMenu}
          className="p-2 relative"
          data-testid="button-mobile-menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-3">
        <Button 
          onClick={onSearchClick}
          variant="outline"
          className="px-4 py-2 rounded-lg font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors"
          data-testid="button-search"
        >
          <Search className="mr-2" size={18} />
          Search
        </Button>
        <Button 
          onClick={onDashboardClick}
          variant="outline"
          className="px-4 py-2 rounded-lg font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors"
          data-testid="button-dashboard"
        >
          <BarChart3 className="mr-2" size={18} />
          Dashboard
        </Button>
        <Button 
          onClick={onCartClick}
          className="relative bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent transition-colors"
          disabled={isCartDisabled}
          data-testid="button-cart"
        >
          <ShoppingCart className="mr-2" size={18} />
          Cart
          {cartCount > 0 && (
            <Badge className="cart-badge absolute -top-2 -right-2 w-5 h-5 text-xs rounded-full flex items-center justify-center text-white" data-testid="cart-count">
              {cartCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-64 bg-card border-l border-border shadow-xl">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-secondary">Menu</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="p-1"
                >
                  <X size={20} />
                </Button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <Button 
                onClick={() => {
                  onSearchClick();
                  setIsOpen(false);
                }}
                variant="ghost"
                className="w-full justify-start text-left p-3 rounded-lg hover:bg-muted"
                data-testid="button-mobile-search"
              >
                <Search className="mr-3" size={20} />
                Search Items
              </Button>
              <Button 
                onClick={() => {
                  onDashboardClick();
                  setIsOpen(false);
                }}
                variant="ghost"
                className="w-full justify-start text-left p-3 rounded-lg hover:bg-muted"
                data-testid="button-mobile-dashboard"
              >
                <BarChart3 className="mr-3" size={20} />
                View Dashboard
              </Button>
              <Button 
                onClick={() => {
                  onCartClick();
                  setIsOpen(false);
                }}
                className="w-full justify-start text-left p-3 rounded-lg bg-primary text-primary-foreground hover:bg-accent relative"
                disabled={isCartDisabled}
                data-testid="button-mobile-cart"
              >
                <ShoppingCart className="mr-3" size={20} />
                View Cart
                {cartCount > 0 && (
                  <Badge className="cart-badge ml-auto w-6 h-6 text-xs rounded-full flex items-center justify-center text-white" data-testid="mobile-cart-count">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}