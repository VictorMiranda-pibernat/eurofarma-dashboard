import { useState } from 'react'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'
import { Prontidao } from './pages/Prontidao'

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('Home')

  return (
    <Layout
      paginaAtiva={paginaAtiva}
      onMudarPagina={setPaginaAtiva}
    >
      {paginaAtiva === 'Home' ? <Home /> : <Prontidao />}
    </Layout>
  )
}

export default App