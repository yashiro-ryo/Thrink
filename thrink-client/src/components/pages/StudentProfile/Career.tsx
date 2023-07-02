type Props = {
  career: string
}

export default function Career(props: Props) {
  const career = props.career.length === 0 ? '経歴は登録されていません' : props.career
  return (
    <div>
      <h3>経歴</h3>
      {career.split('¥n').map((s, index) => {
        return <p key={`user-career-paragraph-${index}`}>{s}</p>
      })}
    </div>
  )
}
