import ConfigurationContext from '../../context/ConfigurationContext'
import './index.css'

const ConfigurationController = () => (
  <ConfigurationContext.Consumer>
    {value => {
      const {
        showContent,
        showLeftNavbar,
        showRightNavbar,
        onToggleShowContent,
        onToggleShowLeftNavbar,
        onToggleShowRightNavbar,
      } = value

      const onChangeContent = () => onToggleShowContent()
      const onChangeLeftNavbar = () => onToggleShowLeftNavbar()
      const onChangeRightNavbar = () => onToggleShowRightNavbar()

      return (
        <div className="configuration-container">
          <h1>Layout</h1>
          <div className="checkbox-container">
            <input type="checkbox" id="content" onChange={onChangeContent} />
            <label htmlFor="content">Content</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="leftNavbar"
              onChange={onChangeLeftNavbar}
            />
            <label htmlFor="leftNavbar">Left Navbar</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="rightNavbar"
              onChange={onChangeRightNavbar}
            />
            <label htmlFor="rightNavbar">Right Navbar</label>
          </div>
        </div>
      )
    }}
  </ConfigurationContext.Consumer>
)

export default ConfigurationController
