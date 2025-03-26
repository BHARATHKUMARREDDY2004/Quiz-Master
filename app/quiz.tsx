// app/quiz.tsx
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuizStore } from '@/store/quizStore';
import { useEffect } from 'react';
import { useQuizBackHandler } from '@/components/BackHandler';
import { 
  QuizLoading,
  QuizHeader,
  QuizOption,
  QuizControls,
  QuizResults
} from '@/components/quiz';
import { Quiz } from '@/types/type';

export default function QuizScreen() {
  useQuizBackHandler();
  const router = useRouter();
  const { quizId } = useLocalSearchParams();
  const {
    quizzes,
    currentQuiz,
    currentQuestionIndex,
    selectedOption,
    isAnswered,
    isCorrect,
    score,
    quizCompleted,
    userAnswers,
    selectQuiz,
    selectOption,
    checkAnswer,
    nextQuestion,
    completeQuiz,
    saveSummary,
    resetQuiz,
  } = useQuizStore();

  useEffect(() => {
    const quiz = quizzes.find((q) => q.quiz_id === Number(quizId));
    if (quiz) {
      selectQuiz(quiz);
    } else {
      Alert.alert("Error", "Quiz not found");
      router.back();
    }
  }, [quizId, quizzes]);

  if (!currentQuiz) {
    return <QuizLoading />;
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentQuiz.questions.length - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      completeQuiz();
      saveSummary();
    } else {
      nextQuestion();
    }
  };

  const handleRestart = () => {
    resetQuiz();
    selectQuiz(currentQuiz);
  };

  if (quizCompleted) {
    return (
      <SafeAreaView className="flex-1 p-4 bg-primary pt-20">
        <QuizResults 
          quiz={currentQuiz}
          score={score}
          userAnswers={userAnswers}
          onRestart={handleRestart}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-4 bg-primary pt-20">
      <QuizHeader
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={currentQuiz.questions.length}
        question={currentQuestion.question}
      />

      <ScrollView className="mb-6">
        {currentQuestion.options.map((option, index) => (
          <QuizOption
            key={index}
            option={option}
            isAnswered={isAnswered}
            isSelected={selectedOption === option}
            isCorrect={isCorrect}
            correctAnswer={currentQuestion.answer}
            onSelect={() => selectOption(option)}
          />
        ))}
      </ScrollView>

      <QuizControls
        isAnswered={isAnswered}
        isLastQuestion={isLastQuestion}
        hasSelectedOption={!!selectedOption}
        onCheckAnswer={checkAnswer}
        onNextQuestion={handleNext}
      />
    </SafeAreaView>
  );
}