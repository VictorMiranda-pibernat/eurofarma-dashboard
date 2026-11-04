import type {
  ConfiguracaoMetrica,
  Modal,
  FaixasSlaHoras,
  ConfiguracaoSla,
  CalendarioOperacional,
  UnidadePrazo,
} from '../types/metricas'

// Cria as faixas de classificação de cada indicador.
const criarFaixas = (
  verde: number,
  atencao: number,
): FaixasSlaHoras => ({
  verdeAteHoras: verde,
  atencaoAteHoras: atencao,
  alertaAteHoras: atencao,
})

// Monta os SLAs separados por modal.
const criarSla = (
  aereo: FaixasSlaHoras,
  maritimo: FaixasSlaHoras,
  rodoviario: FaixasSlaHoras,
): ConfiguracaoSla => ({
  Aéreo: aereo,
  Marítimo: maritimo,
  Rodoviário: rodoviario,
})

// Todos os prazos desta página são corridos.
const calendarioCorridos: CalendarioOperacional = {
  nome: 'Dias corridos',
  diasConsiderados: [0, 1, 2, 3, 4, 5, 6],
  feriados: [],
}

const calendariosCorridos: Record<Modal, CalendarioOperacional> = {
  Aéreo: calendarioCorridos,
  Marítimo: calendarioCorridos,
  Rodoviário: calendarioCorridos,
}

const unidadeCorrida: UnidadePrazo = 'dias corridos'

const unidadesCorridas: Record<Modal, UnidadePrazo> = {
  Aéreo: unidadeCorrida,
  Marítimo: unidadeCorrida,
  Rodoviário: unidadeCorrida,
}

export const mockArmazenagemLeadTimeMetricas: ConfiguracaoMetrica[] = [
  {
    id: 1,
    titulo: 'VENCIMENTO DE ARMAZENAGEM',

    dataInicio: 'data_entrada_recinto',
    dataFim: 'data_saida_recinto',

    slaPorModal: criarSla(
      criarFaixas(57.6, 72),   // Aéreo: 2,4 a 3 dias
      criarFaixas(192, 240),   // Marítimo: 8 a 10 dias
      criarFaixas(96, 120),    // Rodoviário: 4 a 5 dias
    ),

    calendarioPorModal: calendariosCorridos,
    unidadePrazoPorModal : unidadesCorridas,

    ofensor: '-',
    divisao: '-',
    auditoria: '-',
    grafico: 'BARRA',
    origemSla: 'Sugerido',

    justificativa:
      'Prazo de armazenagem gratuita em terminais: aéreo de 2 a 3 dias, marítimo aproximadamente 10 dias e rodoviário 5 dias. Varia conforme o recinto e deve ser confirmado com cada terminal.',

    descricaoInicio:
      'Entrada da carga no recinto alfandegado (início da contagem de armazenagem).',

    descricaoFim:
      'Saída da carga do recinto (fim do período de armazenagem).',

    observacao:
      'Referência adicional: marítimo 360 horas (15 dias corridos). Aéreo e rodoviário: N/A.',
  },

  {
    id: 2,
    titulo: 'LEAD TIME DO PRODUTO',

    dataInicio: 'data_atd',
    dataFim: 'data_entrega_fabrica',

    slaPorModal: criarSla(
      criarFaixas(268.8, 336),  // Aéreo: 11,2 a 14 dias
      criarFaixas(576, 720),    // Marítimo: 24 a 30 dias
      criarFaixas(268.8, 336),  // Rodoviário: 11,2 a 14 dias
    ),

    calendarioPorModal: calendariosCorridos,
    unidadePrazoPorModal : unidadesCorridas,

    ofensor: '-',
    divisao: '-',
    auditoria: '-',
    grafico: 'BARRA',
    origemSla: 'Sugerido',

    justificativa:
      'Lead time total de importação de fármacos: via aérea aproximadamente 2 semanas, via marítima aproximadamente 1 mês e via rodoviária aproximadamente 2 semanas. Inclui emissão de LI e anuência ANVISA. Calibrar com o histórico real das operações.',

    descricaoInicio:
      'Embarque registrado (ATD), início da contagem do lead time.',

    descricaoFim:
      'Entrega na fábrica registrada (fim do lead time).',

    observacao:
      'Referências adicionais: aéreo 720 horas (30 dias), marítimo 2160 horas (90 dias) e rodoviário 1080 horas (45 dias).',
  },
]