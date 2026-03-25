import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { surveySections } from "@/data/surveyQuestions";
import SurveyProgress from "@/components/SurveyProgress";
import SurveyQuestionComponent from "@/components/SurveyQuestion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Send, Gamepad2 } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [currentSection, setCurrentSection] = useState(-1); // -1 = intro
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setAnswer = (id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const section = currentSection >= 0 ? surveySections[currentSection] : null;

  const canProceed = () => {
    if (!section) return true;
    return section.questions
      .filter((q) => q.required)
      .every((q) => {
        const a = answers[q.id];
        if (!a) return false;
        if (Array.isArray(a)) return a.length > 0;
        return a.length > 0;
      });
  };
const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
  const handleNext = async () => {
    if (!canProceed()) {
      toast.error("Please answer all required questions before continuing.");
      return;
    }

    // Move to next section if not on last section yet
    if (currentSection < surveySections.length - 1) {
      setCurrentSection((s) => s + 1);
      return;
    }

    // Final submit (last section)
    setIsSubmitting(true);

    try {
      const row = {
  // Video Game Engagement
  gaming_frequency: (answers["g1"] as string) || "",
  gaming_hours: (answers["g2"] as string) || "",
  gaming_platforms: Array.isArray(answers["g3"])
    ? (answers["g3"] as string[]).join(", ")
    : (answers["g3"] as string) || "",
  gaming_genres: Array.isArray(answers["g4"])
    ? (answers["g4"] as string[]).join(", ")
    : (answers["g4"] as string) || "",
  gaming_social_importance: answers["g5"] ? Number(answers["g5"]) : null,
  gaming_news_following: (answers["g6"] as string) || "",
  gaming_political_themes: (answers["g7"] as string) || "",
  gaming_political_thinking: answers["g8"] ? Number(answers["g8"]) : null,

  // Political Attitudes
  political_interest: answers["p1"] ? Number(answers["p1"]) : null,
  voted_2022: (answers["p2"] as string) || "",
  freedom_of_speech_attitude: (answers["p3"] as string) || "", // updated from political_spectrum
  political_trust: answers["p4"] ? Number(answers["p4"]) : null,
  political_news_sources: Array.isArray(answers["p5"])
    ? (answers["p5"] as string[]).join(", ")
    : (answers["p5"] as string) || "",
  politics_in_gaming: (answers["p6"] as string) || "",
  games_influence_politics: answers["p7"] ? Number(answers["p7"]) : null,
  important_political_issues: (answers["p8"] as string) || "",

  // Demographics
  age_group: (answers["d1"] as string) || "",
  gender: (answers["d2"] as string) || "",
  occupation: (answers["d3"] as string) || "",
  education_level: (answers["d4"] as string) || "",
  location: (answers["d5"] as string) || "",
  open_comments: (answers["d6"] as string) || "",
};

      console.log("Submitting locally:", row);

      const response = await fetch(`${API_BASE}/api/submit-survey`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to save locally");
      }

      toast.success("Thank you for doing the survey, and have a good day!");
      setSubmitted(true);
    } catch (error: any) {
      console.error("Submission failed:", error);
      toast.error(error?.message || "Failed to submit survey. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setCurrentSection((s) => Math.max(-1, s - 1));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">
            Thank you!
          </h1>
          <p className="font-body text-muted-foreground">
            Your responses have been saved locally on your computer. Thank you
            for contributing to this research on video game engagement and
            political attitudes among young adults in Sweden.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {currentSection === -1 ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-2">
                <Gamepad2 className="w-10 h-10 text-primary" />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                Video Games and Social Attitudes Survey
              </h1>
              <p className="font-body text-muted-foreground max-w-lg mx-auto leading-relaxed">
                This survey explores the relationship between video game engagement and social and civic attitudes among young adults (18–35) in Sweden.. It takes approximately{" "}
                <strong className="text-foreground">5–8 minutes</strong> to
                complete. All responses are anonymous.
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm font-body">
                {surveySections.map((s) => (
                  <span
                    key={s.id}
                    className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground"
                  >
                    {s.icon} {s.title}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
  <Button size="lg" onClick={handleNext} className="font-display gap-2">
    Start Survey <ArrowRight className="w-4 h-4" />
  </Button>

  <Button variant="outline" size="lg" asChild className="font-display">
    <Link to="/about">About the Study</Link>
  </Button>
</div>
            </motion.div>
          ) : (
            <motion.div
              key={section!.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <SurveyProgress
                currentSection={currentSection}
                totalSections={surveySections.length}
                sectionNames={surveySections.map((s) => s.title)}
                sectionIcons={surveySections.map((s) => s.icon)}
              />

              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="mb-6">
                  <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
                    {section!.icon} {section!.title}
                  </h2>
                  <div className="mt-3 rounded-2xl border border-border bg-muted/40 p-5 max-h-80 overflow-y-auto">
  <div className="font-body text-sm text-muted-foreground whitespace-pre-line leading-relaxed space-y-3">
    {section!.description}
  </div>
</div>
                </div>

                <div className="space-y-8">
                  {section!.questions.map((q) => (
                    <SurveyQuestionComponent
                      key={q.id}
                      question={q}
                      value={answers[q.id] ?? (q.type === "checkbox" ? [] : "")}
                      onChange={(v) => setAnswer(q.id, v)}
                    />
                  ))}
                </div>

                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="font-display gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="font-display gap-2"
                  >
                    {currentSection === surveySections.length - 1 ? (
                      <>
                        {isSubmitting ? "Submitting…" : "Submit"}{" "}
                        <Send className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Next <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;