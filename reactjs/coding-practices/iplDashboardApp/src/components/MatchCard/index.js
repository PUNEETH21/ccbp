import './index.css'

const MatchCard = props => {
  const {teamCardDetails} = props
  const {
    matchStatus,
    competingTeamLogo,
    competingTeam,
    result,
  } = teamCardDetails

  const matchStatusClassName =
    matchStatus === 'Won' ? 'won-color' : 'lost-color'
  return (
    <li className="match-card-container">
      <img
        className="match-card-img"
        alt={`${competingTeam}`}
        src={competingTeamLogo}
      />
      <h1 className="team-card-name">{competingTeam}</h1>
      <p>{result}</p>
      <h1 className={matchStatusClassName}>{matchStatus}</h1>
    </li>
  )
}

export default MatchCard
