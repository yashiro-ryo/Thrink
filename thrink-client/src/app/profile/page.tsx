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
import { checkUserSession } from '@/lib/auth'
import { useDispatch } from 'react-redux'
import { signin } from '@/redux/slices/signedinStateSlice'
import { saveUserProfileMeta } from '@/redux/slices/userProfileMetaSlice'
import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'

const ContainerStyle = styled(Container)`
  margin-top: 50px;
  margin-bottom: 50px;
`
const ListItemLabel = styled.h5`
  font-weight: bold;
`
const EditButton = styled(Button)`
  margin-bottom: 20px;
`

export default function UserProfile() {
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  const router = useRouter()
  // state group student
  const [displayName, setDisplayName] = useState('')
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
  // redux
  const dispatch = useDispatch()
  // method
  const getProfile = (uid: number, userType: 0 | 1 | 2) => {
    apiClient.get(`/v1/${getEndPointTarget(userType)}/${uid}`).then((res) => {
      if (userType === 0) {
        setDisplayName(res.data.studentProfile.displayName)
        setExperience(res.data.studentProfile.experience)
        setAwards(res.data.studentProfile.awards)
        setComment(res.data.studentProfile.comment)
        setLinks(res.data.studentProfile.links)
      } else if (userType === 1) {
        setDisplayName(res.data.groupProfile.displayName)
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
    const onSuccessCheckSession = (userProfileMeta: UserProfileMetaWithoutSecureData) => {
      dispatch(signin())
      dispatch(saveUserProfileMeta(userProfileMeta))
    }
    const onErrorCheckSession = () => router.push('/signin?redirect=profile')
    if (userProfileMeta !== null) {
      getProfile(userProfileMeta.uid, userProfileMeta.userType)
    } else {
      checkUserSession(onSuccessCheckSession, onErrorCheckSession)
    }
  }, [userProfileMeta]) // eslint-disable-line
  const StudentProfileList = () => {
    return (
      <>
        <ListItem titleText='氏名' bodyText={nullCheck(displayName)} />
        <ListItem titleText='経験' bodyText={experience === null ? '未登録' : experience} />
        <ListItem titleText='受賞歴' bodyText={awards === null ? '未登録' : awards} />
        <ListItem titleText='コメント' bodyText={comment === null ? '未登録' : comment} />
        <ListItem titleText='リンク' bodyText={links === null ? '未登録' : links} />
      </>
    )
  }
  const GroupProfileList = () => {
    return (
      <>
        <ListItem titleText='団体名' bodyText={nullCheck(displayName)} />
        <ListItem titleText='場所' bodyText={location === null ? '未登録' : location} />
        <ListItem
          titleText='活動詳細'
          bodyText={activityDetail === null ? '未登録' : activityDetail}
        />
        <ListItem titleText='活動日' bodyText={activityDay === null ? '未登録' : activityDay} />
        <ListItem titleText='活動時間' bodyText={activityTime === null ? '未登録' : activityTime} />
        <ListItem titleText='受賞歴' bodyText={groupAwards === null ? '未登録' : groupAwards} />
      </>
    )
  }
  const ListItem = (props: { titleText: string; bodyText: string }) => {
    return (
      <>
        <ListItemLabel>{props.titleText}</ListItemLabel>
        <p>{props.bodyText}</p>
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
            <EditButton variant='primary' onClick={() => router.push('/profile/edit')}>
              編集する
            </EditButton>
            {ProfileList()}
          </Card.Body>
        </Card>
      </ContainerStyle>
      <Footer />
    </div>
  )
}
