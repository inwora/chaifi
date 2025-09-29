import { useLocation } from "wouter";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SplashPage() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen splash-gradient flex items-center justify-center p-4">
      <div className="text-center text-white max-w-sm w-full">
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Coffee className="text-white" size={48} />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4" data-testid="app-title">Chai-Fi</h1>
        <p className="text-lg sm:text-xl opacity-90 mb-6 sm:mb-8 px-4" data-testid="app-subtitle">Modern Billing Solution</p>
        <Button 
          onClick={() => navigate("/login")} 
          className="bg-white text-secondary px-6 py-3 sm:px-8 rounded-lg font-semibold hover:bg-white/90 transition-colors text-base sm:text-lg w-full sm:w-auto"
          data-testid="button-get-started"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
