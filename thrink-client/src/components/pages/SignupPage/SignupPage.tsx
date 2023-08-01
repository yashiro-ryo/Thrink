import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import Footer from '@/components/ui-parts/Footer/Footer'
import { Container, Card, Form, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import styled from 'styled-components'
import Link from 'next/link'
import { useState } from 'react'
import apiClient from '@/lib/http-common'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import Log from '@/lib/logger'

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

const ErrorText = styled.p`
  color: #f00;
`

export default function SignupPage() {
  const [inputName, setInputName] = useState('')
  const [inputUserType, setInputUserType] = useState(10)
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState('')
  const [isTermsChecked, setTermsCheckState] = useState(false)
  const [errorText, setErrorText] = useState<Array<string>>([])
  const onChangeInputName = (e: any) => {
    setInputName(e.target.value)
  }
  const onChangeInputUserType = (e: number) => {
    Log.v(e)
    setInputUserType(e)
  }
  const onChangeInputEmail = (e: any) => {
    setInputEmail(e.target.value)
  }
  const onChangeInputPassword = (e: any) => {
    setInputPassword(e.target.value)
  }
  const onChangeInputPasswordConfirm = (e: any) => {
    setInputPasswordConfirm(e.target.value)
  }
  const onChangeTermsCheck = (e: any) => {
    setTermsCheckState(e.target.checked)
  }
  // redux
  const dispatch = useAppDispatch()
  const userProfile = useAppSelector((state) => state.userProfileReducer)
  const submit = () => {
    Log.v('submit')
    Log.v(inputEmail)
    Log.v(inputPassword)
    Log.v(inputPasswordConfirm)
    Log.v(isTermsChecked)
    let errorText: Array<string> = []
    let hasError = false
    if (
      inputName.length === 0 ||
      inputUserType === 10 ||
      inputEmail.length === 0 ||
      inputPassword.length === 0 ||
      inputPasswordConfirm.length === 0
    ) {
      errorText.push('フォームに入力漏れがあります\n')
      hasError = true
    }
    if (inputPassword !== inputPasswordConfirm) {
      errorText.push('パスワードと確認用パスワードが一致しません。\n')
      hasError = true
    }
    if (!isTermsChecked) {
      errorText.push('利用規約に同意してください。\n')
      hasError = true
    }
    if (hasError) {
      setErrorText(errorText.concat())
      return
    }
    setErrorText([])
    apiClient
      .post('/auth/signup', {
        email: inputEmail,
        password: inputPassword,
        name: inputName,
        userType: inputUserType,
      })
      .then((res) => {
        Log.v(res)
        // save user info
        //dispatch(saveUserProfile(migrateDbParamToClientParam(res.data.msg)))
        // redirect
        //Log.v(userProfile)
      })
      .catch((error) => {
        setErrorText([error])
      })
  }
  return (
    <div>
      <NavbarComp />
      <CardContainer>
        <SigninCard>
          <CardHeader>
            <h3>アカウント作成</h3>
          </CardHeader>
          <div>
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label>名前</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='名前'
                  value={inputName}
                  onChange={onChangeInputName}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>登録種別を選択してください。</Form.Label>
                <ToggleButtonGroup
                  type='radio'
                  name='options'
                  onChange={onChangeInputUserType}
                  value={inputUserType}
                >
                  <ToggleButton id='tbg-radio-1' value={0}>
                    学生の方
                  </ToggleButton>
                  <ToggleButton id='tbg-radio-2' value={1}>
                    団体の方
                  </ToggleButton>
                  <ToggleButton id='tbg-radio-3' value={2}>
                    保護者の方
                  </ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>メールアドレス</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='メールアドレス'
                  value={inputEmail}
                  onChange={onChangeInputEmail}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>パスワード</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='パスワード'
                  value={inputPassword}
                  onChange={onChangeInputPassword}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>パスワード(確認用)</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='パスワード(確認用)'
                  value={inputPasswordConfirm}
                  onChange={onChangeInputPasswordConfirm}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Check
                  type='checkbox'
                  label='利用規約に同意する'
                  onChange={onChangeTermsCheck}
                />
              </Form.Group>
            </Form>
            {errorText.map((t: string, index: number) => {
              return <ErrorText key={`signup-form-input-error-${index}`}>{t}</ErrorText>
            })}
          </div>
          <CardFooter>
            <Button variant='primary' type='submit' onClick={() => submit()}>
              アカウント作成
            </Button>
            <SignupLinkWrapper>
              <Link href='/signin'>ログインする</Link>
            </SignupLinkWrapper>
          </CardFooter>
        </SigninCard>
      </CardContainer>
      <Footer />
    </div>
  )
}
