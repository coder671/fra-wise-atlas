import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Camera, MapPin, Loader2, X, Upload } from 'lucide-react';
import Webcam from 'react-webcam';

const Feedback = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const webcamRef = useRef<Webcam>(null);
  
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [gpsLocation, setGpsLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [formData, setFormData] = useState({
    issueType: 'encroachment',
    description: '',
    state: 'MP',
    district: '',
    village: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Get GPS location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: 'Location Error',
            description: 'Could not get your location. Please enable GPS.',
            variant: 'destructive',
          });
        }
      );
    }
  }, [user, navigate]);

  const captureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc && images.length < 5) {
      setImages([...images, imageSrc]);
      setShowCamera(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gpsLocation) {
      toast({
        title: 'Error',
        description: 'GPS location is required',
        variant: 'destructive',
      });
      return;
    }

    if (images.length === 0) {
      toast({
        title: 'Error',
        description: 'Please capture at least one image',
        variant: 'destructive',
      });
      return;
    }

    if (formData.description.length < 20) {
      toast({
        title: 'Error',
        description: 'Description must be at least 20 characters',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Create feedback entry
      const { data: feedbackData, error: feedbackError } = await supabase
        .from('feedback')
        .insert({
          holder_id: user!.id,
          issue_type: formData.issueType,
          description: formData.description,
          state: formData.state as any,
          district: formData.district,
          village: formData.village,
          gps_lat: gpsLocation.lat,
          gps_lng: gpsLocation.lng,
          language: 'en',
        })
        .select()
        .single();

      if (feedbackError) throw feedbackError;

      // Upload images
      for (let i = 0; i < images.length; i++) {
        const base64Data = images[i].split(',')[1];
        const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(r => r.blob());
        
        const fileName = `${user?.id}/${feedbackData.id}/${Date.now()}-${i}.jpg`;
        
        const { error: uploadError } = await supabase.storage
          .from('feedback-images')
          .upload(fileName, blob);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('feedback-images')
          .getPublicUrl(fileName);

        await supabase
          .from('feedback_images')
          .insert({
            feedback_id: feedbackData.id,
            image_url: publicUrl,
          });
      }

      toast({
        title: 'Success',
        description: 'Feedback submitted successfully!',
      });

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error submitting feedback:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Report an Issue</CardTitle>
            <CardDescription>Document and report issues related to your CFR land</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* GPS Location */}
              <div className="flex items-center gap-2 p-4 bg-secondary/20 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
                {gpsLocation ? (
                  <div className="text-sm">
                    <p className="font-medium">Location Captured</p>
                    <p className="text-muted-foreground">
                      {gpsLocation.lat.toFixed(6)}, {gpsLocation.lng.toFixed(6)}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Getting your location...</p>
                )}
              </div>

              {/* Camera Section */}
              <div className="space-y-2">
                <Label>Photos (Required)</Label>
                {showCamera ? (
                  <div className="space-y-2">
                    <Webcam
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      className="w-full rounded-lg"
                    />
                    <div className="flex gap-2">
                      <Button type="button" onClick={captureImage} className="flex-1">
                        <Camera className="mr-2 h-4 w-4" />
                        Capture
                      </Button>
                      <Button type="button" onClick={() => setShowCamera(false)} variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setShowCamera(true)}
                    variant="outline"
                    className="w-full"
                    disabled={images.length >= 5}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    {images.length === 0 ? 'Take Photo' : `Add Photo (${images.length}/5)`}
                  </Button>
                )}

                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {images.map((img, index) => (
                      <div key={index} className="relative">
                        <img src={img} alt={`Capture ${index + 1}`} className="rounded-lg" />
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Issue Type */}
              <div className="space-y-2">
                <Label htmlFor="issueType">Issue Type</Label>
                <Select
                  value={formData.issueType}
                  onValueChange={(value) => setFormData({ ...formData, issueType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boundary_dispute">Boundary Dispute</SelectItem>
                    <SelectItem value="encroachment">Encroachment</SelectItem>
                    <SelectItem value="logging">Illegal Logging</SelectItem>
                    <SelectItem value="wildlife">Wildlife Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description (minimum 20 characters)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                  minLength={20}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.description.length}/500 characters
                </p>
              </div>

              {/* Location */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => setFormData({ ...formData, state: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MP">Madhya Pradesh</SelectItem>
                      <SelectItem value="Odisha">Odisha</SelectItem>
                      <SelectItem value="Tripura">Tripura</SelectItem>
                      <SelectItem value="Telangana">Telangana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="village">Village</Label>
                  <Input
                    id="village"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={loading || !gpsLocation}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Report
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Feedback;
