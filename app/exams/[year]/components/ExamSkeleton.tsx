import { Skeleton } from '@/app/components/ui/skeleton';

export const ExamSkeleton = () => {
  return (
    <div className="min-h-screen">
      <div className="m-auto flex w-full max-w-7xl flex-col gap-10 p-5 pt-8 lg:flex-row">
        <div className="question-header flex-3 basis-3/5">
          <Skeleton className="mb-10 h-8 w-11/12 bg-gray-300 dark:bg-gray-700" />
          <div className="context flex flex-col items-start text-base">
            <div className="mb-8 w-full max-w-[500px] self-center">
              <Skeleton className="h-80 w-full rounded-lg bg-gray-400 dark:bg-gray-600" />
            </div>
            <div className="mt-4 w-full space-y-4">
              <Skeleton className="h-4 w-full bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-4 w-11/12 bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-4 w-full bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700" />
            </div>
            <Skeleton className="mt-6 h-5 w-3/4 bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>
        <div className="question-answer flex flex-2 basis-2/5 flex-col gap-4 border-t border-l border-gray-200 p-5 lg:border-t-0 dark:border-gray-700">
          <Skeleton className="mb-2 h-6 w-1/2 bg-gray-300 dark:bg-gray-700" />
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-12 w-full rounded-md bg-gray-300 dark:bg-gray-700"
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full border-t border-gray-300 bg-gray-100 p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <div className="m-auto flex max-w-7xl items-center justify-between px-5">
          <Skeleton className="h-10 w-24 rounded-md bg-gray-300 dark:bg-gray-700" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-gray-700" />
            <Skeleton className="h-8 w-16 rounded-md bg-gray-300 dark:bg-gray-700" />
            <Skeleton className="h-4 w-10 bg-gray-300 dark:bg-gray-700" />
          </div>

          <Skeleton className="h-10 w-24 rounded-md bg-indigo-500 dark:bg-indigo-700" />
        </div>
      </div>
    </div>
  );
};
