import './index.css'

const skillsData = [
  {
    id: 0,
    name: 'HTML',
  },
  {
    id: 1,
    name: 'Java Script',
  },
  {
    id: 2,
    name: 'CSS',
  },
  {
    id: 3,
    name: 'Java',
  },
  {
    id: 4,
    name: 'Python',
  },
  {
    id: 5,
    name: 'React',
  },
  {
    id: 6,
    name: 'Node',
  },

  {
    id: 7,
    name: 'Bootstrap',
  },
]

const educationData = [
  {
    id: 0,
    qualification: 'Graduation',
    qualificationSource: 'B.Tech(Computer Science)',
  },
  {
    id: 1,
    qualification: 'Intermediate',
    qualificationSource: 'St.Ann’s Jr College',
  },
  {
    id: 2,
    qualification: 'High School',
    qualificationSource: 'Kimberley EM School',
  },
]

// Write your code here

const AboutSection = () => (
  <div className="about-section">
    <h1>About</h1>
    <p>
      I started my journey in the world of computers from a young age afs l
      oidofa asd fo sdofi oiasd fi idofd sifoids iodf oiasf oa diof diofid sf
      odfa fodo ifiasd foas dfd sfas df sdof oisd f fdasof afs l oidofa asd fo
      sdofi oiasd fi idofd sifoids iodf oiasf oa diof diofid sf odfa fodo ifiasd
      foas dfd sfas df sdof oisd f fdasof afs l oidofa asd fo sdofi oiasd fi
      idofd sifoids iodf oiasf oa diof diofid sf odfa fodo ifiasd foas dfd sfas
      df sdof oisd f fdasof
    </p>
    <div className="about-details-section">
      <ul className="education-section">
        <h1>Education</h1>
        {educationData.map(eachItem => (
          <li className="education-item">
            <div className="list-icon-section">
              <img
                src="https://assets.ccbp.in/frontend/react-js/list-icon-img.png"
                alt="icon"
              />
              <p className="qualification">{eachItem.qualification}</p>
            </div>
            <p className="qualificationSource">
              {eachItem.qualificationSource}
            </p>
          </li>
        ))}
      </ul>
      <ul className="skills-section">
        <h1>Skills</h1>
        <div className="skills-container">
          {skillsData.map(eachItem => (
            <li className="skill-item">
              <p className="">{eachItem.name}</p>
            </li>
          ))}
        </div>
      </ul>
    </div>
  </div>
)

export default AboutSection
