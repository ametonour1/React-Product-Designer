import React from 'react'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import "../css/sidePanelText.css"
const ColorSurfaceControls = ({setSelectedColorSurface,selectColorSurface}) => {


    const handleSelectedColorSurfaceChange = (type) => {
        console.log(type)
        setSelectedColorSurface(type);
      }
      console.log(selectColorSurface)

  return (
    <div className='colorSurfaceControlsDiv'> 
        <div className='colorSurfaceControls'>
    <label className='colorSurfaceControlsLabel'>Change Color</label>
    <div className='colorSurfaceSelectorButtons'>
    <button onClick={(type)=>handleSelectedColorSurfaceChange("fill")}
    className={selectColorSurface === "fill" ? "uniformButtonActive" : "uniformButtonInactive" }><FormatColorTextIcon id="buttonIcons"/></button>
    <button onClick={(type)=>handleSelectedColorSurfaceChange("backgroundColor")}
     className={selectColorSurface === "backgroundColor" ? "uniformButtonActive" : "uniformButtonInactive" }><FormatColorFillIcon id="buttonIcons"/></button>
  </div>
  </div>
  </div>
  )
}

export default ColorSurfaceControls