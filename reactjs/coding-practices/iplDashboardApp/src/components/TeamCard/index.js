import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {teamCardDetails} = props
  const {id, name, teamImageUrl} = teamCardDetails
  return (
    <Link className="team-card-list-item" to={`/team-matches/${id}`}>
      <li className="team-card-container">
        <img className="team-card-img" alt={`${name}`} src={teamImageUrl} />
        <h1 className="team-card-name">{name}</h1>
      </li>
    </Link>
  )
}

export default TeamCard
