type Props = {
  history: string
}

export default function Career(props: Props) {
  const history = props.history.length === 0 ? '経歴は登録されていません' : props.history
  return (
    <div>
      <h3>経歴</h3>
      {history.split('\n').map((s, index) => {
        return <p key={`group-history-paragraph-${index}`}>{s}</p>
      })}
    </div>
  )
}
