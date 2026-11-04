import { ControleOperacional } from '../components/dashboard/ControleOperacional'
import { mockArmazenagemLeadTimeMetricas } from '../data/mockArmazenagemLeadTimeMetricas'
import { calcularProcessos } from '../utils/calcularStatus'
import { useProcessos } from '../contexts/ProcessosContext'

import type {
  ColunaTabela,
  ConfiguracaoControle,
  ProcessoImportacao,
} from '../types/controle'

const colunasArmazenagemLeadTime: ColunaTabela[] = [
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

export function ArmazenagemLeadTime() {
  const { getProcessosArmazenagem } = useProcessos()
  const baseProcessos = getProcessosArmazenagem()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">
          Armazenagem e Lead Time
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Acompanhamento dos prazos de armazenagem nos recintos
          alfandegados e do lead time total dos produtos importados.
        </p>
      </div>

      {mockArmazenagemLeadTimeMetricas.map((metrica) => {
        const dadosFiltrados: ProcessoImportacao[] = baseProcessos

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
          colunas: colunasArmazenagemLeadTime,
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
