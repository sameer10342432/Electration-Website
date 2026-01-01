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
    <div className="group relative bg-card hover:bg-white border border-border/50 hover:border-primary/20 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 flex flex-col h-full">
      {/* Image Cover */}
      <div className="h-48 w-full overflow-hidden relative">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
      </div>

      <div className="p-6 pt-0 flex flex-col flex-grow">
        <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center mb-4 -mt-7 relative z-10 shadow-lg border border-slate-100 group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
          <Icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
        </div>

        <h3 className="text-xl font-display font-bold text-foreground mb-3">{service.name}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
          {service.shortDescription}
        </p>

        <div className="mt-auto pt-4 border-t border-border/50">
          <Link href={`/services/${service.slug}`}>
            <Button variant="ghost" className="p-0 hover:bg-transparent hover:text-primary font-bold group/btn w-full justify-between">
              Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
