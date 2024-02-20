import React from 'react'
import ImageFilters from './ImageFilters'
import "../css/sidePanelFilters.css"
const SidePanelFilters = ({canvas,initializeCanvasToLocal}) => {
  return (
    <div className='sidePanelFilters'>
      <ImageFilters
      canvas={canvas}
      initializeCanvasToLocal={initializeCanvasToLocal}
      />
    </div>
  )
}

export default SidePanelFilters