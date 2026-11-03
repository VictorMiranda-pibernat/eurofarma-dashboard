
import { ControleOperacional } from '../components/dashboard/ControleOperacional'
import { mockDesembaraco } from '../data/mockDesembaraco'
import { mockDesembaracoMetricas } from '../data/mockDesembaracoMetricas'
import { calcularProcessos } from '../utils/calcularStatus'

import type {
  ColunaTabela,
  ConfiguracaoControle,
  ProcessoImportacao,
} from '../types/controle'

const colunasDesembaraco: ColunaTabela[] = [
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

export function Desembaraco() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">
          Desembaraço
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Acompanhamento dos prazos de chegada, desembaraço aduaneiro
          e liberação dos processos de importação.
        </p>
      </div>

      {mockDesembaracoMetricas.map((metrica) => {
        let dadosFiltrados: ProcessoImportacao[] = mockDesembaraco

        // Indicador 10: somente processos sem LI.
        if (metrica.id === 10) {
          dadosFiltrados = mockDesembaraco.filter(
            (processo) => processo.possui_li === false,
          )
        }

        // Indicador 11: somente processos com LI.
        if (metrica.id === 11) {
          dadosFiltrados = mockDesembaraco.filter(
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
          colunas: colunasDesembaraco,
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
