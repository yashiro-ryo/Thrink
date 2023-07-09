import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Image, Nav, Button } from 'react-bootstrap'
import { MdPlace } from 'react-icons/md'
import Experience from './Experience'
import Awards from './Awards'
import Comment from './Comment'
import Links from './Links'
import axios from 'axios'
import { StudentProfile } from '@/values/Students'

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
  const [visibleTabInfo, setVisibleTab] = useState<'experience' | 'awards' | 'comment' | 'links'>(
    'experience',
  )
  const [profile, setProfile] = useState<StudentProfile>({
    uid: 0,
    displayName: '',
    experienceVisibleLevel: 0,
    experience: '',
    awardsVisibleLevel: 0,
    awards: '',
    commentVisibleLevel: 0,
    comment: '',
    linksVisibleLevel: 0,
    links: '',
  })
  const getStudentProfile = (uid: number) => {
    axios.get(`http://localhost:3000/v1/students/${uid}`).then((res: any) => {
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
            <>
              <h3>{profile.displayName}</h3>
              <div>
                <Nav className='justify-content-start' variant='tabs'>
                  <Nav.Item>
                    <Nav.Link onClick={() => setVisibleTab('experience')}>経験</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => setVisibleTab('awards')}>受賞歴</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => setVisibleTab('comment')}>コメント</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => setVisibleTab('links')}>リンク</Nav.Link>
                  </Nav.Item>
                </Nav>
                <ProfileTextBody>
                  {visibleTabInfo === 'experience' ? (
                    <Experience experience={profile.experience} />
                  ) : (
                    ''
                  )}
                  {visibleTabInfo === 'awards' ? <Awards awards={profile.awards} /> : ''}
                  {visibleTabInfo === 'comment' ? <Comment comment={profile.comment} /> : ''}
                  {visibleTabInfo === 'links' ? <Links links={profile.links} /> : ''}
                </ProfileTextBody>
              </div>
            </>
          )}
        </UserProfileBody>
      </CustomContainer>
    </div>
  )
}
