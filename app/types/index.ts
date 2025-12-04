export type Discipline = {
  label: string;
  value: string;
};

export type Language = {
  label: string;
  value: string;
};

export type Exam = {
  title: string;
  year: number;
  disciplines: Discipline[];
  languages: Language[];
};

export type ExamMode = 'end' | 'immediate';

export enum QuestionDisipline {
  'linguagens' = 'Linguagens e Código',
  'ciencias-humanas' = 'Ciências Humanas',
  'matematica' = 'Matemática',
  'ciencias-natureza' = 'Ciências da Natureza',
}

export type Alternative = {
  letter: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
  file: string | null;
  isCorrect: boolean;
};


export type QuestionType = {
  title: string;
  index: number;
  discipline: keyof typeof QuestionDisipline;
  language: string;
  year: number;
  context: string;
  files: string[];
  correctAlternative: 'A' | 'B' | 'C' | 'D' | 'E';
  alternativesIntroduction: string;
  alternatives: Alternative[];
};
