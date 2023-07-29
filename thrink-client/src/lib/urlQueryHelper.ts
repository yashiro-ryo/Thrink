export const getUrlQuery = (query: string | null) => {
  switch (query) {
    case 'chat':
      return '/chat'
    case 'manage-job':
      return '/manage/job'
    case 'profile':
      return '/profile'
    case 'profile-edit':
      return '/profile/edit'
    default:
      return '/'
  }
}
