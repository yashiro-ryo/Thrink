'use client'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import Footer from '@/components/ui-parts/Footer/Footer'
import { Container, Form, Button, Card, Image } from 'react-bootstrap'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import apiClient from '@/lib/http-common'
import { useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import { filterHeaderImgUrl, filterIconImgUrl } from '@/lib/imgUrlHelper'
import { checkUserSession } from '@/lib/auth'
import { useDispatch } from 'react-redux'
import { signin } from '@/redux/slices/signedinStateSlice'
import { saveUserProfileMeta } from '@/redux/slices/userProfileMetaSlice'
import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'

const StyledContainer = styled(Container)`
  margin-top: 30px;
  margin-bottom: 30px;
`

const StyledHeaderImage = styled(Image)`
  width: 100%;
  max-width: 700px;
  margin-bottom: 20px;
`

const StyledUserImage = styled(Image)`
  width: 100px;
  height: 100px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const FormGroup = styled(Form.Group)`
  display: flex;
  flex-direction: column;
`
export default function EditProfile() {
  const router = useRouter()
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  const [iconImageUrl, setIconUrl] = useState('/user-blank.webp')
  const [headerImageUrl, setHeaderImageUrl] = useState('/header-blank.webp')
  // input form student
  const [inputExperience, setInputExperience] = useState('')
  const [inputAwards, setInputAwards] = useState('')
  const [inputComment, setInputComment] = useState('')
  const [inputLinks, setInputLinks] = useState('')
  // input form group
  const [inputActivityDetail, setInputActivityDetail] = useState('')
  const [inputActivityDay, setInputActivityDay] = useState('')
  const [inputActivityTime, setInputActivityTime] = useState('')
  const [inputLocation, setInputLocation] = useState('')
  const [inputGroupAwards, setInputGroupAwards] = useState('')
  const [inputMembersNum, setInputMembersNum] = useState('')
  const [radar1, setRadar1] = useState(0)
  const [radar2, setRadar2] = useState(0)
  const [radar3, setRadar3] = useState(0)
  // file object
  const [headerImgBase64, setHeaderImgBase64] = useState('')
  const [iconImgBase64, setIconImgBase64] = useState('')
  // redux
  const dispatch = useDispatch()
  // anyなおす
  const onChangeIconInput = (e: any) => {
    const file = e.target.files[0]
    if (file === undefined) {
      return
    }
    setIconUrl(URL.createObjectURL(file))
    const fr = new FileReader()
    fr.onload = (e) => {
      setIconImgBase64(String(e.target?.result))
    }
    fr.readAsDataURL(file)
    URL.revokeObjectURL(file)
  }
  // anyなおす
  const onChangeHeaderImageInput = (e: any) => {
    const file = e.target.files[0]
    if (file === undefined) {
      return
    }
    setHeaderImageUrl(URL.createObjectURL(file))
    const fr = new FileReader()
    fr.onload = (e) => {
      setHeaderImgBase64(String(e.target?.result))
    }
    fr.readAsDataURL(file)
    URL.revokeObjectURL(file)
  }
  // anyなおす
  const onChangeInputExperience = (e: any) => {
    setInputExperience(e.target.value)
  }
  // anyなおす
  const onChangeInputAwards = (e: any) => {
    setInputAwards(e.target.value)
  }
  // anyなおす
  const onChangeInputComment = (e: any) => {
    setInputComment(e.target.value)
  }
  // anyなおす
  const onChangeInputLinks = (e: any) => {
    setInputLinks(e.target.value)
  }
  // anyなおす
  const onChangeInputActivityDetail = (e: any) => {
    setInputActivityDetail(e.target.value)
  }
  const onChangeInputActivityDay = (e: any) => {
    setInputActivityDay(e.target.value)
  }
  const onChangeInputActivityTime = (e: any) => {
    setInputActivityTime(e.target.value)
  }
  const onChangeInputLocation = (e: any) => {
    setInputLocation(e.target.value)
  }
  const onChangeInputGroupAwards = (e: any) => {
    setInputGroupAwards(e.target.value)
  }
  const onChangeInputMembersNum = (e: any) => {
    setInputMembersNum(e.target.value)
  }
  const save = () => {
    if (userProfileMeta === null) {
      // プロフィールがそもそも存在しない場合はreturn
      return
    }
    if (userProfileMeta.userType === 0) {
      apiClient
        .post(`/v1/students/profile/${userProfileMeta.uid}`, {
          headerImgBase64,
          iconImgBase64,
          experience: inputExperience,
          awards: inputAwards,
          comment: inputComment,
          links: inputLinks,
        })
        .then((res) => {
          router.push('/profile')
        })
    } else if (userProfileMeta.userType === 1) {
      apiClient
        .post(`/v1/groups/profile/${userProfileMeta.uid}`, {
          headerImgBase64,
          iconImgBase64,
          activityDetail: inputActivityDetail,
          activityDay: inputActivityDay,
          activityTime: inputActivityTime,
          location: inputLocation,
          awards: inputGroupAwards,
          membersNum: inputMembersNum,
          radar1,
          radar2,
          radar3,
        })
        .then((res) => {
          router.push('/profile')
        })
    }
  }
  const getProfile = (uid: number, userType: 0 | 1 | 2) => {
    apiClient.get(`/v1/${getEndPointTarget(userType)}/${uid}`).then((res) => {
      if (userType === 0) {
        // TODO null対策
        setInputExperience(nullCheck(res.data.studentProfile.experience))
        setInputAwards(nullCheck(res.data.studentProfile.awards))
        setInputComment(nullCheck(res.data.studentProfile.comment))
        setInputLinks(nullCheck(res.data.studentProfile.links))
      } else if (userType === 1) {
        setInputActivityDetail(nullCheck(res.data.groupProfile.activityDetail))
        setInputActivityDay(nullCheck(res.data.groupProfile.activityDay))
        setInputActivityTime(nullCheck(res.data.groupProfile.activityTime))
        setInputGroupAwards(nullCheck(res.data.groupProfile.awards))
        setInputLocation(nullCheck(res.data.groupProfile.location))
        setInputMembersNum(nullCheck(res.data.groupProfile.membersNum))
        setRadar1(res.data.groupProfile.radar1)
        setRadar2(res.data.groupProfile.radar2)
        setRadar3(res.data.groupProfile.radar3)
      }
    })
  }
  const nullCheck = (maybeStr: any) => {
    return maybeStr === null ? '' : maybeStr
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
    const onSuccessCheckSession = (userProfileMeta: UserProfileMetaWithoutSecureData | null) => {
      if (userProfileMeta === null) {
        router.push('/signin?redirect=profile-edit')
        return
      }
      dispatch(signin())
      dispatch(saveUserProfileMeta(userProfileMeta))
    }
    if (userProfileMeta !== null) {
      getProfile(userProfileMeta.uid, userProfileMeta.userType)
      setHeaderImageUrl(filterHeaderImgUrl(userProfileMeta))
      setIconUrl(filterIconImgUrl(userProfileMeta))
    } else {
      checkUserSession(onSuccessCheckSession)
    }
  }, [userProfileMeta]) // eslint-disable-line
  const StudentProfileEditor = () => {
    return (
      <>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>経験</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            value={inputExperience}
            onChange={onChangeInputExperience}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>受賞歴</Form.Label>
          <Form.Control as='textarea' rows={3} value={inputAwards} onChange={onChangeInputAwards} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>コメント</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            value={inputComment}
            onChange={onChangeInputComment}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>リンク一覧</Form.Label>
          <Form.Control as='textarea' rows={3} value={inputLinks} onChange={onChangeInputLinks} />
        </Form.Group>
      </>
    )
  }
  const GroupProfileEditor = () => {
    return (
      <>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>チームバロメータ</Form.Label>
          <br></br>
          <Form.Label>本気度 ゆるくやる - ガチでやる</Form.Label>
          <Form.Range
            value={radar1}
            onChange={(e) => setRadar1(Number(e.target.value))}
            min={0}
            max={10}
          />
          <Form.Label>雰囲気 怖い - 明るい</Form.Label>
          <Form.Range
            value={radar2}
            onChange={(e) => setRadar2(Number(e.target.value))}
            min={0}
            max={10}
          />
          <Form.Label>目標感 楽しく - 全国大会優勝</Form.Label>
          <Form.Range
            value={radar3}
            onChange={(e) => setRadar3(Number(e.target.value))}
            min={0}
            max={10}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>場所</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            value={inputLocation}
            onChange={onChangeInputLocation}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>活動詳細</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            value={inputActivityDetail}
            onChange={onChangeInputActivityDetail}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>活動日</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            value={inputActivityDay}
            onChange={onChangeInputActivityDay}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>活動時間</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            value={inputActivityTime}
            onChange={onChangeInputActivityTime}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>所属人数</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            value={inputMembersNum}
            onChange={onChangeInputMembersNum}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>受賞歴</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            value={inputGroupAwards}
            onChange={onChangeInputGroupAwards}
          />
        </Form.Group>
      </>
    )
  }
  const ProfileEditorSwitcher = () => {
    if (userProfileMeta === null) {
      return ''
    } else if (userProfileMeta.userType === 0) {
      return StudentProfileEditor()
    } else if (userProfileMeta.userType === 1) {
      return GroupProfileEditor()
    } else {
      return ''
    }
  }
  return (
    <div>
      <NavbarComp />
      <StyledContainer>
        <Card>
          <Card.Header>プロフィール編集</Card.Header>
          <Card.Body>
            <Form>
              <FormGroup className='mb-3'>
                <Form.Label>ヘッダー写真</Form.Label>
                <StyledHeaderImage src={headerImageUrl} alt='ヘッダー画像' />
                <Form.Control
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={onChangeHeaderImageInput}
                />
              </FormGroup>
              <FormGroup className='mb-3'>
                <Form.Label>アイコン画像</Form.Label>
                <StyledUserImage
                  src={iconImageUrl}
                  alt='アイコン画像'
                  width={'98px'}
                  height={'98px'}
                />
                <Form.Control
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={onChangeIconInput}
                />
              </FormGroup>
              {ProfileEditorSwitcher()}
              <Button variant='primary' onClick={() => save()}>
                保存する
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </StyledContainer>
      <Footer />
    </div>
  )
}
