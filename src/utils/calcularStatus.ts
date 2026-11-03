import type {
  ProcessoImportacao,
  ProcessoComPrazo,
  StatusPrazo,
} from '../types/controle'

import type {
  ConfiguracaoSla,
  Modal,
} from '../types/metricas'

function converterData(valor: string | null): Date | null {
  if (!valor) return null

  // Data brasileira: DD/MM/AAAA
  const partesBR = valor.match(
    /^(\d{2})\/(\d{2})\/(\d{4})$/,
  )

  if (partesBR) {
    return new Date(
      Number(partesBR[3]),
      Number(partesBR[2]) - 1,
      Number(partesBR[1]),
    )
  }

  // Data ISO sem horário: AAAA-MM-DD
  const partesISO = valor.match(
    /^(\d{4})-(\d{2})-(\d{2})$/,
  )

  if (partesISO) {
    return new Date(
      Number(partesISO[1]),
      Number(partesISO[2]) - 1,
      Number(partesISO[3]),
    )
  }

  // Data ISO com horário
  const data = new Date(valor)

  return Number.isNaN(data.getTime()) ? null : data
}

function calcularHoras(
  inicio: string | null,
  fim: string | null,
): number {
  const dataInicio = converterData(inicio)
  const dataFim = fim ? converterData(fim) : new Date()

  if (!dataInicio || !dataFim) return 0

  const diferenca =
    dataFim.getTime() - dataInicio.getTime()

  const horas = diferenca / (1000 * 60 * 60)

  return Math.max(0, Number(horas.toFixed(2)))
}

function identificarModal(modal: string): Modal | null {
  const valor = modal.trim().toLowerCase()

  if (valor === 'aéreo' || valor === 'aereo') {
    return 'Aéreo'
  }

  if (valor === 'marítimo' || valor === 'maritimo') {
    return 'Marítimo'
  }

  if (valor === 'rodoviário' || valor === 'rodoviario') {
    return 'Rodoviário'
  }

  return null
}

export function classificarPrazoPorHoras(
  horas: number,
  faixas: ConfiguracaoSla[keyof ConfiguracaoSla],
): StatusPrazo {
  if (horas <= faixas.verdeAteHoras) {
    return 'Dentro do Prazo'
  }

  if (horas <= faixas.atencaoAteHoras) {
    return 'Atenção'
  }

  if (horas <= faixas.alertaAteHoras) {
    return 'Alerta'
  }

  return 'Atraso'
}

export function calcularProcessos(
  dados: ProcessoImportacao[],
  dataInicio: keyof ProcessoImportacao,
  dataFim: keyof ProcessoImportacao,
  slaPorModal: ConfiguracaoSla,
): ProcessoComPrazo[] {
  return dados.map((processo) => {
    const inicio = processo[dataInicio] as string | null
    const fim = processo[dataFim] as string | null

    const horas = calcularHoras(inicio, fim)
    const dias = Number((horas / 24).toFixed(2))

    const modal = identificarModal(processo.modal)

    let farol: StatusPrazo = 'Pendente'

    if (inicio && modal) {
      farol = classificarPrazoPorHoras(
        horas,
        slaPorModal[modal],
      )
    }

    return {
      ...processo,
      horas,
      dias,
      farol,
    }
  })
}