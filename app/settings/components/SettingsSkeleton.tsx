import { Skeleton } from '@/components/ui/skeleton'; // Assumindo que você tem o componente Skeleton do Shadcn UI

export const SettingsLoadingSkeleton = () => {
  return (
    <div>
      <div className="title mx-auto mt-8 w-5/6">
        <Skeleton className="mb-2 h-8 w-3/4 bg-gray-700" /> {/* Título */}
        <Skeleton className="h-5 w-2/3 bg-gray-700" /> {/* Descrição */}
      </div>
      <div className="settings mx-auto mt-8 w-5/6 rounded-xl border border-gray-800 bg-[#1C1F27] p-6 sm:p-8">
        <Skeleton className="mb-4 h-7 w-1/2 bg-gray-700" />
        <Skeleton className="mb-3 h-4 w-1/4 bg-gray-700" /> {/* Label */}
        <Skeleton className="h-10 w-full min-w-[280px] rounded-md bg-gray-700" />{' '}
        <hr className="my-5 border-gray-700" /> {/* Linha divisória */}
        <Skeleton className="mb-4 h-7 w-2/3 bg-gray-700" />
        <div className="settings-selection grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="feedback gap-4">
            <Skeleton className="mb-3 h-5 w-2/3 bg-gray-700" /> {/* Legend */}
            <div className="space-y-4">
              <Skeleton className="h-16 w-full rounded-xl bg-gray-700" />{' '}
              <Skeleton className="h-16 w-full rounded-xl bg-gray-700" />{' '}
            </div>
          </div>
          <div className="timer gap-4">
            <Skeleton className="mb-3 h-5 w-1/2 bg-gray-700" /> {/* Legend */}
            <div className="space-y-4">
              <Skeleton className="h-16 w-full rounded-xl bg-gray-700" />{' '}
              <Skeleton className="h-16 w-full rounded-xl bg-gray-700" />{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
