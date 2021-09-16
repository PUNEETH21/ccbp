import ThemeContext from '../../context/ThemeContext'
import Navbar from '../Navbar'
import './index.css'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const containerBgClassName = isDarkTheme ? 'dark-bg-theme' : ''
      return (
        <>
          <Navbar />
          <div className={`not-found-container ${containerBgClassName}`}>
            <img
              className="not-found-img"
              src="https://assets.ccbp.in/frontend/react-js/not-found-img.png"
              alt="not found"
            />
            <h1>Lost your Way ?</h1>
            <p>We cannot seem to find the page</p>
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
