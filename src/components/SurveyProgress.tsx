import { motion } from "framer-motion";

interface SurveyProgressProps {
  currentSection: number;
  totalSections: number;
  sectionNames: string[];
  sectionIcons: string[];
}

const SurveyProgress = ({ currentSection, totalSections, sectionNames, sectionIcons }: SurveyProgressProps) => {
  const progress = ((currentSection) / (totalSections + 1)) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-3">
        {sectionNames.map((name, i) => (
          <div
            key={name}
            className={`flex items-center gap-1.5 text-xs font-body font-medium transition-colors ${
              i < currentSection
                ? "text-primary"
                : i === currentSection
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            <span>{sectionIcons[i]}</span>
            <span className="hidden sm:inline">{name}</span>
          </div>
        ))}
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default SurveyProgress;
