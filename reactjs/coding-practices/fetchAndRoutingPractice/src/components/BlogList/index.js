import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import BlogItem from '../BlogItem'
import './index.css'

class BlogList extends Component {
  state = {blogList: [], isLoading: true}

  componentDidMount() {
    this.getBlogList()
  }

  getBlogList = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedData = data.map(eachBlog => ({
      author: eachBlog.author,
      avatarUrl: eachBlog.avatar_url,
      id: eachBlog.id,
      imageUrl: eachBlog.image_url,
      title: eachBlog.title,
      topic: eachBlog.topic,
    }))
    this.setState({blogList: updatedData, isLoading: false})
  }

  render() {
    const {blogList, isLoading} = this.state
    console.log(blogList, blogList.length)

    return (
      <ul className="blogs-list-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          blogList.map(eachBlog => (
            <BlogItem blogData={eachBlog} key={eachBlog.id} />
          ))
        )}
      </ul>
    )
  }
}

export default BlogList
