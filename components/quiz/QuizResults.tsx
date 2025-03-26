import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { PieChart } from '@/components/PieChart';
import { AnswerResult, Quiz, QuizResultsProps } from '@/types/type';


/**
 * Comprehensive results display featuring:
 * - Score summary with PieChart visualization
 * - Detailed breakdown of all questions/answers
 * - Restart quiz CTA
 * Organizes results in scrollable view with:
 *   - Question review cards
 *   - Answer correctness indicators
 *   - Original options with visual feedback
 */

export const QuizResults = ({ 
  quiz, 
  score, 
  userAnswers, 
  onRestart 
}: QuizResultsProps) => (
  <View className="flex-1">
    <Text className="text-2xl font-pbold mb-4 text-center text-white">
      Quiz Results
    </Text>

    <ScrollView className="mb-4">
      <Text className="text-xl font-psemibold mb-2 text-center text-white">
        {quiz.title}
      </Text>
      
      <PieChart
        correct={score}
        incorrect={quiz.questions.length - score}
      />

      {userAnswers.map((answer, index) => (
        <AnswerReview 
          key={index}
          answer={answer}
          index={index}
        />
      ))}
    </ScrollView>

    <TouchableOpacity
      className="p-4 bg-secondary-100 rounded-lg"
      onPress={onRestart}
    >
      <Text className="text-white text-center font-pbold">
        Restart Quiz
      </Text>
    </TouchableOpacity>
  </View>
);

type AnswerReviewProps = {
  answer: AnswerResult;
  index: number;
};

const AnswerReview = ({ answer, index }: AnswerReviewProps) => (
  <View className="mb-6 p-4 bg-primary/70 rounded-lg border border-gray-200">
    <Text className="text-lg font-psemibold mb-2 text-white">
      {index + 1}. {answer.question}
    </Text>

    <View className="mb-3">
      {answer.options.map((option : string, optIndex : number) => (
        <OptionResult
          key={optIndex}
          option={option}
          correctAnswer={answer.correctAnswer}
          userAnswer={answer.userAnswer}
          isCorrect={answer.isCorrect}
        />
      ))}
    </View>

    <Text className={`text-sm ${answer.isCorrect ? "text-green-600" : "text-red-600"}`}>
      {answer.isCorrect ? "✓ Correct" : "✗ Incorrect"}
    </Text>
  </View>
);

type OptionResultProps = {
  option: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
};

const OptionResult = ({ option, correctAnswer, userAnswer, isCorrect }: OptionResultProps) => {
  const optionStyle = 
    option === correctAnswer ? "border-green-400 bg-green-200/80" :
    option === userAnswer && !isCorrect ? "border-red-400/70 bg-red-200/80" :
    "border-gray-100";

  return (
    <View className={`p-3 mb-2 rounded-lg border ${optionStyle}`}>
      <Text className="text-white">{option}</Text>
      {option === correctAnswer && (
        <Text className="text-green-600 text-xs mt-1">Correct Answer</Text>
      )}
      {option === userAnswer && !isCorrect && (
        <Text className="text-red-600 text-xs mt-1">Your Answer</Text>
      )}
    </View>
  );
};