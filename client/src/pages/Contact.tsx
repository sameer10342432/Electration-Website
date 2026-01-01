import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <div className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/contact-bg.png"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Contact Us</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            We're here to help. Reach out to us for quotes, emergencies, or general inquiries.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground">
                Have a question or need to book a service? Fill out the form or use the contact details below.
                Our support team is available 24/7 for emergencies.
              </p>
            </div>

            <div className="grid gap-6">
              <ContactInfo
                icon={Phone}
                title="Phone"
                detail="03054019976"
                sub="Available 24/7"
                href="tel:03054019976"
              />
              <ContactInfo
                icon={MapPin}
                title="Office"
                detail="Blue Area, Islamabad"
                sub="Main Head Office"
              />
              <ContactInfo
                icon={Clock}
                title="Hours"
                detail="Mon - Sun: 24 Hours"
                sub="Emergency Services"
              />
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}

function ContactInfo({ icon: Icon, title, detail, sub, href }: any) {
  const content = (
    <div className="flex items-center gap-4 p-6 bg-white border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-primary/10 p-3 rounded-full">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h3 className="font-bold text-foreground">{title}</h3>
        <p className="text-lg font-medium text-primary">{detail}</p>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} className="block">{content}</a>;
  }
  return content;
}
