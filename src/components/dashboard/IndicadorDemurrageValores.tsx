import type { ProcessoImportacao } from '../../types/controle'

interface IndicadorDemurrageValoresProps {
  dados: ProcessoImportacao[]
}

const formatarMoeda = (valor: number | null | undefined, moeda: 'USD' | 'BRL') => {
  if (valor == null) return '—'

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: moeda,
  }).format(valor)
}

export function IndicadorDemurrageValores({
  dados,
}: IndicadorDemurrageValoresProps) {
  const processosComCusto = dados.filter(
    (processo) =>
      processo.valor_demurrage_usd != null ||
      processo.valor_demurrage_brl != null,
  )

  const totalUsd = processosComCusto.reduce(
    (total, processo) => total + (processo.valor_demurrage_usd ?? 0),
    0,
  )

  const totalBrl = processosComCusto.reduce(
    (total, processo) => total + (processo.valor_demurrage_brl ?? 0),
    0,
  )

  return (
    <section className="rounded-xl border border-gray-700 bg-gray-900 p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Farol de Demurrage – Valores
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Acompanhamento dos custos de demurrage registrados nos processos.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
          <p className="text-sm text-gray-400">Demurrage total (USD)</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatarMoeda(totalUsd, 'USD')}
          </p>
        </div>

        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
          <p className="text-sm text-gray-400">Demurrage total (BRL)</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatarMoeda(totalBrl, 'BRL')}
          </p>
        </div>

        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
          <p className="text-sm text-gray-400">Processos com custo registrado</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {processosComCusto.length}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th className="px-3 py-3 font-medium">Processo</th>
              <th className="px-3 py-3 font-medium">Referência</th>
              <th className="px-3 py-3 font-medium">Planta</th>
              <th className="px-3 py-3 text-right font-medium">Valor (USD)</th>
              <th className="px-3 py-3 text-right font-medium">Valor (BRL)</th>
            </tr>
          </thead>

          <tbody>
            {processosComCusto.length > 0 ? (
              processosComCusto.map((processo) => (
                <tr
                  key={processo.numero_processo}
                  className="border-b border-gray-800 text-gray-200 last:border-0"
                >
                  <td className="px-3 py-3">{processo.numero_processo}</td>
                  <td className="px-3 py-3">{processo.referencia_cliente}</td>
                  <td className="px-3 py-3">{processo.planta}</td>
                  <td className="px-3 py-3 text-right">
                    {formatarMoeda(processo.valor_demurrage_usd, 'USD')}
                  </td>
                  <td className="px-3 py-3 text-right">
                    {formatarMoeda(processo.valor_demurrage_brl, 'BRL')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-6 text-center text-gray-400"
                >
                  Nenhum custo de demurrage registrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}