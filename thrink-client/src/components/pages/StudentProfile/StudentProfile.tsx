import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Image, Button, Placeholder } from 'react-bootstrap'
import { StudentProfile } from '@/values/Students'
import apiClient from '@/lib/http-common'
import { nullCheck } from '@/lib/stringHelper'
import { filterIconImgUrl, filterHeaderImgUrl } from '@/lib/imgUrlHelper'
import { useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'

const HeaderImagePart = styled.div`
  width: 100%;
  height: 300px;
`

const UserIconPart = styled(Image)`
  width: 120px;
  height: 120px;
`

const CustomContainer = styled(Container)`
  @media screen and (min-width: 992px) {
    padding-left: 100px;
    padding-right: 100px;
  }
`

const UserProfileBody = styled.div`
  position: relative;
  top: -60px;
`
const UserProfileTop = styled.div`
  @media (max-width: 700px) {
    display: block;
    margin-bottom: 30px;
  }
  @media (min-width: 701px) {
    display: flex;
    justify-content: space-between;
  }
  > button {
    height: 38px;
  }
`
const StyledStudentDisplayName = styled.h3`
  margin-top: 20px;
  margin-bottom: 30px;
`
const StyledStudentProfileLabel = styled.h5`
  font-weight: bold;
`
const UserDisplayNamePlaceHolderWrapper = styled.div`
  width: 200px;
  height: 82px;
  padding-bottom: 30px;
`

export default function StudentProfile(props: { uidStr: string }) {
  // state
  const [visibleTabInfo, setVisibleTab] = useState<'experience' | 'awards' | 'comment' | 'links'>(
    'experience',
  )
  const [profile, setProfile] = useState<StudentProfile>({
    uid: 0,
    displayName: '',
    iconImgUrl: '',
    headerImgUrl: '',
    experience: '',
    awards: '',
    comment: '',
    links: '',
  })
  const [isLoading, setLoading] = useState(true)
  // Redux
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  // URL
  const router = useRouter()

  const getStudentProfile = (uid: number) => {
    apiClient.get(`/v1/students/${uid}`).then((res: any) => {
      setProfile(res.data.studentProfile)
      setLoading(false)
    })
  }
  useEffect(() => {
    getStudentProfile(Number(props.uidStr))
  }, [props.uidStr])

  const createChatroom = () => {
    if (userProfileMeta === null) {
      router.push(`/signin?redirect=student-${props.uidStr}`)
      return
    }
    if (userProfileMeta.uid === Number(props.uidStr)) {
      alert('同じユーザーにメッセージを送ることはできません')
      return
    }
    apiClient
      .post(`/v1/chat/create`, {
        u1Uid: userProfileMeta.uid,
        u2Uid: props.uidStr,
      })
      .then((res) => {
        // chatroom取得
        router.push(`/chat?rid=${res.data.chatroomId}`)
      })
  }

  const UserProfileNull = () => {
    return (
      <div>
        <p>プロフィールの取得に失敗しました。</p>
        <Button href={`/student/${props.uidStr}`} variant='secondary'>
          リロードする
        </Button>
      </div>
    )
  }

  const StudentListItem = (props: { titleText: string; bodyText: string | null }) => {
    return (
      <>
        <StyledStudentProfileLabel>{props.titleText}</StyledStudentProfileLabel>
        {isLoading ? (
          <Placeholder as='p' animation='glow'>
            <Placeholder xs={6} />
          </Placeholder>
        ) : (
          <p>{nullCheck(props.bodyText)}</p>
        )}
      </>
    )
  }

  return (
    <div>
      <HeaderImagePart>
        <Image
          src={filterHeaderImgUrl(profile)}
          alt='ヘッダー画像'
          width={'100%'}
          height={'100%'}
        />
      </HeaderImagePart>
      <CustomContainer>
        <UserProfileBody>
          <UserIconPart
            src={filterIconImgUrl(profile)}
            roundedCircle
            alt='〇〇さんのプロフィール画像'
            width={'120px'}
            height={'120px'}
          />
          {profile === null ? (
            <UserProfileNull />
          ) : (
            <>
              <UserProfileTop>
                {isLoading ? (
                  <UserDisplayNamePlaceHolderWrapper>
                    <Placeholder as='h3' animation='glow'>
                      <Placeholder xs={12} />
                    </Placeholder>
                  </UserDisplayNamePlaceHolderWrapper>
                ) : (
                  <StyledStudentDisplayName>{profile.displayName}</StyledStudentDisplayName>
                )}
                <Button variant='secondary' onClick={() => createChatroom()}>
                  メッセージを送る
                </Button>
              </UserProfileTop>
              <StudentListItem titleText='経験' bodyText={profile.experience} />
              <StudentListItem titleText='受賞歴' bodyText={profile.awards} />
              <StudentListItem titleText='コメント' bodyText={profile.comment} />
              <StudentListItem titleText='リンク' bodyText={profile.links} />
            </>
          )}
        </UserProfileBody>
      </CustomContainer>
    </div>
  )
}
