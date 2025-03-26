import { Text } from 'react-native';
import { QuizHeaderProps } from '@/types/type';


/**
 * Renders the quiz progress header showing:
 * - Current question number/total
 * - Question text itself
 * Uses themed typography and colors
 */

export const QuizHeader = ({ 
  currentQuestionIndex, 
  totalQuestions, 
  question 
}: QuizHeaderProps) => (
  <>
    <Text className="text-lg text-secondary-100 font-pbold mb-2">
      Question {currentQuestionIndex + 1} of {totalQuestions}
    </Text>
    <Text className="text-xl text-white font-pbold mb-6">
      {question}
    </Text>
  </>
);