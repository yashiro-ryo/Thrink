import { RadarChart } from '@/components/ui-parts/RadarChart'
import { styled } from 'styled-components'

const RadarChartWrapperStyle = styled.div`
  width: 100%;
`
export default function RadarChartWrapper() {
  return (
    <RadarChartWrapperStyle>
      <p>この団体のバロメータ</p>
      <RadarChart />
    </RadarChartWrapperStyle>
  )
}
