import { Card, Button, Image } from 'react-bootstrap'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import { GroupDigest } from '@/values/Groups'

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

type Props = {
  groupDigest: GroupDigest
}

export default function StudentCard(props: Props) {
  const router = useRouter()
  const redirectProfileDetailPage = () => {
    // FIXME user typeでリダイレクト先を変更させる
    router.push(`/group/${props.groupDigest.uid}`)
  }
  return (
    <CardStyle onClick={() => redirectProfileDetailPage()}>
      <Card.Body>
        <HeaderGroup>
          <HeaderNameAndAffliation>
            <h4>{props.groupDigest.displayName}</h4>
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
          <StyledButton variant='primary' href={`/chat/${props.groupDigest.uid}`}>
            メッセージを送る
          </StyledButton>
          <Button variant='secondary' href={`/like/${props.groupDigest.uid}`}>
            いいね
          </Button>
        </FooterButtonGroup>
      </Card.Body>
    </CardStyle>
  )
}
