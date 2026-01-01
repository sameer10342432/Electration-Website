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

          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData);
            fetch("/api/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            }).then(async (res) => {
              if (res.ok) {
                window.location.href = "/admin";
              } else {
                alert("Invalid credentials");
              }
            });
          }} className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input name="username" className="w-full p-2 border rounded-md" placeholder="admin" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input name="password" type="password" className="w-full p-2 border rounded-md" placeholder="admin123" />
            </div>
            <Button type="submit" size="lg" className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20">
              Login
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
