import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'

import type { ProcessoComPrazo } from '../../types/controle'

const cores: Record<string, string> = {
  'Dentro do Prazo': '#16A34A',
  Atenção: '#EAB308',
  Alerta: '#F97316',
  Atraso: '#DC2626',
  Pendente: '#6B7280',
}

type GraficoStatusProps = {
  dados: ProcessoComPrazo[]
}

export function GraficoStatus({ dados }: GraficoStatusProps) {
  const status = Object.entries(cores).map(([nome, cor]) => ({
    name: nome,
    value: dados.filter((item) => item.farol === nome).length,
    cor,
  })).filter((item) => item.value > 0)

  return (
    <div className="min-h-[260px]">
      <h3 className="mb-2 text-center text-sm font-semibold text-white">
        Distribuição por status
      </h3>

      {dados.length > 0 ? (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={status}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={85}
              paddingAngle={2}
              label={({ percent }) =>
                `${((percent ?? 0) * 100).toFixed(0)}%`
              }
            >
              {status.map((item) => (
                <Cell key={item.name} fill={item.cor} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: '#252731',
                border: '1px solid #41434D',
                borderRadius: '8px',
                color: '#fff',
              }}
            />

            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              wrapperStyle={{
                color: '#D1D5DB',
                fontSize: '11px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="pt-20 text-center text-sm text-gray-500">
          Nenhum processo encontrado.
        </p>
      )}
    </div>
  )
}