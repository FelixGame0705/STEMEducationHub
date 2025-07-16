import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Programs from "@/pages/Programs";
import ProgramDetail from "@/pages/ProgramDetail";
import Students from "@/pages/Students";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Events from "@/pages/Events";
import About from "@/pages/About";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/chuong-trinh-hoc" component={Programs} />
          <Route path="/chuong-trinh-hoc/:slug" component={ProgramDetail} />
          <Route path="/hoc-vien-tieu-bieu" component={Students} />
          <Route path="/tin-tuc" component={News} />
          <Route path="/tin-tuc/:slug" component={NewsDetail} />
          <Route path="/su-kien" component={Events} />
          <Route path="/ve-chung-toi" component={About} />
          <Route path="/tuyen-dung" component={Careers} />
          <Route path="/lien-he" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
