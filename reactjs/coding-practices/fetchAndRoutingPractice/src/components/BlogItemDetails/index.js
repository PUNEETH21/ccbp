import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import './index.css'

class BlogItemDetails extends Component {
  state = {blogData: [], isLoading: true}

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    console.log(data)
    const updatedData = {
      author: data.author,
      avatarUrl: data.avatar_url,
      id: data.id,
      imageUrl: data.image_url,
      title: data.title,
      content: data.content,
    }
    this.setState({blogData: updatedData, isLoading: false})
  }

  render() {
    const {blogData, isLoading} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogData
    return (
      <div className="blog-item-details">
        {isLoading ? (
          <div testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <>
            <h1 className="title-heading">{title}</h1>
            <div className="author-details">
              <img className="author-img" alt="author" src={avatarUrl} />
              <p>{author}</p>
            </div>
            <img className="blog-img" alt="blog" src={imageUrl} />
            <p>{content}</p>
          </>
        )}
      </div>
    )
  }
}

// = props => {
//   const {match} = props
//   const {params} = match
//   const {id} = params
//   console.log(props, id)
//   const details = async () => {
//     const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
//     const data = await response.json()
//     return data
//   }
//   console.log(details)
//   return <h1>2</h1>
// }

export default BlogItemDetails
