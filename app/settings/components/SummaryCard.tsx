import { Button } from '@/components/ui/button';
import { FaCircleInfo, FaRegCirclePlay } from 'react-icons/fa6';

type SummaryCardProps = {
  yearOption: string | undefined;
  feedbackDescription: string;
  timerDescription: string;
  onConfirm: () => void;
};

export const SummaryCard = ({
  yearOption,
  feedbackDescription,
  timerDescription,
  onConfirm,
}: SummaryCardProps) => {
  if (!yearOption) return null;

  return (
    <div className="border-primary/20 dark:border-primary/30 mx-auto mt-8 flex w-5/6 flex-col items-center justify-between gap-6 rounded-xl border bg-pink-400/50 p-6 md:flex-row">
      <div className="flex items-start gap-4">
        <FaCircleInfo className="min-w-[30px] self-center text-2xl text-pink-900 dark:text-white" />
        <div>
          <p className="text-base font-bold text-pink-900 dark:text-white">
            Resumo do seu simulado:
          </p>
          <p className="text-sm text-pink-900 dark:text-white">
            Você selecionou: <strong>ENEM Regular {yearOption}</strong>.{' '}
            {feedbackDescription}. {timerDescription}.
          </p>
        </div>
      </div>
      <Button variant="pink" onClick={onConfirm}>
        <FaRegCirclePlay />
        <span className="truncate">Iniciar Simulado</span>
      </Button>
    </div>
  );
};
