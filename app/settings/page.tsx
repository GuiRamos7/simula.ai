'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Settings() {
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
        </ul>
      </header>
     
    </div>
  );
}
