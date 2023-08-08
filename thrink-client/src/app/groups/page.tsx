'use client'
import { Container } from 'react-bootstrap'
import SearchGroups from '@/components/pages/SearchGroups/SearchGroups'
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

export default function SearchGroupsPage() {
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
    <div>
      <NavbarComp />
      <BodyComp>
        <SearchGroups />
      </BodyComp>
      <Footer />
    </div>
  )
}
