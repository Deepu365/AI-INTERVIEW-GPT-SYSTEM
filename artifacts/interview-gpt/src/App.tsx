import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout";

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

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/coding" component={Coding} />
        <Route path="/coding/:id" component={CodingQuestion} />
        <Route path="/hr" component={Hr} />
        <Route path="/aptitude" component={Aptitude} />
        <Route path="/aptitude/:id" component={AptitudeTest} />
        <Route path="/mock" component={Mock} />
        <Route path="/mock/:id" component={MockSession} />
        <Route path="/resume" component={Resume} />
        <Route path="/jobs" component={Jobs} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/roadmap" component={Roadmap} />
        <Route path="/bookmarks" component={Bookmarks} />
        <Route path="/tips" component={Tips} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
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
