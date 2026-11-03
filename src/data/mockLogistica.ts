
import { mockDesembaraco } from './mockDesembaraco'

const eventosLogistica = [
  {
    numero_processo: 'PROC00001',
    data_atd: '2026-10-02',
    data_emissao_nf: '2026-10-10',
    data_faturado: '2026-10-17',
    data_devolucao_container: '2026-10-12',
  },
  {
    numero_processo: 'PROC00002',
    data_atd: '2026-10-08',
    data_emissao_nf: '2026-10-21',
    data_faturado: '2026-10-29',
    data_devolucao_container: '2026-10-23',
  },
  {
    numero_processo: 'PROC00003',
    data_atd: '2026-10-17',
    data_emissao_nf: null,
    data_faturado: null,
    data_devolucao_container: null,
  },
  {
    numero_processo: 'PROC00004',
    data_atd: '2026-10-19',
    data_emissao_nf: null,
    data_faturado: null,
    data_devolucao_container: null,
  },
  {
    numero_processo: 'PROC00005',
    data_atd: '2026-10-20',
    data_emissao_nf: '2026-10-29',
    data_faturado: null,
    data_devolucao_container: null,
  },
  {
    numero_processo: 'PROC00006',
    data_atd: null,
    data_emissao_nf: null,
    data_faturado: null,
    data_devolucao_container: null,
  },
]

export const mockLogistica = mockDesembaraco.map((processo) => {
  const eventos = eventosLogistica.find(
    (item) => item.numero_processo === processo.numero_processo
  )

  return {
    ...processo,
    data_atd: eventos?.data_atd ?? null,
    data_emissao_nf: eventos?.data_emissao_nf ?? null,
    data_faturado: eventos?.data_faturado ?? null,
    data_devolucao_container:
      processo.modal === 'Marítimo'
        ? eventos?.data_devolucao_container ?? null
        : null,
  }
})
