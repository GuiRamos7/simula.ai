import { Skeleton } from '@/app/components/ui/skeleton';

export const SettingsLoadingSkeleton = () => {
  /*
    Configuração Dual-Theme (Light/Dark):
    - Cores padrão (sem prefixo): Definem o Light Mode.
    - Cores com prefixo 'dark:': Sobrescrevem para o Dark Mode.
    
    1. Fundo do Container (Light: Branco, Dark: [#1C1F27])
    2. Bordas (Light: gray-200, Dark: gray-800)
    3. Elementos Skeleton (Light: gray-300, Dark: gray-700)
  */
  return (
    <div>
      {/* Título e Descrição */}
      <div className="title mx-auto mt-8 w-5/6">
        {/* Título: Light (bg-gray-300), Dark (dark:bg-gray-700) */}
        <Skeleton className="mb-2 h-8 w-3/4 bg-gray-300 dark:bg-gray-700" />
        {/* Descrição: Light (bg-gray-300), Dark (dark:bg-gray-700) */}
        <Skeleton className="h-5 w-2/3 bg-gray-300 dark:bg-gray-700" />
      </div>

      {/* Container principal de configurações */}
      <div className="settings mx-auto mt-8 w-5/6 rounded-xl 
                  border border-gray-200 dark:border-gray-800 
                  bg-white dark:bg-[#1C1F27] p-6 sm:p-8">
        
        {/* Título da Seção */}
        <Skeleton className="mb-4 h-7 w-1/2 bg-gray-300 dark:bg-gray-700" />

        {/* "Selecione o ano" (Label e Select) */}
        <Skeleton className="mb-3 h-4 w-1/4 bg-gray-300 dark:bg-gray-700" /> {/* Label */}
        <Skeleton className="h-10 w-full min-w-[280px] rounded-md bg-gray-300 dark:bg-gray-700" />{' '}
        
        {/* Linha divisória */}
        <hr className="my-5 border-gray-200 dark:border-gray-700" /> 

        {/* Título da Seção */}
        <Skeleton className="mb-4 h-7 w-2/3 bg-gray-300 dark:bg-gray-700" />

        <div className="settings-selection grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Feedback das respostas */}
          <div className="feedback gap-4">
            <Skeleton className="mb-3 h-5 w-2/3 bg-gray-300 dark:bg-gray-700" /> {/* Legend */}
            <div className="space-y-4">
              {/* Opções de Rádio */}
              <Skeleton className="h-16 w-full rounded-xl bg-gray-300 dark:bg-gray-700" />{' '}
              <Skeleton className="h-16 w-full rounded-xl bg-gray-300 dark:bg-gray-700" />{' '}
            </div>
          </div>

          {/* Cronômetro */}
          <div className="timer gap-4">
            <Skeleton className="mb-3 h-5 w-1/2 bg-gray-300 dark:bg-gray-700" /> {/* Legend */}
            <div className="space-y-4">
              {/* Opções de Rádio */}
              <Skeleton className="h-16 w-full rounded-xl bg-gray-300 dark:bg-gray-700" />{' '}
              <Skeleton className="h-16 w-full rounded-xl bg-gray-300 dark:bg-gray-700" />{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};