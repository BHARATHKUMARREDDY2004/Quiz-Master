import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useQuizStore } from '../store/quizStore';

export const useQuizBackHandler = () => {
  const { isQuizInProgress, resetQuiz } = useQuizStore();
  
  useEffect(() => {
    const backAction = () => {
      if (isQuizInProgress) {
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [isQuizInProgress, resetQuiz]);
};