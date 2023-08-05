export default function ArticleDetail({ params }: { params: { articleId: string } }) {
  return (
    <div>
      <div>
        <p>article id : {params.articleId}</p>
      </div>
    </div>
  )
}
