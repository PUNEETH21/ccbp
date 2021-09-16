import {
  NotFoundContainer,
  NotFoundImg,
  NotFoundTitle,
  NotFoundDescription,
} from './styledComponents'

const NotFound = () => (
  <NotFoundContainer>
    <NotFoundImg
      src="https://assets.ccbp.in/frontend/react-js/not-found-img.png"
      alt="not found"
    />
    <NotFoundTitle>Lost Your Way?</NotFoundTitle>
    <NotFoundDescription>
      Sorry, we can’t find that page. You’ll find lots to explore on the home
      page
    </NotFoundDescription>
  </NotFoundContainer>
)

export default NotFound
