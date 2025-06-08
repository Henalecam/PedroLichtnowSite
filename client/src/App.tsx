import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import ScrollToTop from "@/components/scroll-to-top";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import PostEditor from "@/pages/admin/posts/edit";
import NewPost from "@/pages/admin/posts/new";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/posts/new" component={NewPost} />
      <Route path="/admin/posts/:id/edit" component={PostEditor} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="bg-[#fafafa] bg-[url('/texture.svg')] bg-repeat min-h-screen relative">
          <div className="absolute inset-0 bg-white/60 pointer-events-none" />
          <Toaster />
          <Router />
          <ScrollToTop />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
