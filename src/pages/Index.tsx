import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TreesIcon, MapIcon, BarChart3Icon, BrainCircuitIcon, InfoIcon, MailIcon } from "lucide-react";
import Hero from "@/components/Hero";
import FRAAtlas from "@/components/FRAAtlas";
import AIInsights from "@/components/AIInsights";
import DSS from "@/components/DSS";
import About from "@/components/About";
import Contact from "@/components/Contact";
import IntroModal from "@/components/IntroModal";
import FAB from "@/components/FAB";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("fraAtlasIntroSeen");
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroClose = () => {
    setShowIntro(false);
    localStorage.setItem("fraAtlasIntroSeen", "true");
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <IntroModal open={showIntro} onClose={handleIntroClose} />
      <FAB />
      
      {/* Glowing Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 glass-card glow-effect"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <TreesIcon className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  FRA Atlas
                </h1>
                <p className="text-xs text-muted-foreground">AI-Powered Decision Support</p>
              </div>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Smart India Hackathon 2025</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-24 pb-8 px-4 container mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-2 glass-card p-2 mb-8">
              <TabsTrigger 
                value="home" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground smooth-transition"
              >
                <TreesIcon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Home</span>
              </TabsTrigger>
              <TabsTrigger 
                value="atlas"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground smooth-transition"
              >
                <MapIcon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">FRA Atlas</span>
              </TabsTrigger>
              <TabsTrigger 
                value="insights"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground smooth-transition"
              >
                <BarChart3Icon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">AI Insights</span>
              </TabsTrigger>
              <TabsTrigger 
                value="dss"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground smooth-transition"
              >
                <BrainCircuitIcon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">DSS</span>
              </TabsTrigger>
              <TabsTrigger 
                value="about"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground smooth-transition"
              >
                <InfoIcon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">About</span>
              </TabsTrigger>
              <TabsTrigger 
                value="contact"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground smooth-transition"
              >
                <MailIcon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Contact</span>
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <AnimatePresence mode="wait">
            <TabsContent value="home" className="mt-0">
              <motion.div
                key="home"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Hero />
              </motion.div>
            </TabsContent>

            <TabsContent value="atlas" className="mt-0">
              <motion.div
                key="atlas"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FRAAtlas />
              </motion.div>
            </TabsContent>

            <TabsContent value="insights" className="mt-0">
              <motion.div
                key="insights"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AIInsights />
              </motion.div>
            </TabsContent>

            <TabsContent value="dss" className="mt-0">
              <motion.div
                key="dss"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DSS />
              </motion.div>
            </TabsContent>

            <TabsContent value="about" className="mt-0">
              <motion.div
                key="about"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <About />
              </motion.div>
            </TabsContent>

            <TabsContent value="contact" className="mt-0">
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Contact />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card py-6 mt-12"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 FRA Atlas. Powered by AI & WebGIS Technology. Built for Smart India Hackathon 2025.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
