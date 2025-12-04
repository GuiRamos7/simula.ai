import { useQuery } from '@tanstack/react-query';
import { api } from '@/app/services/api';

// List all exams available 
export function useExamsList() {
  return useQuery({
    queryKey: ['exams'],
    queryFn: async () => {
      const { data } = await api.get('/exams');
      return data;
    },
  });
}
