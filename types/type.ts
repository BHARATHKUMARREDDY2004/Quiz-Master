import { ImageProps } from "react-native";

export interface TabIconProps {
  icon: ImageProps;
  color: string;
  name: string;
  focused: boolean;
};


export interface Question {
  question_id: number;
  question: string;
  options: string[];
  answer: string;
};

export interface Quiz {
  quiz_id: number;
  title: string;
  questions: Question[];
};

export interface AnswerResult {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  options: string[];
};

export interface QuizSummary {
  quizId: number;
  correct: number;
  incorrect: number;
  total: number;
  timestamp: number;
};

export interface QuizState {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  currentQuestionIndex: number;
  selectedOption: string | null;
  isAnswered: boolean;
  isCorrect: boolean;
  score: number;
  quizCompleted: boolean;
  isQuizInProgress: boolean;
  userAnswers: AnswerResult[];
  quizSummaries: QuizSummary[];
  setQuizzes: (quizzes: Quiz[]) => void;
  selectQuiz: (quiz: Quiz) => void;
  selectOption: (option: string) => void;
  checkAnswer: () => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  completeQuiz: () => void;
  saveSummary: () => void;
  setIsQuizInProgress: (value: boolean) => void;
};



export interface PieChartProps {
  correct: number;
  incorrect: number;
  size?: number;
}


export interface QuizSummaryCardProps {
  quiz: Quiz;
  summaries: QuizSummary[];
};


export interface ClearHistoryButtonProps {
  onPress: () => void;
};


export interface QuizResultsProps  {
  quiz: Quiz;
  score: number;
  userAnswers: AnswerResult[];
  onRestart: () => void;
};


export interface QuizOptionProps {
  option: string;
  isAnswered: boolean;
  isSelected: boolean;
  isCorrect: boolean;
  correctAnswer: string;
  onSelect: () => void;
};

export interface QuizHeaderProps  {
  currentQuestionIndex: number;
  totalQuestions: number;
  question: string;
};
