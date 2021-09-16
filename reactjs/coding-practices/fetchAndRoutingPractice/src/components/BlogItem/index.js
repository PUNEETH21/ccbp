import {Link} from 'react-router-dom'
import './index.css'

const BlogItem = props => {
  const {blogData} = props
  const {author, id, avatarUrl, imageUrl, title, topic} = blogData

  return (
    <Link className="nav-blog-item" to={`/blogs/${id}`}>
      <li className="blog-item-container">
        <img className="blog-item-image" src={imageUrl} alt="blog" />
        <div className="text-container">
          <h1 className="topic">{topic}</h1>
          <h1>{title}</h1>
          <div className="author-section">
            <img className="author-img" src={avatarUrl} alt="author" />
            <p>{author}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default BlogItem
