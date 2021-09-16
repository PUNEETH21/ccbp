import {AiFillClockCircle} from 'react-icons/ai'

import {
  CourseTimelineCardContainer,
  HeaderSection,
  CourseTitle,
  DurationContainer,
  Duration,
  CourseDescription,
  TagListContainer,
  TagItem,
  CourseTag,
} from './styledComponents'

const CourseTimelineCard = props => {
  const {courseDetails} = props
  return (
    <CourseTimelineCardContainer>
      <HeaderSection>
        <CourseTitle>{courseDetails.courseTitle}</CourseTitle>
        <DurationContainer>
          <AiFillClockCircle color="#171f46" />
          <Duration>{courseDetails.duration}</Duration>
        </DurationContainer>
      </HeaderSection>
      <CourseDescription>{courseDetails.description}</CourseDescription>
      <TagListContainer>
        {courseDetails.tagsList.map(tagDetails => (
          <TagItem>
            <CourseTag>{tagDetails.name}</CourseTag>
          </TagItem>
        ))}
      </TagListContainer>
    </CourseTimelineCardContainer>
  )
}

export default CourseTimelineCard
