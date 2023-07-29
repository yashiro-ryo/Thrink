import styled from 'styled-components'
import { Image } from 'react-bootstrap'

const ProductDescribeWrapper = styled.div`
  @media (max-width: 700px) {
    display: block;
  }
  @media (min-width: 701px) {
    display: flex;
  }
`
const DescribeTextWrapper = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 25px;
  @media (max-width: 700px) {
    width: 100%;
  }
  @media (min-width: 701px) {
    width: 50%;
  }
`
const DescribeFigureWrapper = styled.div`
  text-align: center;
  @media (max-width: 700px) {
    margin-top: 50px;
    width: 100%;
  }
  @media (min-width: 701px) {
    width: 50%;
  }
`

export default function ProductDescribe() {
  return (
    <ProductDescribeWrapper>
      <DescribeTextWrapper>
        「部活動・地域クラブ」<br></br>「学生コーチ」<br></br>「こども・保護者」<br></br>
        3者をつなぐマッチングスペース
      </DescribeTextWrapper>
      <DescribeFigureWrapper>
        <Image src={'/describe_figure.png'} alt='' width={'300px'} />
      </DescribeFigureWrapper>
    </ProductDescribeWrapper>
  )
}
