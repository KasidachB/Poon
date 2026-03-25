import { SurveyQuestion as SurveyQuestionType } from "@/data/surveyQuestions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  question: SurveyQuestionType;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

const SurveyQuestionComponent = ({ question, value, onChange }: Props) => {
  const renderScale = () => {
    const min = question.scaleMin ?? 1;
    const max = question.scaleMax ?? 5;
    const points = Array.from({ length: max - min + 1 }, (_, i) => i + min);

    return (
      <div className="space-y-2">
        <div className="flex justify-between gap-2">
          {points.map((p) => (
            <button
              key={p}
              onClick={() => onChange(String(p))}
              className={`flex-1 h-12 rounded-lg border-2 font-display font-semibold text-lg transition-all ${
                value === String(p)
                  ? "border-primary bg-primary text-primary-foreground scale-105 shadow-md"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        {question.scaleLabels && (
          <div className="flex justify-between text-xs text-muted-foreground font-body">
            <span>{question.scaleLabels[0]}</span>
            <span>{question.scaleLabels[1]}</span>
          </div>
        )}
      </div>
    );
  };

  const renderRadio = () => (
    <RadioGroup value={value as string} onValueChange={(v) => onChange(v)} className="space-y-2">
      {question.options?.map((opt) => (
        <Label
          key={opt}
          className={`flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer transition-all font-body ${
            value === opt
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/30"
          }`}
        >
          <RadioGroupItem value={opt} />
          <span className="text-sm">{opt}</span>
        </Label>
      ))}
    </RadioGroup>
  );

  const renderCheckbox = () => {
    const selected = Array.isArray(value) ? value : [];
    return (
      <div className="space-y-2">
        {question.options?.map((opt) => (
          <Label
            key={opt}
            className={`flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer transition-all font-body ${
              selected.includes(opt)
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30"
            }`}
          >
            <Checkbox
              checked={selected.includes(opt)}
              onCheckedChange={(checked) => {
                if (checked) onChange([...selected, opt]);
                else onChange(selected.filter((s) => s !== opt));
              }}
            />
            <span className="text-sm">{opt}</span>
          </Label>
        ))}
      </div>
    );
  };

  const renderSelect = () => (
    <Select value={value as string} onValueChange={(v) => onChange(v)}>
      <SelectTrigger className="font-body">
        <SelectValue placeholder="Select an option..." />
      </SelectTrigger>
      <SelectContent>
        {question.options?.map((opt) => (
          <SelectItem key={opt} value={opt} className="font-body">{opt}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const renderText = () => (
    <Textarea
      value={value as string}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your answer here..."
      className="font-body min-h-[100px]"
    />
  );

  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-base text-foreground leading-snug">
        {question.text}
        {question.required && <span className="text-destructive ml-1">*</span>}
      </h3>
      {question.type === "radio" && renderRadio()}
      {question.type === "checkbox" && renderCheckbox()}
      {question.type === "scale" && renderScale()}
      {question.type === "select" && renderSelect()}
      {question.type === "text" && renderText()}
    </div>
  );
};

export default SurveyQuestionComponent;
