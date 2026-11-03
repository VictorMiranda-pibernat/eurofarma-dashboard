
import { mockProntidao } from './mockProntidao'

// Datas fictícias para simular as etapas de desembaraço.
// Cada processo possui uma sequência própria de eventos.
const eventosDesembaraco = {
  PROC00001: {
    data_chegada_ata: '2026-10-05T08:00:00',
    data_presenca: '2026-10-05T16:00:00',
    data_registro_di: '2026-10-06T10:00:00',
    data_deferimento_li: '2026-10-13T10:00:00',
    data_desembaraco: '2026-10-07T10:00:00',
    data_solicitacao_danfe: '2026-10-07T14:00:00',
    data_emissao_danfe: '2026-10-08T09:00:00',
    data_liberacao_transporte: '2026-10-08T15:00:00',
    data_saida_recinto: '2026-10-09T10:00:00',
    data_entrega_fabrica: '2026-10-10T10:00:00',
    possui_li: true,
  },
  PROC00002: {
    data_chegada_ata: '2026-10-12T08:00:00',
    data_presenca: '2026-10-13T08:00:00',
    data_registro_di: '2026-10-14T10:00:00',
    data_deferimento_li: '2026-10-20T10:00:00',
    data_desembaraco: '2026-10-15T10:00:00',
    data_solicitacao_danfe: '2026-10-15T14:00:00',
    data_emissao_danfe: '2026-10-16T09:00:00',
    data_liberacao_transporte: '2026-10-17T10:00:00',
    data_saida_recinto: '2026-10-19T10:00:00',
    data_entrega_fabrica: '2026-10-20T10:00:00',
    possui_li: true,
  },
  PROC00003: {
    data_chegada_ata: '2026-10-20T08:00:00',
    data_presenca: '2026-10-20T18:00:00',
    data_registro_di: '2026-10-21T10:00:00',
    data_deferimento_li: null,
    data_desembaraco: '2026-10-22T10:00:00',
    data_solicitacao_danfe: '2026-10-22T14:00:00',
    data_emissao_danfe: null,
    data_liberacao_transporte: null,
    data_saida_recinto: null,
    data_entrega_fabrica: null,
    possui_li: true,
  },
  PROC00004: {
    data_chegada_ata: '2026-10-22T08:00:00',
    data_presenca: '2026-10-23T08:00:00',
    data_registro_di: '2026-10-26T10:00:00',
    data_deferimento_li: null,
    data_desembaraco: null,
    data_solicitacao_danfe: null,
    data_emissao_danfe: null,
    data_liberacao_transporte: null,
    data_saida_recinto: null,
    data_entrega_fabrica: null,
    possui_li: false,
  },
  PROC00005: {
    data_chegada_ata: '2026-10-24T08:00:00',
    data_presenca: '2026-10-26T08:00:00',
    data_registro_di: '2026-10-26T14:00:00',
    data_deferimento_li: null,
    data_desembaraco: '2026-10-27T10:00:00',
    data_solicitacao_danfe: '2026-10-27T14:00:00',
    data_emissao_danfe: '2026-10-28T09:00:00',
    data_liberacao_transporte: null,
    data_saida_recinto: null,
    data_entrega_fabrica: null,
    possui_li: false,
  },
  PROC00006: {
    data_chegada_ata: '2026-10-28T08:00:00',
    data_presenca: null,
    data_registro_di: null,
    data_deferimento_li: null,
    data_desembaraco: null,
    data_solicitacao_danfe: null,
    data_emissao_danfe: null,
    data_liberacao_transporte: null,
    data_saida_recinto: null,
    data_entrega_fabrica: null,
    possui_li: true,
  },
}

export const mockDesembaraco = mockProntidao.map((processo) => ({
  ...processo,
  ...eventosDesembaraco[
    processo.numero_processo as keyof typeof eventosDesembaraco
  ],
}))
