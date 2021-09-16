import {HomeContainer, HomeMobileImg, HomeDesktopImg} from './styledComponents'

const Home = () => (
  <HomeContainer>
    <HomeMobileImg
      src="https://assets.ccbp.in/frontend/react-js/home-sm-img.png "
      alt="home"
    />

    <HomeDesktopImg
      src="https://assets.ccbp.in/frontend/react-js/home-lg-img.png "
      alt="home"
    />
  </HomeContainer>
)

export default Home
