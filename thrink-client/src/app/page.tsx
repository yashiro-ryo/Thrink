'use client'

import MainPage from '@/components/pages/MainPage/MainPage'
import Footer from '@/components/ui-parts/Footer/Footer'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import { useEffect } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { checkUserSession } from '@/lib/auth'
import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'
import { useDispatch } from 'react-redux'
import { signin } from '@/redux/slices/signedinStateSlice'
import { saveUserProfileMeta } from '@/redux/slices/userProfileMetaSlice'

export default function Home() {
  const dispatch = useDispatch()
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  useEffect(() => {
    const onSuccessCheckSession = (userProfileMeta: UserProfileMetaWithoutSecureData) => {
      dispatch(signin())
      dispatch(saveUserProfileMeta(userProfileMeta))
    }
    if (userProfileMeta !== null) {
      return
    } else {
      checkUserSession(onSuccessCheckSession)
    }
  }, [userProfileMeta]) // eslint-disable-line
  return (
    <main>
      <NavbarComp />
      <MainPage />
      <Footer />
    </main>
  )
}
