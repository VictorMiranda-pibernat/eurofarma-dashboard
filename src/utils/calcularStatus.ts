import type {
  ProcessoImportacao,
  ProcessoComPrazo,
  StatusPrazo,
} from '../types/controle'

function converterData(valor: string | null): Date | null {
  if (!valor) return null

  const partesBR = valor.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)

  const data = partesBR
    ? new Date(
        Number(partesBR[3]),
        Number(partesBR[2]) - 1,
        Number(partesBR[1]),
      )
    : new Date(`${valor.slice(0, 10)}T00:00:00`)

  return Number.isNaN(data.getTime()) ? null : data
}

function calcularDias(
  inicio: string | null,
  fim: string | null,
): number {
  const dataInicio = converterData(inicio)
  const dataFim = fim
    ? converterData(fim)
    : new Date()

  if (!dataInicio || !dataFim) return 0

  const inicioDia = new Date(
    dataInicio.getFullYear(),
    dataInicio.getMonth(),
    dataInicio.getDate(),
  )

  const fimDia = new Date(
    dataFim.getFullYear(),
    dataFim.getMonth(),
    dataFim.getDate(),
  )

  const diferenca =
    fimDia.getTime() - inicioDia.getTime()

  return Math.max(
    0,
    Math.floor(diferenca / (1000 * 60 * 60 * 24)),
  )
}

export function classificarPrazo(dias: number): StatusPrazo {
  if (dias <= 1) return 'Dentro do Prazo'
  if (dias === 2) return 'Atenção'
  if (dias <= 4) return 'Alerta'

  return 'Atraso'
}

export function calcularProcessos(
  dados: ProcessoImportacao[],
  dataInicio: keyof ProcessoImportacao,
  dataFim: keyof ProcessoImportacao,
): ProcessoComPrazo[] {
  return dados.map((processo) => {
    const inicio = processo[dataInicio] as string | null
    const fim = processo[dataFim] as string | null

    const dias = calcularDias(inicio, fim)

    const farol: StatusPrazo = !inicio
      ? 'Pendente'
      : classificarPrazo(dias)

    return {
      ...processo,
      dias,
      farol,
    }
  })
}