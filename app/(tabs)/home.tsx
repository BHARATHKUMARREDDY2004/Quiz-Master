import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useQuizStore } from "@/store/quizStore";
import { useEffect } from "react";
import { quizData } from "@/data/data";
import { Quiz} from "@/types/type"

export default function HomeScreen() {
  const router = useRouter();
  const { quizzes, setQuizzes } = useQuizStore();

  useEffect(() => {
    setQuizzes(quizData.quizzes);
  }, []);

  const renderQuizItem = ({ item }: { item: Quiz }) => (
    <TouchableOpacity
      className="p-4 mb-4 bg-tertiary rounded-xl shadow-sm border border-gray-200"
      onPress={() => router.push(`/quiz?quizId=${item.quiz_id}`)}
    >
      <Text className="text-lg font-pbold text-white">{item.title}</Text>
      <Text className="text-gray-200 font-pmedium">
        {item.questions.length} questions
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 p-4 bg-primary pt-10">
      <Text className="text-2xl font-pextrabold text-secondary-200 my-6">
       Quiz Master
      </Text>

      {quizzes.length === 0 ? (
        <Text className="text-center mt-8 text-gray-100 font-pregular">
          Loading quizzes...
        </Text>
      ) : (
        <FlatList
          data={quizzes}
          renderItem={renderQuizItem}
          keyExtractor={(item) => item.quiz_id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
