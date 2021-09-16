import {AiFillCalendar} from 'react-icons/ai'
import {
  ProjectTimelineCardContainer,
  HeaderSection,
  ProjectImg,
  ProjectTitle,
  DurationSection,
  Duration,
  ProjectDescription,
  ProjectLink,
} from './styledComponents'

const ProjectTimelineCard = props => {
  const {projectDetails} = props
  const {
    projectTitle,
    description,
    imageUrl,
    duration,
    projectUrl,
  } = projectDetails
  return (
    <ProjectTimelineCardContainer>
      <ProjectImg src={imageUrl} alt="project" />
      <HeaderSection>
        <ProjectTitle>{projectTitle}</ProjectTitle>
        <DurationSection>
          <AiFillCalendar color="#171f46" />
          <Duration>{duration}</Duration>
        </DurationSection>
      </HeaderSection>
      <ProjectDescription>{description}</ProjectDescription>
      <ProjectLink href={projectUrl}>Visit</ProjectLink>
    </ProjectTimelineCardContainer>
  )
}

export default ProjectTimelineCard
