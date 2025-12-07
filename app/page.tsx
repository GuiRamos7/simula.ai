'use client';

import { Button } from '@/app/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <main className="mx-auto mt-8 w-5/6 sm:mt-12 md:mt-20 lg:mt-40">
        <h1 className="text-foreground block flex flex-col items-center text-center text-4xl font-bold sm:pt-9 sm:text-5xl md:pt-6 md:text-6xl lg:text-7xl">
          Domine o ENEM. <br /> Pratique com provas reais.
        </h1>
        <p className="m-auto mt-10 text-center text-2xl md:w-full lg:w-5xl">
          Nossa plataforma oferece uma experiência de simulação completa com
          exames anteriores do ENEM. Prepare-se no seu ritmo, identifique seus
          pontos fracos e chegue mais perto da aprovação.
        </p>
          <Link href="/settings">
            <Button
              variant="pink"
              className="focus:ring-primary/50 mt-8 flex h-12 w-full max-w-[300px] min-w-[84px] cursor-pointer text-base font-bold"
            >
              Comece agora grátis
            </Button>
          </Link>
      </main>
    </div>
  );
}
