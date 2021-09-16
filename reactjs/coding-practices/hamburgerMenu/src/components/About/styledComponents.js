import styled from 'styled-components'

export const AboutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto';
`

export const AboutMobileImg = styled.img`
  width: 80%;
  max-width: 468px;
  @media (min-width: 768px) {
    display: none;
  }
`

export const AboutDesktopImg = styled.img`
  width: 100%;
  max-width: 1110px;
  @media (max-width: 768px) {
    display: none;
  }
`
