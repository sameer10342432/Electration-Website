import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { ServiceCard } from "@/components/ServiceCard";
import { useServices } from "@/hooks/use-services";
import { useCities } from "@/hooks/use-cities";
import { Link } from "wouter";
import { CheckCircle2, Star, PhoneCall, ShieldCheck, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function Home() {
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: cities } = useCities();
  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    // In a real app, this might redirect to a city page or filter services
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-900">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
          {/* unsplash: electrician working on panel with blue tint */}
          <img 
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium border border-primary/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available 24/7 in Major Cities
              </div>
              
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
                Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Electrician</span> Services
              </h1>
              
              <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
                Expert electrical repairs, installations, and maintenance for your home and office. Licensed, insured, and trusted by thousands.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-sm p-1 rounded-lg border border-white/20 flex-1 max-w-xs">
                  <Select onValueChange={handleCityChange}>
                    <SelectTrigger className="bg-transparent border-none text-white h-12 focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Select your City" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities?.map(city => (
                        <SelectItem key={city.id} value={city.slug}>{city.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-xl shadow-lg shadow-primary/25">
                  <PhoneCall className="mr-2 h-5 w-5" /> Call Now
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-primary h-5 w-5" /> Licensed & Insured
                </div>
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-500 h-5 w-5 fill-current" /> 4.9/5 Rating
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:pl-10"
            >
              <ContactForm defaultCity={selectedCity} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-10 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Clock, label: "On-Time Service" },
              { icon: ShieldCheck, label: "Warranty Guaranteed" },
              { icon: Star, label: "Expert Technicians" },
              { icon: PhoneCall, label: "24/7 Support" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group cursor-default">
                <div className="p-3 bg-slate-50 rounded-full group-hover:bg-primary/10 transition-colors">
                  <item.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="font-display font-bold text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Our Expertise</span>
            <h2 className="text-4xl font-display font-bold text-foreground mt-2 mb-4">Complete Electrical Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From minor repairs to major installations, our certified team handles it all with precision and care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesLoading ? (
              // Loading skeletons
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-64 bg-slate-200 rounded-2xl animate-pulse" />
              ))
            ) : (
              services?.slice(0, 6).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="outline" size="lg" className="rounded-full border-2 font-bold px-8 hover:bg-primary hover:text-white hover:border-primary transition-colors">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl transform rotate-3"></div>
              {/* unsplash: electrician checking fuse box */}
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070&auto=format&fit=crop" 
                alt="Electrician at work" 
                className="relative rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-foreground">10k+</p>
                    <p className="text-sm text-muted-foreground">Jobs Completed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-display font-bold mb-4">Why Pakistan Trusts Us</h2>
                <p className="text-muted-foreground text-lg">
                  We combine technical expertise with reliability. Our technicians are background-checked, trained, and equipped with modern tools.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { title: "Transparent Pricing", desc: "No hidden fees. We provide upfront quotes before starting work." },
                  { title: "Rapid Response", desc: "Our localized teams ensure we reach you quickly in emergencies." },
                  { title: "Quality Guarantee", desc: "We stand by our work with a 30-day service warranty." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">{i + 1}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to fix your electrical issues?</h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10">
            Don't let electrical problems disrupt your day. Contact our experts for fast, reliable service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-bold rounded-xl text-primary">
              Book Appointment
            </Button>
            <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
              <PhoneCall className="mr-2 h-5 w-5" /> +92 300 123 4567
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
