import { View, Text } from 'react-native';
import { PieChart } from './PieChart';
import { QuizSummaryCardProps } from '@/types/type';

/**
 * Displays a single quiz's summary including:
 * - Latest attempt with PieChart
 * - Statistics (best score, average score)
 * - Attempt history
 */
export const QuizSummaryCard = ({ quiz, summaries }: QuizSummaryCardProps) => {
  const latestSummary = summaries[summaries.length - 1];
  const bestScore = Math.max(...summaries.map(s => (s.correct / s.total) * 100));
  const averageScore = summaries.reduce((sum, s) => sum + (s.correct / s.total) * 100, 0) / summaries.length;

  return (
    <View className="mb-6 p-4 bg-tertiary rounded-xl shadow-sm border border-gray-200">
      {/* Quiz Title */}
      <Text className="text-xl text-gray-100 font-pbold mb-2">{quiz.title}</Text>
      
      {/* Latest Attempt Section */}
      <View className="mb-4">
        <Text className="text-lg text-gray-100 font-psemibold mb-2">Latest Attempt</Text>
        <PieChart correct={latestSummary.correct} incorrect={latestSummary.incorrect} size={120} />
        <View className="flex-row justify-between mt-2">
          <Text className="text-gray-200">Score: {Math.round((latestSummary.correct / latestSummary.total) * 100)}%</Text>
          <Text className="text-gray-200">Date: {new Date(latestSummary.timestamp).toLocaleDateString()}</Text>
        </View>
      </View>

      {/* Statistics Section */}
      <View className="mb-2">
        <Text className="text-lg text-gray-100 font-psemibold mb-2">Statistics</Text>
        <View className="flex-row justify-between">
          <Text className="text-gray-200">Attempts:</Text>
          <Text className="text-gray-200">{summaries.length}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-200">Best Score:</Text>
          <Text className="text-green-500">{Math.round(bestScore)}%</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-200">Average Score:</Text>
          <Text className="text-gray-200">{Math.round(averageScore)}%</Text>
        </View>
      </View>

      {/* Attempt History Section */}
      <View>
        <Text className="text-lg text-gray-100 font-psemibold mb-2">History</Text>
        {summaries.map((summary, index) => (
          <View key={`${summary.quizId}-${summary.timestamp}-${index}`} className="flex-row justify-between py-2 border-b border-gray-200/50">
            <Text className="text-gray-200">Attempt {index + 1}:</Text>
            <Text className="text-gray-200 font-pmedium">
              {summary.correct}/{summary.total} ({Math.round((summary.correct / summary.total) * 100)}%)
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};