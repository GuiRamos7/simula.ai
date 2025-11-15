'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <main className="mx-auto mt-8 w-5/6 sm:mt-12 md:mt-20 lg:mt-40">
        <h1 className="text-foreground block text-center text-4xl font-bold sm:pt-9 sm:text-5xl md:pt-6 md:text-6xl lg:text-7xl">
          Domine o ENEM. <br /> Pratique com provas reais.
        </h1>
        <p className="m-auto mt-10 text-center text-2xl md:w-full lg:w-5xl">
          Nossa plataforma oferece uma experiência de simulação completa com
          exames anteriores do ENEM. Prepare-se no seu ritmo, identifique seus
          pontos fracos e chegue mais perto da aprovação.
        </p>
        <Link href="/settings">
          <Button className="mx-auto my-10 flex h-12 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-pink-500 px-6 text-base font-bold text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105 hover:bg-pink-600 hover:shadow-xl hover:shadow-pink-500/40 focus:ring-4 focus:ring-pink-500/50 focus:outline-none">
            Começar agora grátis
          </Button>
        </Link>
      </main>
    </div>
  );
}
