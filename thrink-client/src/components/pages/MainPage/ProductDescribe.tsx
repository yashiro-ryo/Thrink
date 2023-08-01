import styled from 'styled-components'
import { Image } from 'react-bootstrap'

const ProductDescribeWrapper = styled.div`
  margin-top: 150px;
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
const TeamText = styled.p`
  width: fit-content;
  margin: 0 auto;
  background: linear-gradient(transparent 70%, #ffcc66 0%);
`
const StudentText = styled.p`
  width: fit-content;
  margin: 0 auto;
  background: linear-gradient(transparent 70%, #6699cc 0%);
`
const ChildrenText = styled.p`
  width: fit-content;
  margin: 0 auto;
  background: linear-gradient(transparent 70%, #99cc33 0%);
`

export default function ProductDescribe() {
  return (
    <ProductDescribeWrapper>
      <DescribeTextWrapper>
        <TeamText>「部活動・地域クラブ」</TeamText>
        <StudentText>「学生コーチ」</StudentText>
        <ChildrenText>「こども・保護者」</ChildrenText>
        3者をつなぐマッチングスペース
      </DescribeTextWrapper>
      <DescribeFigureWrapper>
        <Image src={'/describe_figure.png'} alt='' width={'300px'} />
      </DescribeFigureWrapper>
    </ProductDescribeWrapper>
  )
}
