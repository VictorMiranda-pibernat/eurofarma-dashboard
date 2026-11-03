import {
  calendarioPadrao,
  calendarioCorridos,
  type ConfiguracaoMetrica,
  type ConfiguracaoSla,
  type Modal,
  type CalendarioOperacional,
  type UnidadePrazo,
} from '../types/metricas'

// Verde até o limite verde.
// Amarelo até o SLA.
// Acima do SLA: vermelho.
// O limite laranja fica igual ao SLA para não criar uma faixa laranja.
function criarFaixas(
  verde: number,
  sla: number,
) {
  return {
    verdeAteHoras: verde,
    atencaoAteHoras: sla,
    alertaAteHoras: sla,
  }
}

function criarSla(
  aereo: [number, number],
  maritimo: [number, number],
  rodoviario: [number, number],
): ConfiguracaoSla {
  return {
    'Aéreo': criarFaixas(...aereo),
    'Marítimo': criarFaixas(...maritimo),
    'Rodoviário': criarFaixas(...rodoviario),
  }
}

function criarCalendarios(
  aereo: CalendarioOperacional,
  maritimo: CalendarioOperacional,
  rodoviario: CalendarioOperacional,
): Record<Modal, CalendarioOperacional> {
  return {
    'Aéreo': aereo,
    'Marítimo': maritimo,
    'Rodoviário': rodoviario,
  }
}

function criarUnidades(
  aereo: UnidadePrazo,
  maritimo: UnidadePrazo,
  rodoviario: UnidadePrazo,
): Record<Modal, UnidadePrazo> {
  return {
    'Aéreo': aereo,
    'Marítimo': maritimo,
    'Rodoviário': rodoviario,
  }
}

