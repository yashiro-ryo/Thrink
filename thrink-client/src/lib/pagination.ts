export const getPageIndex = (pageIndex: number, pageLength: number) => {
  return pageLength < pageIndex ? 1 : pageIndex
}
