import styled from 'styled-components'

export const CourseTimelineCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

export const CourseTitle = styled.h1`
  color: #171f46;
  margin-bottom: 0px;
  font-family: 'Roboto';
`

export const DurationContainer = styled.div`
  display: flex;
  align-items: center;
`

export const Duration = styled.p`
  padding-left: 2px;
  font-size: 15px;
  font-weight: bold;
`

export const CourseDescription = styled.p`
  font-weight: bold;
  margin-bottom: 0px;
`
export const TagListContainer = styled.ul`
  padding-left: 0px;
  display: flex;
  flex-wrap: wrap;
  width: 80%;
`
export const TagItem = styled.li`
  list-style-type: none;
`

export const CourseTag = styled.p`
  background-color: grey;
  color: #1e293b;
  padding: 5px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-right: 10px;
`
