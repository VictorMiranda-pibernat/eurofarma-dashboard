import { useMemo, useState } from 'react'
import {
  RefreshCw,
  CalendarDays,
  ChevronDown,
} from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'

type Processo = {
  status: string
  referencia: string
  numero: string
  responsavel: string
  planta: string
  categoria: string
  exportador: string
  modal: string
  recebimento: string
  proforma: string
  dias: number
  farol: string
}

const processos: Processo[] = [
  {
    status: 'Pendente',
    referencia: 'REF00001',
    numero: 'PROC00001',
    responsavel: 'Analista 1',
    planta: 'Manaus',
    categoria: 'Cosméticos',
    exportador: 'Fornecedor Internacional A',
    modal: 'Aéreo',
    recebimento: '09/08/2026',
    proforma: '-',
    dias: 82,
    farol: 'Atrasado',
  },
  {
    status: 'Concluído',
    referencia: 'REF00002',
    numero: 'PROC00002',
    responsavel: 'Analista 2',
    planta: 'São Paulo',
    categoria: 'Cosméticos',
    exportador: 'Fornecedor Internacional C',
    modal: 'Marítimo',
    recebimento: '16/10/2026',
    proforma: '18/10/2026',
    dias: 2,
    farol: 'Concluído',
  },
  {
    status: 'Concluído',
    referencia: 'REF00003',
    numero: 'PROC00003',
    responsavel: 'Analista 1',
    planta: 'Curitiba',
    categoria: 'Fragrâncias',
    exportador: 'Fornecedor Internacional B',
    modal: 'Aéreo',
    recebimento: '20/10/2026',
    proforma: '21/10/2026',
    dias: 1,
    farol: 'Concluído',
  },
  {
    status: 'Pendente',
    referencia: 'REF00004',
    numero: 'PROC00004',
    responsavel: 'Analista 3',
    planta: 'São Paulo',
    categoria: 'Matérias-primas',
    exportador: 'Fornecedor Internacional A',
    modal: 'Marítimo',
    recebimento: '12/10/2026',
    proforma: '-',
    dias: 18,
    farol: 'Atrasado',
  },
  {
    status: 'Concluído',
    referencia: 'REF00005',
    numero: 'PROC00005',
    responsavel: 'Analista 2',
    planta: 'Manaus',
    categoria: 'Embalagens',
    exportador: 'Fornecedor Internacional C',
    modal: 'Rodoviário',
    recebimento: '22/10/2026',
    proforma: '23/10/2026',
    dias: 1,
    farol: 'Concluído',
  },
  {
    status: 'Pendente',
    referencia: 'REF00006',
    numero: 'PROC00006',
    responsavel: 'Analista 1',
    planta: 'Curitiba',
    categoria: 'Químicos',
    exportador: 'Fornecedor Internacional B',
    modal: 'Aéreo',
    recebimento: '19/10/2026',
    proforma: '-',
    dias: 11,
    farol: 'Atrasado',
  },
  {
    status: 'Concluído',
    referencia: 'REF00007',
    numero: 'PROC00007',
    responsavel: 'Analista 3',
    planta: 'Manaus',
    categoria: 'Fragrâncias',
    exportador: 'Fornecedor Internacional A',
    modal: 'Marítimo',
    recebimento: '24/10/2026',
    proforma: '25/10/2026',
    dias: 1,
    farol: 'Concluído',
  },
  {
    status: 'Concluído',
    referencia: 'REF00008',
    numero: 'PROC00008',
    responsavel: 'Analista 2',
    planta: 'São Paulo',
    categoria: 'Cosméticos',
    exportador: 'Fornecedor Internacional B',
    modal: 'Aéreo',
    recebimento: '25/10/2026',
    proforma: '27/10/2026',
    dias: 2,
    farol: 'Concluído',
  },
]

const CORES = ['#80C7FA', '#0875CF']

