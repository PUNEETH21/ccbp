function Button(props) {
  //   Write your code here.
  const { text, color } = props;
  return <button className={`button ${color}`}>{text}</button>;
}

const element = (
  //   Write your code here.
  <div className="bg-container">
    <div>
      <h1 className="heading">Social Buttons</h1>
      <div className="buttons-container">
        <Button text="LIKE" color="like" />
        <Button text="Comment" color="comment" />
        <Button text="Share" color="share" />

        {/* <button className="button like">Like</button>
        <button className="button comment"></button>
        <button className="button share"></button> */}
      </div>
    </div>
  </div>
);

ReactDOM.render(element, document.getElementById("root"));
