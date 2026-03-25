import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, Clock, Users, FileText, Gamepad2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-4">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            About the Study
          </h1>
          <p className="font-body text-muted-foreground mt-3 max-w-2xl mx-auto">
            This research project explores the relationship between video game engagement
            and political attitudes among young adults in Sweden.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl shadow-sm border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Gamepad2 className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">Study Purpose</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                This study examines how gaming habits, exposure to political themes in games,
                and media engagement may relate to political interest, trust, and attitudes
                among young adults in Sweden.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">Who Can Participate</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                The survey is intended for participants aged <strong className="text-foreground">18–35</strong>
                currently living in Sweden. Participation is entirely voluntary.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">Time Required</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                The survey takes approximately <strong className="text-foreground">5–8 minutes</strong> to complete.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <h2 className="font-display text-xl font-semibold">Privacy & Ethics</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Responses are anonymous and collected only for academic research purposes.
                No directly identifying personal information is required.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-2xl shadow-sm border-border">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="font-display text-2xl font-semibold">Researcher Information</h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                This survey forms part of a master’s-level social science research project
                focused on the social and political dimensions of gaming culture in Sweden.
              </p>

              <p>
                <strong className="text-foreground">Institution:</strong> Lund University
              </p>

              <p>
                <strong className="text-foreground">Researcher:</strong> Kasidach Bunyarat
              </p>

              <p>
                <strong className="text-foreground">Researcher Contact:</strong> ka7160bu-s@student.lu.se
              </p>
              <p>
                <strong className="text-foreground">Supervisor:</strong> Annika Fredén  
              </p>
              <p>
                <strong className="text-foreground">Supervisor Contact:</strong> annika.freden@svet.lu.se
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;