function Filtro({
  label,
  valor,
  opcoes,
  onChange,
}: {
  label: string
  valor: string
  opcoes: string[]
  onChange: (valor: string) => void
}) {
  return (
    <label className="relative min-w-0 flex-1">
      <span className="sr-only">{label}</span>
      <select
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-[#292B34] bg-[#252731] px-3 py-3 pr-9 text-sm text-gray-200 outline-none transition focus:border-blue-500"
      >
        <option value="">{label}</option>
        {opcoes.map((opcao) => (
          <option key={opcao} value={opcao}>
            {opcao}
          </option>
        ))}
      </select>
      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </label>
  )
}

function Indicador({
  titulo,
  valor,
}: {
  titulo: string
  valor: number
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-300">{titulo}</p>
      <p className="text-3xl font-medium tracking-tight text-white">
        {valor}
      </p>
    </div>
  )
}

export function Prontidao() {
  const [planta, setPlanta] = useState('')
  const [modal, setModal] = useState('')
  const [categoria, setCategoria] = useState('')
  const [responsavel, setResponsavel] = useState('')

  const dadosFiltrados = useMemo(() => {
    return processos.filter((processo) => {
      return (
        (!planta || processo.planta === planta) &&
        (!modal || processo.modal === modal) &&
        (!categoria || processo.categoria === categoria) &&
        (!responsavel || processo.responsavel === responsavel)
      )
    })
  }, [planta, modal, categoria, responsavel])

  const total = dadosFiltrados.length
  const concluidos = dadosFiltrados.filter(
    (p) => p.status === 'Concluído',
  ).length
  const pendentes = dadosFiltrados.filter(
    (p) => p.status === 'Pendente',
  ).length
  const atrasados = dadosFiltrados.filter(
    (p) => p.farol === 'Atrasado',
  ).length

  const dadosGrafico = [
    { name: 'Concluído', value: concluidos },
    { name: 'Atrasado', value: atrasados },
  ]

  function limparFiltros() {
    setPlanta('')
    setModal('')
    setCategoria('')
    setResponsavel('')
  }

  return (
    <div className="space-y-4">
      {/* Título e filtros */}
      <section className="flex flex-wrap items-center gap-4 rounded-lg border-b border-[#343640] pb-5">
        <h1 className="mr-auto text-3xl font-bold tracking-tight text-white">
          Prontidão
        </h1>

        <button
          onClick={limparFiltros}
          title="Limpar filtros"
          className="rounded-lg border border-[#41434D] bg-[#191B22] p-3 text-gray-300 hover:bg-[#292B34]"
        >
          <RefreshCw size={17} />
        </button>

        <div className="flex items-center gap-2 rounded-lg bg-[#252731] px-3 py-3 text-sm text-gray-200">
          <CalendarDays size={15} />
          <span>Todos os períodos</span>
        </div>

        <div className="flex min-w-[620px] flex-1 flex-wrap gap-3">
          <Filtro
            label="Planta"
            valor={planta}
            opcoes={['São Paulo', 'Curitiba', 'Manaus']}
            onChange={setPlanta}
          />
          <Filtro
            label="Modal"
            valor={modal}
            opcoes={['Aéreo', 'Marítimo', 'Rodoviário']}
            onChange={setModal}
          />
          <Filtro
            label="Categoria"
            valor={categoria}
            opcoes={[
              'Fragrâncias',
              'Cosméticos',
              'Matérias-primas',
              'Embalagens',
              'Químicos',
            ]}
            onChange={setCategoria}
          />
          <Filtro
            label="Responsável"
            valor={responsavel}
            opcoes={['Analista 1', 'Analista 2', 'Analista 3']}
            onChange={setResponsavel}
          />
        </div>
      </section>

      {/* Controle de recebimento */}
      <section className="rounded-xl border border-[#343640] bg-[#15171E] p-5">
        <h2 className="mb-5 text-xl font-semibold text-white">
          Controle de Recebimento de Proforma
        </h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Indicadores */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-7 lg:col-span-2">
            <Indicador titulo="Total de processos" valor={total} />
            <Indicador titulo="Concluídos" valor={concluidos} />
            <Indicador titulo="Pendentes" valor={pendentes} />
            <Indicador titulo="Atrasados" valor={atrasados} />
          </div>

          {/* Gráfico */}
          <div className="min-h-[260px]">
            <h3 className="mb-2 text-center text-sm font-semibold text-white">
              Distribuição por status
            </h3>

            {total > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={dadosGrafico}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={88}
                    paddingAngle={0}
                    label={({ percent }) =>
                      `${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                  >
                    {dadosGrafico.map((_, index) => (
                      <Cell
                        key={index}
                        fill={CORES[index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: '#252731',
                      border: '1px solid #41434D',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Legend
                    verticalAlign="middle"
                    align="right"
                    layout="vertical"
                    iconType="square"
                    wrapperStyle={{
                      color: '#D1D5DB',
                      fontSize: '11px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="pt-20 text-center text-sm text-gray-500">
                Nenhum processo encontrado.
              </p>
            )}
          </div>
        </div>

        {/* Tabela */}
        <div className="mt-5 overflow-x-auto border-t border-[#343640] pt-6">
          <table className="w-full min-w-[1150px] border-collapse text-left text-xs">
            <thead>
              <tr className="bg-[#22242D] text-gray-300">
                {[
                  'Status',
                  'Referência',
                  'Nº Processo',
                  'Responsável',
                  'Planta',
                  'Categoria',
                  'Exportador',
                  'Modal',
                  'Recebimento',
                  'Proforma',
                  'Dias',
                  'Farol',
                ].map((coluna) => (
                  <th
                    key={coluna}
                    className="border border-[#343640] px-2 py-3 font-medium"
                  >
                    {coluna}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {dadosFiltrados.map((p) => (
                <tr
                  key={p.numero}
                  className="border-b border-[#292B34] text-gray-200 hover:bg-[#20222A]"
                >
                  <td className="px-2 py-3">{p.status}</td>
                  <td className="px-2 py-3">{p.referencia}</td>
                  <td className="px-2 py-3">{p.numero}</td>
                  <td className="px-2 py-3">{p.responsavel}</td>
                  <td className="px-2 py-3">{p.planta}</td>
                  <td className="px-2 py-3">{p.categoria}</td>
                  <td className="px-2 py-3">{p.exportador}</td>
                  <td className="px-2 py-3">{p.modal}</td>
                  <td className="px-2 py-3">{p.recebimento}</td>
                  <td className="px-2 py-3">{p.proforma}</td>
                  <td className="px-2 py-3">{p.dias}</td>
                  <td className="px-2 py-3">
                    <span
                      className={`rounded-md px-2 py-1 font-medium ${
                        p.farol === 'Atrasado'
                          ? 'bg-red-500/15 text-red-400'
                          : 'bg-green-500/15 text-green-400'
                      }`}
                    >
                      {p.farol}
                    </span>
                  </td>
                </tr>
              ))}

              {dadosFiltrados.length === 0 && (
                <tr>
                  <td
                    colSpan={12}
                    className="py-8 text-center text-gray-500"
                  >
                    Nenhum processo encontrado com esses filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}