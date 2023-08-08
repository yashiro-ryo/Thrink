export const getUrlQuery = (query: string | null) => {
  if (query === null) {
    return '/'
  }
  if (query.startsWith('group-')) {
    const queries = query.split('-')
    return `/group/${queries[1]}`
  }
  if (query.startsWith('student-')) {
    const queries = query.split('-')
    return `/student/${queries[1]}`
  }
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
