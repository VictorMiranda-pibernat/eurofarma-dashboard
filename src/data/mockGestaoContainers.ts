
import { mockLogistica } from './mockLogistica'

const eventosContainers = [
  {
    numero_processo: 'PROC00001',
    data_inicio_demurrage: null,
    valor_demurrage_usd: null,
    valor_demurrage_brl: null,
  },
  {
    numero_processo: 'PROC00002',
    data_inicio_demurrage: '2026-10-20',
    valor_demurrage_usd: 350,
    valor_demurrage_brl: 1925,
  },
  {
    numero_processo: 'PROC00003',
    data_inicio_demurrage: null,
    valor_demurrage_usd: null,
    valor_demurrage_brl: null,
  },
  {
    numero_processo: 'PROC00004',
    data_inicio_demurrage: '2026-10-30',
    valor_demurrage_usd: 180,
    valor_demurrage_brl: 990,
  },
  {
    numero_processo: 'PROC00005',
    data_inicio_demurrage: null,
    valor_demurrage_usd: null,
    valor_demurrage_brl: null,
  },
  {
    numero_processo: 'PROC00006',
    data_inicio_demurrage: null,
    valor_demurrage_usd: null,
    valor_demurrage_brl: null,
  },
]

export const mockGestaoContainers = mockLogistica.map((processo) => {
  const eventos = eventosContainers.find(
    (item) => item.numero_processo === processo.numero_processo
  )

  return {
    ...processo,

    data_inicio_demurrage:
      processo.modal === 'Marítimo'
        ? eventos?.data_inicio_demurrage ?? null
        : null,

    valor_demurrage_usd:
      processo.modal === 'Marítimo'
        ? eventos?.valor_demurrage_usd ?? null
        : null,

    valor_demurrage_brl:
      processo.modal === 'Marítimo'
        ? eventos?.valor_demurrage_brl ?? null
        : null,
  }
})
