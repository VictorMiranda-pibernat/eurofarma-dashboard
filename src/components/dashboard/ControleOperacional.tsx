import { useMemo, useState } from 'react'
import { RefreshCw } from 'lucide-react'

import { Indicador } from './Indicador'
import { GraficoStatus } from './GraficoStatus'
import { TabelaProcessos } from './TabelaProcessos'

import type {
  ProcessoComPrazo,
  ConfiguracaoControle,
} from '../../types/controle' 

type ControleOperacionalProps = {
  dados: ProcessoComPrazo[]
  configuracao: ConfiguracaoControle
}

export function ControleOperacional({
  dados,
  configuracao,
}: ControleOperacionalProps) {
  const [planta, setPlanta] = useState('')
  const [modal, setModal] = useState('')
  const [categoria, setCategoria] = useState('')
  const [responsavel, setResponsavel] = useState('')

  const dadosFiltrados = useMemo(() => {
    return dados.filter((processo) => (
      (!planta || processo.planta === planta) &&
      (!modal || processo.modal === modal) &&
      (!categoria || processo.categoria === categoria) &&
      (!responsavel || processo.responsavel === responsavel)
    ))
  }, [dados, planta, modal, categoria, responsavel])

  const quantidade = (status: string) =>
    dadosFiltrados.filter((item) => item.farol === status).length

  function limparFiltros() {
    setPlanta('')
    setModal('')
    setCategoria('')
    setResponsavel('')
  }

  const opcoes = {
    planta: [...new Set(dados.map((item) => item.planta))],
    modal: [...new Set(dados.map((item) => item.modal))],
    categoria: [...new Set(dados.map((item) => item.categoria))],
    responsavel: [...new Set(dados.map((item) => item.responsavel))],
  }

  const classesSelect =
    'w-full rounded-lg border border-[#343640] bg-[#252731] px-3 py-3 text-sm text-gray-200 outline-none focus:border-blue-500'

  return (
    <section className="rounded-xl border border-[#343640] bg-[#15171E] p-5">

      <h2 className="mb-5 text-xl font-semibold text-white">
        {configuracao.titulo}
      </h2>

      {/* Filtros locais */}
      <div className="mb-6 flex flex-wrap items-center gap-3">

        <select
          className={classesSelect + ' flex-1'}
          value={planta}
          onChange={(e) => setPlanta(e.target.value)}
        >
          <option value="">Todas as plantas</option>
          {opcoes.planta.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          className={classesSelect + ' flex-1'}
          value={modal}
          onChange={(e) => setModal(e.target.value)}
        >
          <option value="">Todos os modais</option>
          {opcoes.modal.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          className={classesSelect + ' flex-1'}
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Todas as categorias</option>
          {opcoes.categoria.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          className={classesSelect + ' flex-1'}
          value={responsavel}
          onChange={(e) => setResponsavel(e.target.value)}
        >
          <option value="">Todos os responsáveis</option>
          {opcoes.responsavel.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <button
          onClick={limparFiltros}
          title="Limpar filtros"
          className="rounded-lg border border-[#41434D] bg-[#252731] p-3 text-gray-300 hover:bg-[#343640]"
        >
          <RefreshCw size={17} />
        </button>
      </div>

      {/* Indicadores e gráfico */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <div className="grid grid-cols-2 gap-x-6 gap-y-7 lg:col-span-2">
          <Indicador
            titulo="Total de processos"
            valor={dadosFiltrados.length}
          />

          <Indicador
            titulo="Dentro do Prazo"
            valor={quantidade('Dentro do Prazo')}
            cor="text-green-400"
          />

          <Indicador
            titulo="Atenção"
            valor={quantidade('Atenção')}
            cor="text-yellow-400"
          />

          <Indicador
            titulo="Alerta"
            valor={quantidade('Alerta')}
            cor="text-orange-400"
          />

          <Indicador
            titulo="Atrasados"
            valor={quantidade('Atraso')}
            cor="text-red-400"
          />

          <Indicador
            titulo="Pendentes"
            valor={quantidade('Pendente')}
            cor="text-gray-400"
          />
        </div>

        <GraficoStatus dados={dadosFiltrados} />
      </div>

      <TabelaProcessos
        dados={dadosFiltrados}
        colunas={configuracao.colunas}
      />

    </section>
  )
}