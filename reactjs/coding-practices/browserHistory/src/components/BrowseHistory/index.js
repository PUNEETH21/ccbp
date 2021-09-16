import {Component} from 'react'
import './index.css'

class BrowseHistory extends Component {
  state = {historyList: [], searchInput: ''}

  componentDidMount() {
    const {initialHistoryList} = this.props
    this.setState({historyList: initialHistoryList})
  }

  onChangeSearchInput = event =>
    this.setState({searchInput: event.target.value})

  getFilteredHistoryList = () => {
    const {historyList, searchInput} = this.state

    const filteredHistoryList = historyList.filter(historyDetails =>
      historyDetails.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log(searchInput, filteredHistoryList)
    return filteredHistoryList
  }

  onClickDeleteBtn = id => {
    const {historyList} = this.state
    const filteredHistoryList = historyList.filter(
      historyDetails => historyDetails.id !== id,
    )
    this.setState({historyList: filteredHistoryList})
  }

  render() {
    const {searchInput} = this.state
    const filteredHistoryList = this.getFilteredHistoryList()
    return (
      <div className="app-container">
        <div className="header-container">
          <img
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/history-website-logo-img.png"
            alt="app logo"
          />
          <div className="search-image-input-container">
            <div className="search-container">
              <img
                className="search-image"
                src="https://assets.ccbp.in/frontend/react-js/search-img.png"
                alt="search"
              />
            </div>

            <input
              type="search"
              className="input"
              value={searchInput}
              onChange={this.onChangeSearchInput}
              placeholder="Search history"
            />
          </div>
        </div>

        {filteredHistoryList.length > 0 ? (
          <div className="bottom-container">
            <ul className="history-list-container">
              {filteredHistoryList.map(historyDetails => {
                const onClickDelete = () =>
                  this.onClickDeleteBtn(historyDetails.id)

                return (
                  <li className="history-item" key={historyDetails.id}>
                    <p className="time-accessed-text">
                      {historyDetails.timeAccessed}
                    </p>
                    <div className="details-container">
                      <div className="website-container">
                        <img
                          className="logo-image"
                          src={historyDetails.logoUrl}
                          alt="domain logo"
                        />
                        <p className="website-title">{historyDetails.title}</p>
                        <p className="">{historyDetails.domainUrl}</p>
                      </div>
                      <button
                        testid="delete"
                        type="button"
                        className="delete-btn"
                        onClick={onClickDelete}
                      >
                        <img
                          className="delete-icon"
                          src="https://assets.ccbp.in/frontend/react-js/delete-img.png"
                          alt="delete"
                        />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : (
          <div className="bottom-message-container">
            <p>There is no history to show</p>
          </div>
        )}
      </div>
    )
  }
}

export default BrowseHistory
