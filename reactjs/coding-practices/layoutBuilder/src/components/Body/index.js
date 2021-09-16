import ConfigurationContext from '../../context/ConfigurationContext'
import './index.css'

const Body = () => (
  <ConfigurationContext.Consumer>
    {value => {
      const {showContent, showLeftNavbar, showRightNavbar} = value

      return (
        <div className="body-container">
          {showLeftNavbar ? (
            <div className="navbar">
              <h1 className="navbar-heading">Left Navbar Menu</h1>
              <ul className="navbar-list-items">
                <li className="nav-item">Item 1</li>
                <li className="nav-item">Item 2</li>
                <li className="nav-item">Item 3</li>
                <li className="nav-item">Item 4</li>
              </ul>
            </div>
          ) : null}
          {showContent ? (
            <div className="content-container">
              <h1>Content</h1>
              <p>
                Lorem ipsum ads fad f adfla fads faidof iaodofidia faiodfioad
                fidiosfioadsiof ioad fioa sdio fiasdfioa dsiof oiads
                fioasdiofiaods faosd fioa dsofaids foasdfiasdifioasd iof asdio
                fioasd fiado faod fasdfio adiofioasd fioad fidifiaifo ido
                fiadioad fadi fiasd fboiasd foid fioa fioad io
              </p>
            </div>
          ) : null}
          {showRightNavbar ? (
            <div className="navbar">
              <h1 className="navbar-heading">Right Navbar</h1>
              <div className="ad-container">
                <p>Ad 1</p>
              </div>
              <div className="ad-container">
                <p>Ad 2</p>
              </div>
            </div>
          ) : null}
        </div>
      )
    }}
  </ConfigurationContext.Consumer>
)

export default Body
