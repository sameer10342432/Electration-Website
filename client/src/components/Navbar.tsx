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
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-tr from-primary/80 to-blue-400/80 rounded-xl blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-2.5 rounded-xl shadow-lg border border-white/10 group-hover:scale-105 transition-transform duration-300">
                <Zap className="h-6 w-6 text-primary fill-primary/20 animate-pulse" />
                <div className="absolute -top-1 -right-1">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-2xl font-display font-black tracking-tighter text-slate-900 leading-none">
                  PAK
                </span>
                <span className="text-2xl font-display font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 leading-none">
                  ELECTRIC
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="h-[1px] w-3 bg-primary/40"></div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                  Precision <span className="text-primary">&</span> Power
                </span>
                <div className="h-[1px] w-3 bg-primary/40"></div>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${location === link.href ? "text-primary font-bold" : "text-muted-foreground"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-col items-end text-right mr-2 hidden lg:flex">
              <span className="text-xs text-muted-foreground">Emergency? Call now</span>
              <a href="tel:03054019976" className="text-sm font-bold text-foreground hover:text-primary transition-colors">
                03054019976
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
                      className={`text-lg font-medium ${location === link.href ? "text-primary" : "text-foreground"
                        }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-6 border-t border-border">
                    <Button className="w-full mb-4" size="lg">Book Service</Button>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>03054019976</span>
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
