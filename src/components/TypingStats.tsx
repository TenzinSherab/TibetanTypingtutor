import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface TypingStatsProps {
  wpm: number;
  accuracy: number;
  errors: number;
  timeElapsed: number;
  className?: string;
}

const TypingStats = ({ wpm, accuracy, errors, timeElapsed, className }: TypingStatsProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const stats = [
    { label: "WPM", value: wpm.toString(), color: "text-primary" },
    { label: "Accuracy", value: `${accuracy}%`, color: accuracy >= 90 ? "text-success" : accuracy >= 70 ? "text-warning" : "text-destructive" },
    { label: "Errors", value: errors.toString(), color: "text-destructive" },
    { label: "Time", value: formatTime(timeElapsed), color: "text-muted-foreground" },
  ];

  return (
    <Card className={cn("p-4", className)}>
      <h3 className="text-lg font-semibold mb-3">Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={cn("text-2xl font-bold", stat.color)}>
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TypingStats;