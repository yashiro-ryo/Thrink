import styled from 'styled-components'

const ProblemsWrapper = styled.div`
  text-align: center;
  margin: 150px 0;
  font-size: 25px;
`
const ProblemParagraphBottom = styled.div`
  margin-top: 50px;
`

export default function Problems() {
  return (
    <ProblemsWrapper>
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
    </ProblemsWrapper>
  )
}
