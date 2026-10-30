import { ControleOperacional } from '../components/dashboard/ControleOperacional'

import { mockProntidao } from '../data/mockProntidao'

import { calcularProcessos } from '../utils/calcularStatus'

import type { ConfiguracaoControle } from '../types/controle'

const colunas = [
  { chave: 'status', titulo: 'Status' },
  { chave: 'referencia_cliente', titulo: 'Referência' },
  { chave: 'numero_processo', titulo: 'Nº Processo' },
  { chave: 'responsavel', titulo: 'Responsável' },
  { chave: 'planta', titulo: 'Planta' },
  { chave: 'categoria', titulo: 'Categoria' },
  { chave: 'exportador', titulo: 'Exportador' },
  { chave: 'modal', titulo: 'Modal' },
  { chave: 'dias', titulo: 'Dias' },
  { chave: 'farol', titulo: 'Farol' },
] as const

const configRecebimento: ConfiguracaoControle = {
  titulo: 'Controle de Recebimento de Proforma',
  dataInicio: 'data_recebimento_pedido',
  dataFim: 'data_recebimento_proforma',
  colunas: [...colunas],
}

const configConferencia: ConfiguracaoControle = {
  titulo: 'Controle de Conferência de Proforma',
  dataInicio: 'data_recebimento_proforma',
  dataFim: 'data_conferencia_proforma',
  colunas: [...colunas],
}

export function Prontidao() {
  const dadosRecebimento = calcularProcessos(
    mockProntidao,
    configRecebimento.dataInicio,
    configRecebimento.dataFim,
  )

  const dadosConferencia = calcularProcessos(
    mockProntidao,
    configConferencia.dataInicio,
    configConferencia.dataFim,
  )

  return (
    <div className="space-y-5">

      <ControleOperacional
        dados={dadosRecebimento}
        configuracao={configRecebimento}
      />

      <ControleOperacional
        dados={dadosConferencia}
        configuracao={configConferencia}
      />

    </div>
  )
}