/**
 * 通常の出力
 * dev mode時のみ出力される
 * @param s1
 */
const v = (s1: any) => {
  if (process.env.NEXT_PUBLIC_APP_MODE === 'prod') {
    return
  }
  console.log(s1)
}
/**
 * エラー出力
 * dev mode時のみ出力される
 * @param s1
 */
const e = (s1: any) => {
  if (process.env.NEXT_PUBLIC_APP_MODE === 'prod') {
    return
  }
  console.error(s1)
}

export default {
  v,
  e,
} as const
