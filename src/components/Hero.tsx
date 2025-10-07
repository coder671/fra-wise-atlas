import { motion } from "framer-motion";
import CountUp from "react-countup";
import { MapPinIcon, UsersIcon, TreesIcon, TrendingUpIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

const Hero = () => {
  const kpis = [
    { 
      label: "Forest Villages Mapped", 
      value: 18547, 
      icon: MapPinIcon,
      color: "text-primary"
    },
    { 
      label: "Tribal Families Protected", 
      value: 2847362, 
      icon: UsersIcon,
      color: "text-secondary"
    },
    { 
      label: "Hectares Under FRA", 
      value: 4582139, 
      icon: TreesIcon,
      color: "text-primary"
    },
    { 
      label: "Claims Processed", 
      value: 87.5, 
      suffix: "%",
      icon: TrendingUpIcon,
      color: "text-secondary"
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6"
      >
        <motion.h2 
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ backgroundSize: "200% auto" }}
        >
          AI-Powered FRA Monitoring
        </motion.h2>
        <p className="text-xl md:text-2xl text-card-foreground max-w-4xl mx-auto leading-relaxed">
          Real-time Decision Support System for Forest Rights Act Implementation across India
        </p>
        <motion.div 
          className="flex flex-wrap justify-center gap-4 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="px-4 py-2 glass-card rounded-full text-sm font-medium">
            🛰️ Satellite Monitoring
          </span>
          <span className="px-4 py-2 glass-card rounded-full text-sm font-medium">
            🤖 AI Analytics
          </span>
          <span className="px-4 py-2 glass-card rounded-full text-sm font-medium">
            🗺️ Interactive WebGIS
          </span>
          <span className="px-4 py-2 glass-card rounded-full text-sm font-medium">
            📊 Real-time Insights
          </span>
        </motion.div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <Card className="glass-card p-6 text-center hover:glow-effect smooth-transition">
              <kpi.icon className={`w-12 h-12 mx-auto mb-4 ${kpi.color}`} />
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                <CountUp 
                  end={kpi.value} 
                  duration={2.5}
                  separator=","
                  decimals={kpi.suffix === "%" ? 1 : 0}
                  suffix={kpi.suffix || ""}
                />
              </div>
              <p className="text-sm text-muted-foreground font-medium">{kpi.label}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* India Map Visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="glass-card p-8 rounded-2xl"
      >
        <h3 className="text-2xl font-bold text-center mb-6 text-card-foreground">
          FRA Implementation Across India
        </h3>
        <div className="relative w-full aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl overflow-hidden flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-center space-y-4"
          >
            <MapPinIcon className="w-24 h-24 mx-auto text-primary animate-float" />
            <p className="text-xl font-semibold text-card-foreground">
              12 States • 184 Districts • 2,847 Villages
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              {["Madhya Pradesh", "Chhattisgarh", "Odisha", "Maharashtra", "Rajasthan"].map((state, i) => (
                <motion.span
                  key={state}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="px-3 py-1 bg-primary/20 rounded-full text-sm font-medium"
                >
                  {state}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
