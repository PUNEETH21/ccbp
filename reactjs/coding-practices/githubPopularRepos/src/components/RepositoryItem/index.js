import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  return (
    <li className="repo-item">
      <img className="logo" src={repoDetails.avatarUrl} alt="logo" />
      <h1 className="repo-name">{repoDetails.name}</h1>
      <div className="stats">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{repoDetails.starsCount}</p>
      </div>
      <div className="stats">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{repoDetails.forksCount}</p>
      </div>
      <div className="stats">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open-issues"
        />
        <p>{repoDetails.issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
