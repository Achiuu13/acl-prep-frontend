import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface Question {
  id: number;
  topic: string;
  examType: 'SAT' | 'ACT';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  streak: number;
  accuracy: number;
  totalQuestions: number;
  correctAnswers: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  streak: number;
  accuracy: number;
  totalQuestions: number;
}

interface AppContextType {
  user: User;
  questions: Question[];
  leaderboard: LeaderboardEntry[];
  currentStreak: number;
  updateStreak: (isCorrect: boolean) => void;
  updateStats: (isCorrect: boolean) => void;
  filteredQuestions: Question[];
  setFilteredQuestions: (questions: Question[]) => void;
}

// Dummy data
const dummyQuestions: Question[] = [
  {
    id: 1,
    topic: 'Algebra',
    examType: 'SAT',
    difficulty: 'Easy',
    question: 'If 3x + 5 = 14, what is the value of x?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 2,
    explanation: 'Subtract 5 from both sides: 3x = 9. Then divide by 3: x = 3.'
  },
  {
    id: 2,
    topic: 'Geometry',
    examType: 'SAT',
    difficulty: 'Medium',
    question: 'What is the area of a circle with radius 5?',
    options: ['25π', '10π', '5π', '50π'],
    correctAnswer: 0,
    explanation: 'Area of a circle = πr². With r = 5, area = π(5)² = 25π.'
  },
  {
    id: 3,
    topic: 'Reading',
    examType: 'ACT',
    difficulty: 'Hard',
    question: 'Which word best describes the author\'s tone in the passage?',
    options: ['Optimistic', 'Cynical', 'Neutral', 'Melancholic'],
    correctAnswer: 1,
    explanation: 'The author uses critical language and questions the subject matter, indicating a cynical tone.'
  },
  {
    id: 4,
    topic: 'Science',
    examType: 'ACT',
    difficulty: 'Easy',
    question: 'What is the chemical symbol for water?',
    options: ['HO', 'H2O', 'HO2', 'H3O'],
    correctAnswer: 1,
    explanation: 'Water consists of two hydrogen atoms and one oxygen atom, hence H2O.'
  },
  {
    id: 5,
    topic: 'Algebra',
    examType: 'SAT',
    difficulty: 'Hard',
    question: 'If f(x) = x² - 4x + 3, what is f(2)?',
    options: ['-1', '0', '1', '3'],
    correctAnswer: 0,
    explanation: 'f(2) = (2)² - 4(2) + 3 = 4 - 8 + 3 = -1.'
  },
  {
    id: 6,
    topic: 'Grammar',
    examType: 'SAT',
    difficulty: 'Medium',
    question: 'Which sentence is grammatically correct?',
    options: [
      'Between you and I, this is difficult.',
      'Between you and me, this is difficult.',
      'Among you and I, this is difficult.',
      'Among you and me, this is difficult.'
    ],
    correctAnswer: 1,
    explanation: 'After prepositions like "between," use object pronouns like "me," not subject pronouns like "I."'
  }
];

const dummyLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Alex Chen', streak: 15, accuracy: 94, totalQuestions: 120 },
  { rank: 2, name: 'Sarah Johnson', streak: 12, accuracy: 91, totalQuestions: 98 },
  { rank: 3, name: 'Michael Zhang', streak: 8, accuracy: 89, totalQuestions: 156 },
  { rank: 4, name: 'Emma Davis', streak: 6, accuracy: 87, totalQuestions: 89 },
  { rank: 5, name: 'James Wilson', streak: 4, accuracy: 85, totalQuestions: 134 },
  { rank: 6, name: 'Lisa Rodriguez', streak: 3, accuracy: 83, totalQuestions: 76 },
  { rank: 7, name: 'David Kim', streak: 2, accuracy: 81, totalQuestions: 92 },
  { rank: 8, name: 'Jennifer Brown', streak: 1, accuracy: 79, totalQuestions: 67 }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    streak: 5,
    accuracy: 78,
    totalQuestions: 45,
    correctAnswers: 35
  });

  const [currentStreak, setCurrentStreak] = useState(user.streak);
  const [filteredQuestions, setFilteredQuestions] = useState(dummyQuestions);

  const updateStreak = (isCorrect: boolean) => {
    if (isCorrect) {
      setCurrentStreak(prev => prev + 1);
      setUser(prev => ({ ...prev, streak: prev.streak + 1 }));
    } else {
      setCurrentStreak(0);
      setUser(prev => ({ ...prev, streak: 0 }));
    }
  };

  const updateStats = (isCorrect: boolean) => {
    setUser(prev => {
      const newTotalQuestions = prev.totalQuestions + 1;
      const newCorrectAnswers = prev.correctAnswers + (isCorrect ? 1 : 0);
      const newAccuracy = Math.round((newCorrectAnswers / newTotalQuestions) * 100);
      
      return {
        ...prev,
        totalQuestions: newTotalQuestions,
        correctAnswers: newCorrectAnswers,
        accuracy: newAccuracy
      };
    });
  };

  return (
    <AppContext.Provider value={{
      user,
      questions: dummyQuestions,
      leaderboard: dummyLeaderboard,
      currentStreak,
      updateStreak,
      updateStats,
      filteredQuestions,
      setFilteredQuestions
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};