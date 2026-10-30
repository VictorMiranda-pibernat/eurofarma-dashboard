type IndicadorProps = {
  titulo: string
  valor: number
  cor?: string
}

export function Indicador({
  titulo,
  valor,
  cor = 'text-white',
}: IndicadorProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-300">{titulo}</p>

      <p className={`text-3xl font-medium ${cor}`}>
        {valor}
      </p>
    </div>
  )
}