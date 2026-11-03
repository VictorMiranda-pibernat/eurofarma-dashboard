
import { useState } from 'react'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'
import { Prontidao } from './pages/Prontidao'
import { Indicadores } from './pages/Indicadores'
import { Desembaraco } from './pages/Desembaraco'
import { Logistica } from './pages/Logistica'

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('Home')

  return (
    <Layout paginaAtiva={paginaAtiva} onMudarPagina={setPaginaAtiva}>
      {paginaAtiva === 'Home' && <Home />}
      {paginaAtiva === 'Prontidão' && <Prontidao />}
      {paginaAtiva === 'Indicadores' && <Indicadores />}
      {paginaAtiva === 'Desembaraço' && <Desembaraco />}
      {paginaAtiva === 'Logística e Entregas' && <Logistica />}
    </Layout>
  )
}

export default App
