import { Layout } from "@/components/Layout";
import { AdminTable } from "@/components/AdminTable";
import { useInquiries } from "@/hooks/use-inquiries";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Redirect } from "wouter";

export default function AdminDashboard() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const { data: inquiries, isLoading: inquiriesLoading } = useInquiries();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout>
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user.username || 'Admin'}</p>
            </div>
            <Button variant="outline" onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            label="Total Inquiries" 
            value={inquiries?.length || 0} 
            color="bg-blue-500" 
          />
          <StatCard 
            label="New Leads" 
            value={inquiries?.filter(i => i.status === 'New').length || 0} 
            color="bg-green-500" 
          />
          <StatCard 
            label="Pending Action" 
            value={inquiries?.filter(i => i.status === 'Contacted').length || 0} 
            color="bg-yellow-500" 
          />
          <StatCard 
            label="Completed" 
            value={inquiries?.filter(i => i.status === 'Completed').length || 0} 
            color="bg-slate-500" 
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold">Recent Inquiries</h2>
          {inquiriesLoading ? (
             <div className="flex justify-center py-12">
               <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
             </div>
          ) : (
            <AdminTable inquiries={inquiries || []} />
          )}
        </div>
      </div>
    </Layout>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
          <h3 className="text-3xl font-bold text-foreground">{value}</h3>
        </div>
        <div className={`h-3 w-3 rounded-full ${color}`}></div>
      </div>
    </div>
  );
}
