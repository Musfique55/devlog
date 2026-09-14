"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

 function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const  {data : user} = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-transparent border-b border-border">
      <div className="max-w-7xl mx-auto w-full px-4 lg:px-0 py-4 flex justify-between items-center h-16">
        <Link
          className="text-lg sm:text-xl font-extrabold tracking-tighter"
          href="/"
        >
          <span className="text-foreground">Dev</span>
          <span className="text-primary">Log</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex gap-8 items-center">
            <Link
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              href="/#features"
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              href="/pricing"
            >
              Pricing
            </Link>
            <Link
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              href="/#about"
            >
              About
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user? (
            <Link
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              href="/dashboard"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              href="/auth/login"
            >
              Login
            </Link>
          )}
          
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90" onClick={handleGetStarted}>
              Get Started Free
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          {user  ? (
            <Link
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              href="/dashboard"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              href="/auth/login"
            >
              Login
            </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            <a
              href="#features"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#about"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90" onClick={handleGetStarted}>
              Get Started Free
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;