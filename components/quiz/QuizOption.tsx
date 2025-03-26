import { TouchableOpacity, Text, View } from 'react-native';
import { QuizOptionProps } from '@/types/type';

/** 
 * Interactive quiz answer option component that:
 * - Handles selection state styling
 * - Shows correct/incorrect feedback post-answer
 * - Disables interaction after answering
 * Visual states match app's color scheme
 */

export const QuizOption = ({
  option,
  isAnswered,
  isSelected,
  isCorrect,
  correctAnswer,
  onSelect
}: QuizOptionProps) => {
  const getOptionStyle = () => {
    if (!isAnswered) {
      return isSelected ? "border-secondary-100" : "border-gray-200";
    }

    if (option === correctAnswer) {
      return "bg-green-200/80 border-green-500";
    }

    if (isSelected && !isCorrect) {
      return "bg-red-200/80 border-red-500";
    }

    return "border-gray-200";
  };

  return (
    <TouchableOpacity
      className={`p-4 mb-3 rounded-lg border ${getOptionStyle()}`}
      onPress={onSelect}
      disabled={isAnswered}
    >
      <Text className="text-white">{option}</Text>
      {isAnswered && (
        <View className="absolute right-4 top-4">
          {option === correctAnswer ? (
            <Text className="text-green-600">✓</Text>
          ) : isSelected && !isCorrect ? (
            <Text className="text-red-600">✗</Text>
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );
};