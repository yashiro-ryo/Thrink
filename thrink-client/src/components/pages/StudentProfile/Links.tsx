type Props = {
  links: string
}

export default function Links(props: Props) {
  const isLinkExist = () => {
    return props.links === null
  }
  return (
    <div>
      {isLinkExist() ? (
        <p>リンクは登録されていません。</p>
      ) : (
        <>
          <h3>リンク</h3>
          <p>{props.links}</p>
        </>
      )}
    </div>
  )
}
