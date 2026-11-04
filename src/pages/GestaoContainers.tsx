
import { ControleOperacional } from '../components/dashboard/ControleOperacional'
import { mockGestaoContainers } from '../data/mockGestaoContainers'
import { mockGestaoContainersMetricas } from '../data/mockGestaoContainersMetricas'
import { calcularProcessos } from '../utils/calcularStatus'
import { IndicadorDemurrageValores } from '../components/dashboard/IndicadorDemurrageValores'

import type {
    ColunaTabela,
    ConfiguracaoControle,
    ProcessoImportacao,
} from '../types/controle'

const colunasContainers: ColunaTabela[] = [
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

export function GestaoContainers() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-semibold text-white">
                    Gestão de Containers
                </h1>

                <p className="mt-1 text-sm text-gray-400">
                    Acompanhamento da devolução de containers e dos custos
                    e prazos de demurrage.
                </p>
            </div>

            {mockGestaoContainersMetricas.map((metrica) => {
                let dadosFiltrados: ProcessoImportacao[] = mockGestaoContainers

                // Indicador 1: somente processos marítimos.
                if (metrica.id === 1) {
                    dadosFiltrados = mockGestaoContainers.filter(
                        (processo) => processo.modal === 'Marítimo',
                    )
                }

                // Indicador 2: somente processos marítimos e rodoviários.
                if (metrica.id === 2) {
                    dadosFiltrados = mockGestaoContainers.filter(
                        (processo) =>
                            processo.modal === 'Marítimo' ||
                            processo.modal === 'Rodoviário',
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
                    colunas: colunasContainers,
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
             <IndicadorDemurrageValores
                    dados={mockGestaoContainers.filter(
                        (processo) => processo.modal === 'Marítimo',
                    )}
                />

        </div>
    )
}
