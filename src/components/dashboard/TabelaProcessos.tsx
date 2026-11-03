
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
    <div className="mt-5 overflow-x-auto border-t border-[#343640] pt-6">
      <table className="w-full min-w-[1100px] border-collapse text-left text-xs">
        <thead>
          <tr className="bg-[#22242D] text-gray-300">
            {colunasVisiveis.map((coluna) => (
              <th
                key={coluna.chave}
                className="border border-[#343640] px-3 py-3 font-medium"
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
              className="border-b border-[#292B34] text-gray-200 hover:bg-[#20222A]"
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
                    className="px-3 py-3"
                  >
                    {ehStatus ? (
                      <span
                        className={`rounded-md px-2 py-1 font-medium ${
                          coresStatus[String(valor)]
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
  )
}
