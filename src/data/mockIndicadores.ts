
import type { ProcessoImportacao } from '../types/controle'
import { mockProntidao } from './mockProntidao'

const datasIndicadores: Record<
  string,
  Partial<ProcessoImportacao>
> = {
  PROC00001: {
    // 1. Recebimento de documentos x aprovação
    data_recebimento_documentos: '2026-10-05T08:00:00',
    data_aprovacao_documentos: '2026-10-05T16:00:00',

    // 2. Draft conhecimento x aprovação
    data_recebimento_draft_conhecimento: '2026-10-06T08:00:00',
    data_aprovacao_draft_conhecimento: '2026-10-06T18:00:00',

    // 3. Embarque x recebimento conhecimento original
    data_atd: '2026-10-07T08:00:00',
    data_recebimento_conhecimento_original: '2026-10-08T12:00:00',

    // 4. Recebimento conhecimento original x protocolo LI
    data_protocolo_li: '2026-10-09T12:00:00',

    // 5. Envio ID x emissão LI
    data_envio_id: '2026-10-09T13:00:00',
    data_emissao_li: '2026-10-10T09:00:00',

    // 6. Emissão LI x pagamento GRU
    data_pagamento_gru: '2026-10-11T10:00:00',

    // 8. Protocolo x deferimento LI
    data_deferimento_li: '2026-10-17T12:00:00',
  },

  PROC00002: {
    data_recebimento_documentos: '2026-10-05T08:00:00',
    data_aprovacao_documentos: '2026-10-06T14:00:00',

    data_recebimento_draft_conhecimento: '2026-10-07T08:00:00',
    data_aprovacao_draft_conhecimento: '2026-10-09T00:00:00',

    data_atd: '2026-10-10T08:00:00',
    data_recebimento_conhecimento_original: '2026-10-15T08:00:00',

    data_protocolo_li: '2026-10-19T20:00:00',

    data_envio_id: '2026-10-17T08:00:00',
    data_emissao_li: '2026-10-19T20:00:00',

    data_pagamento_gru: '2026-10-21T08:00:00',
    data_deferimento_li: '2026-10-27T08:00:00',
  },

  PROC00003: {
    data_recebimento_documentos: '2026-10-12T08:00:00',
    data_aprovacao_documentos: '2026-10-13T07:00:00',

    data_recebimento_draft_conhecimento: '2026-10-13T08:00:00',
    data_aprovacao_draft_conhecimento: '2026-10-14T10:00:00',

    data_atd: '2026-10-15T08:00:00',
    data_recebimento_conhecimento_original: '2026-10-15T20:00:00',

    data_protocolo_li: '2026-10-20T10:00:00',

    data_envio_id: '2026-10-16T08:00:00',
    data_emissao_li: '2026-10-16T20:00:00',

    data_pagamento_gru: '2026-10-17T08:00:00',
    data_deferimento_li: '2026-10-28T18:00:00',
  },

  PROC00004: {
    data_recebimento_documentos: '2026-10-26T08:00:00',
    data_aprovacao_documentos: null,

    data_recebimento_draft_conhecimento: null,
    data_aprovacao_draft_conhecimento: null,

    data_atd: null,
    data_recebimento_conhecimento_original: null,

    data_protocolo_li: null,

    data_envio_id: null,
    data_emissao_li: null,

    data_pagamento_gru: null,
    data_deferimento_li: null,
  },

  PROC00005: {
    data_recebimento_documentos: '2026-10-19T08:00:00',
    data_aprovacao_documentos: '2026-10-19T18:00:00',

    data_recebimento_draft_conhecimento: '2026-10-20T08:00:00',
    data_aprovacao_draft_conhecimento: '2026-10-20T18:00:00',

    data_atd: '2026-10-21T08:00:00',
    data_recebimento_conhecimento_original: '2026-10-21T20:00:00',

    data_protocolo_li: '2026-10-22T08:00:00',

    data_envio_id: '2026-10-22T09:00:00',
    data_emissao_li: '2026-10-22T18:00:00',

    data_pagamento_gru: '2026-10-23T08:00:00',
    data_deferimento_li: '2026-10-29T08:00:00',
  },

  PROC00006: {
    data_recebimento_documentos: null,
    data_aprovacao_documentos: null,

    data_recebimento_draft_conhecimento: null,
    data_aprovacao_draft_conhecimento: null,

    data_atd: null,
    data_recebimento_conhecimento_original: null,

    data_protocolo_li: null,

    data_envio_id: null,
    data_emissao_li: null,

    data_pagamento_gru: null,
    data_deferimento_li: null,
  },
}

export const mockIndicadores: ProcessoImportacao[] =
  mockProntidao.map((processo) => ({
    ...processo,
    ...datasIndicadores[processo.numero_processo],
  }))
