import { Container } from 'react-bootstrap'
import TopLogo from './TopLogo'
import ProductDescribe from './ProductDescribe'
import AppealPoints from './AppealPoints'
import OneStop from './OneStop'
import Problems from './Problems'

export default function MainPage() {
  return (
    <Container>
      <TopLogo />
      <ProductDescribe />
      <AppealPoints />
      <OneStop />
      <Problems />
    </Container>
  )
}
