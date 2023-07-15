import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Image, Nav, Button } from 'react-bootstrap'
import { MdPlace } from 'react-icons/md'
import apiClient from '@/lib/http-common'
import { GroupProfile } from '@/values/Groups'

const HeaderImagePart = styled.div`
  width: 100%;
  height: 300px;
  background-color: #636363;
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

export default function GroupsProfile(props: { gidStr: string }) {
  const [profile, setProfile] = useState<GroupProfile>({
    uid: 0,
    displayName: '',
    location: '',
    activityDetail: '',
    activityDay: '',
    activityTime: '',
    membersNum: 0,
    awards: '',
    iconImgUrl: '',
    headerImgUrl: '',
  })
  const getGroupProfile = (gid: number) => {
    apiClient.get(`/v1/groups/${gid}`).then((res: any) => {
      console.log(res.data)
      setProfile(res.data.groupProfile)
    })
  }
  useEffect(() => {
    console.log(`gid: ${props.gidStr}`)
    getGroupProfile(Number(props.gidStr))
  }, [props.gidStr])

  const UserProfileNull = () => {
    return (
      <div>
        <p>プロフィールの取得に失敗しました。</p>
        <Button href={`/student/${props.gidStr}`} variant='secondary'>
          リロードする
        </Button>
      </div>
    )
  }
  return (
    <div>
      <HeaderImagePart></HeaderImagePart>
      <CustomContainer>
        <UserProfileBody>
          <UserIconPart
            src='/user-blank.png'
            roundedCircle
            alt='〇〇さんのプロフィール画像'
            width={'120px'}
            height={'120px'}
          />
          {profile === null ? (
            <UserProfileNull />
          ) : (
            <div>
              <h3>{profile.displayName}</h3>
              <h4>場所</h4>
              <p>{profile.location}</p>
              <h4>活動詳細</h4>
              <p>{profile.activityDetail}</p>
              <h4>活動日</h4>
              <p>{profile.activityDay}</p>
              <h4>活動時間</h4>
              <p>{profile.activityTime}</p>
              <h4>所属人数</h4>
              <p>{profile.membersNum}</p>
              <h4>受賞歴</h4>
              <p>{profile.awards}</p>
            </div>
          )}
        </UserProfileBody>
      </CustomContainer>
    </div>
  )
}
