import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout";
import { useAuth } from "@/hooks/use-auth";

import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Dashboard from "@/pages/dashboard";
import Coding from "@/pages/coding";
import CodingQuestion from "@/pages/coding-question";
import Hr from "@/pages/hr";
import Aptitude from "@/pages/aptitude";
import AptitudeTest from "@/pages/aptitude-test";
import Mock from "@/pages/mock";
import MockSession from "@/pages/mock-report";
import Resume from "@/pages/resume";
import Jobs from "@/pages/jobs";
import Leaderboard from "@/pages/leaderboard";
import Roadmap from "@/pages/roadmap";
import Bookmarks from "@/pages/bookmarks";
import Tips from "@/pages/tips";
import Schedule from "@/pages/schedule";
import Profile from "@/pages/profile";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Redirect to="/login" />;
  return (
    <Layout>
      <Component />
    </Layout>
  );
}

function Router() {
  const { isAuthenticated } = useAuth();

  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login">{isAuthenticated ? <Redirect to="/dashboard" /> : <Login />}</Route>
      <Route path="/signup">{isAuthenticated ? <Redirect to="/dashboard" /> : <Signup />}</Route>
      <Route path="/dashboard"><ProtectedRoute component={Dashboard} /></Route>
      <Route path="/coding"><ProtectedRoute component={Coding} /></Route>
      <Route path="/coding/:id"><ProtectedRoute component={CodingQuestion} /></Route>
      <Route path="/hr"><ProtectedRoute component={Hr} /></Route>
      <Route path="/aptitude"><ProtectedRoute component={Aptitude} /></Route>
      <Route path="/aptitude/:id"><ProtectedRoute component={AptitudeTest} /></Route>
      <Route path="/mock"><ProtectedRoute component={Mock} /></Route>
      <Route path="/mock/:id"><ProtectedRoute component={MockSession} /></Route>
      <Route path="/resume"><ProtectedRoute component={Resume} /></Route>
      <Route path="/jobs"><ProtectedRoute component={Jobs} /></Route>
      <Route path="/leaderboard"><ProtectedRoute component={Leaderboard} /></Route>
      <Route path="/roadmap"><ProtectedRoute component={Roadmap} /></Route>
      <Route path="/bookmarks"><ProtectedRoute component={Bookmarks} /></Route>
      <Route path="/tips"><ProtectedRoute component={Tips} /></Route>
      <Route path="/schedule"><ProtectedRoute component={Schedule} /></Route>
      <Route path="/profile"><ProtectedRoute component={Profile} /></Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
