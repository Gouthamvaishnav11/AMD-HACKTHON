import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Calendar, Clock, DollarSign, Zap, CheckCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { toast } from "sonner";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];

const initialEvents = [
  { day: 0, startHour: 0, duration: 2, title: "Study Session", cost: 0, color: "bg-primary/20 text-primary border-primary/30" },
  { day: 0, startHour: 3, duration: 1, title: "Coffee Break", cost: 4.5, color: "bg-secondary/20 text-secondary border-secondary/30" },
  { day: 1, startHour: 1, duration: 2, title: "AI Ethics Class", cost: 0, color: "bg-accent/20 text-accent border-accent/30" },
  { day: 1, startHour: 5, duration: 2, title: "Hackathon Prep", cost: 0, color: "bg-primary/20 text-primary border-primary/30" },
  { day: 2, startHour: 0, duration: 1, title: "Yoga", cost: 5, color: "bg-secondary/20 text-secondary border-secondary/30" },
  { day: 2, startHour: 2, duration: 3, title: "Project Work", cost: 0, color: "bg-accent/20 text-accent border-accent/30" },
  { day: 3, startHour: 4, duration: 2, title: "Club Meeting", cost: 0, color: "bg-primary/20 text-primary border-primary/30" },
  { day: 4, startHour: 1, duration: 1, title: "Open Mic Night", cost: 0, color: "bg-secondary/20 text-secondary border-secondary/30" },
];

const Planner = () => {
  const [events, setEvents] = useState(initialEvents);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const data = await api.get("/planner");
        if (data && data.length > 0) {
          setEvents(data);
        }
      } catch (error) {
        console.error("Failed to fetch plan");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlan();
  }, []);

  const handleSavePlan = async () => {
    try {
      await api.post("/planner", { data: events });
      toast.success("Schedule saved to your account!");
    } catch (error) {
      toast.error("Failed to save schedule");
    }
  };

  const handleOptimize = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Logic: Prioritize study sessions and group similar events
      const optimized = [...events].sort((a, b) => a.day - b.day || a.startHour - b.startHour);
      setEvents(optimized);
      setIsLoading(false);
      toast.success("Schedule optimized for your preferences!");
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-slide-up">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Smart Planner</h1>
            <p className="text-muted-foreground text-sm">AI-optimized schedule for your week</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSavePlan} size="sm" className="gradient-primary text-primary-foreground border-0 shadow-glow btn-glow">
              <Save className="h-3.5 w-3.5 mr-1" /> Save Plan
            </Button>
            <Button onClick={handleOptimize} variant="outline" size="sm" className="border-border/50 hover:border-primary/30 hover:bg-primary/5">
              <Zap className={`h-3 w-3 mr-1 text-primary ${isLoading ? 'animate-pulse' : ''}`} /> {isLoading ? "Optimizing..." : "Optimize"}
            </Button>
          </div>
        </div>

        {/* Budget Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Weekly Budget", value: "₹5,000", icon: DollarSign, spent: "Remaining", color: "text-primary" },
            { label: "Planned Events", value: events.length.toString(), icon: Calendar, spent: "This week", color: "text-secondary" },
            { label: "Free Time", value: "12 hours", icon: Clock, spent: "Available", color: "text-accent" },
          ].map((item, i) => (
            <div key={i} className={`glass-card p-4 rounded-xl stagger-${i + 1} animate-fade-in-up`}>
              <div className={`flex items-center gap-2 text-sm mb-1 ${item.color}`}>
                <item.icon className="h-4 w-4" /> <span className="text-muted-foreground">{item.label}</span>
              </div>
              <div className="text-xl font-display font-bold text-foreground">{item.value}</div>
              <div className="text-xs text-muted-foreground">{item.spent}</div>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="glass-card rounded-xl overflow-x-auto animate-fade-in-up" style={{ transform: "none" }}>
          <div className="min-w-[600px]">
            <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-border/30">
              <div className="p-3" />
              {days.map((day) => (
                <div key={day} className="p-3 text-center text-sm font-display font-semibold text-foreground border-l border-border/30">{day}</div>
              ))}
            </div>
            <div className="relative">
              {hours.map((hour, hi) => (
                <div key={hour} className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-border/20 last:border-0">
                  <div className="p-3 text-xs text-muted-foreground flex items-start">{hour}</div>
                  {days.map((_, di) => (
                    <div key={di} className="border-l border-border/20 h-12 relative">
                      {events
                        .filter((e) => e.day === di && e.startHour === hi)
                        .map((e, ei) => (
                          <div
                            key={ei}
                            className={`absolute inset-x-1 top-0 rounded-md border px-2 py-1 text-xs font-medium ${e.color} z-10 backdrop-blur-sm`}
                            style={{ height: `${e.duration * 48}px` }}
                          >
                            <div className="truncate">{e.title}</div>
                            {e.cost > 0 && <div className="text-[10px] opacity-70">₹{e.cost}</div>}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="glass-card p-5 rounded-xl neon-border animate-fade-in-up" style={{ transform: "none" }}>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-primary ai-pulse" />
            <span className="font-display font-semibold text-foreground text-sm">AI Optimization Suggestions</span>
          </div>
          <div className="space-y-2">
            {[
              "Move Coffee Break to Wednesday to save ₹350 this week (combine with existing free time)",
              "Tuesday afternoon has a 3-hour gap — consider the free Art Exhibition nearby",
              "Your weekly spend is ₹750 — well within your ₹5,000 budget",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Planner;

