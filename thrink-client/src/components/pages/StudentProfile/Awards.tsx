type Props = {
  awards: string
}

export default function Awards(props: Props) {
  const awards = props.awards === null ? '経歴は登録されていません' : props.awards
  return (
    <div>
      <h3>受賞歴</h3>
      {awards.split('¥n').map((s, index) => {
        return <p key={`student-profile-awards-paragraph-${index}`}>{s}</p>
      })}
    </div>
  )
}
