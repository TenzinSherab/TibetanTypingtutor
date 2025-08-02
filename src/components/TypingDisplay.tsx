import { cn } from "@/lib/utils";

interface TypingDisplayProps {
  targetText: string;
  typedText: string;
  currentIndex: number;
  className?: string;
}

const TypingDisplay = ({ targetText, typedText, currentIndex, className }: TypingDisplayProps) => {
  const renderCharacter = (char: string, index: number) => {
    let status = 'upcoming';
    
    if (index < typedText.length) {
      status = typedText[index] === char ? 'correct' : 'incorrect';
    } else if (index === currentIndex) {
      status = 'current';
    }

    return (
      <span
        key={index}
        className={cn(
          "text-2xl font-mono",
          {
            'text-success bg-success/10': status === 'correct',
            'text-destructive bg-destructive/10': status === 'incorrect',
            'text-primary bg-primary/20 animate-pulse': status === 'current',
            'text-muted-foreground': status === 'upcoming',
          }
        )}
      >
        {char === ' ' ? '␣' : char}
      </span>
    );
  };

  return (
    <div className={cn("bg-card p-6 rounded-lg border shadow-sm", className)}>
      <h3 className="text-lg font-semibold mb-4">Type the following text:</h3>
      <div className="bg-muted/30 p-4 rounded border min-h-[80px] leading-relaxed">
        {targetText.split('').map((char, index) => renderCharacter(char, index))}
      </div>
      <div className="mt-4 flex justify-between text-sm text-muted-foreground">
        <span>Progress: {typedText.length}/{targetText.length}</span>
        <span>
          Accuracy: {typedText.length > 0 ? 
            Math.round((typedText.split('').filter((char, i) => char === targetText[i]).length / typedText.length) * 100) : 0}%
        </span>
      </div>
    </div>
  );
};

export default TypingDisplay;