import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { LayersIcon, MapIcon, SatelliteIcon, MapPinIcon } from "lucide-react";

const FRAAtlas = () => {
  const [selectedLayer, setSelectedLayer] = useState("street");
  const [timelineYear, setTimelineYear] = useState([2024]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  // Sample marker data for major tribal regions
  const locations = [
    { id: 1, name: "Madhya Pradesh", claims: 125430, status: "Active", lat: 23.2599, lng: 77.4126 },
    { id: 2, name: "Chhattisgarh", claims: 98250, status: "Active", lat: 21.2787, lng: 81.8661 },
    { id: 3, name: "Odisha", claims: 87640, status: "Active", lat: 20.9517, lng: 85.0985 },
    { id: 4, name: "Maharashtra", claims: 76820, status: "Processing", lat: 19.7515, lng: 75.7139 },
    { id: 5, name: "Rajasthan", claims: 54320, status: "Active", lat: 26.9124, lng: 75.7873 },
    { id: 6, name: "Jharkhand", claims: 67890, status: "Active", lat: 23.6102, lng: 85.2799 },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Interactive FRA Atlas
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore real-time Forest Rights implementation across India with our AI-powered WebGIS platform
        </p>
      </motion.div>

      <Card className="glass-card p-6">
        {/* Map Controls */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex gap-2">
            <Button
              variant={selectedLayer === "street" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLayer("street")}
              className="smooth-transition"
            >
              <MapIcon className="w-4 h-4 mr-2" />
              Street
            </Button>
            <Button
              variant={selectedLayer === "satellite" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLayer("satellite")}
              className="smooth-transition"
            >
              <SatelliteIcon className="w-4 h-4 mr-2" />
              Satellite
            </Button>
            <Button
              variant={selectedLayer === "terrain" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLayer("terrain")}
              className="smooth-transition"
            >
              <LayersIcon className="w-4 h-4 mr-2" />
              Terrain
            </Button>
          </div>
        </div>

        {/* Timeline Slider */}
        <div className="mb-4 p-4 glass-card rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium">Timeline: {timelineYear[0]}</label>
            <span className="text-xs text-muted-foreground">Drag to explore historical data</span>
          </div>
          <Slider
            value={timelineYear}
            onValueChange={setTimelineYear}
            min={2006}
            max={2024}
            step={1}
            className="w-full"
          />
        </div>

        {/* Interactive Map Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl overflow-hidden border-4 border-primary/20 shadow-2xl bg-gradient-to-br from-primary/5 to-secondary/5 relative"
          style={{ height: "600px" }}
        >
          {/* Map Background Layer Indicator */}
          <div className="absolute top-4 right-4 z-10 glass-card px-3 py-2 rounded-lg text-xs font-medium">
            Layer: {selectedLayer.charAt(0).toUpperCase() + selectedLayer.slice(1)}
          </div>
          
          {/* Interactive India Map Visualization */}
          <div className="w-full h-full flex items-center justify-center relative">
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative w-full max-w-4xl h-full flex items-center justify-center"
            >
              {/* Map visualization with interactive regions */}
              <svg viewBox="0 0 800 800" className="w-full h-full">
                {/* Simplified India outline */}
                <path
                  d="M400,100 L450,150 L500,200 L550,250 L600,350 L580,450 L550,550 L500,600 L450,650 L400,680 L350,650 L300,600 L250,550 L220,450 L200,350 L250,250 L300,200 L350,150 Z"
                  fill="url(#mapGradient)"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  className="opacity-30"
                />
                <defs>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                
                {/* Region markers */}
                {locations.map((loc, idx) => {
                  const x = 200 + (loc.lng - 68) * 7;
                  const y = 700 - (loc.lat - 8) * 15;
                  const isSelected = selectedRegion === loc.name;
                  
                  return (
                    <g key={loc.id}>
                      {/* Pulsing circle for active regions */}
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={Math.sqrt(loc.claims) / 30}
                        fill="hsl(var(--primary))"
                        opacity="0.3"
                        animate={{
                          r: [Math.sqrt(loc.claims) / 30, Math.sqrt(loc.claims) / 25, Math.sqrt(loc.claims) / 30],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                      />
                      
                      {/* Main marker */}
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 20 : 12}
                        fill={loc.status === "Active" ? "hsl(var(--primary))" : "hsl(var(--accent))"}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer"
                        onClick={() => setSelectedRegion(loc.name)}
                        whileHover={{ scale: 1.3 }}
                        animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                        transition={isSelected ? { duration: 1, repeat: Infinity } : {}}
                      />
                    </g>
                  );
                })}
              </svg>
            </motion.div>
          </div>
          
          {/* Region Info Panel */}
          {selectedRegion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4 glass-card p-4 rounded-lg"
            >
              {locations.find(l => l.name === selectedRegion) && (
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-card-foreground">
                        {selectedRegion}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {locations.find(l => l.name === selectedRegion)?.status}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedRegion(null)}
                    >
                      ✕
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Claims</p>
                      <p className="text-2xl font-bold text-primary">
                        {locations.find(l => l.name === selectedRegion)?.claims.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Processing Rate</p>
                      <p className="text-2xl font-bold text-secondary">87%</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary"></div>
            <span className="text-sm">Active Claims</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span className="text-sm">Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-secondary"></div>
            <span className="text-sm">Completed</span>
          </div>
        </div>

        {/* Regional Statistics */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              onClick={() => setSelectedRegion(loc.name)}
              className="glass-card p-4 cursor-pointer hover:glow-effect smooth-transition text-center"
            >
              <MapPinIcon className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-xs font-medium text-card-foreground mb-1">{loc.name}</p>
              <p className="text-lg font-bold text-primary">{(loc.claims / 1000).toFixed(0)}K</p>
              <p className="text-xs text-muted-foreground">{loc.status}</p>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default FRAAtlas;
