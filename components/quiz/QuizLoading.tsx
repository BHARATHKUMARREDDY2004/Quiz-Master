import { View, Text } from 'react-native';


/**
 * Displays a loading state while quiz data is being fetched
 * Simple centered text with app's primary background
 */
export const QuizLoading = () => (
  <View className="flex-1 items-center justify-center bg-primary">
    <Text className="text-gray-100 font-pregular">Loading...</Text>
  </View>
);