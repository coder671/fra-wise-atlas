import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Loader2, Map, FileText, AlertCircle, Activity, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [parcels, setParcels] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    loadDashboardData();
  }, [user, navigate]);

  const loadDashboardData = async () => {
    try {
      // Load profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      setProfile(profileData);

      if (profileData?.preferred_language) {
        i18n.changeLanguage(profileData.preferred_language);
      }

      // Load parcels
      const { data: parcelsData } = await supabase
        .from('cfr_parcels')
        .select('*')
        .eq('holder_id', user?.id);

      setParcels(parcelsData || []);

      // Load feedback
      const { data: feedbackData } = await supabase
        .from('feedback')
        .select('*')
        .eq('holder_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setFeedback(feedbackData || []);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t('dashboard')}</h1>
            <p className="text-muted-foreground">Welcome, {profile?.full_name}</p>
          </div>
          <Button onClick={signOut} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            {t('logout')}
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Land Parcels</CardTitle>
              <Map className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{parcels.length}</div>
              <p className="text-xs text-muted-foreground">
                Total area: {parcels.reduce((sum, p) => sum + parseFloat(p.area_hectares || 0), 0).toFixed(2)} hectares
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feedback Reports</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedback.length}</div>
              <p className="text-xs text-muted-foreground">
                Pending: {feedback.filter(f => f.status === 'pending').length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Uploaded documents</p>
            </CardContent>
          </Card>
        </div>

        {/* Land Parcels */}
        <Card>
          <CardHeader>
            <CardTitle>Your Land Parcels</CardTitle>
            <CardDescription>View and manage your CFR land parcels</CardDescription>
          </CardHeader>
          <CardContent>
            {parcels.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Map className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No land parcels registered yet</p>
                <p className="text-sm">Contact your forest officer to register your Patta</p>
              </div>
            ) : (
              <div className="space-y-4">
                {parcels.map((parcel) => (
                  <Card key={parcel.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{parcel.parcel_number}</h3>
                          <p className="text-sm text-muted-foreground">{parcel.village}, {parcel.district}</p>
                          <p className="text-sm">Area: {parcel.area_hectares} hectares</p>
                        </div>
                        <Button onClick={() => navigate('/map')} variant="outline" size="sm">
                          <Map className="mr-2 h-4 w-4" />
                          View on Map
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Your latest feedback submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {feedback.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No feedback reports yet</p>
                <Button onClick={() => navigate('/feedback')} className="mt-4">
                  Report an Issue
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {feedback.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold capitalize">{item.issue_type.replace('_', ' ')}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(item.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.status === 'resolved' ? 'bg-green-100 text-green-800' :
                          item.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button onClick={() => navigate('/map')} className="h-auto py-6 flex-col">
            <Map className="h-6 w-6 mb-2" />
            View Map
          </Button>
          <Button onClick={() => navigate('/feedback')} className="h-auto py-6 flex-col" variant="outline">
            <AlertCircle className="h-6 w-6 mb-2" />
            Report Issue
          </Button>
          <Button onClick={() => navigate('/iot')} className="h-auto py-6 flex-col" variant="outline">
            <Activity className="h-6 w-6 mb-2" />
            IoT Monitor
          </Button>
          <Button onClick={() => navigate('/chat')} className="h-auto py-6 flex-col" variant="outline">
            <FileText className="h-6 w-6 mb-2" />
            AI Assistant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
