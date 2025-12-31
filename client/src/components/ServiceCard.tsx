import { Link } from "wouter";
import { ArrowRight, Zap, Lightbulb, Plug, Wrench, ShieldCheck, Battery, Fan, Home } from "lucide-react";
import type { Service } from "@shared/schema";
import { Button } from "@/components/ui/button";

// Map icon strings to components
const icons: Record<string, any> = {
  "Zap": Zap,
  "Lightbulb": Lightbulb,
  "Plug": Plug,
  "Wrench": Wrench,
  "ShieldCheck": ShieldCheck,
  "Battery": Battery,
  "Fan": Fan,
  "Home": Home
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon] || Zap;

  return (
    <div className="group relative bg-card hover:bg-white border border-border/50 hover:border-primary/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
      <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
      </div>
      
      <h3 className="text-xl font-display font-bold text-foreground mb-3">{service.name}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
        {service.shortDescription}
      </p>
      
      <div className="mt-auto">
        <Link href={`/services/${service.slug}`}>
          <Button variant="ghost" className="p-0 hover:bg-transparent hover:text-primary font-bold group/btn">
            Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
