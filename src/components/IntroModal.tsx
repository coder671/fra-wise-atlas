import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SparklesIcon, RocketIcon } from "lucide-react";

interface IntroModalProps {
  open: boolean;
  onClose: () => void;
}

const IntroModal = ({ open, onClose }: IntroModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card border-2 border-primary/30 max-w-2xl">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6 py-8"
            >
              {/* Animated Icon */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mx-auto w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center glow-effect"
              >
                <SparklesIcon className="w-12 h-12 text-white" />
              </motion.div>

              {/* Welcome Text */}
              <div className="space-y-3">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Welcome to FRA Atlas
                </h2>
                <p className="text-xl text-muted-foreground">
                  AI-Powered Forest Rights Monitoring System
                </p>
              </div>

              {/* Features List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3 text-left max-w-md mx-auto"
              >
                {[
                  "🗺️ Interactive WebGIS mapping of forest rights",
                  "🤖 AI-powered claim verification & insights",
                  "📊 Real-time analytics and trends",
                  "💡 Smart decision support recommendations",
                  "🛰️ Satellite-based forest monitoring",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-3 glass-card rounded-lg"
                  >
                    <p className="text-sm font-medium">{feature}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Button
                  onClick={onClose}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-lg px-8 py-6 smooth-transition"
                >
                  <RocketIcon className="w-5 h-5 mr-2" />
                  Explore the Platform
                </Button>
              </motion.div>

              {/* Built For */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-sm text-muted-foreground"
              >
                Built for Smart India Hackathon 2025 🏆
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default IntroModal;
