'use client'

import { StatsData } from '@/actions/stats-get'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { VictoryBar, VictoryChart, VictoryPie } from 'victory'

type GraphData = {
  x: string
  y: number
}

type ContaEstatisticasProps = {
  data: StatsData[]
}

export default function ContaEstatisticas({ data }: ContaEstatisticasProps) {
  const [graph, setGraph] = useState<GraphData[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const graphData = data.map((item) => {
      return {
        x: item.title,
        y: Number(item.acessos),
      }
    })

    setTotal(
      data.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b, 0),
    )

    setGraph(graphData)
  }, [data])

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#fff',
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: '#333',
            },
          }}
        />
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar alignment="start" data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  )
}
