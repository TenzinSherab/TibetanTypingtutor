import { cn } from "@/lib/utils";

interface TibetanKeyboardProps {
  highlightedKey?: string;
  className?: string;
}

const TibetanKeyboard = ({ highlightedKey, className }: TibetanKeyboardProps) => {
  // Official Unicode CLDR Tibetan (PRC) keyboard layout
  const keyboardRows = [
    [
      // Numbers row
      { tibetan: "ཨ", english: "`", key: "`" },
      { tibetan: "༡", english: "1", key: "1" },
      { tibetan: "༢", english: "2", key: "2" },
      { tibetan: "༣", english: "3", key: "3" },
      { tibetan: "༤", english: "4", key: "4" },
      { tibetan: "༥", english: "5", key: "5" },
      { tibetan: "༦", english: "6", key: "6" },
      { tibetan: "༧", english: "7", key: "7" },
      { tibetan: "༨", english: "8", key: "8" },
      { tibetan: "༩", english: "9", key: "9" },
      { tibetan: "༠", english: "0", key: "0" },
      { tibetan: "ཧ", english: "-", key: "-" },
      { tibetan: "ཝ", english: "=", key: "=" },
    ],
    [
      // QWERTY row  
      { tibetan: "ཅ", english: "q", key: "q" },
      { tibetan: "ཆ", english: "w", key: "w" },
      { tibetan: "ེ", english: "e", key: "e" },
      { tibetan: "ར", english: "r", key: "r" },
      { tibetan: "ཏ", english: "t", key: "t" },
      { tibetan: "ཡ", english: "y", key: "y" },
      { tibetan: "ུ", english: "u", key: "u" },
      { tibetan: "ི", english: "i", key: "i" },
      { tibetan: "ོ", english: "o", key: "o" },
      { tibetan: "ཕ", english: "p", key: "p" },
      { tibetan: "ཙ", english: "[", key: "[" },
      { tibetan: "ཚ", english: "]", key: "]" },
      { tibetan: "ཛ", english: "\\", key: "\\" },
    ],
    [
      // ASDF row
      { tibetan: "འ", english: "a", key: "a" },
      { tibetan: "ས", english: "s", key: "s" },
      { tibetan: "ད", english: "d", key: "d" },
      { tibetan: "བ", english: "f", key: "f" },
      { tibetan: "ང", english: "g", key: "g" },
      { tibetan: "མ", english: "h", key: "h" },
      { tibetan: "་", english: "j", key: "j" },
      { tibetan: "ག", english: "k", key: "k" },
      { tibetan: "ལ", english: "l", key: "l" },
      { tibetan: "ཞ", english: ";", key: ";" },
      { tibetan: "།", english: "'", key: "'" },
    ],
    [
      // ZXCV row  
      { tibetan: "ཟ", english: "z", key: "z" },
      { tibetan: "ཤ", english: "x", key: "x" },
      { tibetan: "ཀ", english: "c", key: "c" },
      { tibetan: "ཁ", english: "v", key: "v" },
      { tibetan: "པ", english: "b", key: "b" },
      { tibetan: "ན", english: "n", key: "n" },
      { tibetan: "m", english: "m", key: "m" },
      { tibetan: "ཐ", english: ",", key: "," },
      { tibetan: "ཇ", english: ".", key: "." },
      { tibetan: "ཉ", english: "/", key: "/" },
    ],
    [
      // Space bar
      { tibetan: " ", english: "space", key: " " },
    ],
  ];

  const isKeyHighlighted = (keyChar: string) => {
    return highlightedKey === keyChar;
  };

  return (
    <div className={cn("bg-card p-6 rounded-lg border shadow-sm", className)}>
      <h3 className="text-lg font-semibold mb-4 text-center">Complete Tibetan Keyboard Layout</h3>
      <div className="space-y-2">
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            {row.map((keyData, keyIndex) => (
              <div
                key={keyIndex}
                className={cn(
                  "flex flex-col items-center justify-center min-w-[50px] h-16 rounded border-2 text-sm font-medium transition-all duration-200",
                  isKeyHighlighted(keyData.key)
                    ? "bg-key-active text-white border-primary scale-105 shadow-md"
                    : "bg-key-default border-key-border hover:bg-secondary",
                  keyData.key === " " ? "min-w-[200px]" : ""
                )}
              >
                <span className="text-lg leading-none">{keyData.tibetan}</span>
                <span className="text-xs text-muted-foreground leading-none">
                  {keyData.english}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2 text-center text-sm text-muted-foreground">
        <div>The highlighted key shows what to type next</div>
        <div>Official Unicode CLDR Tibetan (PRC) keyboard layout</div>
        <div>Standard layout used in Windows and most Tibetan input systems</div>
      </div>
    </div>
  );
};

export default TibetanKeyboard;