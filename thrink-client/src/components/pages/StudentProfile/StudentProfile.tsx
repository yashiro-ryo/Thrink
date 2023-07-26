import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Image, Button } from 'react-bootstrap'
import { StudentProfile } from '@/values/Students'
import apiClient from '@/lib/http-common'
import { nullCheck } from '@/lib/stringHelper'
import { filterIconImgUrl, filterHeaderImgUrl } from '@/lib/imgUrlHelper'

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

export default function StudentProfile(props: { uidStr: string }) {
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
  const getStudentProfile = (uid: number) => {
    apiClient.get(`/v1/students/${uid}`).then((res: any) => {
      console.log(res.data)
      setProfile(res.data.studentProfile)
    })
  }
  useEffect(() => {
    getStudentProfile(Number(props.uidStr))
  }, [props.uidStr])

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
              <h3>{profile.displayName}</h3>
              <h4>経験</h4>
              <p>{nullCheck(profile.experience)}</p>
              <h4>受賞歴</h4>
              <p>{nullCheck(profile.awards)}</p>
              <h4>コメント</h4>
              <p>{nullCheck(profile.comment)}</p>
              <h4>リンク</h4>
              <p>{nullCheck(profile.links)}</p>
            </>
          )}
        </UserProfileBody>
      </CustomContainer>
    </div>
  )
}
