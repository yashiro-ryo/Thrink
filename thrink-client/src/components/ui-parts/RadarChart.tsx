import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { styled } from 'styled-components'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export function RadarChart() {
  const data = {
    labels: ['本気度', '人数', '雰囲気'],
    datasets: [
      {
        data: [7, 9, 8],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }
  const options = {
    maintainAspectRatio: false,
    responsive: false,
    scales: {
      r: {
        min: 0,
        max: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }
  return <Radar data={data} options={options} width={250} height={250} />
}
