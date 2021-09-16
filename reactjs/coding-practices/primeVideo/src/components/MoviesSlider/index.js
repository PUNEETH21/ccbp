import Slider from 'react-slick'

import MovieItem from '../MovieItem'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const MoviesSlider = props => {
  const {moviesList} = props

  const settings = {
    dots: false,
    slidesToScroll: 1,
    slidesToShow: 4,
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {moviesList.map(movie => (
          <MovieItem movie={movie} />
        ))}
      </Slider>
    </div>
  )
}

export default MoviesSlider
