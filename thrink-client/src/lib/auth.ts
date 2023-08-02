import apiClient from './http-common'
import Log from './logger'
import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'

export const checkUserSession = (
  onSuccess: (userProfileMeta: UserProfileMetaWithoutSecureData) => void,
  onError: () => void,
) => {
  Log.v('check user session')
  apiClient
    .get('/auth/signin')
    .then((res) => {
      onSuccess(res.data.userProfileMeta)
    })
    .catch((err) => {
      onError()
    })
}
