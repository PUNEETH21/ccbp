import {Component} from 'react'

import NavBar from '../NavBar'
import HomeSection from '../HomeSection'
import AboutSection from '../AboutSection'
import ProjectsSection from '../ProjectsSection'
import ContactSection from '../ContactSection'
import SocialMediaSection from '../SocialMediaSection'

import './index.css'

const navBarItems = [
  {
    id: 0,
    iconUrl: 'https://assets.ccbp.in/frontend/react-js/home-img.png',
    name: 'HOME',
  },
  {
    id: 1,
    iconUrl: 'https://assets.ccbp.in/frontend/react-js/about-img.png',
    name: 'ABOUT',
  },
  {
    id: 2,
    iconUrl: 'https://assets.ccbp.in/frontend/react-js/projects-img.png',
    name: 'PROJECTS',
  },
  {
    id: 3,
    iconUrl: 'https://assets.ccbp.in/frontend/react-js/person-img.png',
    name: 'CONTACT',
  },
]

class Portfolio extends Component {
  state = {
    activeNavBarItem: navBarItems[0].name,
  }

  changeActiveNavBarItem = name => this.setState({activeNavBarItem: name})

  renderActiveComponent = () => {
    const {activeNavBarItem} = this.state
    switch (activeNavBarItem) {
      case navBarItems[0].name:
        return <HomeSection />
      case navBarItems[1].name:
        return <AboutSection />
      case navBarItems[2].name:
        return <ProjectsSection />
      case navBarItems[3].name:
        return <ContactSection />
      default:
        return null
    }
  }

  render() {
    const {activeNavBarItem} = this.state
    return (
      <div className="portfolio-container">
        <NavBar
          navBarItems={navBarItems}
          activeNavBarItem={activeNavBarItem}
          changeActiveNavBarItem={this.changeActiveNavBarItem}
        />
        <div className="portfolio-body">
          <div className="active-section">{this.renderActiveComponent()}</div>
          <SocialMediaSection />
        </div>
      </div>
    )
  }
}

export default Portfolio
