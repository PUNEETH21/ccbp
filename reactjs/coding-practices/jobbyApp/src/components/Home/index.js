import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickFindBtn = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-page-content-container">
          <h1 className="home-page-main-heading">
            Find The Job That Fits Your Life
          </h1>
          <p className="home-page-description">
            Millions of people are searching for jobs, salary information,
            company reviews.Find the job that fits your abilities and potential.
          </p>
          <button
            type="button"
            className="find-job-btn"
            onClick={onClickFindBtn}
          >
            Find Jobs
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
