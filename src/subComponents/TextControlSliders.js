import React from 'react'
import Slider from 'rc-slider'
import debounce from 'lodash.debounce'
import "../css/sidePanelText.css"

const TextControlSliders = ({canvas, fontSize,setFontSize,fontWeight,setFontWeight,lineheight,setLineHeight,charSpacing,setCharSpacing}) => {


  const backgroundColor = "rgb(240, 240, 247)"
  const highLightColor = "rgb(3, 252, 248)"
    const fontSizeChange = debounce ((type,value)=>{
        if (canvas) {
          const selectedObject = canvas.getActiveObject()
          console.log(selectedObject,value,type)
          if (selectedObject && selectedObject.type === "textbox"){
            selectedObject.set(type,value)
            canvas.renderAll()
            canvas.fire("object:modified")
            console.log("fontChanged")
          }else{
            console.log("cannot change font")
          }
        }
      },200)

      const handleFontSizeChange = (type,value) =>{
        if (type === "fontSize"){
         setFontSize(value)
        }else if (type === "fontWeight"){
         setFontWeight(value)
        }else if (type === "lineHeight"){
         setLineHeight(value)
        }else if (type === "charSpacing"){
         setCharSpacing(value)
        }
         fontSizeChange(type,value)
       }
 

    return (
  
         <div className='textControlSlidersDiv'>
          <div className='textControlSliders'> 
      <div>
         <label className='textControlLabel'>Font Size</label>
         <Slider
          trackStyle={{backgroundColor:highLightColor}} 
          railStyle={{backgroundColor:backgroundColor}}
          handleStyle={{
            backgroundColor:backgroundColor, 
            borderColor:highLightColor,
            
          }} className="textControlSlider" value={fontSize} onChange={(value)=> handleFontSizeChange("fontSize",value)} min={6} max={88}/>
        </div>
        <div>
         <label className='textControlLabel'>Font Weight</label>
         <Slider
           trackStyle={{backgroundColor:highLightColor}} 
           railStyle={{backgroundColor:backgroundColor}}
           handleStyle={{
             backgroundColor:backgroundColor, 
             borderColor:highLightColor,
             
           }}
            className="textControlSlider" value={fontWeight} onChange={(value)=> handleFontSizeChange("fontWeight",value)} step={100} min={100} max={900}/>
        </div>
        <div>
         <label className='textControlLabel'>Line Height</label>
         <Slider
           trackStyle={{backgroundColor:highLightColor}} 
           railStyle={{backgroundColor:backgroundColor}}
           handleStyle={{
             backgroundColor:backgroundColor, 
             borderColor:highLightColor,
             
           }}
            className="textControlSlider" value={lineheight} onChange={(value)=> handleFontSizeChange("lineHeight",value)} step={0.05}  min={0.50} max={2}/>
        </div>
        <div>
         <label className='textControlLabel'>Char Spacing</label>
         <Slider 
           trackStyle={{backgroundColor:highLightColor}} 
           railStyle={{backgroundColor:backgroundColor}}
           handleStyle={{
             backgroundColor:backgroundColor, 
             borderColor:highLightColor,
             
           }}
           className="textControlSlider" value={charSpacing} onChange={(value)=> handleFontSizeChange("charSpacing",value)} min={-130} max={700}/>
        </div>
        </div>
      </div>
    
  )
}

export default TextControlSliders