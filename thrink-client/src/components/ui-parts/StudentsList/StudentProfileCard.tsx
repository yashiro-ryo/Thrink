import { Card, Button, Image } from 'react-bootstrap'
import styled from 'styled-components'
import { MdPlace } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { StudentDigest } from '@/values/Students'

const FooterButtonGroup = styled.div`
  display: flex;
`

const StyledButton = styled(Button)`
  margin-right: 5px;
`

const CardStyle = styled(Card)`
  width: 350px;
  cursor: pointer;
`

const HeaderGroup = styled.div`
  display: flex;
  justify-content: space-between;
`

const HeaderNameAndAffliation = styled.div`
  display: block;
`

const AffliationPart = styled.div`
  display: flex;
`

const StyledPlaceIcon = styled(MdPlace)`
  width: 20px;
  height: 20px;
`

type Props = {
  studentDigest: StudentDigest
}

export default function StudentCard(props: Props) {
  const router = useRouter()
  const redirectProfileDetailPage = () => {
    // FIXME student typeでリダイレクト先を変更させる
    router.push(`/student/${props.studentDigest.uid}`)
  }
  return (
    <CardStyle onClick={() => redirectProfileDetailPage()}>
      <Card.Body>
        <HeaderGroup>
          <HeaderNameAndAffliation>
            <h4>{props.studentDigest.displayName}</h4>
          </HeaderNameAndAffliation>
          <Image
            src='/user-blank.png'
            roundedCircle
            alt='ユーザーのプロフィール画像'
            width={'60px'}
            height={'60px'}
          />
        </HeaderGroup>
        <FooterButtonGroup>
          <StyledButton variant='primary' href={`/chat/${props.studentDigest.uid}`}>
            メッセージを送る
          </StyledButton>
          <Button variant='secondary' href={`/like/${props.studentDigest.uid}`}>
            いいね
          </Button>
        </FooterButtonGroup>
      </Card.Body>
    </CardStyle>
  )
}
