import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import TibetanKeyboard from "./TibetanKeyboard";
import TypingDisplay from "./TypingDisplay";
import TypingStats from "./TypingStats";
import { RotateCcw, Play, Pause } from "lucide-react";

const TibetanTypingTutor = () => {
  // Complete Tibetan alphabet practice texts
  const practiceTexts = [
    // Basic consonants by rows (30 consonants total)
    "ཀ ཁ ག ང", // First row - ka series
    "ཅ ཆ ཇ ཉ", // Second row - cha series  
    "ཏ ཐ ད ན", // Third row - ta series
    "པ ཕ བ མ", // Fourth row - pa series
    "ཙ ཚ ཛ ཝ", // Fifth row - tsa series
    "ཞ ཟ འ ཡ", // Sixth row - zha series
    "ར ལ ཤ ས", // Seventh row - ra series
    "ཧ ཨ", // Eighth row - ha series
    // Vowels with consonants
    "ཨི ཨུ ཨེ ཨོ", // Four vowels
    "ཀི ཀུ ཀེ ཀོ", // Ka with vowels
    "མི མུ མེ མོ", // Ma with vowels
    // Simple practice sentences
    "ང འདི ཡིན།", // "I am this"
    "ཁྱེད རང སུ ཡིན།", // "Who are you?"
    "བདེ ལེགས། ཁྱོད ཀྱི མིང ལ གང ཟེར།", // "Hello. What is your name?"
    // Numbers
    "༡ ༢ ༣ ༤ ༥ ༦ ༧ ༨ ༩ ༠", // Tibetan numbers
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [errors, setErrors] = useState(0);

  const currentText = practiceTexts[currentTextIndex];
  const currentChar = currentText[currentIndex];

  // Official Unicode CLDR Tibetan (PRC) keyboard mapping
  const keyMapping: { [key: string]: string } = {
    // Numbers row
    '`': 'ཨ',
    '1': '༡',
    '2': '༢',
    '3': '༣',
    '4': '༤',
    '5': '༥',
    '6': '༦',
    '7': '༧',
    '8': '༨',
    '9': '༩',
    '0': '༠',
    '-': 'ཧ',
    '=': 'ཝ',
    
    // QWERTY row
    'q': 'ཅ',
    'w': 'ཆ',
    'e': 'ེ',
    'r': 'ར',
    't': 'ཏ',
    'y': 'ཡ',
    'u': 'ུ',
    'i': 'ི',
    'o': 'ོ',
    'p': 'ཕ',
    '[': 'ཙ',
    ']': 'ཚ',
    '\\': 'ཛ',
    
    // ASDF row
    'a': 'འ',
    's': 'ས',
    'd': 'ད',
    'f': 'བ',
    'g': 'ང',
    'h': 'མ',
    'j': '་',
    'k': 'ག',
    'l': 'ལ',
    ';': 'ཞ',
    "'": '།',
    
    // ZXCV row
    'z': 'ཟ',
    'x': 'ཤ',
    'c': 'ཀ',
    'v': 'ཁ',
    'b': 'པ',
    'n': 'ན',
    'm': 'm', // Standard 'm' key used for stacking in official layout
    ',': 'ཐ',
    '.': 'ཇ',
    '/': 'ཉ',
    
    // Space
    ' ': ' '
  };

  // Reverse mapping to find the key for a Tibetan character
  const reverseKeyMapping = Object.fromEntries(
    Object.entries(keyMapping).map(([key, tibetan]) => [tibetan, key])
  );

  const calculateWPM = useCallback(() => {
    if (timeElapsed === 0) return 0;
    const wordsTyped = typedText.length / 5; // Standard word length
    return Math.round((wordsTyped / timeElapsed) * 60);
  }, [typedText.length, timeElapsed]);

  const calculateAccuracy = useCallback(() => {
    if (typedText.length === 0) return 100;
    const correctChars = typedText.split('').filter((char, i) => char === currentText[i]).length;
    return Math.round((correctChars / typedText.length) * 100);
  }, [typedText, currentText]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && startTime) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isActive) return;

    const key = event.key;
    const tibetanChar = keyMapping[key];

    if (tibetanChar) {
      event.preventDefault();
      
      if (!startTime) {
        setStartTime(Date.now());
      }

      const expectedChar = currentText[currentIndex];
      
      if (tibetanChar === expectedChar) {
        setTypedText(prev => prev + tibetanChar);
        setCurrentIndex(prev => prev + 1);
        
        // Check if text is completed
        if (currentIndex + 1 >= currentText.length) {
          setIsActive(false);
          toast({
            title: "Congratulations!",
            description: `You completed the text with ${calculateAccuracy()}% accuracy!`,
          });
        }
      } else {
        setErrors(prev => prev + 1);
        toast({
          title: "Incorrect key",
          description: `Expected: ${expectedChar}, Got: ${tibetanChar}`,
          variant: "destructive",
        });
      }
    }
  }, [isActive, startTime, currentText, currentIndex, keyMapping, calculateAccuracy]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const resetSession = () => {
    setTypedText("");
    setCurrentIndex(0);
    setStartTime(null);
    setIsActive(false);
    setTimeElapsed(0);
    setErrors(0);
  };

  const nextText = () => {
    if (currentTextIndex < practiceTexts.length - 1) {
      setCurrentTextIndex(prev => prev + 1);
      resetSession();
    }
  };

  const previousText = () => {
    if (currentTextIndex > 0) {
      setCurrentTextIndex(prev => prev - 1);
      resetSession();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">Tibetan Typing Tutor</h1>
        <p className="text-muted-foreground">Learn to type in Tibetan script</p>
      </div>

      <div className="flex justify-center gap-4 flex-wrap">
        <Button 
          onClick={() => setIsActive(!isActive)} 
          variant={isActive ? "secondary" : "default"}
          className="gap-2"
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={resetSession} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        <Button 
          onClick={previousText} 
          disabled={currentTextIndex === 0}
          variant="outline"
        >
          Previous Text
        </Button>
        <Button 
          onClick={nextText} 
          disabled={currentTextIndex === practiceTexts.length - 1}
          variant="outline"
        >
          Next Text
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Lesson {currentTextIndex + 1} of {practiceTexts.length}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TypingDisplay
            targetText={currentText}
            typedText={typedText}
            currentIndex={currentIndex}
          />
          
          <TibetanKeyboard 
            highlightedKey={reverseKeyMapping[currentChar] || ''}
          />
        </div>
        
        <div>
          <TypingStats
            wpm={calculateWPM()}
            accuracy={calculateAccuracy()}
            errors={errors}
            timeElapsed={timeElapsed}
          />
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        {isActive ? "Start typing to begin!" : "Click Start and begin typing when ready"}
      </div>
    </div>
  );
};

export default TibetanTypingTutor;