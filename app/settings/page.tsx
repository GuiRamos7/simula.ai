'use client';

import { useExams } from '@/app/hooks/useExams';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FaCircleInfo, FaRegCirclePlay } from 'react-icons/fa6';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Exam } from '../types';

const optionsFeedbackAnswers = {
  immediate: {
    value: 'immediate',
    label: 'Mostrar imediatamente',
    description: 'As respostas serão mostradas imediatamente ao confirmar.',
  },
  end: {
    value: 'end',
    label: 'Mostrar ao final do simulado',
    description: 'As respostas serão mostradas ao final.',
  },
};

const optionsTimer = {
  regressive: {
    value: 'regressive',
    label: 'Contagem regressiva (tempo limite)',
    description: 'O tempo total da prova é de 5 horas e 30 minutos.',
  },
  progressive: {
    value: 'progressive',
    label: 'Contagem progressiva (marcar tempo)',
    description:
      'Você não tem tempo limite, leve quanto tempo precisar para completar.',
  },
};

type FeedbackOption = keyof typeof optionsFeedbackAnswers;
type TimerOption = keyof typeof optionsTimer;

export default function Settings() {
  const { data, isLoading, isError } = useExams();
  const [yearOption, setYearOption] = useState<string | undefined>();

  const [feedbackOption, setFeedbackOption] =
    useState<FeedbackOption>('immediate');
  const [timerOption, setTimerOption] = useState<TimerOption>('regressive');

  if (isLoading) return <p>Carregando provas...</p>;
  if (isError) return <p>Erro ao carregar provas.</p>;

  const renderOptionsForFeedbackAnswers = () => {
    return Object.values(optionsFeedbackAnswers).map((opt) => (
      <label
        key={opt.value}
        htmlFor={opt.value}
        className="flex cursor-pointer items-center gap-3 rounded-xl border border-pink-500/40 p-4 transition-all data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500/10"
      >
        <RadioGroupItem id={opt.value} value={opt.value} />
        <span className="text-sm font-medium">{opt.label}</span>
      </label>
    ));
  };

  const renderOptionsForTimer = () => {
    return Object.values(optionsTimer).map((opt) => (
      <label
        key={opt.value}
        htmlFor={opt.value}
        className="flex cursor-pointer items-center gap-3 rounded-xl border border-pink-500/40 p-4 transition-all data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500/10"
      >
        <RadioGroupItem id={opt.value} value={opt.value} />
        <span className="text-sm font-medium">{opt.label}</span>
      </label>
    ));
  };

  return (
    <div>
      <div className="title mx-auto mt-8 w-5/6">
        <h1 className="pb-1 text-[22px] leading-tight font-bold tracking-[-0.015em] text-gray-900 dark:text-white">
          Configurar Simulado
        </h1>
        <p className="text-base leading-normal font-normal text-gray-500 dark:text-[#9da6b9]">
          Escolha a prova, o ano e as configurações para começar.
        </p>
      </div>

      <div className="settings mx-auto mt-8 w-5/6 rounded-xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-[#3B4354] dark:bg-[#1C1F27]">
        <div className="year-selection">
          <h2 className="pb-4 text-[22px] leading-tight font-bold tracking-[-0.015em] text-gray-900 dark:text-white">
            Escolha sua prova
          </h2>

          <label className="text-sm font-medium">Selecione o ano</label>
          <Select value={yearOption} onValueChange={setYearOption}>
            <SelectTrigger className="mt-3 w-full min-w-[280px]">
              <SelectValue placeholder="Selecione o ano" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <SelectGroup>
                {data.map((exam: Exam) => (
                  <SelectItem value={`${exam.year}`} key={`ano-${exam.year}`}>
                    ENEM - {exam.year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <hr className="my-5" />
        <h2 className="pb-4 text-[22px] leading-tight font-bold tracking-[-0.015em] text-gray-900 dark:text-white">
          Como você prefere fazer o simulado?
        </h2>
        <div className="settings-selection grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* ### Feedback */}
          <div className="feedback gap-4">
            <legend className="pb-3 text-base leading-normal font-medium text-gray-800 dark:text-white">
              Feedback das respostas
            </legend>
            <RadioGroup
              value={feedbackOption}
              onValueChange={(value: 'immediate' | 'end') =>
                setFeedbackOption(value)
              }
            >
              {renderOptionsForFeedbackAnswers()}
            </RadioGroup>
          </div>
          {/* ### Timer */}
          <div className="timer gap-4">
            <legend className="pb-3 text-base leading-normal font-medium text-gray-800 dark:text-white">
              Cronômetro
            </legend>
            <RadioGroup
              value={timerOption}
              onValueChange={(value: 'regressive' | 'progressive') =>
                setTimerOption(value)
              }
            >
              {renderOptionsForTimer()}
            </RadioGroup>
          </div>
        </div>
      </div>

      {yearOption && (
        <div className="border-primary/20 dark:border-primary/30 mx-auto mt-8 flex w-5/6 flex-col items-center justify-between gap-6 rounded-xl border bg-pink-400/50 p-6 md:flex-row">
          <div className="flex items-start gap-4">
            <FaCircleInfo className="text-pink-900 dark:text-white" />
            <div>
              <p className="text-base font-bold text-pink-900 dark:text-white">
                Resumo do seu simulado:
              </p>
              <p className="text-sm text-pink-900 dark:text-white">
                Você selecionou: <strong>ENEM Regular {yearOption}</strong>.{' '}
                {optionsFeedbackAnswers[feedbackOption].description}.{' '}
                {optionsTimer[timerOption].description}.
              </p>
            </div>
          </div>
          <Button variant="pink">
            <FaRegCirclePlay />
            <span className="truncate">Iniciar Simulado</span>
          </Button>
        </div>
      )}
    </div>
  );
}
