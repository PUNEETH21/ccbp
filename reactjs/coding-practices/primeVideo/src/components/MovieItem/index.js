import {IoMdClose} from 'react-icons/io'
import ReactPlayer from 'react-player'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {
  MovieItemContainer,
  Thumbnail,
  ModalContainer,
  CloseButton,
  MoviePlayerContainer,
} from './styledComponents'
import './index.css'

const MovieItem = props => {
  const {movie} = props
  const {videoUrl, thumbnailUrl} = movie
  return (
    <MovieItemContainer>
      <Popup
        modal
        trigger={<Thumbnail src={`${thumbnailUrl}`} alt="thumbnail" />}
        className="popup-content"
      >
        {close => (
          <ModalContainer>
            <CloseButton
              data-testid="closeButton"
              type="button"
              onClick={() => close()}
            >
              <IoMdClose />
            </CloseButton>
            <MoviePlayerContainer>
              <ReactPlayer url={videoUrl} controls />
            </MoviePlayerContainer>
          </ModalContainer>
        )}
      </Popup>
    </MovieItemContainer>
  )
}

export default MovieItem
