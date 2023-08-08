'use client'
import SignupPage from '@/components/pages/SignupPage/SignupPage'
import { checkUserSession } from '@/lib/auth'
import { useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'
import { signin } from '@/redux/slices/signedinStateSlice'
import { saveUserProfileMeta } from '@/redux/slices/userProfileMetaSlice'

export default function Signup() {
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    const onSuccessCheckSession = (userProfileMeta: UserProfileMetaWithoutSecureData | null) => {
      if (userProfileMeta === null) {
        return
      }
      dispatch(signin())
      dispatch(saveUserProfileMeta(userProfileMeta))
    }
    if (userProfileMeta !== null) {
      router.push('/')
    } else {
      checkUserSession(onSuccessCheckSession)
    }
  }, [userProfileMeta]) // eslint-disable-line
  return <SignupPage />
}
