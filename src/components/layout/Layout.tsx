import type { ReactNode } from 'react'
import { Navbar } from './Navbar'

type LayoutProps = {
  paginaAtiva: string
  onMudarPagina: (pagina: string) => void
  children: ReactNode
}

export function Layout({
  paginaAtiva,
  onMudarPagina,
  children,
}: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[#101116] text-white">
      {/* Menu superior */}
      <Navbar
        paginaAtiva={paginaAtiva}
        onMudarPagina={onMudarPagina}
      />

      {/* Conteúdo da página */}
      <main className="w-full px-6 py-5">
        {children}
      </main>
    </div>
  )
}