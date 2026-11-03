
import type {
  ConfiguracaoMetrica,
  FaixasSlaHoras,
  ConfiguracaoSla,
  CalendarioOperacional,
  UnidadePrazo,
} from '../types/metricas'

import {
  calendarioPadrao,
  calendarioCorridos,
} from '../types/metricas'

// Cria as faixas do farol
const criarFaixas = (
  verde: number,
  atencao: number
): FaixasSlaHoras => ({
  verdeAteHoras: verde,
  atencaoAteHoras: atencao,
  alertaAteHoras: atencao,
})

// Cria o SLA para cada modal
const criarSla = (
  aereo: FaixasSlaHoras,
  maritimo: FaixasSlaHoras,
  rodoviario: FaixasSlaHoras
): ConfiguracaoSla => ({
  Aéreo: aereo,
  Marítimo: maritimo,
  Rodoviário: rodoviario,
})

// Define o calendário por modal
const criarCalendarios = (
  aereo: CalendarioOperacional,
  maritimo: CalendarioOperacional,
  rodoviario: CalendarioOperacional
) => ({
  Aéreo: aereo,
  Marítimo: maritimo,
  Rodoviário: rodoviario,
})

// Define a unidade de prazo por modal
const criarUnidades = (
  aereo: UnidadePrazo,
  maritimo: UnidadePrazo,
  rodoviario: UnidadePrazo
) => ({
  Aéreo: aereo,
  Marítimo: maritimo,
  Rodoviário: rodoviario,
})

// Atalho para configurar os três modais
const corridos = criarCalendarios(
  calendarioCorridos,
  calendarioCorridos,
  calendarioCorridos
)

const uteis = criarCalendarios(
  calendarioPadrao,
  calendarioPadrao,
  calendarioPadrao
)

const unidadesCorridas = criarUnidades(
  'dias corridos',
  'dias corridos',
  'dias corridos'
)

const unidadesUteis = criarUnidades(
  'dias úteis',
  'dias úteis',
  'dias úteis'
)

