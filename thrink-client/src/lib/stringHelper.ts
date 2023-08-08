/**
 * 指定の文字数で文字列の長さを切る関数
 * @param s 処理対象の文字列
 * @param n 切りたい文字数
 */
export const cutOverStr = (s: string, n: number): string => {
  if (n < 0 || s.length < n) {
    return s
  }
  return s.substring(0, n)
}

/**
 * nullの場合は''を返す関数
 * @param maybeStr null or string の処理対象
 */
export const nullCheck = (maybeStr: string | null): string => {
  return maybeStr === null ? '未登録' : maybeStr
}
