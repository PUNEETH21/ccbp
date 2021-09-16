// FIX8: In order to use Link component it should be imported
import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {teamData} = props
  const {name, id, teamImageURL} = teamData

  return (
    // FIX9: When clicked on TeamCard page should be navigated to the URL '/team-matches/${id}'
    // FIX10: exact keyword is used in Route component to match routes
    // FIX11: "to" is the prop used to give the URL for navigation to Link component
    <Link to={`/team-matches/${id}`} className="link-item">
      <li className="team-card">
        <img src={teamImageURL} alt={name} className="team-logo" />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
