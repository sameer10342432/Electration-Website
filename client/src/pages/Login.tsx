import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function Login() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-border text-center space-y-8">
          <div className="inline-flex bg-primary/10 p-4 rounded-full mb-4">
            <Zap className="h-8 w-8 text-primary fill-current" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-foreground font-display">Admin Access</h1>
            <p className="text-muted-foreground mt-2">Sign in to manage inquiries and settings.</p>
          </div>

          <Button onClick={handleLogin} size="lg" className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20">
            Login with Replit
          </Button>

          <p className="text-xs text-muted-foreground">
            Only authorized personnel can access this area.
          </p>
        </div>
      </div>
    </Layout>
  );
}
