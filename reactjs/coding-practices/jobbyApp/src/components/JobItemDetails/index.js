import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsBriefcaseFill} from 'react-icons/bs'
import {VscLinkExternal} from 'react-icons/vsc'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data, 444)
    if (response.ok) {
      const {skills} = data.job_details

      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        job_description: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        skills: skills.map(skill => ({
          imageUrl: skill.image_url,
          name: skill.name,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
      }

      const similarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
        id: eachJob.id,
      }))
      this.setState({
        jobDetails,
        similarJobs,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderJobDetailsAndDescription = () => {
    const {jobDetails} = this.state
    return (
      <div className="job-card-container-inner">
        <div className="company-and-role-container">
          <img
            className="company-logo"
            src={jobDetails.companyLogoUrl}
            alt="job details company logo"
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
            <p className="job-details-icon-text">{jobDetails.employmentType}</p>
          </div>
          <p className="package-text">{jobDetails.packagePerAnnum}</p>
        </div>

        <hr className="line1" />
        <div className="description-and-link-container">
          <h1 className="description-title">Description</h1>

          <div className="nav-item">
            <div className="visit-container">
              <a
                className="visit-text"
                href={`${jobDetails.companyWebsiteUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                Visit
              </a>
              <VscLinkExternal />
            </div>
          </div>
        </div>

        <p className="description-text">{jobDetails.job_description}</p>
      </div>
    )
  }

  renderSkillsAndCompanyDetailsContainer = () => {
    const {jobDetails} = this.state
    const {lifeAtCompany} = jobDetails
    return (
      <>
        <div className="skills-container">
          <h1 className="sub-heading">Skills</h1>
          {jobDetails.skills !== undefined && (
            <ul className="skills-list-container">
              {jobDetails.skills.map(skills => (
                <li className="skill-image-container" key={skills.name}>
                  <img
                    className="skill-image"
                    src={skills.imageUrl}
                    alt={`${skills.name}`}
                  />
                  <p className="skill-text">{skills.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="company-details-container">
          <h1 className="sub-heading">Life at company</h1>
          {lifeAtCompany !== undefined && (
            <div className="company-description-and-image-container">
              <p className="company-description">{lifeAtCompany.description}</p>
              <img
                src={`${lifeAtCompany.imageUrl}`}
                className="company-img"
                alt="life at company"
              />
            </div>
          )}
        </div>
      </>
    )
  }

  renderJobCard = jobDetails => (
    <div className="job-card-container-inner">
      <div>
        <div className="company-and-role-container">
          <img
            className="company-logo"
            src={jobDetails.companyLogoUrl}
            alt="similar job company logo"
          />
          <div className="role-container">
            <h1 className="role-text">{jobDetails.title}</h1>
            <div className="rating-section">
              <AiFillStar className="star" />
              <p className="rating">{jobDetails.rating}</p>
            </div>
          </div>
        </div>

        <h1 className="description-title">Description</h1>
        <p className="description-text">{jobDetails.jobDescription}</p>
      </div>
      <div className="location-package-container">
        <div className="job-details-icon-container">
          <ImLocation />
          <p className="job-details-icon-text">{jobDetails.location}</p>
          <BsBriefcaseFill className="job-details-icon" />
          <p className="job-details-icon-text">{jobDetails.employmentType}</p>
        </div>
        <p className="package-text">{jobDetails.packagePerAnnum}</p>
      </div>
    </div>
  )

  renderSimilarJobsContainer = () => {
    const {similarJobs} = this.state
    // console.log(similarJobs, 222)
    return (
      <div className="similar-jobs-container">
        <h1 className="sub-main-heading">Similar Jobs</h1>
        {similarJobs !== undefined && (
          <ul className="similar-jobs-list-container">
            {similarJobs.map(jobCardDetails => (
              <li className="job-details-card" key={jobCardDetails.id}>
                {this.renderJobCard(jobCardDetails)}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickErrorRetryBtn = () => this.getJobItemDetails()

  renderErrorView = () => (
    <div className="error-view-container">
      <img
        className="error-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="error-heading">Oops! Something Went Wrong</h1>
      <p className="">We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickErrorRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => (
    <>
      <div className="job-item-details-container">
        {this.renderJobDetailsAndDescription()}
        {this.renderSkillsAndCompanyDetailsContainer()}
      </div>
      {this.renderSimilarJobsContainer()}
    </>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoaderView()
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderErrorView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-bg-container">
          {this.renderApiStatus()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
