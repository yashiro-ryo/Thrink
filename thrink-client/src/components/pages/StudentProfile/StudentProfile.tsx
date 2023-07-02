import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Image, Nav, Button } from 'react-bootstrap'
import { MdPlace } from 'react-icons/md'
import Introduction from './Introduction'
import Career from './Career'
import Links from './Links'
import axios from 'axios'
import { Student, StudentProfile } from '@/values/Students'

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

export default function StudentProfile(props: { uidStr: string }) {
  const [visibleTabInfo, setVisibleTab] = useState<'introduction' | 'career' | 'links'>(
    'introduction',
  )
  const [profile, setProfile] = useState<StudentProfile>({
    id: 0,
    introduction: '',
    career: '',
    links: {
      twitter: '',
      facebook: '',
      instagram: '',
    },
  })
  const [profileMeta, setProfileMeta] = useState<Student>({
    id: 0,
    name: '',
    organization: '',
    comment: '',
  })
  const getStudentProfile = (uid: number) => {
    axios.get(`http://localhost:3000/v1/students/profile/${uid}`).then((res: any) => {
      setProfile(res.data[0])
    })
  }
  const getStudentMeta = (uid: number) => {
    axios.get(`http://localhost:3000/v1/students/${uid}`).then((res: any) => {
      setProfileMeta(res.data[0])
    })
  }
  useEffect(() => {
    getStudentProfile(Number(props.uidStr))
    getStudentMeta(Number(props.uidStr))
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
          <h3>{profileMeta.name}</h3>
          <AffliationPart>
            <StyledPlaceIcon />
            <p>{profileMeta.organization}</p>
          </AffliationPart>
          {profile === null ? (
            <UserProfileNull />
          ) : (
            <div>
              <Nav className='justify-content-start' variant='tabs'>
                <Nav.Item>
                  <Nav.Link onClick={() => setVisibleTab('introduction')}>自己紹介</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => setVisibleTab('career')}>経歴</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => setVisibleTab('links')}>リンク</Nav.Link>
                </Nav.Item>
              </Nav>
              <ProfileTextBody>
                {visibleTabInfo === 'introduction' ? (
                  <Introduction introduction={profile.introduction} />
                ) : (
                  ''
                )}
                {visibleTabInfo === 'career' ? <Career career={profile.career} /> : ''}
                {visibleTabInfo === 'links' ? <Links links={profile.links} /> : ''}
              </ProfileTextBody>
            </div>
          )}
        </UserProfileBody>
      </CustomContainer>
    </div>
  )
}
