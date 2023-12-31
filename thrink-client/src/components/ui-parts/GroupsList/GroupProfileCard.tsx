import { Card, Image } from 'react-bootstrap'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import { GroupDigest } from '@/values/Groups'
import { cutOverStr } from '@/lib/stringHelper'
import { nullCheck } from '@/lib/stringHelper'
import { filterIconImgUrl } from '@/lib/imgUrlHelper'

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
            src={filterIconImgUrl(props.groupDigest)}
            roundedCircle
            alt='ユーザーのプロフィール画像'
            width={'60px'}
            height={'60px'}
          />
        </HeaderGroup>
        <p>{cutOverStr(nullCheck(props.groupDigest.activityDetail), 30)}</p>
      </Card.Body>
    </CardStyle>
  )
}
