import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TargetIcon, UsersIcon, AwardIcon, RocketIcon } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: TargetIcon,
      title: "Mission",
      description: "To empower tribal communities through technology-driven forest rights monitoring and transparent implementation of FRA across India",
    },
    {
      icon: UsersIcon,
      title: "Impact",
      description: "Serving 1.2M+ tribal families across 4 states, ensuring their constitutional rights to forest resources are protected and honored",
    },
    {
      icon: AwardIcon,
      title: "Innovation",
      description: "First-of-its-kind AI + WebGIS integrated platform that combines satellite monitoring with machine learning for real-time insights",
    },
    {
      icon: RocketIcon,
      title: "Vision",
      description: "Expand from pilot states (MP, Odisha, Tripura, Telangana) to all forest-dwelling communities in India by 2026",
    },
  ];

  const targetStates = [
    "Madhya Pradesh",
    "Odisha",
    "Tripura",
    "Telangana",
  ];

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          About FRA Atlas
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Transforming Forest Rights Act implementation through AI, WebGIS, and data-driven decision support
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
          >
            <Card className="glass-card p-6 hover:glow-effect smooth-transition h-full">
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Project Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card p-8">
          <h3 className="text-2xl font-bold mb-6 text-card-foreground">Project Overview</h3>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              The Forest Rights Act (FRA) 2006 recognizes the rights of forest-dwelling tribal communities to forest resources.
              However, implementation faces challenges like delayed processing, lack of transparency, and inadequate monitoring.
            </p>
            <p>
              <strong className="text-card-foreground">FRA Atlas</strong> addresses these challenges by integrating:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-primary">WebGIS Technology:</strong> Interactive mapping for visualization of claims, forest cover, and tribal settlements</li>
              <li><strong className="text-secondary">AI & Machine Learning:</strong> Automated claim verification, anomaly detection, and predictive analytics</li>
              <li><strong className="text-primary">Satellite Monitoring:</strong> Real-time forest cover tracking using remote sensing data</li>
              <li><strong className="text-secondary">Decision Support System:</strong> Rule-based recommendations for optimal scheme implementation</li>
            </ul>
            <p>
              Built for <strong className="text-card-foreground">Smart India Hackathon 2025</strong>, this platform demonstrates how
              emerging technologies can create social impact at scale, ensuring justice and dignity for India's tribal communities.
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Target States */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="glass-card p-8">
          <h3 className="text-2xl font-bold mb-6 text-center text-card-foreground">Target States (Pilot Program)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {targetStates.map((state, index) => (
              <motion.div
                key={state}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="text-center p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg hover:glow-effect smooth-transition"
              >
                <p className="text-sm font-medium text-card-foreground">{state}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="glass-card p-8">
          <h3 className="text-2xl font-bold mb-6 text-center text-card-foreground">Technology Stack</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["React", "TypeScript", "Leaflet.js", "Chart.js", "TensorFlow", "Python", "PostgreSQL", "AWS", "Docker", "GitHub"].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.05 }}
                className="px-4 py-2 glass-card rounded-full text-sm font-medium hover:glow-effect smooth-transition"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default About;
