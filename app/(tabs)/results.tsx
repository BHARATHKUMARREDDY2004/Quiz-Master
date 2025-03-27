import { View, FlatList, Text } from 'react-native';
import { useQuizStore } from '../../store/quizStore';
import { QuizSummaryCard } from '@/components/QuizSummaryCard';
import { EmptyResults } from '../../components/EmptyResults';
import { ClearHistoryButton } from '../../components/ClearHistoryButton';

/**
 * Main Results Screen that displays:
 * - Summary of all quiz attempts
 * - Statistics for each quiz
 * - Option to clear history
 */
export default function ResultsScreen() {
  const { quizSummaries, quizzes } = useQuizStore();

  // Group summaries by quiz ID for organized display
  const quizIds = [...new Set(quizSummaries.map(s => s.quizId))];
  const quizzesWithSummaries = quizIds.map(quizId => {
    const quiz = quizzes.find(q => q.quiz_id === quizId);
    const summaries = quizSummaries.filter(s => s.quizId === quizId);
    return { quiz, summaries };
  });

  const clearHistory = () => {
    useQuizStore.setState({ quizSummaries: [] });
  };

  return (
    <View className="flex-1 bg-primary pt-10">
      <FlatList
        data={quizzesWithSummaries}
        renderItem={({ item }) =>
          item.quiz ? <QuizSummaryCard quiz={item.quiz} summaries={item.summaries} /> : null
        }
        keyExtractor={(item) => item.quiz?.quiz_id.toString() ?? ''}
        ListHeaderComponent={
          <View className="p-4">
            <Text className="text-2xl text-secondary-100 font-pbold mb-6">Quiz Results</Text>
          </View>
        }
        ListEmptyComponent={<EmptyResults />}
        ListFooterComponent={
          quizSummaries.length > 0 ? <ClearHistoryButton onPress={clearHistory} /> : null
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
