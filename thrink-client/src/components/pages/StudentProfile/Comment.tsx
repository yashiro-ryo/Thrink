type Props = {
  comment: string
}

export default function Comment(props: Props) {
  const comment = props.comment === null ? 'コメントは登録されていません' : props.comment
  return (
    <div>
      <h3>コメント</h3>
      {comment.split('¥n').map((s, index) => {
        return <p key={`student-profile-comment-paragraph-${index}`}>{s}</p>
      })}
    </div>
  )
}
