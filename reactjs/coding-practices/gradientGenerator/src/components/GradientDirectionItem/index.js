import {GradientItem, DirectionButton} from './styledComponents'

const GradientDirectionItem = props => {
  const {gradientItem, isActive, onChangeDirectionId} = props

  const changeDirectionId = () => onChangeDirectionId(gradientItem.value)

  return (
    <GradientItem>
      <DirectionButton isActive={isActive} onClick={changeDirectionId}>
        {gradientItem.displayText}
      </DirectionButton>
    </GradientItem>
  )
}

export default GradientDirectionItem
