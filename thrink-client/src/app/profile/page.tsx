'use client'
import { Card, Container, Button } from 'react-bootstrap'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import Footer from '@/components/ui-parts/Footer/Footer'
import { styled } from 'styled-components'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import { nullCheck } from '@/lib/stringHelper'
import apiClient from '@/lib/http-common'

const ContainerStyle = styled(Container)`
  margin-top: 50px;
  margin-bottom: 50px;
`

export default function UserProfile() {
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  const router = useRouter()
  // state student
  const [experience, setExperience] = useState('')
  const [awards, setAwards] = useState('')
  const [comment, setComment] = useState('')
  const [links, setLinks] = useState('')
  // state group
  const [activityDetail, setActivityDetail] = useState('')
  const [activityDay, setActivityDay] = useState('')
  const [activityTime, setActivityTime] = useState('')
  const [location, setLocation] = useState('')
  const [groupAwards, setGroupAwards] = useState('')
  // method
  const getProfile = (uid: number, userType: 0 | 1 | 2) => {
    console.log(uid)
    console.log(userType)
    apiClient.get(`/v1/${getEndPointTarget(userType)}/${uid}`).then((res) => {
      console.log(res)
      if (userType === 0) {
        setExperience(res.data.studentProfile.experience)
        setAwards(res.data.studentProfile.awards)
        setComment(res.data.studentProfile.comment)
        setLinks(res.data.studentProfile.links)
      } else if (userType === 1) {
        setActivityDetail(res.data.groupProfile.activityDetail)
        setActivityDay(res.data.groupProfile.activityDay)
        setActivityTime(res.data.groupProfile.activityTime)
        setLocation(res.data.groupProfile.location)
        setGroupAwards(res.data.groupProfile.awards)
      }
    })
  }
  const getEndPointTarget = (userType: 0 | 1 | 2) => {
    if (userType === 0) {
      return 'students'
    } else if (userType === 1) {
      return 'groups'
    } else {
      return ''
    }
  }
  useEffect(() => {
    if (userProfileMeta === null) {
      router.push('/signin?redirect=profile')
    }
    if (userProfileMeta !== null) {
      getProfile(userProfileMeta.uid, userProfileMeta.userType)
    }
  }, [userProfileMeta])
  const StudentProfileList = () => {
    return (
      <>
        <Card.Title>経験</Card.Title>
        <Card.Text>{nullCheck(experience)}</Card.Text>
        <Card.Title>受賞歴</Card.Title>
        <Card.Text>{nullCheck(awards)}</Card.Text>
        <Card.Title>コメント</Card.Title>
        <Card.Text>{nullCheck(comment)}</Card.Text>
        <Card.Title>リンク</Card.Title>
        <Card.Text>{nullCheck(links)}</Card.Text>
      </>
    )
  }
  const GroupProfileList = () => {
    return (
      <>
        <Card.Title>場所</Card.Title>
        <Card.Text>{nullCheck(location)}</Card.Text>
        <Card.Title>活動詳細</Card.Title>
        <Card.Text>{nullCheck(activityDetail)}</Card.Text>
        <Card.Title>活動日</Card.Title>
        <Card.Text>{nullCheck(activityDay)}</Card.Text>
        <Card.Title>活動時間</Card.Title>
        <Card.Text>{nullCheck(activityTime)}</Card.Text>
        <Card.Title>受賞歴</Card.Title>
        <Card.Text>{nullCheck(groupAwards)}</Card.Text>
      </>
    )
  }
  const ProfileList = () => {
    if (userProfileMeta === null) {
      return ''
    } else if (userProfileMeta.userType === 0) {
      return StudentProfileList()
    } else if (userProfileMeta.userType === 1) {
      return GroupProfileList()
    } else {
      return ''
    }
  }
  return (
    <div>
      <NavbarComp />
      <ContainerStyle>
        <Card>
          <Card.Header>プロフィール</Card.Header>
          <Card.Body>
            <Button variant='primary' onClick={() => router.push('/profile/edit')}>
              編集する
            </Button>
            {ProfileList()}
          </Card.Body>
        </Card>
      </ContainerStyle>
      <Footer />
    </div>
  )
}
