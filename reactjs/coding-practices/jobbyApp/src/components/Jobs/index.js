import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsBriefcaseFill, BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    employmentTypeIds: [],
    salaryRange: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    allJobsDetails: [],
    profileDetails: {},
    profileApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getAllJobDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/profile`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        profileApiStatus: apiStatusConstants.failure,
      })
    }
  }

  getAllJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {employmentTypeIds, salaryRange, searchInput} = this.state
    const employmentType = employmentTypeIds.join()
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    // const a2 = 'https://apis.ccbp.in/jobs/bb95e51b-b1b2-4d97-bee4-1d5ec2b96751'
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const {jobs} = data
      const allJobsDetails = jobs.map(jobDetails => ({
        companyLogoUrl: jobDetails.company_logo_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        job_description: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }))
      this.setState({
        allJobsDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileLoaderView = () => (
    <div className="profile-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="20" width="50" />
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="20" width="50" />
    </div>
  )

  onChangeEmploymentType = event => {
    const employmentTypeId = event.target.value
    const {employmentTypeIds} = this.state

    const isThere = employmentTypeIds.some(id => id === employmentTypeId)
    let updatedEmploymentTypeIds = []
    if (isThere === true) {
      updatedEmploymentTypeIds = employmentTypeIds.filter(
        id => id !== employmentTypeId,
      )
    } else {
      updatedEmploymentTypeIds = [...employmentTypeIds, employmentTypeId]
    }
    this.setState(
      {
        employmentTypeIds: updatedEmploymentTypeIds,
      },
      this.getAllJobDetails,
    )
  }

  onChangeSalaryRange = event => {
    const salaryRange = event.target.value
    this.setState({salaryRange}, this.getAllJobDetails)
  }

  onClickProfileRetryBtn = () => this.getProfileDetails()

  renderProfileErrorView = () => (
    <div className="retry-profile-container">
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickProfileRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderProfileSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-container">
        <img className="profile-img" alt="profile" src={profileImageUrl} />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  renderProfileContainer = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderProfileLoaderView()
      case apiStatusConstants.failure:
        return this.renderProfileErrorView()
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      default:
        return null
    }
  }

  renderSideBarContainer = () => (
    <div className="side-bar-container">
      {this.renderProfileContainer()}
      <hr />
      <h1 className="side-bar-sub-heading">Type of Employment</h1>
      <ul className="employment-type-container">
        {employmentTypesList.map(eachType => (
          <li
            className="employment-type-item"
            onChange={this.onChangeEmploymentType}
            key={eachType.employmentTypeId}
          >
            <input
              type="checkbox"
              id={eachType.employmentTypeId}
              value={eachType.employmentTypeId}
            />
            <label htmlFor={eachType.employmentTypeId} className="label">
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>

      <hr />
      <h1 className="side-bar-sub-heading">Salary Range</h1>

      <ul className="employment-type-container">
        {salaryRangesList.map(eachType => (
          <li
            className="employment-type-item"
            onChange={this.onChangeSalaryRange}
            key={eachType.salaryRangeId}
          >
            <input
              type="radio"
              id={eachType.salaryRangeId}
              value={eachType.salaryRangeId}
              name="salary range"
            />
            <label htmlFor={eachType.salaryRangeId} className="label">
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderNoJobsFoundView = () => (
    <div className="no-jobs-view-container">
      <img
        className="no-jobs-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="error-heading">No Jobs Found</h1>
      <p className="">We could not find any jobs. Try other filters</p>
    </div>
  )

  onClickJobRetry = () => this.getAllJobDetails()

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        className="error-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="error-heading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickJobRetry}
      >
        Retry
      </button>
    </div>
  )

  renderAllJobsDetailsContainer = () => {
    const {allJobsDetails} = this.state
    return (
      <ul className="all-job-list-cards-container">
        {allJobsDetails.map(jobDetails => (
          <Link to={`/jobs/${jobDetails.id}`} className="job-card-nav-item">
            <li className="job-card-container" key={jobDetails.id}>
              <div className="company-and-role-container">
                <img
                  className="company-logo"
                  src={jobDetails.companyLogoUrl}
                  alt="company logo"
                />
                <div className="role-container">
                  <h1 className="role-text">{jobDetails.title}</h1>
                  <div className="rating-section">
                    <AiFillStar className="star" />
                    <p className="rating">{jobDetails.rating}</p>
                  </div>
                </div>
              </div>

              <div className="location-package-container">
                <div className="job-details-icon-container">
                  <ImLocation />
                  <p className="job-details-icon-text">{jobDetails.location}</p>
                  <BsBriefcaseFill className="job-details-icon" />
                  <p className="job-details-icon-text">
                    {jobDetails.employmentType}
                  </p>
                </div>
                <p className="package-text">{jobDetails.packagePerAnnum}</p>
              </div>

              <hr className="line1" />
              <h1 className="description-title">Description</h1>
              <p className="description-text">{jobDetails.job_description}</p>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderAllJobsView = () => {
    const {allJobsDetails} = this.state
    if (allJobsDetails.length === 0) {
      return this.renderNoJobsFoundView()
    }
    return this.renderAllJobsDetailsContainer()
  }

  renderApiView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderAllJobsView()
      default:
        return null
    }
  }

  onChangeFilter = event =>
    this.setState({searchInput: event.target.value}, this.getAllJobDetails)

  renderResultContainer = () => {
    const {searchInput} = this.state

    return (
      <div className="job-card-search-and-content-container">
        <div className="search-container">
          <input
            type="search"
            className="search-input"
            placeholder="Search"
            onChange={this.onChangeFilter}
            value={searchInput}
          />
          <button
            type="button"
            testid="searchButton"
            className="search-icon-container"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {this.renderApiView()}
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          {this.renderSideBarContainer()}
          {this.renderResultContainer()}
        </div>
      </>
    )
  }
}

export default Jobs
