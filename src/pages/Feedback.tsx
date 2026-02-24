import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Compass, ThumbsUp, ThumbsDown, Sparkles, Shuffle, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { api } from "@/lib/api";
import { toast } from "sonner";

const discoveries = [
  { name: "Pottery Workshop", cost: "₹850", time: "2 hours", tags: ["Art", "New"], reason: "Something outside your usual interests! Students similar to you enjoyed this." },
  { name: "Himalayan Travel Documentary", cost: "Free", time: "1.5 hours", tags: ["Travel", "New"], reason: "Expand your horizons — this is a popular option you haven't explored yet." },
  { name: "Sanskrit Calligraphy", cost: "Free", time: "1 hour", tags: ["Art", "New"], reason: "Highly rated by students with similar cultural interests. Great for broadening perspectives." },
];

const Feedback = () => {
  const [diversityLevel, setDiversityLevel] = useState([50]);
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!feedbackText.trim()) {
      toast.error("Please enter some feedback first!");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/feedback", { feedback: feedbackText });
      toast.success("Thank you for your feedback!");
      setFeedbackText("");
    } catch (error) {
      toast.error("Failed to submit feedback");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="animate-slide-up">
          <h1 className="text-2xl font-display font-bold text-foreground">Feedback & Discovery</h1>
          <p className="text-muted-foreground text-sm">Break out of your filter bubble and discover something new.</p>
        </div>

        {/* Discovery Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Compass className="h-5 w-5 text-secondary" />
            <h2 className="text-lg font-display font-semibold text-foreground">Discover Something New</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {discoveries.map((item, i) => (
              <div key={i} className={`glass-card p-5 rounded-xl stagger-${i + 1} animate-fade-in-up`}>
                <div className="flex items-center gap-1.5 mb-3">
                  <Sparkles className="h-3.5 w-3.5 text-secondary animate-glow-pulse" />
                  <span className="text-xs font-display font-semibold text-secondary">New for you</span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.name}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{item.cost}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{item.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{item.reason}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs flex-1 text-secondary border-secondary/30 hover:bg-secondary/10 btn-glow">
                    <ThumbsUp className="h-3 w-3 mr-1" /> Like
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs flex-1 border-border/50 hover:bg-muted/50">
                    <ThumbsDown className="h-3 w-3 mr-1" /> Skip
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" className="text-primary border-primary/30 hover:bg-primary/10 btn-glow">
              <Shuffle className="h-4 w-4 mr-2" /> Show More Discoveries
            </Button>
          </div>
        </div>

        {/* Diversity Control */}
        <div className="glass-card p-5 rounded-xl space-y-4 neon-border animate-fade-in-up" style={{ transform: "none" }}>
          <h2 className="text-sm font-display font-semibold text-foreground">Recommendation Diversity</h2>
          <p className="text-sm text-muted-foreground">Control how much variety you want in your recommendations.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Familiar</span>
            <Slider value={diversityLevel} onValueChange={setDiversityLevel} max={100} className="flex-1" />
            <span className="text-xs text-muted-foreground">Adventurous</span>
          </div>
          <p className="text-xs text-muted-foreground">Currently: {diversityLevel[0]}% diversity mix</p>
        </div>

        {/* Feedback Form */}
        <div className="glass-card p-5 rounded-xl space-y-4 animate-fade-in-up" style={{ transform: "none" }}>
          <h2 className="text-sm font-display font-semibold text-foreground">Share Your Feedback</h2>
          <Textarea
            placeholder="Tell us about your experience — how can we improve our recommendations?"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="min-h-[100px] bg-muted/50 border-border/50 focus:border-primary/50"
          />
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="gradient-primary text-primary-foreground border-0 shadow-glow btn-glow"
          >
            {isLoading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Feedback;
