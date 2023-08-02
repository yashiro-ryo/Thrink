'use client'
import StudentProfile from '@/components/pages/StudentProfile/StudentProfile'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import Footer from '@/components/ui-parts/Footer/Footer'
import { useEffect } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { checkUserSession } from '@/lib/auth'
import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'
import { useDispatch } from 'react-redux'
import { signin } from '@/redux/slices/signedinStateSlice'
import { saveUserProfileMeta } from '@/redux/slices/userProfileMetaSlice'

export default function UserProfile({ params }: { params: { uid: string } }) {
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
      <StudentProfile uidStr={params.uid} />
      <Footer />
    </div>
  )
}
