import { RadarChart } from '@/components/ui-parts/RadarChart'
import { styled } from 'styled-components'

const RadarChartWrapperStyle = styled.div`
  width: 100%;
`
type Props = {
  radar1: number
  radar2: number
  radar3: number
}
export default function RadarChartWrapper(props: Props) {
  return (
    <RadarChartWrapperStyle>
      <p>この団体のバロメータ</p>
      <RadarChart radar1={props.radar1} radar2={props.radar2} radar3={props.radar3} />
    </RadarChartWrapperStyle>
  )
}
