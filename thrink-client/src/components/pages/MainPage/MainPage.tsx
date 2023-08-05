import { Container } from 'react-bootstrap'
import TopLogo from './TopLogo'
import ProductDescribe from './ProductDescribe'
import AppealPoints from './AppealPoints'
import OneStop from './OneStop'
import Problems from './Problems'
import Arrows from './Arrows'

export default function MainPage() {
  return (
    <>
      <Container>
        <TopLogo />
        <ProductDescribe />
        <AppealPoints />
        <Arrows />
        <OneStop />
      </Container>
      <Problems />
    </>
  )
}
