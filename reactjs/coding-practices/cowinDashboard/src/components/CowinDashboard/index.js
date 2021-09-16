import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import {
  AppContainer,
  CowinDashboardContainer,
  LogoContainer,
  LogoImg,
  LogoHeading,
  CowinDashboardHeading,
  LoaderView,
  FailureView,
  ErrorImg,
  ErrorHeading,
} from './styledComponents'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

const covidVaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstant.initial, vaccinationData: {}}

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstant.inprogress})
    const response = await fetch(covidVaccinationDataApiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
          eachDayData => ({
            vaccineDate: eachDayData.vaccine_date,
            dose1: eachDayData.dose_1,
            dose2: eachDayData.dose_2,
          }),
        ),
        vaccinationByAge: fetchedData.vaccination_by_age,
        vaccinationByGender: fetchedData.vaccination_by_gender,
      }
      this.setState({
        vaccinationData: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inprogress:
        return this.renderLoaderView()
      case apiStatusConstant.success:
        return this.renderDashboardView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return ''
    }
  }

  renderDashboardView = () => {
    const {vaccinationData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByGender,
      vaccinationByAge,
    } = vaccinationData
    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageDetails={last7DaysVaccination}
        />
        <VaccinationByGender vaccinationByGenderDetails={vaccinationByGender} />
        <VaccinationByAge vaccinationByAgeDetails={vaccinationByAge} />
      </>
    )
  }

  renderLoaderView = () => (
    <LoaderView data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </LoaderView>
  )

  renderFailureView = () => (
    <FailureView>
      <ErrorImg
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <ErrorHeading>Something went wrong</ErrorHeading>
    </FailureView>
  )

  render() {
    return (
      <AppContainer>
        <CowinDashboardContainer>
          <LogoContainer>
            <LogoImg
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <LogoHeading>Co-WIN</LogoHeading>
          </LogoContainer>
          <CowinDashboardHeading>
            CoWin Vaccination in India
          </CowinDashboardHeading>
          {this.renderApiStatusView()}
        </CowinDashboardContainer>
      </AppContainer>
    )
  }
}

export default CowinDashboard
