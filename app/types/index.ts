export type Discipline = {
  label: string
  value: string
}

export type Language = {
  label: string
  value: string
}

export type Exam = {
  title: string
  year: number
  disciplines: Discipline[]
  languages: Language[]
}
