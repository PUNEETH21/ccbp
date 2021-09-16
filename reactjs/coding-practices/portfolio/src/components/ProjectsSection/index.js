import './index.css'

const projectsData = [
  {
    id: 0,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/advanced-technologies-img.png',
    name: 'Advanced Technologies',
  },
  {
    id: 1,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/your-moment-is-complete-img.png',
    name: 'Your Moment Is Complete',
  },
  {
    id: 2,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/robotics-img.png',
    name: 'Robotics',
  },
  {
    id: 3,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/happy-meals-img.png',
    name: 'Happy Meals',
  },
]

const ProjectsSection = () => (
  <div className="projects-section">
    <h1 className="heading">My Work</h1>
    <ul className="projects-items">
      {projectsData.map(eachProject => (
        <li className="project">
          <img
            className="project-icon"
            alt="project-icon"
            src={eachProject.imageUrl}
          />
          <p>{eachProject.name}</p>
        </li>
      ))}
    </ul>
  </div>
)

export default ProjectsSection
