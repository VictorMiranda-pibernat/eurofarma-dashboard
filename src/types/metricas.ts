export type Modal = 'Aéreo' | 'Marítimo' | 'Rodoviário'

export type FaixasSlaHoras = {
  verdeAteHoras: number
  atencaoAteHoras: number
  alertaAteHoras: number
}

export type ConfiguracaoSla = Record<Modal, FaixasSlaHoras>