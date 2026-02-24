import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { UserCircle, DollarSign, Shield, Brain, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { toast } from "sonner";

const allInterests = ["Technology", "Music", "Food", "Sports", "Art", "Social", "Academic", "Wellness", "Travel", "Photography"];

const Profile = () => {
  const [interests, setInterests] = useState(["Technology", "Music", "Food"]);
  const [budget, setBudget] = useState([50]);
  const [showExplanations, setShowExplanations] = useState(true);
  const [shareData, setShareData] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await api.get("/me");
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, []);

  const toggleInterest = (interest: string) => {
    setInterests((prev) => prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]);
  };

  const handleSave = async () => {
    try {
      await api.put("/me", {
        interests,
        budget: budget[0],
        showExplanations,
        shareData,
      });
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="animate-slide-up">
          <h1 className="text-2xl font-display font-bold text-foreground">Profile & Settings</h1>
          <p className="text-muted-foreground text-sm">Manage your preferences and privacy settings.</p>
        </div>

        {/* Profile Info */}
        <div className="glass-card p-5 rounded-xl space-y-4 animate-fade-in-up" style={{ transform: "none" }}>
          <div className="flex items-center gap-2 text-sm font-display font-semibold text-foreground">
            <UserCircle className="h-4 w-4 text-primary" /> Profile Information
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Name</Label>
              <Input value={user.name} readOnly className="bg-muted/50 border-border/50 focus:border-primary/50 cursor-not-allowed" />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Email</Label>
              <Input value={user.email} readOnly className="bg-muted/50 border-border/50 focus:border-primary/50 cursor-not-allowed" />
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="glass-card p-5 rounded-xl space-y-4 animate-fade-in-up stagger-2" style={{ transform: "none" }}>
          <div className="flex items-center gap-2 text-sm font-display font-semibold text-foreground">
            <Brain className="h-4 w-4 text-accent" /> Interests
          </div>
          <div className="flex flex-wrap gap-2">
            {allInterests.map((interest) => (
              <Badge
                key={interest}
                variant={interests.includes(interest) ? "default" : "outline"}
                className={`cursor-pointer transition-all ${interests.includes(interest) ? "gradient-primary text-primary-foreground border-0 shadow-glow" : "border-border/50 hover:border-primary/30"}`}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="glass-card p-5 rounded-xl space-y-4 animate-fade-in-up stagger-3" style={{ transform: "none" }}>
          <div className="flex items-center gap-2 text-sm font-display font-semibold text-foreground">
            <DollarSign className="h-4 w-4 text-secondary" /> Budget Range
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-2">Weekly budget: ₹{budget[0]}</label>
            <Slider value={budget} onValueChange={setBudget} max={5000} step={100} />
          </div>
        </div>

        {/* Privacy */}
        <div className="glass-card p-5 rounded-xl space-y-5 neon-border animate-fade-in-up stagger-4" style={{ transform: "none" }}>
          <div className="flex items-center gap-2 text-sm font-display font-semibold text-foreground">
            <Shield className="h-4 w-4 text-primary" /> Privacy & Transparency
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Show AI Explanations</p>
              <p className="text-xs text-muted-foreground">Display "Why this?" on all recommendations</p>
            </div>
            <Switch checked={showExplanations} onCheckedChange={setShowExplanations} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Share Anonymous Data</p>
              <p className="text-xs text-muted-foreground">Help improve recommendations for everyone</p>
            </div>
            <Switch checked={shareData} onCheckedChange={setShareData} />
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="w-full gradient-primary text-primary-foreground border-0 shadow-glow btn-glow hover:opacity-90 transition-all"
        >
          <Save className="h-4 w-4 mr-2" /> Save Settings
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
