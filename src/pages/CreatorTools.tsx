import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Palette, Image, Megaphone, FileText, Wand2, Download, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const contentTypes = [
  { icon: Image, label: "Event Poster", value: "poster" },
  { icon: Megaphone, label: "Social Media Post", value: "social" },
  { icon: FileText, label: "Announcement", value: "announcement" },
];

const tones = ["Professional", "Casual", "Exciting", "Minimal", "Bold"];

const CreatorTools = () => {
  const [selectedType, setSelectedType] = useState("poster");
  const [selectedTone, setSelectedTone] = useState("Exciting");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);

  const handleSavePoster = () => {
    if (!content) return;
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedType}_${selectedTone}.txt`;
    document.body.appendChild(element);
    element.click();
    toast.success("Poster content saved as a text file!");
  };

  const handlePublish = () => {
    toast.success("Content published to campus social feed!");
  };

  const handleGenerate = () => {
    const samples: Record<string, string> = {
      poster: "🎯 NATIONAL CAMPUS HACKATHON 2026\n\nJoin 500+ innovators for 48 hours of building, learning, and networking!\n\n📅 March 15-17, 2026\n📍 Main Auditorium, Sector 12\n🎁 ₹5,00,000 in prizes\n\nFree food, mentors from top tech companies, and workshops for all skill levels.\n\n→ Register now: hackathon.in",
      social: "🚀 Big things are happening! Our annual Hackathon is BACK and bigger than ever.\n\n48 hours. ₹5 Lakh in prizes. Free food.\n\nWhether you're a coding pro or just getting started — there's a place for you.\n\nDrop a 🙌 if you're in!\n\n#CampusHack #Innovation #IndiaTech",
      announcement: "Dear Students,\n\nWe are pleased to announce the National Campus Hackathon 2026, taking place March 15-17.\n\nThis event is open to all students regardless of technical background. Teams will compete for prizes totaling ₹5,00,000.\n\nRegistration is now open. Space is limited.\n\nBest regards,\nTech Committee",
    };
    setContent(samples[selectedType] || samples.poster);
    setPreview(true);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-slide-up">
          <h1 className="text-2xl font-display font-bold text-foreground">Creator & Club Tools</h1>
          <p className="text-muted-foreground text-sm">Create stunning content with AI assistance for your campus events and clubs.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className="space-y-4">
            <div className="glass-card p-5 rounded-xl space-y-4 animate-fade-in-up" style={{ transform: "none" }}>
              <label className="text-sm font-display font-semibold text-foreground">Content Type</label>
              <div className="grid grid-cols-3 gap-2">
                {contentTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => { setSelectedType(type.value); setPreview(false); }}
                    className={`p-3 rounded-lg border text-center text-sm font-medium transition-all ${selectedType === type.value
                      ? "gradient-primary text-primary-foreground border-transparent shadow-glow"
                      : "border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/50"
                      }`}
                  >
                    <type.icon className="h-5 w-5 mx-auto mb-1" />
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl space-y-4 animate-fade-in-up stagger-2" style={{ transform: "none" }}>
              <label className="text-sm font-display font-semibold text-foreground">Brand Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((tone) => (
                  <Badge
                    key={tone}
                    variant={selectedTone === tone ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${selectedTone === tone ? "gradient-primary text-primary-foreground border-0 shadow-glow" : "border-border/50 hover:border-primary/30"}`}
                    onClick={() => setSelectedTone(tone)}
                  >
                    {tone}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl space-y-4 animate-fade-in-up stagger-3" style={{ transform: "none" }}>
              <label className="text-sm font-display font-semibold text-foreground">Your Content</label>
              <Textarea
                placeholder="Describe your event or announcement... (e.g., 'Campus Hackathon, March 15-17, ₹5 Lakh prizes')"
                className="min-h-[120px] bg-muted/50 border-border/50 focus:border-primary/50"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Button className="w-full gradient-primary text-primary-foreground border-0 shadow-glow btn-glow hover:opacity-90" onClick={handleGenerate}>
                <Wand2 className="h-4 w-4 mr-2" /> Generate with AI
              </Button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-4">
            <div className="glass-card p-5 rounded-xl min-h-[400px] animate-fade-in-up stagger-2" style={{ transform: "none" }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-display font-semibold text-foreground">Live Preview</span>
                </div>
                <Badge variant="secondary" className="text-xs bg-muted/50 border-border/30">
                  {contentTypes.find((t) => t.value === selectedType)?.label}
                </Badge>
              </div>
              {preview && content ? (
                <div className="space-y-4">
                  <div className={`p-8 rounded-xl border border-border/30 relative overflow-hidden ${selectedType === 'poster' ? 'aspect-[3/4] gradient-primary text-primary-foreground' : 'bg-muted/30 text-foreground'}`}>
                    {selectedType === 'poster' && (
                      <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Sparkles className="h-20 w-20" />
                      </div>
                    )}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-4 opacity-80">
                          <Sparkles className={`h-4 w-4 ${selectedType === 'poster' ? 'text-primary-foreground' : 'text-primary'} animate-glow-pulse`} />
                          <span className="text-[10px] uppercase tracking-wider font-bold">AI Generated • {selectedTone} Tone</span>
                        </div>
                        <pre className={`whitespace-pre-wrap text-sm leading-relaxed ${selectedType === 'poster' ? 'font-display font-bold text-lg' : 'font-sans'}`}>{content}</pre>
                      </div>
                      {selectedType === 'poster' && (
                        <div className="mt-6 pt-4 border-t border-white/20 text-xs opacity-70">
                          PROUDLY POWERED BY AI CONSUMER PLATFORM
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSavePoster} variant="outline" size="sm" className="flex-1 border-border/50 hover:border-primary/30">
                      <Download className="h-3 w-3 mr-1" /> Save Poster
                    </Button>
                    <Button onClick={handlePublish} size="sm" className="flex-1 gradient-secondary text-primary-foreground border-0 shadow-neon">
                      <Megaphone className="h-3 w-3 mr-1" /> Publish Now
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <Palette className="h-12 w-12 mb-3 opacity-20" />
                  <p className="text-sm">Generate content to see a preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};


export default CreatorTools;