export const mockLogisticaMetricas: ConfiguracaoMetrica[] = [

  // 1. EMBARQUE X CHEGADA
  {
    id: 1,
    titulo: 'EMBARQUE X CHEGADA (ROTA)',
    dataInicio: 'data_atd',
    dataFim: 'data_chegada_ata',

    slaPorModal: criarSla(
      criarFaixas(76.8, 96),
      criarFaixas(576, 720),
      criarFaixas(134.4, 168)
    ),

    calendarioPorModal: corridos,
    unidadePrazoPorModal: unidadesCorridas,

    ofensor: 'AGENTE',
    divisao: 'GER - LOGÍSTICA',
    auditoria: '-',
    grafico: 'BARRA',
    origemSla: 'Sugerido',

    justificativa: 'Tempo de trânsito internacional conforme modal e rota.',
    descricaoInicio: 'Data efetiva de embarque (ATD).',
    descricaoFim: 'Data efetiva de chegada (ATA).',
    observacao: 'Os prazos devem ser avaliados conforme a rota de transporte.',
  },

  // 2. CHEGADA X ENTREGA NA FÁBRICA - SEM LI
  {
    id: 2,
    titulo: 'CHEGADA X ENTREGA NA FÁBRICA (SEM LI)',
    dataInicio: 'data_chegada_ata',
    dataFim: 'data_entrega_fabrica',

    slaPorModal: criarSla(
      criarFaixas(134.4, 168),
      criarFaixas(192, 240),
      criarFaixas(134.4, 168)
    ),

    calendarioPorModal: uteis,
    unidadePrazoPorModal: unidadesUteis,

    ofensor: 'PIBERNAT / TRANSPORTADOR',
    divisao: 'GER - PÓS',
    auditoria: '-',
    grafico: 'BARRA',
    origemSla: 'Original',

    justificativa: 'Prazo entre a chegada da carga e a entrega na fábrica sem LI.',
    descricaoInicio: 'Data de chegada da carga (ATA).',
    descricaoFim: 'Data de entrega na fábrica.',
    observacao: 'SLA: aéreo 7 dias úteis, marítimo 10 dias úteis e rodoviário 7 dias úteis.',
  },

  // 3. CHEGADA X ENTREGA NA FÁBRICA - COM LI
  {
    id: 3,
    titulo: 'CHEGADA X ENTREGA NA FÁBRICA (COM LI)',
    dataInicio: 'data_chegada_ata',
    dataFim: 'data_entrega_fabrica',

    slaPorModal: criarSla(
      criarFaixas(249.6, 312),
      criarFaixas(230.4, 288),
      criarFaixas(249.6, 312)
    ),

    calendarioPorModal: uteis,
    unidadePrazoPorModal: unidadesUteis,

    ofensor: 'PIBERNAT / TRANSPORTADOR',
    divisao: 'GER - PÓS',
    auditoria: '-',
    grafico: 'BARRA',
    origemSla: 'Original',

    justificativa: 'Prazo entre a chegada da carga e a entrega na fábrica com LI.',
    descricaoInicio: 'Data de chegada da carga (ATA).',
    descricaoFim: 'Data de entrega na fábrica.',
    observacao: 'SLA: aéreo 13 dias úteis, marítimo 12 dias úteis e rodoviário 13 dias úteis.',
  },

  // 4. EMBARQUE X ENTREGA NA FÁBRICA - SEM LI
  {
    id: 4,
    titulo: 'EMBARQUE X ENTREGA NA FÁBRICA (SEM LI / ROTA)',
    dataInicio: 'data_atd',
    dataFim: 'data_entrega_fabrica',

    slaPorModal: criarSla(
      criarFaixas(230.4, 288),
      criarFaixas(864, 1080),
      criarFaixas(268.8, 336)
    ),

    calendarioPorModal: corridos,
    unidadePrazoPorModal: unidadesCorridas,

    ofensor: 'DIVERSOS',
    divisao: 'GER - LOGÍSTICA',
    auditoria: '-',
    grafico: 'BARRA',
    origemSla: 'Sugerido',

    justificativa: 'Tempo total entre embarque e entrega na fábrica sem LI.',
    descricaoInicio: 'Data efetiva de embarque (ATD).',
    descricaoFim: 'Data de entrega na fábrica.',
    observacao: 'SLA total sugerido considerando trânsito internacional e etapa pós-chegada.',
  },

  // 5. EMBARQUE X ENTREGA NA FÁBRICA - COM LI
  {
    id: 5,
    titulo: 'EMBARQUE X ENTREGA NA FÁBRICA (COM LI / ROTA)',
    dataInicio: 'data_atd',
    dataFim: 'data_entrega_fabrica',

    slaPorModal: criarSla(
      criarFaixas(345.6, 432),
      criarFaixas(902.4, 1128),
      criarFaixas(384, 480)
    ),

    calendarioPorModal: corridos,
    unidadePrazoPorModal: unidadesCorridas,

    ofensor: 'DIVERSOS',
    divisao: 'GER - LOGÍSTICA',
    auditoria: '-',
    grafico: 'BARRA',
    origemSla: 'Sugerido',

    justificativa: 'Tempo total entre embarque e entrega na fábrica com LI.',
    descricaoInicio: 'Data efetiva de embarque (ATD).',
    descricaoFim: 'Data de entrega na fábrica.',
    observacao: 'SLA total sugerido considerando trânsito internacional e etapa pós-chegada com LI.',
  },

  // 6. EMISSÃO DA NF X FATURAMENTO
  {
    id: 6,
    titulo: 'EMISSÃO DA NF X FATURAMENTO',
    dataInicio: 'data_emissao_nf',
    dataFim: 'data_faturado',

    slaPorModal: criarSla(
      criarFaixas(192, 240),
      criarFaixas(192, 240),
      criarFaixas(192, 240)
    ),

    calendarioPorModal: corridos,
    unidadePrazoPorModal: unidadesCorridas,

    ofensor: 'PIBERNAT',
    divisao: 'GER - PÓS',
    auditoria: '-',
    grafico: 'BARRA',
    origemSla: 'Original',

    justificativa: 'Acompanhar o prazo entre emissão da NF e faturamento.',
    descricaoInicio: 'Data de emissão da nota fiscal.',
    descricaoFim: 'Data em que o processo foi faturado.',
    observacao: 'SLA de 10 dias corridos. Verde até 8 dias, amarelo acima de 8 até 10 dias e vermelho acima de 10 dias.',
  },
]
