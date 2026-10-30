export type ProcessoImportacao = {
  status: string
  referencia_cliente: string
  numero_processo: string
  responsavel: string
  planta: string
  categoria: string
  exportador: string
  modal: string
  data_recebimento_pedido: string | null
  data_recebimento_proforma: string | null
  data_conferencia_proforma: string | null
}

export type StatusPrazo =
  | 'Dentro do Prazo'
  | 'Atenção'
  | 'Alerta'
  | 'Atraso'
  | 'Pendente'

export type ProcessoComPrazo = ProcessoImportacao & {
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
}