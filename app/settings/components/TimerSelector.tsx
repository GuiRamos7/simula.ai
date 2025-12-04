import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { optionsTimer } from '../helper/optionsFeedbackAnswers';

export type TimerOptionKey = keyof typeof optionsTimer;

type TimerOption = {
  value: string;
  label: string;
  description: string;
};

type TimerSelectorProps = {
  options: TimerOption[];
  timerOption: string;
  onTimerOptionChange: (option: TimerOptionKey) => void;
};

export const TimerSelector = ({
  options,
  timerOption,
  onTimerOptionChange,
}: TimerSelectorProps) => {
  if (!options) return null;

  return (
    <div className="timer gap-4">
      <legend className="pb-3 text-base leading-normal font-medium text-gray-800 dark:text-white">
        Cronômetro
      </legend>
      <RadioGroup
        value={timerOption}
        onValueChange={(value: TimerOptionKey) =>
          onTimerOptionChange(value)
        }
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            htmlFor={opt.value}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-pink-500/40 p-4 transition-all data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500/10"
          >
            <RadioGroupItem id={opt.value} value={opt.value} />
            <span className="text-sm font-medium">{opt.label}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};