export const mockMetricas: ConfiguracaoMetrica[] = [
  {
    id: 1,
    titulo: 'RECEBIMENTOS DOCUMENTOS X APROVAÇÃO',

    dataInicio: 'data_recebimento_documentos',
    dataFim: 'data_aprovacao_documentos',

    slaPorModal: criarSla(
      [19.2, 24],
      [38.4, 48],
      [19.2, 24],
    ),

    calendarioPorModal: criarCalendarios(
      calendarioPadrao,
      calendarioPadrao,
      calendarioPadrao,
    ),

    unidadePrazoPorModal: criarUnidades(
      'dias úteis',
      'dias úteis',
      'dias úteis',
    ),

    ofensor: 'PIBERNAT',
    divisao: 'GER - PRÉ',
    auditoria: 'Ok',
    grafico: 'BARRA',
    origemSla: 'Original',

    justificativa:
      'Recebimento dos documentos (draft/originais) registrado.',

    descricaoInicio:
      'Recebimento dos documentos (draft/originais) registrado.',

    descricaoFim:
      'Aprovação dos documentos pelo PIBERNAT registrada.',

    observacao: '',
  },

  {
    id: 2,
    titulo: 'RECEBIMENTO DRAFT CONHECIMENTO X APROVAÇÃO',

    dataInicio: 'data_recebimento_draft_conhecimento',
    dataFim: 'data_aprovacao_draft_conhecimento',

    slaPorModal: criarSla(
      [19.2, 24],
      [38.4, 48],
      [19.2, 24],
    ),

    calendarioPorModal: criarCalendarios(
      calendarioPadrao,
      calendarioPadrao,
      calendarioPadrao,
    ),

    unidadePrazoPorModal: criarUnidades(
      'dias úteis',
      'dias úteis',
      'dias úteis',
    ),

    ofensor: 'PIBERNAT',
    divisao: 'GER - PRÉ',
    auditoria: 'Ok',
    grafico: 'BARRA',
    origemSla: 'Original',

    justificativa: '',

    descricaoInicio:
      'Recebimento do draft do conhecimento registrado.',

    descricaoFim:
      'Aprovação do draft registrada.',

    observacao: '',
  },

  {
    id: 3,
    titulo: 'EMBARQUE X RECEBIMENTO CONHECIMENTO ORIGINAL',

    dataInicio: 'data_atd',
    dataFim: 'data_recebimento_conhecimento_original',

    slaPorModal: criarSla(
      [19.2, 24],
      [134.4, 168],
      [19.2, 24],
    ),

    calendarioPorModal: criarCalendarios(
      calendarioPadrao,
      calendarioCorridos,
      calendarioPadrao,
    ),

    unidadePrazoPorModal: criarUnidades(
      'dias úteis',
      'dias corridos',
      'dias úteis',
    ),

    ofensor: 'AGENTE',
    divisao: '',
    auditoria: 'Ok',
    grafico: 'BARRA',
    origemSla: 'Original',

    justificativa: '',

    descricaoInicio:
      'Data efetiva de embarque (ATD) registrada.',

    descricaoFim:
      'Recebimento do conhecimento original (BL/AWB) registrado.',

    observacao: '',
  },

  {
    id: 4,
    titulo: 'RECEBIMENTO CONHECIMENTO ORIGINAL X PROTOCOLO LI',

    dataInicio: 'data_recebimento_conhecimento_original',
    dataFim: 'data_protocolo_li',

    slaPorModal: criarSla(
      [38.4, 48],
      [57.6, 72],
      [38.4, 48],
    ),

    calendarioPorModal: criarCalendarios(
      calendarioPadrao,
      calendarioPadrao,
      calendarioPadrao,
    ),

    unidadePrazoPorModal: criarUnidades(
      'dias úteis',
      'dias úteis',
      'dias úteis',
    ),

    ofensor: 'PIBERNAT',
    divisao: 'DESPACHO',
    auditoria: '-',
    grafico: 'BARRA',
    origemSla: 'Original',

    justificativa: '',

    descricaoInicio:
      'Recebimento do conhecimento original registrado.',

    descricaoFim:
      'Protocolo da LI no Siscomex registrado.',

    observacao: '',
  },

  {
    id: 5,
    titulo: 'ENVIO ID X EMISSÃO LI',

    dataInicio: 'data_envio_id',
    dataFim: 'data_emissao_li',

    slaPorModal: criarSla(
      [19.2, 24],
      [38.4, 48],
      [19.2, 24],
    ),

    calendarioPorModal: criarCalendarios(
      calendarioPadrao,
      calendarioPadrao,
      calendarioPadrao,
    ),

    unidadePrazoPorModal: criarUnidades(
      'dias úteis',
      'dias úteis',
      'dias úteis',
    ),

    ofensor: 'PIBERNAT',
    divisao: 'DESPACHO',
    auditoria: '-',
    grafico: 'BARRA',
    origemSla: 'Original',

    justificativa: '',

    descricaoInicio:
      'Envio da instrução de ID pelo cliente registrado.',

    descricaoFim:
      'Emissão da LI registrada.',

    observacao: '',
  },

  {
    id: 6,
    titulo: 'EMISSÃO LI X PGTO GRU',

    dataInicio: 'data_emissao_li',
    dataFim: 'data_pagamento_gru',

    slaPorModal: criarSla(
      [19.2, 24],
      [38.4, 48],
      [19.2, 24],
    ),

    calendarioPorModal: criarCalendarios(
      calendarioPadrao,
      calendarioPadrao,
      calendarioPadrao,
    ),

    unidadePrazoPorModal: criarUnidades(
      'dias úteis',
      'dias úteis',
      'dias úteis',
    ),

    ofensor: 'PIBERNAT',
    divisao: 'DESPACHO',
    auditoria: '-',
    grafico: 'BARRA',
    origemSla: 'Original',

    justificativa: '',

    descricaoInicio:
      'Emissão da LI registrada.',

    descricaoFim:
      'Pagamento da GRU registrado.',

    observacao: '',
  },

  {
    id: 7,
    titulo: 'PGTO GRU X PROTOCOLO',

    dataInicio: 'data_pagamento_gru',
    dataFim: 'data_protocolo_li',

    slaPorModal: criarSla(
      [19.2, 24],
      [19.2, 24],
      [19.2, 24],
    ),

    calendarioPorModal: criarCalendarios(
      calendarioPadrao,
      calendarioPadrao,
      calendarioPadrao,
    ),

    unidadePrazoPorModal: criarUnidades(
      'dias úteis',
      'dias úteis',
      'dias úteis',
    ),

    ofensor: 'PIBERNAT',
    divisao: 'DESPACHO',
    auditoria: '-',
    grafico: 'BARRA',
    origemSla: 'Original',

    justificativa: '',

    descricaoInicio:
      'Pagamento da GRU registrado.',

    descricaoFim:
      'Protocolo da LI no Siscomex registrado.',

    observacao:
      'Protocolo imediato ao pagamento.',
  },

  {
    id: 8,
    titulo: 'PROTOCOLO X DEFERIMENTO LI',

    dataInicio: 'data_protocolo_li',
    dataFim: 'data_deferimento_li',

    slaPorModal: criarSla(
      [153.6, 192],
      [153.6, 192],
      [153.6, 192],
    ),

    calendarioPorModal: criarCalendarios(
      calendarioCorridos,
      calendarioCorridos,
      calendarioCorridos,
    ),

    unidadePrazoPorModal: criarUnidades(
      'dias corridos',
      'dias corridos',
      'dias corridos',
    ),

    ofensor: 'PIBERNAT / ÓRGÃO',
    divisao: 'DESPACHO',
    auditoria: '-',
    grafico: 'BARRA',
    origemSla: 'Original',

    justificativa: '',

    descricaoInicio:
      'Protocolo da LI registrado.',

    descricaoFim:
      'Deferimento da LI pelo órgão registrado.',

    observacao:
      'Média de deferimento: ANVISA 7 dias; MAPA 30 dias; ANVISA PROC. 1 - 6 dias.',
  },
]
