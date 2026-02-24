import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Brain, Calendar, MessageCircle, Sparkles, ArrowRight, Star, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

const quickActions = [
  { icon: Brain, title: "Find Events", desc: "Discover what's happening on campus", path: "/recommendations", color: "text-primary" },
  { icon: Calendar, title: "Plan My Day", desc: "Optimize your schedule with AI", path: "/planner", color: "text-secondary" },
  { icon: MessageCircle, title: "Ask AI", desc: "Get personalized suggestions", path: "/chat", color: "text-accent" },
];

const recentRecs = [
  { name: "Campus Hackathon 2026", cost: "Free", time: "6 hours", rating: 4.8, reason: "Matches your interest in tech and free events" },
  { name: "Coffee at Bean & Brew", cost: "₹350", time: "30 min", rating: 4.5, reason: "Budget-friendly, near your next class" },
  { name: "Study Group — AI Ethics", cost: "Free", time: "2 hours", rating: 4.3, reason: "Aligns with your enrolled course topics" },
];

const Dashboard = () => {
  const [userName, setUserName] = useState("there");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await api.get("/me");
        if (user && user.name) {
          setUserName(user.name);
        }
      } catch (error) {
        console.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Welcome */}
        <div className="gradient-primary rounded-2xl p-8 shadow-glow neon-border animate-slide-up">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-6 w-6 text-primary-foreground animate-glow-pulse" />
            <h1 className="text-2xl font-display font-bold text-primary-foreground">Welcome back, {userName}!</h1>
          </div>
          <p className="text-primary-foreground/70 max-w-lg">Your AI assistant has found 5 new recommendations based on your interests and budget. Let's make today great!</p>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-display font-semibold mb-4 text-foreground">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {quickActions.map((action, i) => (
              <Link key={action.path} to={action.path} className="group">
                <div className={`glass-card p-5 rounded-xl stagger-${i + 1} animate-fade-in-up`}>
                  <div className={`h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${action.color}`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Recommendations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-foreground">Recent Recommendations</h2>
            <Link to="/recommendations">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                View All <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentRecs.map((rec, i) => (
              <div key={i} className={`glass-card p-5 rounded-xl stagger-${i + 1} animate-fade-in-up`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{rec.name}</h3>
                    <div className="flex items-center gap-4 mt-1.5 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />{rec.cost}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{rec.time}</span>
                      <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-yellow-500" />{rec.rating}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-primary border-primary/30 hover:bg-primary/10 shrink-0 btn-glow">
                    <Sparkles className="h-3 w-3 mr-1" /> Why this?
                  </Button>
                </div>
                <div className="mt-3 p-3 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary">
                  <span className="font-medium">AI Explanation:</span> {rec.reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
