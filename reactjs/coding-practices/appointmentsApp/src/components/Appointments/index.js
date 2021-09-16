import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], isFilterActive: false}

  onChangeTitle = event => this.setState({title: event.target.value})

  onChangeDate = event => this.setState({date: event.target.value})

  onSubmitForm = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onClickFavorite = id =>
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))

  onClickStarred = () =>
    this.setState(prevState => ({
      isFilterActive: !prevState.isFilterActive,
    }))

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isFavorite === true,
      )
    }
    return appointmentsList
  }

  renderAppointments = () => {
    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    const {isFilterActive} = this.state
    const starredClassName = isFilterActive ? 'active' : 'non-active'
    return (
      <div className="appointments-section">
        <div className="appointments-top-section">
          <h1>Appointments</h1>
          <button
            type="button"
            className={`starred-btn ${starredClassName}`}
            onClick={this.onClickStarred}
          >
            Starred
          </button>
        </div>

        <ul className="appointments-list-container">
          {filteredAppointmentsList.map(eachAppointment => (
            <AppointmentItem
              appointmentDetails={eachAppointment}
              onClickFavorite={this.onClickFavorite}
              onClickStarred={this.onClickStarred}
              key={eachAppointment.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {title, date} = this.state
    return (
      <div className="app-container">
        <div className="appointment-card-container">
          <div className="content-container">
            <div className="text-container">
              <h1 className="main-heading">Add Appointment</h1>
              <form
                className="form-container"
                type="submit"
                onSubmit={this.onSubmitForm}
              >
                <label htmlFor="title">TITLE</label>
                <input
                  id="title"
                  placeholder="Title"
                  value={title}
                  className="input"
                  onChange={this.onChangeTitle}
                  autoComplete="OFF"
                />

                <label htmlFor="date">DATE</label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  className="input"
                  onChange={this.onChangeDate}
                />
                <button type="submit" className="btn">
                  Add
                </button>
              </form>
            </div>
            <img
              className="appointment-img"
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>
          <hr className="line" />
          {this.renderAppointments()}
        </div>
      </div>
    )
  }
}

export default Appointments
