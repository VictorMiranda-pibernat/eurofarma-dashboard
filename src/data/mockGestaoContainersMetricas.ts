
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

const criarFaixas = (
  verde: number,
  atencao: number,
): FaixasSlaHoras => ({
  verdeAteHoras: verde,
  atencaoAteHoras: atencao,
  alertaAteHoras: atencao,
})

const criarSla = (
  aereo: FaixasSlaHoras,
  maritimo: FaixasSlaHoras,
  rodoviario: FaixasSlaHoras,
): ConfiguracaoSla => ({
  Aéreo: aereo,
  Marítimo: maritimo,
  Rodoviário: rodoviario,
})

const criarCalendarios = (
  aereo: CalendarioOperacional,
  maritimo: CalendarioOperacional,
  rodoviario: CalendarioOperacional,
) => ({
  Aéreo: aereo,
  Marítimo: maritimo,
  Rodoviário: rodoviario,
})

const criarUnidades = (
  aereo: UnidadePrazo,
  maritimo: UnidadePrazo,
  rodoviario: UnidadePrazo,
) => ({
  Aéreo: aereo,
  Marítimo: maritimo,
  Rodoviário: rodoviario,
})

const calendariosCorridos = criarCalendarios(
  calendarioCorridos,
  calendarioCorridos,
  calendarioCorridos,
)

const unidadesCorridas = criarUnidades(
  'dias corridos',
  'dias corridos',
  'dias corridos',
)

const calendariosUteis = criarCalendarios(
  calendarioPadrao,
  calendarioPadrao,
  calendarioPadrao,
)

const unidadesUteis = criarUnidades(
  'dias úteis',
  'dias úteis',
  'dias úteis',
)

const naoAplicavel = criarFaixas(0, 0)

export const mockGestaoContainersMetricas: ConfiguracaoMetrica[] = [
  // 1. ENTREGA NA FÁBRICA X DEVOLUÇÃO DO CONTAINER
  {
    id: 1,
    titulo: 'ENTREGA NA FÁBRICA X DEVOLUÇÃO DO CONTAINER',
    dataInicio: 'data_entrega_fabrica',
    dataFim: 'data_devolucao_container',

    slaPorModal: criarSla(
      naoAplicavel,
      criarFaixas(19.2, 24),
      naoAplicavel,
    ),

    calendarioPorModal: calendariosUteis,
    unidadePrazoPorModal: unidadesUteis,

    ofensor: 'TRANSPORTADOR',
    divisao: 'GER - PÓS',
    auditoria: 'Ok',
    grafico: 'BARRA',
    origemSla: 'Original',

    justificativa: 'Acompanhar o prazo de devolução do container após a entrega na fábrica.',
    descricaoInicio: 'Data de entrega na fábrica.',
    descricaoFim: 'Data de devolução do container (DDA no EADI).',
    observacao: 'Aplicável somente ao modal marítimo. SLA de 24 horas, equivalente a 1 dia útil.',
  },

  // 2. FAROL DE DEMURRAGE - DIAS
  {
    id: 2,
    titulo: 'FAROL DE DEMURRAGE - DIAS',
    dataInicio: 'data_inicio_demurrage',
    dataFim: 'data_devolucao_container',

    slaPorModal: criarSla(
      naoAplicavel,
      criarFaixas(134.4, 168),
      criarFaixas(38.4, 48),
    ),

    calendarioPorModal: calendariosCorridos,
    unidadePrazoPorModal: unidadesCorridas,

    ofensor: 'TRANSPORTADOR',
    divisao: 'GER - PÓS',
    auditoria: '-',
    grafico: 'BARRA',
    origemSla: 'Sugerido',

    justificativa: 'Monitorar os dias de cobrança de demurrage até a devolução do container.',
    descricaoInicio: 'Data de início da cobrança de demurrage.',
    descricaoFim: 'Data de devolução do container.',
    observacao: 'Marítimo: referência de 21 dias corridos; verde até 5,6 dias, amarelo até 7 dias e vermelho acima de 7 dias. Rodoviário: referência de 2 dias corridos; verde até 1,6 dia, amarelo até 2 dias e vermelho acima de 2 dias. Aéreo não aplicável.',
  },
]
