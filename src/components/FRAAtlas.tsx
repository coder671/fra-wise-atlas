import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayersIcon, MapIcon, SatelliteIcon, MapPinIcon, KeyIcon } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { toast } from "sonner";

const FRAAtlas = () => {
  const [selectedLayer, setSelectedLayer] = useState("streets-v12");
  const [timelineYear, setTimelineYear] = useState([2024]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  
  // Sample marker data for major tribal regions
  const locations = [
    { id: 1, name: "Madhya Pradesh", claims: 125430, status: "Active", lat: 23.2599, lng: 77.4126, color: "#00c853" },
    { id: 2, name: "Odisha", claims: 87640, status: "Active", lat: 20.9517, lng: 85.0985, color: "#00c853" },
    { id: 3, name: "Tripura", claims: 45280, status: "Processing", lat: 23.9408, lng: 91.9882, color: "#ffc107" },
    { id: 4, name: "Telangana", claims: 62150, status: "Active", lat: 18.1124, lng: 79.0193, color: "#00c853" },
  ];

  const mapStyles = {
    "streets-v12": "mapbox://styles/mapbox/streets-v12",
    "satellite-streets-v12": "mapbox://styles/mapbox/satellite-streets-v12",
    "outdoors-v12": "mapbox://styles/mapbox/outdoors-v12",
  };

  // Initialize map
  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyles[selectedLayer as keyof typeof mapStyles],
        center: [82, 22], // Center of India
        zoom: 4.5,
        pitch: 45,
        bearing: 0,
      });

      // Add navigation controls with premium styling
      const nav = new mapboxgl.NavigationControl({
        visualizePitch: true,
      });
      map.current.addControl(nav, 'top-right');

      // Add scale
      map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

      // Add markers for each state
      locations.forEach((loc) => {
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.width = '40px';
        el.style.height = '40px';
        el.style.backgroundImage = `radial-gradient(circle, ${loc.color}, ${loc.color}aa)`;
        el.style.borderRadius = '50%';
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 0 20px rgba(0, 200, 83, 0.6)';
        el.style.cursor = 'pointer';
        el.style.animation = 'pulse 2s ease-in-out infinite';

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 12px; font-family: 'Poppins', sans-serif;">
            <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #00c853;">${loc.name}</h3>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Claims:</strong> ${loc.claims.toLocaleString()}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Status:</strong> <span style="color: ${loc.color}">${loc.status}</span></p>
            <p style="margin: 4px 0; font-size: 12px; color: #666;">Click marker for details</p>
          </div>
        `);

        const marker = new mapboxgl.Marker(el)
          .setLngLat([loc.lng, loc.lat])
          .setPopup(popup)
          .addTo(map.current!);

        el.addEventListener('click', () => {
          setSelectedRegion(loc.name);
          map.current?.flyTo({
            center: [loc.lng, loc.lat],
            zoom: 7,
            pitch: 60,
            bearing: 30,
            duration: 2000,
          });
        });

        markers.current.push(marker);
      });

      // Add 3D terrain
      map.current.on('load', () => {
        map.current?.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        });
        
        map.current?.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

        // Add sky layer
        map.current?.addLayer({
          id: 'sky',
          type: 'sky',
          paint: {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 90.0],
            'sky-atmosphere-sun-intensity': 15,
          },
        });
      });

      setIsMapInitialized(true);
      toast.success("Map loaded successfully!", {
        description: "Explore FRA implementation across India",
      });
    } catch (error) {
      toast.error("Failed to initialize map", {
        description: "Please check your Mapbox token",
      });
      console.error("Map initialization error:", error);
    }

    // Add pulse animation to document
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      map.current?.remove();
      map.current = null;
    };
  }, [mapboxToken]);

  // Change map style
  useEffect(() => {
    if (map.current && isMapInitialized) {
      map.current.setStyle(mapStyles[selectedLayer as keyof typeof mapStyles]);
    }
  }, [selectedLayer, isMapInitialized]);

  const handleTokenSubmit = () => {
    if (!mapboxToken.trim()) {
      toast.error("Please enter a Mapbox token");
      return;
    }
    toast.info("Initializing map...");
  };

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

      {/* Mapbox Token Input */}
      {!isMapInitialized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="glass-card p-6 border-2 border-primary/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/20 rounded-lg">
                <KeyIcon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-card-foreground">Mapbox Access Token Required</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    To view the interactive map, please enter your Mapbox public token. 
                    Get yours for free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
                  </p>
                </div>
                <div className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="pk.eyJ1IjoiZXhhbXBsZS..."
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleTokenSubmit} className="bg-primary hover:bg-primary/90">
                    Load Map
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      <Card className="glass-card p-6">
        {/* Map Controls */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex gap-2">
            <Button
              variant={selectedLayer === "streets-v12" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLayer("streets-v12")}
              className="smooth-transition"
              disabled={!isMapInitialized}
            >
              <MapIcon className="w-4 h-4 mr-2" />
              Street
            </Button>
            <Button
              variant={selectedLayer === "satellite-streets-v12" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLayer("satellite-streets-v12")}
              className="smooth-transition"
              disabled={!isMapInitialized}
            >
              <SatelliteIcon className="w-4 h-4 mr-2" />
              Satellite
            </Button>
            <Button
              variant={selectedLayer === "outdoors-v12" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLayer("outdoors-v12")}
              className="smooth-transition"
              disabled={!isMapInitialized}
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
            <span className="text-xs text-muted-foreground">Historical FRA data from 2006</span>
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

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl overflow-hidden border-4 border-primary/20 shadow-2xl relative"
          style={{ height: "600px" }}
        >
          <div ref={mapContainer} className="absolute inset-0" />
          
          {!isMapInitialized && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <div className="text-center space-y-4">
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
                >
                  <MapIcon className="w-12 h-12 text-white" />
                </motion.div>
                <p className="text-xl font-semibold text-card-foreground">
                  Enter Mapbox Token to Load Interactive Map
                </p>
              </div>
            </div>
          )}
          
          {/* Region Info Panel */}
          <AnimatePresence>
            {selectedRegion && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-4 right-4 glass-card p-4 rounded-lg backdrop-blur-xl"
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
                        onClick={() => {
                          setSelectedRegion(null);
                          map.current?.flyTo({
                            center: [82, 22],
                            zoom: 4.5,
                            pitch: 45,
                            bearing: 0,
                            duration: 2000,
                          });
                        }}
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
          </AnimatePresence>
        </motion.div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
            <span className="text-sm">Active Claims</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500 animate-pulse"></div>
            <span className="text-sm">Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-secondary"></div>
            <span className="text-sm">Completed</span>
          </div>
        </div>

        {/* Regional Statistics */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              onClick={() => {
                setSelectedRegion(loc.name);
                map.current?.flyTo({
                  center: [loc.lng, loc.lat],
                  zoom: 7,
                  pitch: 60,
                  bearing: 30,
                  duration: 2000,
                });
              }}
              whileHover={{ scale: 1.05, y: -5 }}
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
