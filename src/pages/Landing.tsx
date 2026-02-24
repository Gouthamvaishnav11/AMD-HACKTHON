import { Link } from "react-router-dom";
import { Sparkles, Brain, Calendar, Palette, ShieldCheck, DollarSign, Users, Zap, ArrowRight, CheckCircle, ChevronRight, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/AnimatedBackground";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center ai-pulse">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-display font-bold text-foreground">AIConsumer</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#why" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Why Us</a>
            <a href="#audience" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Who It's For</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="gradient-primary text-primary-foreground border-0 btn-glow">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass neon-border text-sm font-medium mb-8 text-primary">
              <Sparkles className="h-3.5 w-3.5 animate-glow-pulse" />
              AI-Powered Campus Experience
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              <span className="gradient-text">AI That</span>
              <br />
              <span className="gradient-text">Understands You.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Personalized, explainable, and budget-aware experiences for campus life, travel, and media — powered by transparent AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="gradient-primary text-primary-foreground border-0 px-8 shadow-glow btn-glow hover:opacity-90 transition-all">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg" className="px-8 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all">
                  Watch Demo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-display font-bold mb-4 text-foreground">The Problem Today</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Current platforms fail to deliver meaningful, trustworthy experiences.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Users, title: "Generic Recommendations", desc: "One-size-fits-all suggestions that don't understand your unique needs." },
              { icon: DollarSign, title: "No Budget Awareness", desc: "Suggestions ignore your financial constraints and spending preferences." },
              { icon: ShieldCheck, title: "No Transparency", desc: "Black-box algorithms with no explanation of why things are recommended." },
            ].map((item, i) => (
              <div key={i} className={`glass-card p-6 rounded-xl stagger-${i + 1} animate-fade-in-up`}>
                <div className="h-10 w-10 rounded-lg bg-destructive/15 flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="font-display font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4 text-foreground">Our Solution</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A suite of intelligent tools designed for your campus life.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "Explainable AI", desc: "Every suggestion comes with a clear 'Why this?' explanation.", color: "text-primary", glow: "shadow-glow" },
              { icon: MessageCircle, title: "AI Assistant", desc: "Natural conversation to find exactly what you need.", color: "text-secondary", glow: "shadow-neon" },
              { icon: Calendar, title: "Smart Planner", desc: "Optimize your schedule for time and budget.", color: "text-accent", glow: "" },
              { icon: Palette, title: "Creator Tools", desc: "AI-powered content creation for clubs and events.", color: "text-neon-cyan", glow: "shadow-neon" },
            ].map((item, i) => (
              <div key={i} className={`glass-card group p-6 rounded-xl stagger-${i + 1} animate-fade-in-up`}>
                <div className={`h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section id="why" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4 text-foreground">Why Choose This Platform?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { icon: CheckCircle, text: '"Why this?" explainable AI for every recommendation' },
              { icon: DollarSign, text: "Budget-aware personalization that respects your wallet" },
              { icon: Zap, text: "Avoids filter bubbles — discover something new" },
              { icon: ShieldCheck, text: "Ethical, transparent AI you can trust" },
            ].map((item, i) => (
              <div key={i} className="glass-card flex items-start gap-4 p-5 rounded-xl">
                <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center shrink-0 ai-pulse">
                  <item.icon className="h-4 w-4 text-primary-foreground" />
                </div>
                <p className="text-foreground font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section id="audience" className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4 text-foreground">Who It's For</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Users, title: "Students", desc: "Discover events, plan your day, save money" },
              { icon: Palette, title: "Clubs & Creators", desc: "Create stunning content with AI" },
              { icon: Star, title: "Administrators", desc: "Better campus engagement insights" },
              { icon: Zap, title: "Service Providers", desc: "Reach the right audience transparently" },
            ].map((item, i) => (
              <div key={i} className="glass-card text-center p-6 rounded-xl">
                <div className="h-14 w-14 rounded-2xl gradient-secondary flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold mb-1 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="gradient-primary rounded-2xl p-12 text-center shadow-glow neon-border">
            <h2 className="text-3xl font-display font-bold mb-4 text-primary-foreground">Ready to Get Started?</h2>
            <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">Join thousands of students already using AI-powered tools for a better campus experience.</p>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20 px-8 backdrop-blur">
                Create Free Account <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-display font-bold text-foreground">AIConsumer</span>
              </div>
              <p className="text-sm text-muted-foreground">Personalized, transparent, and delightful AI experiences.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Dashboard", "AI Chat", "Planner"] },
              { title: "Company", links: ["About", "Privacy & Ethics", "Contact", "Blog"] },
              { title: "Resources", links: ["Documentation", "Help Center", "Community", "API"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-display font-semibold text-foreground mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2026 AIConsumer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
