import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnswerResult, QuizSummary, QuizState } from '@/types/type';

/**
 * Global state management for quiz functionality
 * Persists quizzes and summaries to AsyncStorage
 */
export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      // State variables
      quizzes: [],                   // All available quizzes
      currentQuiz: null,             // Currently selected quiz
      currentQuestionIndex: 0,       // Position in current quiz
      selectedOption: null,           // User's selected answer
      isAnswered: false,             // If current question was answered
      isCorrect: false,              // If answer was correct
      score: 0,                      // Current quiz score
      quizCompleted: false,          // If quiz is finished
      isQuizInProgress: false,       // If quiz is active (for back button)
      userAnswers: [],               // Answers for current quiz session
      quizSummaries: [],             // Historical quiz results

      // Actions
      setQuizzes: (quizzes) => set({ quizzes }),  // Load quiz data
      
      // Starts a new quiz and resets progress
      selectQuiz: (quiz) => set({ 
        currentQuiz: quiz, 
        currentQuestionIndex: 0, 
        selectedOption: null, 
        isAnswered: false, 
        isCorrect: false,
        score: 0,
        quizCompleted: false,
        userAnswers: [],
        isQuizInProgress: true       // Lock navigation
      }),
      
      selectOption: (option) => set({ selectedOption: option }),  // Select answer
      
      // Validates selected answer and updates score
      checkAnswer: () => set((state) => {
        if (!state.currentQuiz || state.selectedOption === null) return state;
        
        const currentQuestion = state.currentQuiz.questions[state.currentQuestionIndex];
        const isCorrect = state.selectedOption === currentQuestion.answer;
        const answerResult: AnswerResult = {  // Track answer details
          question: currentQuestion.question,
          userAnswer: state.selectedOption,
          correctAnswer: currentQuestion.answer,
          isCorrect,
          options: currentQuestion.options
        };
        
        return {
          isAnswered: true,
          isCorrect,
          score: isCorrect ? state.score + 1 : state.score,
          userAnswers: [...state.userAnswers, answerResult]  // Add to history
        };
      }),
      
      // Move to next question
      nextQuestion: () => set((state) => ({
        currentQuestionIndex: state.currentQuestionIndex + 1,
        selectedOption: null,       // Reset selection
        isAnswered: false,          // Reset answer state
        isCorrect: false
      })),
      
      // Mark quiz as completed
      completeQuiz: () => set({ 
        quizCompleted: true,
        isQuizInProgress: false     // Unlock navigation
      }),
      
      // Reset all quiz progress
      resetQuiz: () => set({ 
        currentQuiz: null,
        currentQuestionIndex: 0,
        selectedOption: null,
        isAnswered: false,
        isCorrect: false,
        score: 0,
        quizCompleted: false,
        userAnswers: [],
        isQuizInProgress: false
      }),
      
      // Save final results to history
      saveSummary: () => set((state) => {
        if (!state.currentQuiz || !state.quizCompleted) return state;
        
        const quizSummary: QuizSummary = {
          quizId: state.currentQuiz.quiz_id,
          correct: state.score,
          incorrect: state.currentQuiz.questions.length - state.score,
          total: state.currentQuiz.questions.length,
          timestamp: Date.now()
        };
        
        return {
          quizSummaries: [...state.quizSummaries, quizSummary]  // Add to summaries
        };
      }),
      
      // Manually set quiz in progress state
      setIsQuizInProgress: (value) => set({ isQuizInProgress: value })
    }),
    {
      name: 'quiz-storage',  // AsyncStorage key
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({  // Only persist these values
        quizzes: state.quizzes,
        quizSummaries: state.quizSummaries 
      }),
    }
  )
);