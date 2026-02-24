import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Sparkles, Star, Clock, DollarSign, ThumbsUp, ThumbsDown, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

const interests = ["Technology", "Music", "Food", "Sports", "Art", "Social", "Academic", "Wellness"];

const Recommendations = () => {
  const [budget, setBudget] = useState([500]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const [recs, setRecs] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const data = await api.get("/recommendations");
        setRecs(data);
      } catch (error) {
        console.error("Failed to fetch recommendations");
      }
    };
    fetchRecs();
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]);
  };

  const filtered = recs.filter((r) => {
    if (r.cost > budget[0]) return false;
    if (selectedInterests.length > 0 && !r.tags.some((t: string) => selectedInterests.includes(t))) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-slide-up">
          <h1 className="text-2xl font-display font-bold text-foreground">Explainable Recommendations</h1>
          <p className="text-muted-foreground mt-1">Every suggestion comes with a clear explanation of why it was chosen for you.</p>
        </div>

        {/* Filters */}
        <div className="glass-card p-5 rounded-xl space-y-4 animate-fade-in-up">
          <div className="flex items-center gap-2 text-sm font-display font-semibold text-foreground">
            <SlidersHorizontal className="h-4 w-4 text-primary" /> Filters
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Budget: up to ₹{budget[0]}</label>
            <Slider value={budget} onValueChange={setBudget} max={2000} step={50} className="w-full max-w-xs" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Interests</label>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge
                  key={interest}
                  variant={selectedInterests.includes(interest) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${selectedInterests.includes(interest) ? "gradient-primary text-primary-foreground border-0 shadow-glow" : "border-border/50 hover:border-primary/30 hover:bg-muted/50"}`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3">
          {filtered.map((rec, i) => (
            <div key={i} className={`glass-card p-5 rounded-xl stagger-${Math.min(i + 1, 5)} animate-fade-in-up`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-foreground">{rec.name}</h3>
                  <div className="flex items-center gap-4 mt-1.5 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1 font-medium"><span className="text-primary">₹</span>{rec.cost === 0 ? "Free" : `${rec.cost}`}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{rec.time}h</span>
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-yellow-500" />{rec.rating}</span>
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    {rec.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-muted/50 text-muted-foreground border-border/30">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-primary border-primary/30 hover:bg-primary/10 shrink-0 btn-glow"
                  onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                >
                  <Sparkles className="h-3 w-3 mr-1" /> Why this?
                  {expandedIdx === i ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
                </Button>
              </div>
              {expandedIdx === i && (
                <div className="mt-3 p-4 rounded-lg bg-primary/10 border border-primary/20 text-sm text-foreground animate-fade-in-up">
                  <p className="mb-3"><span className="font-semibold text-primary">AI Explanation:</span> {rec.reason}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-secondary border-secondary/30 hover:bg-secondary/10 btn-glow">
                      <ThumbsUp className="h-3 w-3 mr-1" /> Useful
                    </Button>
                    <Button size="sm" variant="outline" className="text-muted-foreground hover:bg-muted/50">
                      <ThumbsDown className="h-3 w-3 mr-1" /> Not relevant
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No recommendations match your filters. Try adjusting your budget or interests.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Recommendations;

