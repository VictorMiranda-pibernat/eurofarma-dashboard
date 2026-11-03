
import { ControleOperacional } from '../components/dashboard/ControleOperacional'
import { mockIndicadores } from '../data/mockIndicadores'
import { mockMetricas } from '../data/mockMetricas'
import { calcularProcessos } from '../utils/calcularStatus'

import type {
  ColunaTabela,
  ConfiguracaoControle,
} from '../types/controle'

const colunasIndicadores: ColunaTabela[] = [
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

export function Indicadores() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">
          Indicadores Operacionais
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Acompanhamento dos prazos e SLAs dos processos de importação.
        </p>
      </div>

      {mockMetricas.map((metrica) => {
        const dadosCalculados = calcularProcessos(
          mockIndicadores,
          metrica.dataInicio,
          metrica.dataFim,
          metrica.slaPorModal,
          metrica.calendarioPorModal,
        )

        const configuracao: ConfiguracaoControle = {
          titulo: metrica.titulo,
          dataInicio: metrica.dataInicio,
          dataFim: metrica.dataFim,
          colunas: colunasIndicadores,
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
