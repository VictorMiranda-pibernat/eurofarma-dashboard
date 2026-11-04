import {
  House,
  ClipboardList,
  ChartNoAxesCombined,
  PackageCheck,
  Truck,
  Container,
  Warehouse,
  Database,
  RefreshCw,
} from 'lucide-react'
import { useProcessos } from '../../contexts/ProcessosContext'

type NavbarProps = {
  paginaAtiva: string
  onMudarPagina: (pagina: string) => void
}

export function Navbar({
  paginaAtiva,
  onMudarPagina,
}: NavbarProps) {
  const { total, origem, carregando, recarregar } = useProcessos()

  const itens = [
    { nome: 'Home', icone: House },
    { nome: 'Prontidão', icone: ClipboardList },
    { nome: 'Indicadores', icone: ChartNoAxesCombined },
    { nome: 'Desembaraço', icone: PackageCheck },
    { nome: 'Logística e Entregas', icone: Truck },
    { nome: 'Gestão de Containers', icone: Container },
    { nome: 'Armazenagem e Lead Time', icone: Warehouse },
  ]

  return (
    <header className="flex h-14 items-center justify-between border-b border-[#292B34] bg-[#101116] px-6">
      <div className="flex items-center gap-2 overflow-x-auto">
        {itens.map((item) => {
          const Icon = item.icone
          const ativo = paginaAtiva === item.nome

          return (
            <button
              key={item.nome}
              onClick={() => onMudarPagina(item.nome)}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm whitespace-nowrap transition ${
                ativo
                  ? 'bg-[#343640] font-semibold text-white'
                  : 'text-gray-400 hover:bg-[#252731] hover:text-white'
              }`}
            >
              <Icon size={15} />
              {item.nome}
            </button>
          )
        })}
      </div>

      {/* Indicador de Conexão com o BigQuery */}
      <div className="flex items-center gap-3 pl-4">
        <div
          title={`Fonte de dados: ${
            origem === 'bigquery'
              ? 'BigQuery (EUROFARMA_CARDS em tempo real)'
              : origem === 'cache'
              ? 'BigQuery (Cache local rápido)'
              : 'Dados mockados locais'
          }`}
          className="flex items-center gap-2 rounded-full border border-[#2e323e] bg-[#181920] px-3 py-1 text-xs text-gray-300"
        >
          <span
            className={`h-2 w-2 rounded-full ${
              origem === 'bigquery' || origem === 'cache'
                ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]'
                : 'bg-amber-400'
            }`}
          />
          <Database size={13} className="text-gray-400" />
          <span className="font-medium">
            {origem === 'mock'
              ? 'Modo Mock'
              : `${total} processos`}
          </span>
        </div>

        <button
          onClick={() => recarregar()}
          disabled={carregando}
          title="Recarregar dados do BigQuery"
          className="flex items-center justify-center rounded-md border border-[#2e323e] bg-[#181920] p-1.5 text-gray-400 hover:bg-[#252731] hover:text-white disabled:opacity-50"
        >
          <RefreshCw size={14} className={carregando ? 'animate-spin text-blue-400' : ''} />
        </button>
      </div>
    </header>
  )
}
