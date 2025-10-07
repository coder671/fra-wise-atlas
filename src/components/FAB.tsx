import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SparklesIcon, XIcon, RocketIcon, MapIcon, BarChart3Icon, BrainCircuitIcon } from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";

const FAB = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMainClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: 0.9, y: 0.9 },
        colors: ["#00c853", "#00bcd4"],
      });
    }
  };

  const handleTourStart = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { x: 0.9, y: 0.9 },
      colors: ["#00c853", "#00bcd4", "#ffd700"],
    });
    toast.success("Guided Tour Started!", {
      description: "Explore all features of FRA Atlas",
    });
    setIsOpen(false);
  };

  const actions = [
    { icon: RocketIcon, label: "Quick Tour", onClick: handleTourStart },
    { icon: MapIcon, label: "View Map", onClick: () => toast.info("Navigate to FRA Atlas tab") },
    { icon: BarChart3Icon, label: "Analytics", onClick: () => toast.info("Navigate to AI Insights tab") },
    { icon: BrainCircuitIcon, label: "DSS", onClick: () => toast.info("Navigate to DSS tab") },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  onClick={action.onClick}
                  variant="default"
                  className="glass-card gap-2 shadow-lg hover:glow-effect smooth-transition"
                >
                  <action.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={handleMainClick}
          size="lg"
          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary shadow-2xl glow-effect hover:from-primary/90 hover:to-secondary/90 smooth-transition"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <XIcon className="w-6 h-6 text-white" />
            ) : (
              <SparklesIcon className="w-6 h-6 text-white" />
            )}
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
};

export default FAB;
