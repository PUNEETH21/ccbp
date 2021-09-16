import './index.css'
import BlogItem from '../BlogItem'

const BlogList = props => {
  const {blogsData} = props
  return (
    <ul className="blogs-list">
      {blogsData.map(blog => (
        <BlogItem blog={blog} key={blog.id} />
      ))}
    </ul>
  )
}

export default BlogList
