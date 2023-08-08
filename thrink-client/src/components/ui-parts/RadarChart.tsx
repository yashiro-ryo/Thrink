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

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

type Props = {
  radar1: number
  radar2: number
  radar3: number
}
export function RadarChart(props: Props) {
  const data = {
    labels: ['本気度', '雰囲気', '目標感'],
    datasets: [
      {
        data: [props.radar1, props.radar2, props.radar3],
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
