import {
  PlanetItemContainer,
  PlanetImg,
  Name,
  Description,
} from './styledComponents'

const PlanetItem = props => {
  const {planetDetails} = props
  const {name, imageUrl, description} = planetDetails
  return (
    <PlanetItemContainer>
      <PlanetImg src={imageUrl} alt={`planet ${name}`} />
      <Name>{name}</Name>
      <Description>{description}</Description>
    </PlanetItemContainer>
  )
}

export default PlanetItem
