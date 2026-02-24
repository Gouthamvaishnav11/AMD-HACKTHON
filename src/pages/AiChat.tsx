import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Send, Sparkles, Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

type Message = { role: "user" | "assistant"; content: string };

const initialMessages: Message[] = [
  { role: "assistant", content: "Hi! 👋 I'm your AI assistant. I can help you find events, plan your day, and discover new things on campus. What are you looking for today?" },
];

const sampleResponses: Record<string, string> = {
  default: "I'd love to help with that! Based on your profile, I can suggest some great options. Could you tell me your budget range (₹) and how much time you have?",
  event: "Great! I found 3 upcoming events that match your interests:\n\n🎯 **Campus Hackathon** — Free, this Saturday\n☕ **Coffee & Code Meetup** — ₹250, Tomorrow 4pm\n🎨 **Art Exhibition Opening** — Free, Friday evening\n\nWould you like me to add any of these to your planner?",
  plan: "Let me help optimize your day! Here's a suggested schedule:\n\n📚 9:00 AM — Study session (Library)\n☕ 11:00 AM — Coffee break at Bean & Brew (₹350)\n🍕 12:30 PM — Lunch at Campus Grill (₹450)\n💻 2:00 PM — AI Ethics class\n🏃 4:00 PM — Yoga in the Park (₹200)\n\nTotal estimated cost: ₹1,000. Want me to optimize for budget or time?",
};

const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState("there");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await api.get("/me");
        if (user && user.name) {
          setUserName(user.name);
          setMessages([{ role: "assistant", content: `Hi ${user.name}! 👋 I'm your AI assistant. I can help you find events, plan your day, and discover new things on campus. What are you looking for today?` }]);
        }
      } catch (error) {
        console.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      const data = await api.post("/chat", { message: currentInput });
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I am facing some issues connecting to the brain. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
        <div className="mb-4 animate-slide-up">
          <h1 className="text-2xl font-display font-bold text-foreground">AI Assistant</h1>
          <p className="text-muted-foreground text-sm">Ask me anything about campus events, planning, or recommendations.</p>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${msg.role === "user"
                ? "gradient-primary text-primary-foreground rounded-br-md shadow-glow"
                : "glass-card text-foreground rounded-bl-md"
                }`} style={msg.role === "assistant" ? { transform: "none" } : undefined}>
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary animate-glow-pulse" />
                    <span className="text-xs font-display font-semibold text-primary">Smart AI Assistant</span>
                  </div>
                )}
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="glass-card px-4 py-3 rounded-2xl rounded-bl-md" style={{ transform: "none" }}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-display font-semibold text-primary">AI is thinking...</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border/50 pt-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about events, saving money, or planning your day..."
              className="flex-1 bg-muted/50 border-border/50 focus:border-primary/50"
            />
            <Button onClick={handleSend} disabled={!input.trim()} className="gradient-primary text-primary-foreground border-0 shrink-0 btn-glow shadow-glow">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" className="text-xs border-border/50 hover:border-primary/30 hover:bg-primary/5" onClick={() => setInput("What events are happening this week?")}>
              <Calendar className="h-3 w-3 mr-1 text-primary" /> Find events
            </Button>
            <Button variant="outline" size="sm" className="text-xs border-border/50 hover:border-secondary/30 hover:bg-secondary/5" onClick={() => setInput("Plan my day for tomorrow")}>
              <RefreshCw className="h-3 w-3 mr-1 text-secondary" /> Plan my day
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AiChat;
