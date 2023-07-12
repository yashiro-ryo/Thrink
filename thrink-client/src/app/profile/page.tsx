'use client'
import { Card, Container, Button } from 'react-bootstrap'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import Footer from '@/components/ui-parts/Footer/Footer'
import { styled } from 'styled-components'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import apiClient from '@/lib/http-common'

const ContainerStyle = styled(Container)`
  margin-top: 50px;
  margin-bottom: 50px;
`

export default function UserProfile() {
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  const router = useRouter()
  // state
  const [experience, setExperience] = useState('')
  const [awards, setAwards] = useState('')
  const [comment, setComment] = useState('')
  const [links, setLinks] = useState('')
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
      // ログイン情報なし
      router.push('/')
    } else {
      getProfile(userProfileMeta.uid, userProfileMeta.userType)
    }
  }, [userProfileMeta])
  return (
    <div>
      <NavbarComp />
      <ContainerStyle>
        <Card>
          <Card.Header>プロフィール</Card.Header>
          <Card.Body>
            <Button variant='primary'>編集する</Button>
            <Card.Title>経験</Card.Title>
            <Card.Text>{experience}</Card.Text>
            <Card.Title>受賞歴</Card.Title>
            <Card.Text>{awards}</Card.Text>
            <Card.Title>コメント</Card.Title>
            <Card.Text>{comment}</Card.Text>
            <Card.Title>リンク</Card.Title>
            <Card.Text>{links}</Card.Text>
          </Card.Body>
        </Card>
      </ContainerStyle>
      <Footer />
    </div>
  )
}
