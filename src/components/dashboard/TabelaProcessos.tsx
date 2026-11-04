
import type {
  ProcessoComPrazo,
  ColunaTabela,
} from '../../types/controle'

type TabelaProcessosProps = {
  dados: ProcessoComPrazo[]
  colunas: ColunaTabela[]
}

const coresStatus: Record<string, string> = {
  'Dentro do Prazo': 'bg-green-500/15 text-green-400',
  Atenção: 'bg-yellow-500/15 text-yellow-400',
  Alerta: 'bg-orange-500/15 text-orange-400',
  Atraso: 'bg-red-500/15 text-red-400',
  Pendente: 'bg-gray-500/15 text-gray-400',
}

export function TabelaProcessos({
  dados,
  colunas,
}: TabelaProcessosProps) {
  // Esconde a coluna de horas em todas as páginas.
  const colunasVisiveis = colunas.filter(
    (coluna) => coluna.chave !== 'horas',
  )

  return (
    <div className="mt-5 border-t border-[#343640] pt-6">
      {/* Área com rolagem independente */}
      <div className="max-h-[420px] overflow-auto rounded-md">
        <table className="w-full min-w-[1100px] border-separate border-spacing-0 text-left text-xs">
          <thead>
            <tr className="text-gray-300">
              {colunasVisiveis.map((coluna) => (
                <th
                  key={coluna.chave}
                  className="sticky top-0 z-10 border border-[#343640] bg-[#22242D] px-3 py-3 font-medium"
                >
                  {coluna.titulo}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {dados.map((processo) => (
              <tr
                key={processo.numero_processo}
                className="text-gray-200 hover:bg-[#20222A]"
              >
                {colunasVisiveis.map((coluna) => {
                  const valor = processo[coluna.chave]
                  const ehStatus = coluna.chave === 'farol'

                  // Arredonda os dias para números inteiros.
                  const valorExibido =
                    coluna.chave === 'dias' && valor !== null
                      ? Math.round(Number(valor))
                      : valor

                  return (
                    <td
                      key={coluna.chave}
                      className="border-b border-[#292B34] px-3 py-3"
                    >
                      {ehStatus ? (
                        <span
                          className={`rounded-md px-2 py-1 font-medium ${
                            coresStatus[String(valor)] ??
                            'bg-gray-500/15 text-gray-400'
                          }`}
                        >
                          {valor}
                        </span>
                      ) : (
                        valorExibido ?? '-'
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}

            {dados.length === 0 && (
              <tr>
                <td
                  colSpan={colunasVisiveis.length}
                  className="py-8 text-center text-gray-500"
                >
                  Nenhum processo encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
