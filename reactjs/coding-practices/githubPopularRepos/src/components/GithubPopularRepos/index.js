import Loader from 'react-loader-spinner'

import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeLanguage: languageFiltersData[0].id,
    repositoryItems: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepositoryItems()
  }

  onChangeActiveLanguage = languageId =>
    this.setState({activeLanguage: languageId}, this.getRepositoryItems)

  getRepositoryItems = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {activeLanguage} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`,
    )
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))
      this.setState({
        repositoryItems: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderRepositoriesList = () => {
    const {repositoryItems} = this.state
    return (
      <ul className="repository-items">
        {repositoryItems.map(eachRepo => (
          <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="error-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  render() {
    const {repositoryItems, activeLanguage, isLoading} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        <ul className="language-items">
          {languageFiltersData.map(langaugeData => {
            const isActiveLanguage = langaugeData.id === activeLanguage
            return (
              <LanguageFilterItem
                langaugeData={langaugeData}
                isActiveLanguage={isActiveLanguage}
                onChangeActiveLanguage={this.onChangeActiveLanguage}
                key={langaugeData.id}
              />
            )
          })}
        </ul>
        {this.renderApiStatusView()}
      </div>
    )
  }
}

export default GithubPopularRepos
