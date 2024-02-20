import React from 'react'
import { SketchPicker } from 'react-color'
import ChangeSvgColor from '../functions.js/ChangeSvgColor'
import "../css/sidePanelText.css"
const ColorSlide = ({canvas,selectedColor,setSelectedColor,selectColorSurface}) => {
  
  
    const changeColor = (rgbaColor) => {
        const selectedObject = canvas.getActiveObject();
     
        if (selectedObject && selectedObject.type ===  "textbox") {
          selectedObject.set(selectColorSurface,rgbaColor); 
          canvas.renderAll()
          canvas.fire("object:modified")
        } else if (selectedObject && selectedObject.type === "path"){
          ChangeSvgColor({canvas:canvas,selectedObject:selectedObject,color:rgbaColor})
        }else {
          console.log("no object selected(color)")
        }
      }
    
      const handleColorChange = (color) => {
        const {r,g,b,a} = color.rgb;
        const rgbaColor = `rgba(${r},${g},${b},${a})`
        //setSelectedColor(rgbaColor)
        changeColor(rgbaColor)
        console.log("heloooo",rgbaColor)
      
      }
      const handleColorStateChange = (color) =>{
        const {r,g,b,a} = color.rgb;
        const rgbaColor = `rgba(${r},${g},${b},${a})`
        setSelectedColor(rgbaColor)
       
      }

    return (
    <div>
      <div className='colorSlider'>
    <SketchPicker
    color={selectedColor}
    onChange={handleColorStateChange}
    onChangeComplete={handleColorChange}
    className="sketchPicker"
    presetColors={[]}
    width={180}
    
    />
    </div>
    </div>
  )
}

export default ColorSlide