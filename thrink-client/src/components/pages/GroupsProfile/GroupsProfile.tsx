import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Image, Nav, Button } from 'react-bootstrap'
import { MdPlace } from 'react-icons/md'
import Introduction from './Introduction'
import Career from './Career'
import Links from './Links'
import apiClient from '@/lib/http-common'
import { GroupDigest, GroupProfile } from '@/values/Groups'

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

const AffliationPart = styled.div`
  display: flex;
`

const StyledPlaceIcon = styled(MdPlace)`
  width: 20px;
  height: 20px;
`

const UserProfileBody = styled.div`
  position: relative;
  top: -60px;
`

const ProfileTextBody = styled.div`
  margin-top: 20px;
`

export default function GroupsProfile(props: { gidStr: string }) {
  const [visibleTabInfo, setVisibleTab] = useState<'introduction' | 'career' | 'links'>(
    'introduction',
  )
  const [profile, setProfile] = useState<GroupProfile>({
    uid: 0,
    displayName: '',
    location: '',
    activityDetail: '',
    activityDay: '',
    activityTime: '',
    memberNum: 0,
    awards: '',
  })
  const [profileMeta, setProfileMeta] = useState<GroupDigest>({
    uid: 0,
    displayName: '',
    iconImgUrl: '',
    activityDetail: '',
  })
  const getGroupProfile = (gid: number) => {
    apiClient.get(`/v1/groups/${gid}`).then((res: any) => {
      console.log(res.data)
      setProfile(res.data.groupProfile)
    })
  }
  const getGroupMeta = (gid: number) => {
    apiClient.get(`/v1/digests/group/${gid}`).then((res: any) => {
      console.log(res.data)
      setProfileMeta(res.data.groupProfileMeta)
    })
  }
  useEffect(() => {
    console.log(`gid: ${props.gidStr}`)
    getGroupProfile(Number(props.gidStr))
    getGroupMeta(Number(props.gidStr))
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
          {profile === null || profileMeta === null ? (
            <UserProfileNull />
          ) : (
            <div>
              <h3>{profileMeta.displayName}</h3>
              <h4>場所</h4>
              <p>{profile.location}</p>
              <h4>活動詳細</h4>
              <p>{profile.activityDetail}</p>
              <h4>活動日</h4>
              <p>{profile.activityDay}</p>
              <h4>活動時間</h4>
              <p>{profile.activityTime}</p>
              <h4>所属人数</h4>
              <p>{profile.memberNum}</p>
              <h4>受賞歴</h4>
              <p>{profile.awards}</p>
            </div>
          )}
        </UserProfileBody>
      </CustomContainer>
    </div>
  )
}
