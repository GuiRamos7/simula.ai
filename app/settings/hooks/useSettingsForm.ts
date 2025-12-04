import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';
import { optionsFeedbackAnswers, optionsTimer } from '../helper/optionsFeedbackAnswers';

export type FeedbackOption = keyof typeof optionsFeedbackAnswers;
export type TimerOption = keyof typeof optionsTimer;

export function useSettingsForm() {
  const [yearOption, setYearOption] = useState<string | undefined>();
  const [feedbackOption, setFeedbackOption] =
    useState<FeedbackOption>('immediate');
  const [timerOption, setTimerOption] = useState<TimerOption>('regressive');
  const router = useRouter();

  const onConfirm = useCallback(() => {
    if (yearOption) {
      router.push(
        `/exams/${yearOption}?key=${nanoid()}&mode=${feedbackOption}&timer=${timerOption}`,
      );
    }
  }, [yearOption]);

  return {
    yearOption,
    feedbackOption,
    timerOption,
    actions: {
      setYearOption,
      setFeedbackOption,
      setTimerOption,
      onConfirm,
    },
  };
}
