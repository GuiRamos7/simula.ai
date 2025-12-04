'use client';
import { useExamsList } from '@/app/hooks/useExamsList';
import { Exam } from '../types';
import { SummaryCard } from './components/SummaryCard';
import { YearSelect } from './components/YearSelect';
import { FeedbackSelector } from './components/FeedbackSelector';
import { TimerSelector } from './components/TimerSelector';
import { SettingsLoadingSkeleton } from './components/SettingsSkeleton';
import { useSettingsForm } from './hooks/useSettingsForm';
import {
  optionsFeedbackAnswers,
  optionsTimer,
} from './helper/optionsFeedbackAnswers';

type FeedbackOption = keyof typeof optionsFeedbackAnswers;
type TimerOption = keyof typeof optionsTimer;

export default function Settings() {
  const { data, isLoading } = useExamsList();
  const { actions, feedbackOption, timerOption, yearOption } =
    useSettingsForm();

  if (isLoading) return <SettingsLoadingSkeleton />;

  const examYears = (data && data.map((exam: Exam) => exam.year)) ?? [];

  return (
    <div className="">
      <div className="title mx-auto mt-8 w-5/6">
        <h1 className="pb-1 text-[22px] leading-tight font-bold tracking-[-0.015em] text-gray-900 dark:text-white">
          Configurar Simulado
        </h1>
        <p className="text-base leading-normal font-normal text-gray-500 dark:text-[#9da6b9]">
          Escolha a prova, o ano e as configurações para começar.
        </p>
      </div>

      <div className="settings mx-auto mt-8 w-5/6 rounded-xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-[#3B4354] dark:bg-[#1C1F27]">
        <YearSelect
          data={examYears}
          yearOption={yearOption}
          setYearOption={actions.setYearOption}
        />
        <hr className="my-5" />
        <h2 className="pb-4 text-[22px] leading-tight font-bold tracking-[-0.015em] text-gray-900 dark:text-white">
          Como você prefere fazer o simulado?
        </h2>
        <div className="settings-selection grid grid-cols-1 gap-8 md:grid-cols-2">
          <FeedbackSelector
            feedbackOption={feedbackOption}
            options={Object.values(optionsFeedbackAnswers)}
            onFeedbackOptionChange={(e) => actions.setFeedbackOption(e)}
          />
          <TimerSelector
            options={Object.values(optionsTimer)}
            timerOption={timerOption}
            onTimerOptionChange={(e) => actions.setTimerOption(e)}
          />
        </div>
      </div>

      <SummaryCard
        yearOption={yearOption}
        feedbackDescription={optionsFeedbackAnswers[feedbackOption].description}
        timerDescription={optionsTimer[timerOption].description}
        onConfirm={actions.onConfirm}
      />
    </div>
  );
}
