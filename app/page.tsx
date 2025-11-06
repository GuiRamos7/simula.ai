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
    <div className='bg-red container m-auto'>
      <h1 className='my-5 text-gray-900 text-6xl p-5 text-center'>
        Simul<span className='text-fuchsia-500 italic bold'>AI</span>
      </h1>
      <p className='w-3xl m-auto text-xl'>
        Cansado de estudar para o ENEM com PDFs bagunçados e gabaritos perdidos?
        O SimulaAI é a sua solução definitiva para o treino inteligente. Nós
        pegamos todas as provas do ENEM (2015–2025) e as transformamos em um
        arsenal de questões perfeitamente estruturadas.
      </p>
      <div className='mt-10 w-3xl m-auto flex gap-2 flex-wrap'>
        {years.map((year) => (
          <Link href={`/exams/${year}`}>
            <Button className='cursor-pointer' size='xl' variant='outline'>
              Enem - Ano {year}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
