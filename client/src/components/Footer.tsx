import { Link } from "wouter";
import { Zap, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg">
                <Zap className="h-5 w-5 text-white fill-current" />
              </div>
              <span className="text-xl font-display font-bold text-white">
                Pak<span className="text-primary">Electrician</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Providing trusted, safe, and professional electrical services across Pakistan. We are committed to excellence and safety in every job.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 font-display">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-6 font-display">Popular Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services/wiring" className="hover:text-primary transition-colors">House Wiring</Link></li>
              <li><Link href="/services/ups-installation" className="hover:text-primary transition-colors">UPS Installation</Link></li>
              <li><Link href="/services/ac-repair" className="hover:text-primary transition-colors">AC Repair</Link></li>
              <li><Link href="/services/generator" className="hover:text-primary transition-colors">Generator Maintenance</Link></li>
              <li><Link href="/services/fan-repair" className="hover:text-primary transition-colors">Fan Repair</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 font-display">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Office 123, Tech Plaza, Blue Area, Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:03054019976" className="hover:text-white transition-colors">03054019976</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-sm">
          <p>© {new Date().getFullYear()} Pak Electrician Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
