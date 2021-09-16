function Box(props) {
  const { text, className } = props;
  return (
    <div className={`box ${className}`}>
      <p className="box-title">{text}</p>
    </div>
  );
}

const element = (
  <div className="boxes-bg-container">
    <h1 className="heading">Boxes</h1>
    <div className="boxes-container">
      <Box text="Small" className="small" />
      <Box text="Medium" className="medium" />
      <Box text="Large" className="large" />
    </div>
  </div>
);

ReactDOM.render(element, document.getElementById("root"));
