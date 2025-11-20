import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type FeedbackOption = {
  value: string;
  label: string;
  description: string;
};

type FeedbackSelectorProps = {
  options: FeedbackOption[];
  feedbackOption: string;
  onFeedbackOptionChange: (option: 'immediate' | 'end') => void;
};

export const FeedbackSelector = ({
  options,
  feedbackOption,
  onFeedbackOptionChange,
}: FeedbackSelectorProps) => {
  if (!options) return null;

  return (
    <div className="feedback gap-4">
      <legend className="pb-3 text-base leading-normal font-medium text-gray-800 dark:text-white">
        Feedback das respostas
      </legend>
      <RadioGroup
        value={feedbackOption}
        onValueChange={(value: 'immediate' | 'end') => onFeedbackOptionChange(value)}
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
