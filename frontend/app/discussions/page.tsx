"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MessageCircle, Send, Plus, CornerDownRight, X, ChevronDown, HelpCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/providers/ToastProvider";
import Link from "next/link";
import { faqData, faqCategories, type FAQCategory } from "@/lib/faq-data";

function FAQAccordion({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] transition-all duration-300 ${isOpen ? "glass-card border-primary/30" : "glass-card hover:border-primary/20"}`}>
      <button onClick={onToggle} className="flex w-full items-start gap-4 p-6 text-left">
        <HelpCircle size={18} className={`mt-0.5 flex-none transition-colors ${isOpen ? "text-primary" : "text-on-surface-variant"}`} />
        <span className={`flex-1 font-headline-md text-[18px] leading-snug transition-colors ${isOpen ? "text-on-surface" : "text-on-surface-variant/80"}`}>
          {question}
        </span>
        <ChevronDown size={18} className={`mt-0.5 flex-none text-on-surface-variant transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="border-t border-white/[0.04] px-6 py-6 pl-14 font-body-md text-[14px] leading-relaxed text-on-surface-variant">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function DiscussionsPage() {
  const { data: session } = useSession();
  const { push } = useToast();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<FAQCategory | "all">("all");
  const [openFAQ, setOpenFAQ] = useState<string | null>(faqData[0]?.id ?? null);
  const [faqSearch, setFaqSearch] = useState("");

  // New question form
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Answer form state map
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submittingAnswer, setSubmittingAnswer] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/discussions");
      if (res.ok) setQuestions(await res.json());
    } catch {
      // Use empty array — FAQ section will still show
    }
    setLoading(false);
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      push("Please login to ask a question", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, content: newContent })
      });
      if (res.ok) {
        push("Question posted!", "success");
        setNewTitle("");
        setNewContent("");
        setShowNew(false);
        fetchQuestions();
      } else {
        push("Failed to post question", "error");
      }
    } catch {
      push("Network error", "error");
    }
    setIsSubmitting(false);
  };

  const handlePostAnswer = async (qId: string) => {
    if (!session) {
      push("Please login to answer", "error");
      return;
    }
    const content = answers[qId];
    if (!content?.trim()) return;

    setSubmittingAnswer({ ...submittingAnswer, [qId]: true });
    try {
      const res = await fetch(`/api/discussions/${qId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
      });
      if (res.ok) {
        push("Answer posted!", "success");
        setAnswers({ ...answers, [qId]: "" });
        fetchQuestions();
      } else {
        push("Failed to post answer", "error");
      }
    } catch {
      push("Network error", "error");
    }
    setSubmittingAnswer({ ...submittingAnswer, [qId]: false });
  };

  const filteredFAQ = faqData.filter((f) => {
    if (activeCategory !== "all" && f.category !== activeCategory) return false;
    if (faqSearch && !f.question.toLowerCase().includes(faqSearch.toLowerCase()) && !f.answer.toLowerCase().includes(faqSearch.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="font-display-xl text-[48px] sm:text-[64px] text-on-surface">
          Q&A
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          Frequently asked questions about college admissions, placements, and campus life. Plus community discussions.
        </p>
      </div>

      {/* ===== FAQ SECTION ===== */}
      <section className="mb-20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-label-caps text-label-caps uppercase tracking-widest text-primary mb-2">Knowledge Base</p>
            <h2 className="font-headline-lg text-[32px] text-on-surface">
              Frequently Asked Questions
            </h2>
          </div>
          {/* FAQ search */}
          <div className="relative w-full max-w-xs">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full rounded-xl glass-panel py-3 pl-11 pr-4 font-body-md text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-all focus:ring-1 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-5 py-2 font-label-caps text-label-caps transition-all ${
              activeCategory === "all"
                ? "bg-primary text-background ring-1 ring-primary shadow-[0_0_15px_rgba(78,222,163,0.3)]"
                : "glass-panel text-on-surface-variant hover:bg-white/[0.06] hover:text-on-surface"
            }`}
          >
            All ({faqData.length})
          </button>
          {faqCategories.map((cat) => {
            const count = faqData.filter((f) => f.category === cat.key).length;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`rounded-full px-5 py-2 font-label-caps text-label-caps transition-all ${
                  activeCategory === cat.key
                    ? "bg-primary text-background ring-1 ring-primary shadow-[0_0_15px_rgba(78,222,163,0.3)]"
                    : "glass-panel text-on-surface-variant hover:bg-white/[0.06] hover:text-on-surface"
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* FAQ list */}
        <div className="space-y-2">
          {filteredFAQ.length > 0 ? (
            filteredFAQ.map((faq) => (
              <FAQAccordion
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === faq.id}
                onToggle={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
              />
            ))
          ) : (
            <div className="rounded-xl bg-white/[0.02] p-8 text-center ring-1 ring-white/[0.06]">
              <p className="text-text-muted">No FAQs match your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== COMMUNITY DISCUSSIONS ===== */}
      <section>
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-label-caps text-label-caps uppercase tracking-widest text-primary mb-2">Community</p>
            <h2 className="font-headline-lg text-[32px] text-on-surface">
              Discussions
            </h2>
            <p className="mt-1 font-body-md text-[14px] text-on-surface-variant">Ask questions, share experiences, get advice.</p>
          </div>
          <Button onClick={() => setShowNew(!showNew)} className="gap-2 rounded-full px-6 font-label-caps tracking-widest bg-primary text-background hover:bg-primary/90">
            {showNew ? <X size={16} /> : <Plus size={16} />}
            {showNew ? "CANCEL" : "ASK QUESTION"}
          </Button>
        </div>

        {/* New question form */}
        {showNew && (
          <form onSubmit={handleAskQuestion} className="mb-8 animate-fade-in-up overflow-hidden rounded-[2rem] glass-card p-8 sm:p-10">
            <h3 className="mb-6 font-headline-md text-[24px] text-on-surface">New Question</h3>
            <div className="space-y-5">
              <div>
                <label className="mb-2 block font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70">Title</label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="What's your question?"
                  required
                  className="rounded-xl glass-panel text-on-surface placeholder:text-on-surface-variant/50"
                />
              </div>
              <div>
                <label className="mb-2 block font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70">Details</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Provide more context..."
                  required
                  rows={4}
                  className="w-full rounded-xl glass-panel px-4 py-3 font-body-md text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-all focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="rounded-full px-8 font-label-caps tracking-widest bg-primary text-background hover:bg-primary/90">
                {isSubmitting ? "POSTING..." : "POST QUESTION"}
              </Button>
            </div>
          </form>
        )}

        {/* Discussion list */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 animate-pulse rounded-[2rem] glass-card" />
            ))}
          </div>
        ) : questions.length === 0 ? (
          <div className="rounded-[2rem] glass-card p-16 text-center">
            <MessageCircle size={48} className="mx-auto mb-6 text-on-surface-variant/50" />
            <h3 className="font-headline-md text-[24px] text-on-surface">No discussions yet</h3>
            <p className="mt-2 font-body-md text-[14px] text-on-surface-variant">Be the first to ask a question!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="overflow-hidden rounded-[2rem] glass-card transition-all hover:border-primary/30">
                <div className="p-8">
                  {/* Author row */}
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full glass-panel font-label-caps text-[14px] font-bold text-on-surface">
                        {q.user.name?.[0] || "U"}
                      </div>
                      <div>
                        <p className="font-body-md text-[14px] font-semibold text-on-surface">{q.user.name || "Anonymous"}</p>
                        <p className="font-label-caps text-[10px] text-on-surface-variant/70 uppercase tracking-widest">{new Date(q.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                      </div>
                    </div>
                    {q.college && (
                      <Link href={`/colleges/${q.college.slug}`} className="rounded-full glass-panel px-4 py-1.5 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
                        {q.college.name}
                      </Link>
                    )}
                  </div>

                  <h3 className="mb-3 font-headline-md text-[24px] text-on-surface">{q.title}</h3>
                  <p className="whitespace-pre-wrap font-body-md text-[14px] leading-relaxed text-on-surface-variant">{q.content}</p>

                  {/* Answers */}
                  <div className="mt-8 space-y-4 border-t border-white/[0.04] pt-6">
                    <p className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70">{q.answers.length} Answers</p>

                    {q.answers.map((a: any) => (
                      <div key={a.id} className="flex gap-4">
                        <CornerDownRight size={18} className="mt-1 flex-none text-on-surface-variant/50" />
                        <div className="flex-1 rounded-xl glass-panel p-5">
                          <div className="mb-2 flex items-center gap-2">
                            <span className="font-body-md text-[14px] font-bold text-on-surface">{a.user.name || "Anonymous"}</span>
                            <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70">{new Date(a.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                          </div>
                          <p className="whitespace-pre-wrap font-body-md text-[13px] leading-relaxed text-on-surface-variant">{a.content}</p>
                        </div>
                      </div>
                    ))}

                    {/* Answer input */}
                    <div className="flex gap-3 pt-3">
                      <Input
                        value={answers[q.id] || ""}
                        onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                        placeholder="Write an answer..."
                        className="flex-1 rounded-xl glass-panel font-body-md text-[14px]"
                      />
                      <Button
                        onClick={() => handlePostAnswer(q.id)}
                        disabled={submittingAnswer[q.id] || !answers[q.id]?.trim()}
                        className="rounded-xl px-5 bg-primary text-background hover:bg-primary/90"
                      >
                        <Send size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
