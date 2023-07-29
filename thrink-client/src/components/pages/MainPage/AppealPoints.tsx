import { Image } from 'react-bootstrap'
import styled from 'styled-components'

const AppealPointsWrapper = styled.div`
  margin: 50px 0;
`
const AppealPointsTopStyle = styled.div`
  > p {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
  }
`
const CardsWrapper = styled.div`
  @media (max-width: 700px) {
    display: block;
  }
  @media (min-width: 701px) {
    display: flex;
  }
`
const CardWrapper = styled.div`
  margin: 5px;
`
const CardTopWrapper = styled.div`
  > p {
    text-align: center;
  }
`
const Card1BodyWrapper = styled.div`
  background-color: #ffcc66;
  > div > p {
    color: #ffffff;
  }
  padding: 10px;
  height: 400px;
`
const Card2BodyWrapper = styled.div`
  background-color: #6699cc;
  > div > p {
    color: #ffffff;
  }
  padding: 10px;
  height: 400px;
`
const Card3BodyWrapper = styled.div`
  background-color: #99cc33;
  > div > p {
    color: #ffffff;
  }
  padding: 10px;
  height: 400px;
`
const ImageWrapper = styled.div`
  max-width: 300px;
  width: 100%;
  height: 300px;
`
const StyledCardImage = styled(Image)`
  max-width: 300px;
  width: 100%;
`

export default function AppealPoints() {
  return (
    <AppealPointsWrapper>
      <AppealPointsTopStyle>
        <p>Thrinkにできること</p>
      </AppealPointsTopStyle>
      <CardsWrapper>
        <CardWrapper>
          <CardTopWrapper>
            <p>チーム側</p>
          </CardTopWrapper>
          <Card1BodyWrapper>
            <ImageWrapper>
              <StyledCardImage src={'/for_team.png'} alt='' />
            </ImageWrapper>
            <div>
              <p>チームのＰＲ、近況報告の投稿、子ども・保護者や学生コーチとの やりとりができる。</p>
            </div>
          </Card1BodyWrapper>
        </CardWrapper>
        <CardWrapper>
          <CardTopWrapper>
            <p>子ども・保護者側</p>
          </CardTopWrapper>
          <Card2BodyWrapper>
            <ImageWrapper>
              <StyledCardImage src={'/for_kids.png'} alt='' />
            </ImageWrapper>
            <div>
              <p>入りたいチームの検索、 チームの比較、チームに 対する相談が容易にできる。</p>
            </div>
          </Card2BodyWrapper>
        </CardWrapper>
        <CardWrapper>
          <CardTopWrapper>
            <p>学生コーチ側</p>
          </CardTopWrapper>
          <Card3BodyWrapper>
            <ImageWrapper>
              <StyledCardImage src={'/for_students.png'} alt='' />
            </ImageWrapper>
            <div>
              <p>自分のニーズに合ったチームを 探すことができ、チーム側と やりとりもできる。</p>
            </div>
          </Card3BodyWrapper>
        </CardWrapper>
      </CardsWrapper>
    </AppealPointsWrapper>
  )
}
