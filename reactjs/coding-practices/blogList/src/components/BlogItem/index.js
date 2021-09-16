import './index.css'

const BlogItem = props => {
  const {blog} = props
  const {title, description, publishedDate} = blog
  return (
    <li className="blog-container">
      <div className="blog-top-section">
        <h1>{title}</h1>
        <p className="published-date">{publishedDate}</p>
      </div>
      <p className="description">{description}</p>
      <hr />
    </li>
  )
}

export default BlogItem
