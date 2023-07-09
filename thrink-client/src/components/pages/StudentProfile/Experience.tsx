type Props = {
  experience: string
}

export default function Experience(props: Props) {
  const experience = props.experience === null ? '経験は登録されていません' : props.experience
  return (
    <div>
      <h3>経験</h3>
      <div>
        {experience.split('¥n').map((s, index) => {
          return <p key={`student-profile-experience-paragraph-${index}`}>{s}</p>
        })}
      </div>
    </div>
  )
}
