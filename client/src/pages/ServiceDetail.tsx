import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { useServiceBySlug } from "@/hooks/use-services";
import { useRoute } from "wouter";
import { CheckCircle2, Phone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function ServiceDetail() {
  const [, params] = useRoute("/services/:slug");
  const slug = params?.slug || "";
  const { data: service, isLoading } = useServiceBySlug(slug);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <Skeleton className="h-12 w-1/2 mb-8" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </Layout>
    );
  }

  if (!service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold">Service Not Found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={service.imageUrl}
            alt={service.name}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/30"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            {service.name}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            {service.shortDescription}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                Our {service.name} service is designed to provide you with safe, efficient, and long-lasting solutions.
                Whether you're facing an emergency or planning an upgrade, our certified technicians are ready to help.
              </p>

              <h3 className="text-foreground font-display font-bold text-2xl mt-8 mb-4">What We Offer</h3>
              <ul className="grid sm:grid-cols-2 gap-4 not-prose">
                {[
                  "Professional Diagnosis",
                  "Licensed Technicians",
                  "Premium Parts & Tools",
                  "Safety Inspection",
                  "Warranty on Work",
                  "Clean Up After Job"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-border">
                    <CheckCircle2 className="text-green-500 h-5 w-5 shrink-0" />
                    <span className="font-medium text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-foreground font-display font-bold text-2xl mt-12 mb-4">Common Issues We Fix</h3>
              <p>
                Don't ignore signs of electrical problems. Flickering lights, tripping breakers, or burning smells
                can indicate serious hazards. Our team specializes in diagnosing and resolving these issues promptly.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-xl font-bold text-blue-900 mb-2">Need Urgent Help?</h4>
                <p className="text-blue-700">Our support team is available 24/7 for emergency repairs.</p>
              </div>
              <Button size="lg" className="whitespace-nowrap rounded-full shadow-lg">
                <Phone className="mr-2 h-4 w-4" /> Call +92 300 123 4567
              </Button>
            </div>
          </div>

          {/* Sidebar Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ContactForm defaultService={service.name} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
