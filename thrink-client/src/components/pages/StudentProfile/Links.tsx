type Props = {
  links: {
    twitter: string
    facebook: string
    instagram: string
  }
}

export default function Links(props: Props) {
  const isLinkExist = () => {
    const links = props.links
    return links.twitter.length < 1 && links.facebook.length < 1 && links.instagram.length < 1
  }
  return (
    <div>
      {isLinkExist() ? (
        <p>リンクは登録されていません。</p>
      ) : (
        <>
          <h3>リンク一覧</h3>
          <p>twitter: {props.links.twitter}</p>
          <p>facebook: {props.links.facebook}</p>
          <p>instagram: {props.links.instagram}</p>
        </>
      )}
    </div>
  )
}
