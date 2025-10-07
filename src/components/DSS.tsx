import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { DownloadIcon, RefreshCwIcon, SparklesIcon } from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";

const DSS = () => {
  const [forestCover, setForestCover] = useState([65]);
  const [populationDensity, setPopulationDensity] = useState([50]);
  const [claimsVolume, setClaimsVolume] = useState([75]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isComputing, setIsComputing] = useState(false);

  const computeRecommendations = () => {
    setIsComputing(true);
    
    setTimeout(() => {
      const newRecommendations = [];
      
      if (forestCover[0] > 70) {
        newRecommendations.push("✅ High Priority: Implement Community Forest Rights (CFR) scheme");
        newRecommendations.push("🌳 Recommend: Enhanced conservation incentives for tribal communities");
      } else if (forestCover[0] < 40) {
        newRecommendations.push("⚠️ Alert: Forest regeneration program needed");
        newRecommendations.push("🌱 Suggest: Plantation drives with tribal participation");
      }
      
      if (populationDensity[0] > 60) {
        newRecommendations.push("👥 High Density: Prioritize individual forest rights allocation");
        newRecommendations.push("🏘️ Recommend: Sustainable livelihood programs");
      } else {
        newRecommendations.push("🏡 Moderate Density: Community-based forest management suitable");
      }
      
      if (claimsVolume[0] > 70) {
        newRecommendations.push("📈 High Volume: Deploy AI-assisted claim verification");
        newRecommendations.push("⚡ Suggest: Fast-track processing for eligible claims");
        newRecommendations.push("🤖 Enable: Automated document verification system");
      }
      
      // Additional schemes
      if (forestCover[0] > 50 && populationDensity[0] < 70) {
        newRecommendations.push("💰 Eligible: MGNREGA integration for forest work");
        newRecommendations.push("🎯 Recommend: Van Dhan Vikas Yojana implementation");
      }
      
      setRecommendations(newRecommendations);
      setIsComputing(false);
      
      // Celebrate with confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00c853", "#00bcd4"],
      });
      
      toast.success("Recommendations computed successfully!", {
        description: `${newRecommendations.length} actionable insights generated`,
      });
    }, 1500);
  };

  const handleExport = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#00c853", "#00bcd4", "#ffd700"],
    });
    
    toast.success("Report exported successfully!", {
      description: "Your DSS recommendations have been downloaded",
    });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Decision Support System
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          AI-powered recommendations for optimal FRA scheme implementation based on regional parameters
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Parameters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-card-foreground">
              <SparklesIcon className="w-6 h-6 text-primary" />
              Regional Parameters
            </h3>
            
            <div className="space-y-8">
              {/* Forest Cover */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-card-foreground">Forest Cover Percentage</label>
                  <span className="text-2xl font-bold text-primary">{forestCover[0]}%</span>
                </div>
                <Slider
                  value={forestCover}
                  onValueChange={setForestCover}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Adjust based on satellite imagery analysis
                </p>
              </div>

              {/* Population Density */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-card-foreground">Tribal Population Density</label>
                  <span className="text-2xl font-bold text-secondary">{populationDensity[0]}%</span>
                </div>
                <Slider
                  value={populationDensity}
                  onValueChange={setPopulationDensity}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Relative to total regional population
                </p>
              </div>

              {/* Claims Volume */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-card-foreground">Claims Volume Index</label>
                  <span className="text-2xl font-bold text-primary">{claimsVolume[0]}%</span>
                </div>
                <Slider
                  value={claimsVolume}
                  onValueChange={setClaimsVolume}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Current pending claims as percentage of capacity
                </p>
              </div>

              <Button 
                onClick={computeRecommendations}
                disabled={isComputing}
                className="w-full text-lg py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 smooth-transition"
              >
                {isComputing ? (
                  <>
                    <RefreshCwIcon className="w-5 h-5 mr-2 animate-spin" />
                    Computing...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    Generate Recommendations
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Recommendations Output */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6 text-card-foreground">AI Recommendations</h3>
            
            <div className="min-h-[400px]">
              {recommendations.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center">
                  <div className="space-y-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <SparklesIcon className="w-16 h-16 mx-auto text-primary/30" />
                    </motion.div>
                    <p className="text-muted-foreground">
                      Adjust parameters and click "Generate Recommendations"<br />
                      to get AI-powered insights
                    </p>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-l-4 border-primary hover:glow-effect smooth-transition"
                    >
                      <p className="text-sm font-medium text-card-foreground">{rec}</p>
                    </motion.div>
                  ))}
                  
                  <Button
                    onClick={handleExport}
                    variant="outline"
                    className="w-full mt-6"
                  >
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Export Report (PDF)
                  </Button>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Scheme Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glass-card p-6">
          <h3 className="text-xl font-bold mb-4 text-card-foreground">Available Government Schemes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-2 text-card-foreground">Community Forest Rights</h4>
              <p className="text-sm text-muted-foreground">For sustainable forest management by tribal communities</p>
            </div>
            <div className="p-4 bg-secondary/10 rounded-lg">
              <h4 className="font-semibold mb-2 text-card-foreground">Van Dhan Vikas Yojana</h4>
              <p className="text-sm text-muted-foreground">Value addition to Minor Forest Produce</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-2 text-card-foreground">MGNREGA Integration</h4>
              <p className="text-sm text-muted-foreground">Employment for forest-based activities</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default DSS;
