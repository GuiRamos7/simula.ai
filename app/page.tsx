'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const years = [
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
  ];

  return (
    <div className='w-screen h-screen '>
      <header className='p-1 border-b-2 md:w-full border-input w-container lg:w-5/6 m-auto flex justify-between items-center'>
        <h1 className='text-3xl bold'>
          Simula<span className='italic text-pink-500 ai bold text-5xl'>.ai</span>
        </h1>
        <ul className='h-fit flex gap-3'>
          <li>
            <Link  className='text-base' href='/'>Sobre</Link>
          </li>
          <li>
            <Link  className='text-base' href='/'>Contato</Link>
          </li>
        </ul>
      </header>
    </div>
  );
}
