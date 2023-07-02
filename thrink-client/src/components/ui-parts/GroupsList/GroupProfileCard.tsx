import { Card, Button, Image } from 'react-bootstrap'
import styled from 'styled-components'
import { MdPlace } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { Group } from '@/values/Groups'

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
  group: Group
}

export default function StudentCard(props: Props) {
  const router = useRouter()
  const redirectProfileDetailPage = () => {
    // FIXME user typeでリダイレクト先を変更させる
    router.push(`/group/${props.group.id}`)
  }
  return (
    <CardStyle onClick={() => redirectProfileDetailPage()}>
      <Card.Body>
        <HeaderGroup>
          <HeaderNameAndAffliation>
            <h4>{props.group.name}</h4>
            <AffliationPart>
              <StyledPlaceIcon />
              <p>{props.group.location}</p>
            </AffliationPart>
          </HeaderNameAndAffliation>
          <Image
            src='/user-blank.png'
            roundedCircle
            alt='ユーザーのプロフィール画像'
            width={'60px'}
            height={'60px'}
          />
        </HeaderGroup>
        <p>{props.group.comment}</p>
        <FooterButtonGroup>
          <StyledButton variant='primary' href={`/chat/${props.group.id}`}>
            メッセージを送る
          </StyledButton>
          <Button variant='secondary' href={`/like/${props.group.id}`}>
            いいね
          </Button>
        </FooterButtonGroup>
      </Card.Body>
    </CardStyle>
  )
}
