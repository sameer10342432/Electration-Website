import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { useRoute } from "wouter";
import { useServices } from "@/hooks/use-services";
import { useCities } from "@/hooks/use-cities";
import { CheckCircle2, MapPin } from "lucide-react";

export default function CityLanding() {
  const [, params] = useRoute("/pk/:city/:service");
  const citySlug = params?.city;
  const serviceSlug = params?.service;

  const { data: services } = useServices();
  const { data: cities } = useCities();

  const city = cities?.find(c => c.slug === citySlug);
  const service = services?.find(s => s.slug === serviceSlug);

  // If loading or not found, we render generic but functional page to capture traffic
  // In production, you'd handle 404s better, but for SEO pages, generic fallbacks are okay
  const cityName = city?.name || citySlug?.replace(/-/g, " ");
  const serviceName = service?.name || serviceSlug?.replace(/-/g, " ");

  return (
    <Layout>
      <div className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144"
            alt="City Skyline"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/30"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white mb-6 backdrop-blur-sm border border-white/20">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="capitalize">{cityName}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 capitalize leading-tight">
            Best <span className="text-primary">{serviceName}</span> in {cityName}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Top-rated electricians in {cityName} for {serviceName}. Fast, affordable, and reliable service at your doorstep.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-display font-bold mb-4">Why choose us in {cityName}?</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Finding a reliable electrician in {cityName} can be difficult. We make it easy.
                Our local team is familiar with the electrical infrastructure of {cityName} and provides
                tailored solutions for homes and businesses.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                `Available in all areas of ${cityName}`,
                "30-Minute Response Time",
                "Background Checked Staff",
                "100% Satisfaction Guaranteed"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl shadow-sm">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-border">
              <h3 className="font-bold text-xl mb-2">Service Areas in {cityName}</h3>
              <p className="text-sm text-muted-foreground">
                We cover all major areas including DHA, Bahria Town, Cantt, Gulberg, Model Town, and surrounding neighborhoods.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 transform rotate-3 rounded-3xl"></div>
            <ContactForm
              defaultCity={city?.name}
              defaultService={service?.name}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
