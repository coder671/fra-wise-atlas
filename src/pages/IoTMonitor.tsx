import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Droplets, Wind, Thermometer, CloudRain, Activity, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const IoTMonitor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [sensors, setSensors] = useState<any[]>([]);
  const [readings, setReadings] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    loadIoTData();

    // Set up realtime subscription
    const channel = supabase
      .channel('sensor-readings')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'sensor_readings'
        },
        (payload) => {
          setReadings(prev => [payload.new, ...prev].slice(0, 100));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, navigate]);

  const loadIoTData = async () => {
    try {
      // Load sensors
      const { data: sensorsData } = await supabase
        .from('iot_sensors')
        .select('*')
        .eq('status', 'active');

      setSensors(sensorsData || []);

      // Load recent readings
      const { data: readingsData } = await supabase
        .from('sensor_readings')
        .select('*, iot_sensors(*)')
        .order('recorded_at', { ascending: false })
        .limit(100);

      setReadings(readingsData || []);
    } catch (error) {
      console.error('Error loading IoT data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'soil': return <Droplets className="h-5 w-5" />;
      case 'water': return <Droplets className="h-5 w-5" />;
      case 'air': return <Wind className="h-5 w-5" />;
      case 'weather': return <CloudRain className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const getChartData = (sensorId: string) => {
    return readings
      .filter(r => r.sensor_id === sensorId)
      .slice(0, 20)
      .reverse()
      .map(r => ({
        time: new Date(r.recorded_at).toLocaleTimeString(),
        value: parseFloat(r.value),
      }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6">
      <div className="container mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('iot')}</h1>
          <p className="text-muted-foreground">Real-time environmental monitoring</p>
        </div>

        {sensors.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50 text-muted-foreground" />
              <p className="text-muted-foreground">No active sensors found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Contact your forest officer to install IoT sensors on your land
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sensors.map((sensor) => {
              const sensorReadings = readings.filter(r => r.sensor_id === sensor.id);
              const latestReading = sensorReadings[0];
              const chartData = getChartData(sensor.id);

              return (
                <Card key={sensor.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getSensorIcon(sensor.sensor_type)}
                        <div>
                          <CardTitle className="capitalize">{sensor.sensor_type} Sensor</CardTitle>
                          <CardDescription>
                            {sensor.village}, {sensor.district}
                          </CardDescription>
                        </div>
                      </div>
                      {latestReading && (
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {latestReading.value} {latestReading.unit}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(latestReading.recorded_at).toLocaleTimeString()}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {chartData.length > 0 && (
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default IoTMonitor;
