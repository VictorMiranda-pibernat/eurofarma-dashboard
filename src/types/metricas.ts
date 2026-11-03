
import type { ProcessoImportacao } from './controle'

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

export const calendarioPadrao: CalendarioOperacional = {
  nome: 'Segunda a sexta - 24 horas por dia',
  diasConsiderados: [1, 2, 3, 4, 5],
  feriados: [],
}

export const calendarioCorridos: CalendarioOperacional = {
  nome: 'Todos os dias - calendário corrido',
  diasConsiderados: [0, 1, 2, 3, 4, 5, 6],
  feriados: [],
}

export type UnidadePrazo = 'dias úteis' | 'dias corridos'

export type ConfiguracaoMetrica = {
  id: number
  titulo: string
  dataInicio: keyof ProcessoImportacao
  dataFim: keyof ProcessoImportacao
  slaPorModal: ConfiguracaoSla
  calendarioPorModal: Record<Modal, CalendarioOperacional>
  unidadePrazoPorModal: Record<Modal, UnidadePrazo>
  ofensor: string
  divisao: string
  auditoria: string
  grafico: string
  origemSla: string
  justificativa: string
  descricaoInicio: string
  descricaoFim: string
  observacao: string
}
