import { House, ClipboardList } from 'lucide-react'

type NavbarProps = {
  paginaAtiva: string
  onMudarPagina: (pagina: string) => void
}

export function Navbar({
  paginaAtiva,
  onMudarPagina,
}: NavbarProps) {
  const itens = [
    { nome: 'Home', icone: House },
    { nome: 'Prontidão', icone: ClipboardList },
  ]

  return (
    <header className="flex h-14 items-center gap-2 border-b border-[#292B34] bg-[#101116] px-6">
      {itens.map((item) => {
        const Icon = item.icone
        const ativo = paginaAtiva === item.nome

        return (
          <button
            key={item.nome}
            onClick={() => onMudarPagina(item.nome)}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition ${
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
    </header>
  )
}