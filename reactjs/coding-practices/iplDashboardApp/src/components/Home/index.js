import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class Home extends Component {
  state = {isLoading: true, teamsList: []}

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data
    const updatedData = teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))
    // console.log(data)
    this.setState({isLoading: false, teamsList: updatedData})
  }

  render() {
    const {isLoading, teamsList} = this.state
    // console.log(teamsList, 4)

    return (
      <div className="home-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          <>
            <div className="logo-section">
              <img
                className="logo-img"
                alt="ipl-logo"
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              />
              <h1 className="logo-heading">IPL Dashboard</h1>
            </div>
            <ul className="teams-list-container">
              {teamsList.map(eachTeam => (
                <TeamCard teamCardDetails={eachTeam} key={eachTeam.id} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default Home
