export const optionsFeedbackAnswers = {
  immediate: {
    value: 'immediate',
    label: 'Mostrar imediatamente',
    description: 'As respostas serão mostradas imediatamente ao confirmar.',
  },
  end: {
    value: 'end',
    label: 'Mostrar ao final do simulado',
    description: 'As respostas serão mostradas ao final.',
  },
} as const;

export const optionsTimer = {
  regressive: {
    value: 'regressive',
    label: 'Contagem regressiva (tempo limite)',
    description: 'O tempo total da prova é de 5 horas e 30 minutos.',
  },
  progressive: {
    value: 'progressive',
    label: 'Contagem progressiva (marcar tempo)',
    description:
      'Você não tem tempo limite, leve quanto tempo precisar para completar.',
  },
} as const;