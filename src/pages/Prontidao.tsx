import { ControleOperacional } from '../components/dashboard/ControleOperacional'
import { calcularProcessos } from '../utils/calcularStatus'
import { useProcessos } from '../contexts/ProcessosContext'

import type { ConfiguracaoControle } from '../types/controle'
import type { ConfiguracaoSla } from '../types/metricas'

// Configuração provisória baseada nas regras atuais da Prontidão.
// Os valores definitivos serão preenchidos pela planilha de SLAs.

const slaProntidao: ConfiguracaoSla = {
  'Aéreo': {
    verdeAteHoras: 24,
    atencaoAteHoras: 48,
    alertaAteHoras: 96,
  },
  'Marítimo': {
    verdeAteHoras: 24,
    atencaoAteHoras: 48,
    alertaAteHoras: 96,
  },
  'Rodoviário': {
    verdeAteHoras: 24,
    atencaoAteHoras: 48,
    alertaAteHoras: 96,
  },
}

const colunas = [
  { chave: 'status', titulo: 'Status' },
  { chave: 'referencia_cliente', titulo: 'Referência' },
  { chave: 'numero_processo', titulo: 'Nº Processo' },
  { chave: 'responsavel', titulo: 'Responsável' },
  { chave: 'planta', titulo: 'Planta' },
  { chave: 'categoria', titulo: 'Categoria' },
  { chave: 'exportador', titulo: 'Exportador' },
  { chave: 'modal', titulo: 'Modal' },
  { chave: 'horas', titulo: 'Horas' },
  { chave: 'dias', titulo: 'Dias' },
  { chave: 'farol', titulo: 'Farol' },
] as const

const configRecebimento: ConfiguracaoControle = {
  titulo: 'ENVIO DO PEDIDO X DISPONIBILIDADE',
  dataInicio: 'data_recebimento_pedido',
  dataFim: 'data_disponibilidade',
  colunas: [...colunas],
  slaPorModal: slaProntidao,
}

const configConferencia: ConfiguracaoControle = {
  titulo: 'DISPONIBILIDADE X PICK UP',
  dataInicio: 'data_disponibilidade',
  dataFim: 'data_conferencia_proforma',
  colunas: [...colunas],
  slaPorModal: slaProntidao,
}

export function Prontidao() {
  const { getProcessosProntidao } = useProcessos()
  const listaProcessos = getProcessosProntidao()

  const dadosRecebimento = calcularProcessos(
    listaProcessos,
    configRecebimento.dataInicio,
    configRecebimento.dataFim,
    configRecebimento.slaPorModal,
  )

  const dadosConferencia = calcularProcessos(
    listaProcessos,
    configConferencia.dataInicio,
    configConferencia.dataFim,
    configConferencia.slaPorModal,
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
