import { Image } from 'react-bootstrap'
import styled from 'styled-components'

const StyledTopLogo = styled.div`
  display: block;
`
const SubTitleWrapper = styled.div`
  text-align: center;
  margin-top: 100px;
  > p {
    font-size: 30px;
    font-weight: bold;
  }
`
const LogoWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 100px;
`
const StyledLogo = styled(Image)`
  max-width: 700px;
  width: 100%;
`

export default function TopLogo() {
  return (
    <StyledTopLogo>
      <SubTitleWrapper>
        <p>部活動 地域移行による課題解決への大きな一歩を</p>
      </SubTitleWrapper>
      <LogoWrapper>
        <StyledLogo src={'/thrink_logo.png'} alt='Thrinkのロゴ' width={'100%'} height={'100%'} />
      </LogoWrapper>
    </StyledTopLogo>
  )
}
