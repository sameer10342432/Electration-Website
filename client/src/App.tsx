import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import ServiceList from "@/pages/ServiceList";
import ServiceDetail from "@/pages/ServiceDetail";
import CityLanding from "@/pages/CityLanding";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import AdminDashboard from "@/pages/AdminDashboard";
import Login from "@/pages/Login";

import { ScrollToTop } from "@/components/ScrollToTop";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={ServiceList} />
      <Route path="/services/:slug" component={ServiceDetail} />
      <Route path="/pk/:city/:service" component={CityLanding} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
