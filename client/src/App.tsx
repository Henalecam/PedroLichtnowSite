import { Route, Switch, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import ScrollToTop from "@/components/scroll-to-top";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import PostEditor from "@/pages/admin/posts/edit";
import NewPost from "@/pages/admin/posts/new";
import BlogList from "@/pages/blog/index";
import BlogPost from "@/pages/blog/post";

function AdminRoute() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Redirect to="/admin/login" />;
  }
  
  return <AdminDashboard />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/admin" component={AdminRoute} />
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
      <AuthProvider>
        <TooltipProvider>
          <div className="bg-off-white min-h-screen relative">
            <Toaster />
            <Router />
            <ScrollToTop />
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
