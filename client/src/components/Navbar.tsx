import { Link, useLocation } from "wouter";
import { Zap, Menu, X, Phone, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About Us" },
  ];

  if (user) {
    navLinks.push({ href: "/admin", label: "Dashboard" });
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Zap className="h-6 w-6 text-primary fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-foreground leading-none">
                Pak<span className="text-primary">Electrician</span>
              </span>
              <span className="text-xs text-muted-foreground font-medium">Expert Services</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary font-bold" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-col items-end text-right mr-2 hidden lg:flex">
              <span className="text-xs text-muted-foreground">Emergency? Call now</span>
              <a href="tel:+923001234567" className="text-sm font-bold text-foreground hover:text-primary transition-colors">
                +92 300 123 4567
              </a>
            </div>
            <Button className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 font-bold px-6">
              Book Now
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium ${
                        location === link.href ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-6 border-t border-border">
                    <Button className="w-full mb-4" size="lg">Book Service</Button>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>+92 300 123 4567</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
