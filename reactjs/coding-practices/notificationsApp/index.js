function Notification(props) {
  // Write your code here.
  const { message, text, iconUrl } = props;
  const container = (
    <div className={`card ${message}`}>
      <img className="logo" src={`${iconUrl}`} />
      <p>{text}</p>
    </div>
  );
  return container;
}

const element = (
  // Write your code here.
  <div className="notifications-bg-container">
    <div class="notifications-container">
      <h1 className="heading">Notifications</h1>
      <Notification
        message="information"
        text="Information Message"
        iconUrl="https://assets.ccbp.in/frontend/react-js/primary-icon-img.png"
      />
      <Notification
        message="success"
        text="Success Message"
        iconUrl="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
      />
      <Notification
        message="warning"
        text="Warning Message"
        iconUrl="https://assets.ccbp.in/frontend/react-js/warning-icon-img.png"
      />
      <Notification
        message="error"
        text="Error Message"
        iconUrl="https://assets.ccbp.in/frontend/react-js/danger-icon-img.png"
      />
    </div>
  </div>
);

ReactDOM.render(element, document.getElementById("root"));
