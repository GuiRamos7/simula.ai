import { useQuery } from '@tanstack/react-query';
import { api } from '@/app/services/api';

export function useExams() {
  return useQuery({
    queryKey: ['exams'],
    queryFn: async () => {
      const { data } = await api.get('/exams');
      return data;
    },
  });
}
