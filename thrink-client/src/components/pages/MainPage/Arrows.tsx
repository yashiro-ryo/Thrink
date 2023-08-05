import styled from 'styled-components'
const ArrowsContainer = styled.div`
  display: flex;
`
const ArrowContainerForDesktop = styled.div`
  margin: 5px;
  @media (max-width: 700px) {
    display: none;
  }
  @media (min-width: 701px) {
    width: 33%;
  }
`
const ArrowContainerForMobile = styled.div`
  margin: 5px;
  @media (max-width: 700px) {
    width: 100%;
  }
  @media (min-width: 701px) {
    display: none;
  }
`
const ArrowLeft = styled.div`
  margin: 0 auto;
  position: relative; /*ボックスの位置指定 */
  top: 40px;
  width: 150px; /* ボックスの横幅を指定する */
  height: 30px; /* ボックスの高さを指定する */
  background: #666666; /* ボックスの背景色を指定する */
  transform: rotate(45deg);
  &:after {
    position: absolute; /* 三角形の位置指定 */
    content: ''; /* 三角形のコンテンツ */
    top: -15px; /* 上部から配置の基準位置を決める */
    right: -55px; /* 右から配置の基準位置を決める */
    border: 30px solid; /* 境界線を指定する */
    border-color: transparent; /* 境界線の色をなしにする */
    border-left: 30px solid #666666; /* 境界線の上部を実線で指定する */
  }
`
const ArrowCenter = styled.div`
  margin: 0 auto;
  position: relative; /*ボックスの位置指定 */
  top: 35px;
  width: 100px; /* ボックスの横幅を指定する */
  height: 30px; /* ボックスの高さを指定する */
  background: #666666; /* ボックスの背景色を指定する */
  transform: rotate(90deg);
  &:after {
    position: absolute; /* 三角形の位置指定 */
    content: ''; /* 三角形のコンテンツ */
    top: -15px; /* 上部から配置の基準位置を決める */
    right: -60px; /* 右から配置の基準位置を決める */
    border: 30px solid; /* 境界線を指定する */
    border-color: transparent; /* 境界線の色をなしにする */
    border-left: 30px solid #666666; /* 境界線の上部を実線で指定する */
  }
`
const ArrowRight = styled.div`
  margin: 0 auto;
  position: relative; /*ボックスの位置指定 */
  top: 40px;
  width: 150px; /* ボックスの横幅を指定する */
  height: 30px; /* ボックスの高さを指定する */
  background: #666666; /* ボックスの背景色を指定する */
  transform: rotate(135deg);
  &:after {
    position: absolute; /* 三角形の位置指定 */
    content: ''; /* 三角形のコンテンツ */
    top: -15px; /* 上部から配置の基準位置を決める */
    right: -50px; /* 右から配置の基準位置を決める */
    border: 30px solid; /* 境界線を指定する */
    border-color: transparent; /* 境界線の色をなしにする */
    border-left: 30px solid #666666; /* 境界線の上部を実線で指定する */
  }
`

export default function Arrows() {
  return (
    <ArrowsContainer>
      <ArrowContainerForDesktop>
        <ArrowLeft />
      </ArrowContainerForDesktop>
      <ArrowContainerForDesktop>
        <ArrowCenter />
      </ArrowContainerForDesktop>
      <ArrowContainerForDesktop>
        <ArrowRight />
      </ArrowContainerForDesktop>
      <ArrowContainerForMobile>
        <ArrowCenter />
      </ArrowContainerForMobile>
    </ArrowsContainer>
  )
}
