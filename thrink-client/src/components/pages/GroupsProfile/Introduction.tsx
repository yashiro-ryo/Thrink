type Props = {
  introduction: string
}

export default function Introduction(props: Props) {
  const introduction =
    props.introduction.length === 0 ? '自己紹介は登録されていません' : props.introduction
  return (
    <div>
      <h3>自己紹介</h3>
      <div>
        {introduction.split('¥n').map((s, index) => {
          return <p key={`user-introduction-paragraph-${index}`}>{s}</p>
        })}
      </div>
    </div>
  )
}
