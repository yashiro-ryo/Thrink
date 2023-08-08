import apiClient from './http-common'
import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'

export const checkUserSession = (
  onSuccess: (userProfileMeta: UserProfileMetaWithoutSecureData) => void,
) => {
  apiClient.get('/auth/signin').then((res) => {
    onSuccess(res.data.userProfileMeta)
  })
}
