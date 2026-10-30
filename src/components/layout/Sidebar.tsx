import { LayoutDashboard, ClipboardCheck } from 'lucide-react'

type SidebarProps = {
  paginaAtiva: string
  onMudarPagina: (pagina: string) => void
}

export function Sidebar({
  paginaAtiva,
  onMudarPagina,
}: SidebarProps) {
  const itens = [
    {
      nome: 'Home',
      icone: LayoutDashboard,
    },
    {
      nome: 'Prontidão',
      icone: ClipboardCheck,
    },
  ]

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-[#173F35] text-white">
      <div className="border-b border-white/10 px-6 py-7">
        <h1 className="text-xl font-bold tracking-wide">
          EUROFARMA
        </h1>

        <p className="mt-1 text-xs text-white/60">
          Dashboard de Importação
        </p>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-white/40">
          Menu principal
        </p>

        {itens.map((item) => {
          const Icon = item.icone
          const ativo = paginaAtiva === item.nome

          return (
            <button
              key={item.nome}
              onClick={() => onMudarPagina(item.nome)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                ativo
                  ? 'bg-white text-[#173F35] font-semibold'
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={19} />
              {item.nome}
            </button>
          )
        })}
      </nav>

      <div className="border-t border-white/10 px-6 py-5">
        <p className="text-xs text-white/50">
          BI de Gerenciamento
        </p>

        <p className="mt-1 text-xs text-white/40">
          Importação
        </p>
      </div>
    </aside>
  )
}