import { ControleOperacional } from '../components/dashboard/ControleOperacional'
import { mockLogisticaMetricas } from '../data/mockLogisticaMetricas'
import { calcularProcessos } from '../utils/calcularStatus'
import { useProcessos } from '../contexts/ProcessosContext'

import type {
  ColunaTabela,
  ConfiguracaoControle,
  ProcessoImportacao,
} from '../types/controle'

const colunasLogistica: ColunaTabela[] = [
  { chave: 'status', titulo: 'Status' },
  { chave: 'referencia_cliente', titulo: 'Referência' },
  { chave: 'numero_processo', titulo: 'Processo' },
  { chave: 'responsavel', titulo: 'Responsável' },
  { chave: 'planta', titulo: 'Planta' },
  { chave: 'categoria', titulo: 'Categoria' },
  { chave: 'exportador', titulo: 'Exportador' },
  { chave: 'modal', titulo: 'Modal' },
  { chave: 'horas', titulo: 'Horas' },
  { chave: 'dias', titulo: 'Dias' },
  { chave: 'farol', titulo: 'Farol' },
]

export function Logistica() {
  const { getProcessosLogistica } = useProcessos()
  const baseProcessos = getProcessosLogistica()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">
          Logística e Entregas
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Acompanhamento dos prazos de transporte internacional,
          entrega na fábrica e faturamento dos processos de importação.
        </p>
      </div>

      {mockLogisticaMetricas.map((metrica) => {
        let dadosFiltrados: ProcessoImportacao[] = baseProcessos

        // Indicadores 2 e 4: somente processos sem LI.
        if (metrica.id === 2 || metrica.id === 4) {
          dadosFiltrados = baseProcessos.filter(
            (processo) => processo.possui_li === false,
          )
        }

        // Indicadores 3 e 5: somente processos com LI.
        if (metrica.id === 3 || metrica.id === 5) {
          dadosFiltrados = baseProcessos.filter(
            (processo) => processo.possui_li === true,
          )
        }

        const dadosCalculados = calcularProcessos(
          dadosFiltrados,
          metrica.dataInicio,
          metrica.dataFim,
          metrica.slaPorModal,
          metrica.calendarioPorModal,
        )

        const configuracao: ConfiguracaoControle = {
          titulo: metrica.titulo,
          dataInicio: metrica.dataInicio,
          dataFim: metrica.dataFim,
          colunas: colunasLogistica,
          slaPorModal: metrica.slaPorModal,
        }

        return (
          <ControleOperacional
            key={metrica.id}
            dados={dadosCalculados}
            configuracao={configuracao}
          />
        )
      })}
    </div>
  )
}
