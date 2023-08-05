import styled from 'styled-components'
import { Image } from 'react-bootstrap'

const ProblemsWrapper = styled.div`
  text-align: center;
  margin: 150px 0;
  font-size: 25px;
  display: flex;
  width: calc(100wh);
`
const ProblemParagraphBottom = styled.div`
  margin-top: 50px;
`
const Left = styled.div`
  @media (max-width: 700px) {
    display: none;
  }
  @media (min-width: 701px) {
    width: 15%;
    > img {
      width: 100%;
      max-width: 150px;
    }
  }
`
const Center = styled.div`
  @media (max-width: 700px) {
    width: 80%;
    margin: 0 auto;
  }
  @media (min-width: 701px) {
    width: 70%;
    margin-top: 50px;
  }
`
const Right = styled.div`
  @media (max-width: 700px) {
    display: none;
  }
  @media (min-width: 701px) {
    width: 15%;
    > img {
      width: 100%;
      max-width: 150px;
    }
  }
`

export default function Problems() {
  return (
    <ProblemsWrapper>
      <Left>
        <Image src={`/left-bar.webp`} alt='' />
      </Left>
      <Center>
        <div>
          <p>
            2023年度4月から部活動の地域移行が始動。<br></br>ところが、そこには「チームの指導者不足」
            <br></br>「生徒・保護者がチームを知る機会が少ない」<br></br>という問題があります。
          </p>
        </div>
        <ProblemParagraphBottom>
          <p>
            Thrinkは、この解決を目指して<br></br>
            「部活動・クラブチーム」と「スポーツ等の歴がある大学生ら<br></br>
            の学生コーチ」をマッチングしたり<br></br>
            チーム側が生徒・保護者に向けて活動情報を発信したり
            <br></br>する機会を提供します。
          </p>
        </ProblemParagraphBottom>
      </Center>
      <Right>
        <Image src={`/right-bar.webp`} alt='' />
      </Right>
    </ProblemsWrapper>
  )
}
