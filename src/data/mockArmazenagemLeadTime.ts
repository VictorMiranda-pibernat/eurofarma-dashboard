import { mockLogistica } from './mockLogistica'

const eventosArmazenagem = [
  {
    numero_processo: 'PROC00001',
    data_entrada_recinto: '2026-10-08',
    data_saida_recinto: '2026-10-10',
  },
  {
    numero_processo: 'PROC00002',
    data_entrada_recinto: '2026-10-18',
    data_saida_recinto: '2026-10-27',
  },
  {
    numero_processo: 'PROC00003',
    data_entrada_recinto: '2026-10-23',
    data_saida_recinto: null,
  },
  {
    numero_processo: 'PROC00004',
    data_entrada_recinto: '2026-10-25',
    data_saida_recinto: null,
  },
  {
    numero_processo: 'PROC00005',
    data_entrada_recinto: '2026-10-27',
    data_saida_recinto: null,
  },
  {
    numero_processo: 'PROC00006',
    data_entrada_recinto: null,
    data_saida_recinto: null,
  },
]

export const mockArmazenagemLeadTime = mockLogistica.map((processo) => {
  const evento = eventosArmazenagem.find(
    (item) => item.numero_processo === processo.numero_processo,
  )

  return {
    ...processo,
    data_entrada_recinto:
      evento?.data_entrada_recinto ?? null,
    data_saida_recinto:
      evento?.data_saida_recinto ?? null,
  }
})