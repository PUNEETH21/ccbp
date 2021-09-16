import {Chrono} from 'react-chrono'
import CourseTimelineCard from '../CourseTimelineCard'
import ProjectTimelineCard from '../ProjectTimelineCard'

import {TimelineViewContainer, MainTitle, MainHeading} from './styledComponents'

const TimelineView = props => {
  const {timelineItemsList} = props
  const renderTimelineCard = item => {
    if (item.categoryId === 'PROJECT') {
      return <ProjectTimelineCard key={item.id} projectDetails={item} />
    }
    return <CourseTimelineCard key={item.id} courseDetails={item} />
  }

  return (
    <TimelineViewContainer>
      <MainTitle>
        MY JOURNEY OF <br />
        <MainHeading>CCBP 4.0</MainHeading>
      </MainTitle>

      <Chrono
        theme={{
          secondary: 'white',
        }}
        items={timelineItemsList}
        mode="VERTICAL_ALTERNATING"
      >
        {timelineItemsList.map(eachItem => renderTimelineCard(eachItem))}
      </Chrono>
    </TimelineViewContainer>
  )
}

export default TimelineView
