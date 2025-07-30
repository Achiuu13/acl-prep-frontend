import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import QuestionCard from '@/components/QuestionCard';
import StreakTracker from '@/components/StreakTracker';

const Questions = () => {
  const { filteredQuestions } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Reset to first question when filters change
  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [filteredQuestions]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">Practice Questions</h1>
                <p className="text-muted-foreground mt-2">
                  Question {currentQuestionIndex + 1} of {filteredQuestions.length}
                </p>
              </div>
              <StreakTracker />
            </div>

            {currentQuestion ? (
              <div className="max-w-4xl mx-auto">
                <QuestionCard
                  question={currentQuestion}
                  onNext={handleNextQuestion}
                  onPrev={handlePrevQuestion}
                  hasNext={currentQuestionIndex < filteredQuestions.length - 1}
                  hasPrev={currentQuestionIndex > 0}
                />
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No questions found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to see more questions.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Questions;