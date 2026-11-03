import type {
  ProcessoImportacao,
  ProcessoComPrazo,
  StatusPrazo,
} from '../types/controle'

import type {
  ConfiguracaoSla,
  Modal,
  CalendarioOperacional,
} from '../types/metricas'

import { calendarioPadrao } from '../types/metricas'

function converterData(valor: string | null): Date | null {
  if (!valor) return null

  // Data brasileira: DD/MM/AAAA
  const partesBR = valor.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)

  if (partesBR) {
    return new Date(
      Number(partesBR[3]),
      Number(partesBR[2]) - 1,
      Number(partesBR[1]),
    )
  }

  // Data ISO sem horário: AAAA-MM-DD
  const partesISO = valor.match(/^(\d{4})-(\d{2})-(\d{2})$/)

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

function formatarData(data: Date): string {
  const ano = data.getFullYear()
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const dia = String(data.getDate()).padStart(2, '0')

  return `${ano}-${mes}-${dia}`
}

function calcularHorasUteis(
  inicio: string | null,
  fim: string | null,
  calendario: CalendarioOperacional,
): number {
  const dataInicio = converterData(inicio)
  const dataFim = fim ? converterData(fim) : new Date()

  if (!dataInicio || !dataFim) return 0

  if (dataFim <= dataInicio) return 0

  const feriados = new Set(calendario.feriados)

  let totalMilissegundos = 0

  const diaAtual = new Date(
    dataInicio.getFullYear(),
    dataInicio.getMonth(),
    dataInicio.getDate(),
  )

  while (diaAtual < dataFim) {
    const diaSemana = diaAtual.getDay()
    const dataFormatada = formatarData(diaAtual)

    const diaConsiderado =
      calendario.diasConsiderados.includes(diaSemana) &&
      !feriados.has(dataFormatada)

    if (diaConsiderado) {
      const inicioDoDia = new Date(diaAtual)
      const fimDoDia = new Date(diaAtual)
      fimDoDia.setDate(fimDoDia.getDate() + 1)

      const inicioContagem = Math.max(
        dataInicio.getTime(),
        inicioDoDia.getTime(),
      )

      const fimContagem = Math.min(
        dataFim.getTime(),
        fimDoDia.getTime(),
      )

      if (fimContagem > inicioContagem) {
        totalMilissegundos += fimContagem - inicioContagem
      }
    }

    diaAtual.setDate(diaAtual.getDate() + 1)
  }

  const horas = totalMilissegundos / (1000 * 60 * 60)

  return Number(horas.toFixed(2))
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
  calendario: CalendarioOperacional | Record<Modal, CalendarioOperacional> = calendarioPadrao,
): ProcessoComPrazo[] {
  return dados.map((processo) => {
    const inicio = processo[dataInicio] as string | null
    const fim = processo[dataFim] as string | null

    const modal = identificarModal(processo.modal)

    // Aceita tanto um calendário único quanto um calendário por modal.
    const calendarioSelecionado =
      'diasConsiderados' in calendario
        ? calendario
        : modal
          ? calendario[modal]
          : calendarioPadrao

    const horas = calcularHorasUteis(
      inicio,
      fim,
      calendarioSelecionado,
    )

    const dias = Number((horas / 24).toFixed(2))

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