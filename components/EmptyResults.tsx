import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

/**
 * Displayed when there are no quiz results available
 * Provides a button to navigate to the quiz selection screen
 */
export const EmptyResults = () => {
  const router = useRouter();
  
  return (
    <View className="items-center justify-center py-10">
      <Text className="text-lg text-gray-200 mb-4 font-pregular">No quiz results yet</Text>
      <TouchableOpacity
        className="px-6 py-3 bg-secondary-100 rounded-lg"
        onPress={() => router.push('/')}
      >
        <Text className="text-white font-pmedium">Take a Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};