import styled from 'styled-components'
import { Image } from 'react-bootstrap'

const OneStopWrapper = styled.div`
  margin-top: 150px;
`
const OneStopTop = styled.div`
  text-align: center;
  > p {
    font-weight: bold;
    font-size: 25px;
  }

  > img {
    position: relative;
    right: 155px;
    top: 25px;
  }
`
const UIImages = styled.div`
  @media (max-width: 700px) {
    display: block;
  }
  @media (min-width: 701px) {
    display: flex;
  }
`
const ImageCard = styled.div`
  @media (max-width: 700px) {
    width: 100%;
  }
  @media (min-width: 701px) {
    width: 50%;
  }
`
const ImageElem = styled(Image)`
  width: 100%;
`

export default function OneStop() {
  return (
    <OneStopWrapper>
      <OneStopTop>
        <Image src={'/text_decorator.png'} alt='' width={'100px'} height={'70px'} />
        <p>全てがワンストップで</p>
      </OneStopTop>
      <UIImages>
        <ImageCard>
          <ImageElem src={'/chat_screen_shot.png'} alt='' />
        </ImageCard>
        <ImageCard>
          <ImageElem src={'/group_profile_screen_shot.png'} alt='' />
        </ImageCard>
      </UIImages>
    </OneStopWrapper>
  )
}
