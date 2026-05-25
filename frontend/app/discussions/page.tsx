"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MessageCircle, Send, Plus, CornerDownRight, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/providers/ToastProvider";
import Link from "next/link";

export default function DiscussionsPage() {
  const { data: session } = useSession();
  const { push } = useToast();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
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
      push("Failed to load discussions", "error");
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
        fetchQuestions(); // Refresh to show new answer
      } else {
        push("Failed to post answer", "error");
      }
    } catch {
      push("Network error", "error");
    }
    setSubmittingAnswer({ ...submittingAnswer, [qId]: false });
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="font-syne text-4xl font-extrabold tracking-tight">Discussions</h1>
          <p className="mt-2 text-muted">Ask questions, share experiences, and get advice from the community.</p>
        </div>
        <Button onClick={() => setShowNew(!showNew)} className="gap-2">
          {showNew ? <X size={16} /> : <Plus size={16} />}
          {showNew ? "Cancel" : "Ask a Question"}
        </Button>
      </div>

      {showNew && (
        <form onSubmit={handleAskQuestion} className="mb-10 animate-in fade-in slide-in-from-top-4 rounded-2xl border border-border bg-surface p-6">
          <h2 className="mb-4 font-syne text-xl font-bold">New Question</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold">Title</label>
              <Input 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
                placeholder="What's your question?" 
                required 
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Details</label>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Provide more context..."
                required
                rows={4}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Question"}
            </Button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-40 animate-pulse rounded-2xl border border-border bg-surface" />
          ))}
        </div>
      ) : questions.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-12 text-center text-muted">
          <MessageCircle size={48} className="mx-auto mb-4 opacity-20" />
          <p>No discussions yet. Be the first to ask a question!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((q) => (
            <div key={q.id} className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:border-accent/40">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 font-bold text-accent">
                    {q.user.name?.[0] || "U"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{q.user.name || "Anonymous"}</p>
                    <p className="text-xs text-muted">{new Date(q.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                {q.college && (
                  <Link href={`/colleges/${q.college.slug}`} className="rounded-full bg-surface2 px-3 py-1 text-xs font-semibold text-accent hover:text-accent3">
                    {q.college.name}
                  </Link>
                )}
              </div>
              
              <h3 className="mb-2 font-syne text-xl font-bold tracking-tight">{q.title}</h3>
              <p className="mb-6 whitespace-pre-wrap text-sm text-text/80">{q.content}</p>
              
              <div className="space-y-4 border-t border-border pt-4">
                <h4 className="text-sm font-bold text-muted uppercase tracking-wider">{q.answers.length} Answers</h4>
                
                {q.answers.map((a: any) => (
                  <div key={a.id} className="flex gap-3">
                    <CornerDownRight size={16} className="mt-1 text-muted opacity-50" />
                    <div className="flex-1 rounded-xl bg-surface2 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-xs font-bold">{a.user.name || "Anonymous"}</span>
                        <span className="text-[10px] text-muted">{new Date(a.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="whitespace-pre-wrap text-sm text-text/90">{a.content}</p>
                    </div>
                  </div>
                ))}

                <div className="flex gap-2 pt-2">
                  <Input 
                    value={answers[q.id] || ""}
                    onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                    placeholder="Write an answer..."
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => handlePostAnswer(q.id)} 
                    disabled={submittingAnswer[q.id] || !answers[q.id]?.trim()}
                    className="px-4"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
