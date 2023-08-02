'use client'
import { Container } from 'react-bootstrap'
import SearchStudents from '@/components/pages/SearchStudents/SearchStudents'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import Footer from '@/components/ui-parts/Footer/Footer'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { checkUserSession } from '@/lib/auth'
import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'
import { useDispatch } from 'react-redux'
import { signin } from '@/redux/slices/signedinStateSlice'
import { saveUserProfileMeta } from '@/redux/slices/userProfileMetaSlice'

const BodyComp = styled(Container)`
  margin-top: 30px;
  margin-bottom: 30px;
`

export default function SearchStudentsPage() {
  const dispatch = useDispatch()
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  useEffect(() => {
    const onSuccessCheckSession = (userProfileMeta: UserProfileMetaWithoutSecureData) => {
      dispatch(signin())
      dispatch(saveUserProfileMeta(userProfileMeta))
    }
    const onErrorCheckSession = () => {
      // do nothing
    }
    if (userProfileMeta !== null) {
      return
    } else {
      checkUserSession(onSuccessCheckSession, onErrorCheckSession)
    }
  }, [userProfileMeta]) // eslint-disable-line
  return (
    <div>
      <NavbarComp />
      <BodyComp>
        <SearchStudents />
      </BodyComp>
      <Footer />
    </div>
  )
}
