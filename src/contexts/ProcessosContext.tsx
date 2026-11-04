import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { ProcessoImportacao } from '../types/controle'
import { mockProntidao } from '../data/mockProntidao'
import { mockIndicadores } from '../data/mockIndicadores'
import { mockDesembaraco } from '../data/mockDesembaraco'
import { mockLogistica } from '../data/mockLogistica'
import { mockGestaoContainers } from '../data/mockGestaoContainers'
import { mockArmazenagemLeadTime } from '../data/mockArmazenagemLeadTime'

type ProcessosContextType = {
  processos: ProcessoImportacao[]
  carregando: boolean
  erro: string | null
  origem: 'bigquery' | 'cache' | 'mock'
  total: number
  atualizadoEm: string | null
  recarregar: () => Promise<void>
  // Getters para cada módulo (com fallback elegante para mock caso não haja dados reais)
  getProcessosProntidao: () => ProcessoImportacao[]
  getProcessosIndicadores: () => ProcessoImportacao[]
  getProcessosDesembaraco: () => ProcessoImportacao[]
  getProcessosLogistica: () => ProcessoImportacao[]
  getProcessosGestaoContainers: () => ProcessoImportacao[]
  getProcessosArmazenagem: () => ProcessoImportacao[]
}

const ProcessosContext = createContext<ProcessosContextType | undefined>(undefined)

export function ProcessosProvider({ children }: { children: React.ReactNode }) {
  const [processos, setProcessos] = useState<ProcessoImportacao[]>([])
  const [carregando, setCarregando] = useState<boolean>(true)
  const [erro, setErro] = useState<string | null>(null)
  const [origem, setOrigem] = useState<'bigquery' | 'cache' | 'mock'>('mock')
  const [total, setTotal] = useState<number>(0)
  const [atualizadoEm, setAtualizadoEm] = useState<string | null>(null)

  const carregarDados = useCallback(async (forceRefresh = false) => {
    try {
      setCarregando(true)
      setErro(null)

      const url = forceRefresh ? '/api/processos?refresh=true' : '/api/processos'
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Servidor respondeu com status ${response.status}`)
      }

      const payload = await response.json()
      if (Array.isArray(payload.dados) && payload.dados.length > 0) {
        setProcessos(payload.dados)
        setTotal(payload.total || payload.dados.length)
        setOrigem(payload.origem?.includes('cache') ? 'cache' : 'bigquery')
        setAtualizadoEm(payload.atualizadoEm || new Date().toISOString())
      } else {
        // Sem dados retornados do BigQuery, mantém mock
        setOrigem('mock')
      }
    } catch (err: any) {
      console.warn('[ProcessosContext] Não foi possível carregar do BigQuery (/api/processos). Usando dados locais.', err)
      setErro(err?.message || 'Falha na conexão com a API do BigQuery')
      setOrigem('mock')
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    carregarDados()
  }, [carregarDados])

  const recarregar = async () => {
    await carregarDados(true)
  }

  // Se houver processos reais carregados do BigQuery, utiliza-os. Senão, recorre ao mock específico de cada tela.
  const getProcessosProntidao = () => (processos.length > 0 ? processos : mockProntidao)
  const getProcessosIndicadores = () => (processos.length > 0 ? processos : mockIndicadores)
  const getProcessosDesembaraco = () => (processos.length > 0 ? processos : mockDesembaraco)
  const getProcessosLogistica = () => (processos.length > 0 ? processos : mockLogistica)
  const getProcessosGestaoContainers = () => (processos.length > 0 ? processos : mockGestaoContainers)
  const getProcessosArmazenagem = () => (processos.length > 0 ? processos : mockArmazenagemLeadTime)

  return (
    <ProcessosContext.Provider
      value={{
        processos,
        carregando,
        erro,
        origem,
        total: processos.length > 0 ? processos.length : total,
        atualizadoEm,
        recarregar,
        getProcessosProntidao,
        getProcessosIndicadores,
        getProcessosDesembaraco,
        getProcessosLogistica,
        getProcessosGestaoContainers,
        getProcessosArmazenagem,
      }}
    >
      {children}
    </ProcessosContext.Provider>
  )
}

export function useProcessos() {
  const context = useContext(ProcessosContext)
  if (!context) {
    throw new Error('useProcessos deve ser utilizado dentro de um ProcessosProvider')
  }
  return context
}

