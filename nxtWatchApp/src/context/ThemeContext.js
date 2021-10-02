import React from 'react'

const ThemeContext = React.createContext({
  darkTheme: false,
  activeTab: 'NO_ACTIVE',
  savedVideos: [],
  addVideoItem: () => {},
  removeVideoItem: () => {},
})

export default ThemeContext
