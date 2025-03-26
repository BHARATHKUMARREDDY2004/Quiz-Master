import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import {ClearHistoryButtonProps} from '@/types/type'

/**
 * A destructive action button to clear all quiz history.
 * Should only be shown when there are results available.
 */

export const ClearHistoryButton = ({
  onPress
} : ClearHistoryButtonProps) => {
  return (
    <View className="p-4 mb-20">
      <TouchableOpacity
        className="p-4 bg-secondary-100 rounded-lg items-center"
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Clear all quiz history"
      >
        <Text
          className="text-white font-pbold"
          accessibilityRole="text"
        >
          Clear History
        </Text>
      </TouchableOpacity>
    </View>
  );
};