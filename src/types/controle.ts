
import type { ConfiguracaoSla } from './metricas'

export type ProcessoImportacao = {
  status: string
  referencia_cliente: string
  numero_processo: string
  responsavel: string
  planta: string
  categoria: string
  exportador: string
  modal: string

  // Datas já utilizadas na página Prontidão
  data_recebimento_pedido: string | null
  data_recebimento_proforma: string | null
  data_conferencia_proforma: string | null
  data_disponibilidade: string | null

  // Indicadores da página Indicadores
  data_recebimento_documentos?: string | null
  data_aprovacao_documentos?: string | null
  data_recebimento_draft_conhecimento?: string | null
  data_aprovacao_draft_conhecimento?: string | null
  data_atd?: string | null
  data_recebimento_conhecimento_original?: string | null
  data_protocolo_li?: string | null
  data_envio_id?: string | null
  data_emissao_li?: string | null
  data_pagamento_gru?: string | null
  data_deferimento_li?: string | null

  // Etapas de desembaraço e pós-chegada
  data_chegada_ata?: string | null
  data_presenca?: string | null
  data_registro_di?: string | null
  data_desembaraco?: string | null
  data_solicitacao_danfe?: string | null
  data_emissao_danfe?: string | null
  data_liberacao_transporte?: string | null
  data_saida_recinto?: string | null
  data_entrega_fabrica?: string | null

  // Logística e faturamento
  data_emissao_nf?: string | null
  data_faturado?: string | null

  // Gestão de containers e demurrage
  data_devolucao_container?: string | null
  data_inicio_demurrage?: string | null
  valor_demurrage_usd?: number | null
  valor_demurrage_brl?: number | null

  // Armazenagem
  data_entrada_recinto?: string | null

  // Identifica processos com ou sem LI
  possui_li?: boolean
}

export type StatusPrazo =
  | 'Dentro do Prazo'
  | 'Atenção'
  | 'Alerta'
  | 'Atraso'
  | 'Pendente'

export type ProcessoComPrazo = ProcessoImportacao & {
  horas: number
  dias: number
  farol: StatusPrazo
}

export type ColunaTabela = {
  chave: keyof ProcessoComPrazo
  titulo: string
}

export type ConfiguracaoControle = {
  titulo: string
  dataInicio: keyof ProcessoImportacao
  dataFim: keyof ProcessoImportacao
  colunas: ColunaTabela[]
  slaPorModal: ConfiguracaoSla
}
