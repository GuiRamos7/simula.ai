'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <header className="border-input w-container m-auto flex items-center justify-between border-b-2 p-1 md:w-full lg:w-5/6">
        <h1 className="bold text-3xl">
          Simula
          <span className="ai bold text-5xl text-pink-500 italic">.ai</span>
        </h1>
        <ul className="flex h-fit gap-3">
          <li>
            <Link className="text-base" href="/">
              Sobre
            </Link>
          </li>
          <li>
            <Link className="text-base" href="/">
              Contato
            </Link>
          </li>
          <li>
            <Switch />
          </li>
        </ul>
      </header>

      <main className="m-auto w-5/6 lg:mt-[200px]">
        <h1 className="text-foreground text-center text-7xl font-bold">
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
