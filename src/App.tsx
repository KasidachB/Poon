import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About.tsx";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/70 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="font-display text-lg sm:text-xl font-bold text-foreground">
              Gaming & Politics Survey
            </h1>

            <nav className="flex items-center gap-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`
                }
              >
                Survey
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`
                }
              >
                About the Study
              </NavLink>
            </nav>
          </div>
        </header>

        <Routes>
  <Route path="/" element={<Index />} />
  <Route path="/about" element={<About />} />
  {/* This MUST be the last route */}
  <Route path="*" element={<NotFound />} /> 
</Routes>

        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;