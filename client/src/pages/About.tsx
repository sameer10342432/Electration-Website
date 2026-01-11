import { Layout } from "@/components/Layout";
import { ShieldCheck, Users, Trophy, Target } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <div className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about-bg.png"
            alt="Our Team"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">About Us</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Building trust through excellence in electrical services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          <section className="text-center">
            <h2 className="text-3xl font-display font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              To raise the standard of electrical services in Pakistan by providing professional, safe, and reliable solutions for every home and business, delivered by trained and certified technicians.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-display">Who We Are</h3>
              <p className="text-muted-foreground">
                Pak Electrician Services was founded to address the lack of professional, reliable trade services in the market. We saw a need for transparent pricing, punctuality, and technical expertise.
              </p>
              <p className="text-muted-foreground">
                Today, we are a team of over 50 certified professionals serving major cities across Pakistan. We combine traditional craftsmanship with modern tools and safety standards.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatCard icon={Users} label="Happy Clients" value="5000+" />
              <StatCard icon={ShieldCheck} label="Projects Done" value="10k+" />
              <StatCard icon={Trophy} label="Years Exp." value="15+" />
              <StatCard icon={Target} label="Cities" value="12" />
            </div>
          </section>

          <section className="bg-slate-50 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-display font-bold mb-6">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="text-blue-600 h-6 w-6" />
                </div>
                <h4 className="font-bold mb-2">Safety First</h4>
                <p className="text-sm text-muted-foreground">We never compromise on safety protocols for our team or your property.</p>
              </div>
              <div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-green-600 h-6 w-6" />
                </div>
                <h4 className="font-bold mb-2">Customer Focus</h4>
                <p className="text-sm text-muted-foreground">Your satisfaction is our priority. We listen, advise, and deliver.</p>
              </div>
              <div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="text-purple-600 h-6 w-6" />
                </div>
                <h4 className="font-bold mb-2">Excellence</h4>
                <p className="text-sm text-muted-foreground">We take pride in our workmanship and aim for perfection in every task.</p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-display font-bold mb-4">Meet Our Experts</h2>
              <p className="text-muted-foreground">Our team of licensed professionals is ready to solve any electrical challenge.</p>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/team.png"
                alt="Electrician Expert Team"
                className="w-full h-auto object-cover max-h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-xl font-bold">50+ Certified Technicians Nationwide</p>
                <p className="text-slate-200">Continuous training. Proven expertise. Unmatched service.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

function StatCard({ icon: Icon, label, value }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-border text-center">
      <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">{label}</div>
    </div>
  );
}
