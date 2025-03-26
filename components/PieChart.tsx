import React from 'react';
import { View, Text } from 'react-native';
import { Svg, Circle, G, Text as SvgText } from 'react-native-svg';
import {PieChartProps} from '@/types/type'


export const PieChart: React.FC<PieChartProps> = ({ correct, incorrect, size = 150 }) => {
  const total = correct + incorrect;
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;
  
  const correctPercentage = total > 0 ? (correct / total) * 100 : 0;
  const incorrectPercentage = total > 0 ? (incorrect / total) * 100 : 0;
  
  const correctStrokeDashoffset = circumference - (correctPercentage / 100) * circumference;
  const incorrectStrokeDashoffset = circumference - (incorrectPercentage / 100) * circumference;

  return (
    <View className="items-center mb-6">
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G rotation="-90" origin={`${radius}, ${radius}`}>
          {/* Background circle */}
          <Circle
            cx={radius}
            cy={radius}
            r={radius - 10}
            stroke="#e5e7eb"
            strokeWidth={20}
            fill="transparent"
          />
          {/* Correct segment */}
          <Circle
            cx={radius}
            cy={radius}
            r={radius - 10}
            stroke="#10b981"
            strokeWidth={20}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={correctStrokeDashoffset}
            // strokeLinecap="round"
          />
          {/* Incorrect segment */}
          {incorrect > 0 && (
            <Circle
              cx={radius}
              cy={radius}
              r={radius - 10}
              stroke="#ef4444"
              strokeWidth={20}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={incorrectStrokeDashoffset}
              rotation={correctPercentage * 3.6}
              origin={`${radius}, ${radius}`}
            />
          )}
        </G>
        {/* Center text */}
        <SvgText
          x={radius}
          y={radius}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="24"
          fontWeight="bold"
          fill="#ffffff"
        >
          {`${Math.round(correctPercentage)}%`}
        </SvgText>
      </Svg>
      <View className="flex-row mt-2">
        <View className="flex-row items-center mr-4">
          <View className="w-4 h-4 bg-green-500 rounded-full mr-1" />
          <Text className='text-white'>Correct: {correct}</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-4 h-4 bg-red-500 rounded-full mr-1" />
          <Text className='text-white'>Incorrect: {incorrect}</Text>
        </View>
      </View>
    </View>
  );
};