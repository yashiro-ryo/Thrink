'use client'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import Footer from '@/components/ui-parts/Footer/Footer'
import { Container, Card, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { saveUserProfileMeta } from '@/redux/slices/userProfileMetaSlice'
import { signin } from '@/redux/slices/signedinStateSlice'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getUrlQuery } from '@/lib/urlQueryHelper'
import apiClient from '@/lib/http-common'
import { checkUserSession } from '@/lib/auth'
import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'

const CardContainer = styled(Container)`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
`

const SigninCard = styled(Card)`
  width: 500px;
  padding: 40px;
`

const CardHeader = styled.div`
  text-align: center;
`

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
`

const SignupLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const FormErrorText = styled.p`
  color: #f00;
`

export default function Signin() {
  const router = useRouter()
  const searchParam = useSearchParams()
  // redux
  const dispatch = useAppDispatch()
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formErrorText, setFormErrorText] = useState('')
  const [redirectTo, setRedirectTo] = useState('')
  const onChangeEmail = (e: any) => {
    setEmail(e.target.value)
  }
  const onChangePass = (e: any) => {
    setPassword(e.target.value)
  }
  const submitForm = () => {
    apiClient
      .post('/auth/signin', {
        email,
        password,
      })
      .then((res: any) => {
        // ログイン成功
        dispatch(saveUserProfileMeta(res.data.userProfileMeta))
        dispatch(signin())
        router.push(redirectTo)
      })
      .catch((errRes) => {
        // ログイン失敗
        setFormErrorText('ログインできませんでした。emailとpasswordを再度確認してください。')
      })
  }
  useEffect(() => {
    const onSuccessCheckSession = (userProfileMeta: UserProfileMetaWithoutSecureData | null) => {
      if (userProfileMeta === null) {
        return
      }
      dispatch(signin())
      dispatch(saveUserProfileMeta(userProfileMeta))
    }
    // ログイン済みかどうか
    if (userProfileMeta !== null) {
      // ログイン済み
      router.push(getUrlQuery(searchParam.get('redirect')))
    } else {
      checkUserSession(onSuccessCheckSession)
    }
  }, [userProfileMeta]) // eslint-disable-line
  return (
    <div>
      <NavbarComp />
      <CardContainer>
        <SigninCard>
          <CardHeader>
            <h3>ログイン</h3>
          </CardHeader>
          <div>
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label>メールアドレス</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='メールアドレス'
                  onChange={onChangeEmail}
                  value={email}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>パスワード</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='パスワード'
                  onChange={onChangePass}
                  value={password}
                />
              </Form.Group>
              <FormErrorText>{formErrorText}</FormErrorText>
            </Form>
          </div>
          <CardFooter>
            <Button variant='primary' type='submit' onClick={() => submitForm()}>
              ログイン
            </Button>
            <SignupLinkWrapper>
              <Link href='/signup'>アカウント作成</Link>
            </SignupLinkWrapper>
          </CardFooter>
        </SigninCard>
      </CardContainer>
      <Footer />
    </div>
  )
}
