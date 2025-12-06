import ConclusionClient from './ConclusionClient';

export default function Page({ searchParams }: any) {
  const { key, year } = searchParams;

  return <ConclusionClient key={key} year={year} />;
}
