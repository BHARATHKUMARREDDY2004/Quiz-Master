import { TouchableOpacity, Text } from 'react-native';


/**
 * Primary action button that dynamically shows:
 * - "Check Answer" (pre-submission)
 * - "Next Question" or "Finish Quiz" (post-submission)
 * Handles disabled state when no option selected
 * Uses secondary brand color palette
 */
type QuizControlsProps = {
  isAnswered: boolean;
  isLastQuestion: boolean;
  hasSelectedOption: boolean;
  onCheckAnswer: () => void;
  onNextQuestion: () => void;
};

export const QuizControls = ({
  isAnswered,
  isLastQuestion,
  hasSelectedOption,
  onCheckAnswer,
  onNextQuestion
}: QuizControlsProps) => (
  <TouchableOpacity
    className={`p-4 rounded-lg ${!hasSelectedOption ? "bg-secondary-100/50" : "bg-secondary-100"}`}
    onPress={isAnswered ? onNextQuestion : onCheckAnswer}
    disabled={!hasSelectedOption}
  >
    <Text className={`text-white text-center font-pbold ${!hasSelectedOption ? "text-white/50" : "text-white"}`}>
      {isAnswered
        ? isLastQuestion
          ? "Finish Quiz"
          : "Next Question"
        : "Check Your Answer"}
    </Text>
  </TouchableOpacity>
);