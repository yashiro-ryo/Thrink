import styled from 'styled-components'

const OneStopTop = styled.div`
  > p {
    text-align: center;
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
  // for debug
  border: 2px solid #636363;
  @media (max-width: 700px) {
    width: 100%;
  }
  @media (min-width: 701px) {
    width: 50%;
  }
`

export default function OneStop() {
  return (
    <div>
      <OneStopTop>
        <p>全てがワンストップで</p>
      </OneStopTop>
      <UIImages>
        <ImageCard>
          <p>chatページの画像(UI未完成)</p>
        </ImageCard>
        <ImageCard>
          <p>バロメータの画像(UI未実装)</p>
        </ImageCard>
      </UIImages>
    </div>
  )
}
