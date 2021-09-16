import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    isValidSubmission: false,
    firstNameError: false,
    lastNameError: false,
  }

  onChangeFirstName = event => this.setState({firstName: event.target.value})

  onChangeLastName = event => this.setState({lastName: event.target.value})

  validateFirstName = () => {
    const {firstName} = this.state
    return firstName !== ''
  }

  validateLastName = () => {
    const {lastName} = this.state
    return lastName !== ''
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()
    this.setState({firstNameError: !isValidFirstName})
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()
    this.setState({lastNameError: !isValidLastName})
  }

  onSubmitButton = event => {
    event.preventDefault()
    const isValidFirstName = this.validateFirstName()
    const isValidLastName = this.validateLastName()
    const areBothValid = isValidFirstName && isValidLastName
    if (areBothValid) {
      this.setState({isValidSubmission: areBothValid})
    } else {
      this.setState({
        isValidSubmission: areBothValid,
        firstNameError: !isValidFirstName,
        lastNameError: !isValidLastName,
      })
    }
  }

  onSubmitAnotherResponse = event => {
    event.preventDefault()
    this.setState({isValidSubmission: false, firstName: '', lastName: ''})
  }

  renderSuccessSubmission = () => (
    <>
      <div className="submission-container">
        <img
          className="success-icon"
          alt="success"
          src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        />
        <p>Submitted Successfully</p>
        <button
          className="submit btn"
          type="submit"
          onClick={this.onSubmitAnotherResponse}
        >
          Submit Another Response
        </button>
      </div>
    </>
  )

  renderForm = () => {
    const {firstName, lastName, firstNameError, lastNameError} = this.state
    return (
      <>
        <form className="form-container" onSubmit={this.onSubmitButton}>
          <div className="field-section">
            <label htmlFor="firstName">FIRST NAME</label>
            <input
              id="firstName"
              className="input-field"
              type="text"
              value={firstName}
              placeholder="First name"
              onChange={this.onChangeFirstName}
              onBlur={this.onBlurFirstName}
            />
            {firstNameError && <p className="error">Required</p>}
          </div>
          <div className="field-section">
            <label htmlFor="lastName">LAST NAME</label>
            <input
              id="lastName"
              className="input-field"
              type="text"
              value={lastName}
              placeholder="Last name"
              onChange={this.onChangeLastName}
              onBlur={this.onBlurLastName}
            />
            {lastNameError && <p className="error">Required</p>}
          </div>

          <div className="button-section">
            <button className="submit btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </>
    )
  }

  render() {
    const {isValidSubmission} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Registration</h1>
        <div className="registration-card">
          {isValidSubmission
            ? this.renderSuccessSubmission()
            : this.renderForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
