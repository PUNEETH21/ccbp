import Slider from 'react-slick'
import PlanetItem from '../PlanetItem'
import {PlanetsSliderContainer, PlanetHeading} from './styledComponents'

const PlanetsSlider = props => {
  const {planetsList} = props
  return (
    <PlanetsSliderContainer data-testid="planets">
      <PlanetHeading>PLANETS</PlanetHeading>
      <Slider>
        {planetsList.map(eachPlanet => (
          <PlanetItem key={eachPlanet.id} planetDetails={eachPlanet} />
        ))}
      </Slider>
    </PlanetsSliderContainer>
  )
}

export default PlanetsSlider
