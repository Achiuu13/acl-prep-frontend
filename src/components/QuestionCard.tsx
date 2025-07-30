import { useState } from 'react';
import { useAppContext, Question } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CheckCircle, XCircle, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface QuestionCardProps {
  question: Question;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const QuestionCard = ({ question, onNext, onPrev, hasNext, hasPrev }: QuestionCardProps) => {
  const { updateStreak, updateStats } = useAppContext();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (hasAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setHasAnswered(true);
    
    const isCorrect = answerIndex === question.correctAnswer;
    updateStreak(isCorrect);
    updateStats(isCorrect);
    
    if (isCorrect) {
      toast({
        title: "Correct! 🎉",
        description: "Great job! Your streak continues.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Don't worry, keep practicing!",
        variant: "destructive",
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success/10 text-success';
      case 'Medium': return 'bg-warning/10 text-warning';
      case 'Hard': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getOptionIcon = (index: number) => {
    if (!hasAnswered) return null;
    
    if (index === question.correctAnswer) {
      return <CheckCircle className="h-5 w-5 text-success" />;
    } else if (index === selectedAnswer && index !== question.correctAnswer) {
      return <XCircle className="h-5 w-5 text-destructive" />;
    }
    
    return null;
  };

  const getOptionClass = (index: number) => {
    const baseClass = "w-full p-4 text-left border rounded-lg transition-all duration-200 hover:border-primary/50";
    
    if (!hasAnswered) {
      return `${baseClass} border-border hover:bg-muted/50 cursor-pointer`;
    }
    
    if (index === question.correctAnswer) {
      return `${baseClass} border-success bg-success/5 cursor-default`;
    } else if (index === selectedAnswer && index !== question.correctAnswer) {
      return `${baseClass} border-destructive bg-destructive/5 cursor-default`;
    }
    
    return `${baseClass} border-border bg-muted/20 cursor-default`;
  };

  const resetQuestion = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setShowExplanation(false);
  };

  const handleNext = () => {
    resetQuestion();
    onNext();
  };

  const handlePrev = () => {
    resetQuestion();
    onPrev();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{question.examType}</Badge>
            <Badge variant="outline">{question.topic}</Badge>
            <Badge className={getDifficultyColor(question.difficulty)}>
              {question.difficulty}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-xl leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={getOptionClass(index)}
              disabled={hasAnswered}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
                {getOptionIcon(index)}
              </div>
            </button>
          ))}
        </div>

        {hasAnswered && (
          <Collapsible open={showExplanation} onOpenChange={setShowExplanation}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full">
                <span>Show Explanation</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Explanation:</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        <div className="flex justify-between items-center pt-4">
          <Button
            onClick={handlePrev}
            variant="outline"
            disabled={!hasPrev}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!hasNext}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;