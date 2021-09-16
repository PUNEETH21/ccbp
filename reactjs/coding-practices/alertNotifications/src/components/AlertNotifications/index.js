import {AiFillCheckCircle} from 'react-icons/ai'
import {RiErrorWarningFill} from 'react-icons/ri'
import {MdWarning, MdInfo} from 'react-icons/md'

import Notification from '../Notification'
import './index.css'

const AlertNotifications = () => {
  const renderSuccessNotification = () => (
    <Notification>
      <AiFillCheckCircle className="icon success" />
      <div className="text-container">
        <h1 className="heading success">Success</h1>
        <p>You can access all the files in the folder</p>
      </div>
    </Notification>
  )

  const renderErrorNotification = () => (
    <Notification>
      <RiErrorWarningFill className="icon error" />
      <div className="text-container">
        <h1 className="heading error">Error</h1>
        <p>Sorry, you are not authorized to have access to delete the file</p>
      </div>
    </Notification>
  )

  const renderWarningNotification = () => (
    <Notification>
      <MdWarning className="icon warning" />
      <div className="text-container">
        <h1 className="heading warning">Warning</h1>
        <p>Viewers of this file can see comments and suggestions</p>
      </div>
    </Notification>
  )

  const renderInfoNotification = () => (
    <Notification>
      <MdInfo className="icon info" />
      <div className="text-container">
        <h1 className="heading info">Info</h1>
        <p>Anyone on the internet can view these files</p>
      </div>
    </Notification>
  )

  return (
    <div className="app-container">
      <h1>Alert Notifications</h1>
      {renderSuccessNotification()}
      {renderErrorNotification()}
      {renderWarningNotification()}
      {renderInfoNotification()}
    </div>
  )
}

export default AlertNotifications
