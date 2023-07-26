import { Card, Button, Image } from 'react-bootstrap'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import { StudentDigest } from '@/values/Students'
import { cutOverStr } from '@/lib/stringHelper'
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
  studentDigest: StudentDigest
}

export default function StudentCard(props: Props) {
  const router = useRouter()
  const redirectProfileDetailPage = () => {
    // FIXME student typeでリダイレクト先を変更させる
    router.push(`/student/${props.studentDigest.uid}`)
  }
  const nullCheck = (maybeStr: string | null): string => {
    return maybeStr === null ? '' : maybeStr
  }
  return (
    <CardStyle onClick={() => redirectProfileDetailPage()}>
      <Card.Body>
        <HeaderGroup>
          <HeaderNameAndAffliation>
            <h4>{props.studentDigest.displayName}</h4>
          </HeaderNameAndAffliation>
          <Image
            src={filterIconImgUrl(props.studentDigest)}
            roundedCircle
            alt='ユーザーのプロフィール画像'
            width={'60px'}
            height={'60px'}
          />
        </HeaderGroup>
        <p>{cutOverStr(nullCheck(props.studentDigest.experience), 30)}</p>
      </Card.Body>
    </CardStyle>
  )
}
