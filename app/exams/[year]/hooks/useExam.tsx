import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import { QuestionType } from '@/app/types';

const THREE_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 3;

const OFFSETS = [0, 50, 100, 150];
const LIMIT = 50;

type useExamProps = {
  year: string;
};

export type QuestionsAPIResponse = {
  metadata: {
    hasMore: boolean;
    limit: number;
    offset: number;
    total: number;
  };
  questions: QuestionType[];
};

export const useExam = ({ year }: useExamProps) => {
  const results = useQueries({
    queries: OFFSETS.map((offset) => ({
      queryKey: ['questions', year, offset],
      queryFn: async (): Promise<QuestionsAPIResponse> =>
        await fetch(
          `https://api.enem.dev/v1/exams/${year}/questions?limit=${LIMIT}&offset=${offset}`,
        ).then((res) => res.json()),
      staleTime: THREE_DAYS_IN_MS,
      enabled: !!year,
    })),
  }) as UseQueryResult<QuestionsAPIResponse>[];

  const isLoading = results.some((r) => r.isLoading);
  const error = results.find((r) => r.error)?.error ?? null;

  const allQuestions = useMemo(() => {
    return Array.from(
      new Map(
        results
          .flatMap((r) => r.data?.questions ?? [])
          .map((q) => [q.index, q]),
      ).values(),
    ).sort((a, b) => a.index - b.index);
  }, [results]);

  return {
    isLoading,
    error,
    allQuestions,
  };
};
