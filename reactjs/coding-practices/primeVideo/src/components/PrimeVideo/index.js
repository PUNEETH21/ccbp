import MoviesSlider from '../MoviesSlider'
import {
  PrimeVideoContainer,
  PrimeVideoImg,
  GenerSection,
  GenerTitle,
} from './styledComponents'

const actionMovie = 'ACTION'
const comedyMovie = 'COMEDY'

const PrimeVideo = props => {
  const {moviesList} = props
  const actionMoviesList = moviesList.filter(
    movie => movie.categoryId === actionMovie,
  )

  const comedyMoviesList = moviesList.filter(
    movie => movie.categoryId === comedyMovie,
  )

  return (
    <PrimeVideoContainer>
      <PrimeVideoImg
        src="https://assets.ccbp.in/frontend/react-js/prime-video-img.png"
        alt="prime video"
      />
      <GenerSection>
        <GenerTitle>Action Movies</GenerTitle>
        <MoviesSlider moviesList={actionMoviesList} />
        <GenerTitle>Comedy Movies</GenerTitle>
        <MoviesSlider moviesList={comedyMoviesList} />
      </GenerSection>
    </PrimeVideoContainer>
  )
}

export default PrimeVideo
