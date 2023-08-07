export const checkUserDevice = (mobileCb: () => void, desktopCb: () => void) => {
  if (window.innerWidth <= 700) {
    mobileCb()
  } else {
    desktopCb()
  }
}
