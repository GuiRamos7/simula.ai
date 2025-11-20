import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type YearSelectProps = {
  data: string[] | undefined;
  yearOption: string | undefined;
  setYearOption: (year: string | undefined) => void;
};

export const YearSelect = ({
  data,
  yearOption,
  setYearOption,
}: YearSelectProps) => {
  if (!data) return null;

  return (
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
            {data.map((year: string) => (
              <SelectItem value={`${year}`} key={`year-${year}`}>
                ENEM - {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
