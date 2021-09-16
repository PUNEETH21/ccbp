import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  return (
    <div className="latest-match-container">
      <div className="latest-match-header-section">
        <div className="latest-match-details">
          <h1>{latestMatchDetails.competingTeam}</h1>
          <h1>{latestMatchDetails.date}</h1>
          <p>{latestMatchDetails.venue}</p>
          <p>{latestMatchDetails.result}</p>
        </div>
        <img
          className="competing-team-logo"
          alt="competing team logo"
          src={latestMatchDetails.competingTeamLogo}
        />
      </div>
      <hr />
      <div>
        <h1>First Innings</h1>
        <p>{latestMatchDetails.firstInnings}</p>
        <h1>Second Innings</h1>
        <p>{latestMatchDetails.secondInnings}</p>
        <h1>Man Of The Match</h1>
        <p>{latestMatchDetails.manOfTheMatch}</p>
        <h1>Umpires</h1>
        <p>{latestMatchDetails.umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
