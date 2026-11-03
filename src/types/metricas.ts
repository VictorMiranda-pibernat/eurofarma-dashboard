export type Modal = 'Aéreo' | 'Marítimo' | 'Rodoviário'

export type FaixasSlaHoras = {
  verdeAteHoras: number
  atencaoAteHoras: number
  alertaAteHoras: number
}

export type ConfiguracaoSla = Record<Modal, FaixasSlaHoras>

export type CalendarioOperacional = {
  nome: string
  diasConsiderados: number[]
  feriados: string[]
}

// 0 = domingo, 1 = segunda, ... 6 = sábado
export const calendarioPadrao: CalendarioOperacional = {
  nome: 'Segunda a sexta - 24 horas por dia',
  diasConsiderados: [1, 2, 3, 4, 5],
  feriados: [],
}