import React from 'react'
import ColorSlide from '../subComponents/ColorSlide'
import "../css/sidePanelSvgColor.css"
const SidePanelSvgColor = ({
    canvas,
    selectedColor,
    setSelectedColor,
    selectColorSurface,
}) => {
  return (
    <div className='sidePanelSvgColor'>
         <ColorSlide 
         className="colorSlider"
        canvas={canvas}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectColorSurface={selectColorSurface}    
        />
    </div>
  )
}

export default SidePanelSvgColor