import React from 'react'
import "../css/sidePanelText.css"
const FontFamilySelector = ({canvas,selectedFont,setSelectedFont,fontFamilies}) => {
  
  
    const handleFontSelection = (e) =>{
        setSelectedFont(e.target.value)
        const font = e.target.value;
        if (canvas) {
          const selecetObject = canvas.getActiveObject() ;
          if (selecetObject && selecetObject.type === "textbox") {
            selecetObject.set("fontFamily",font)
            canvas.renderAll();
            canvas.fire("object:modified");
            console.log("fontFamily",font)
          }else {
            console.log("no active")
          }
        }
      }

    return (
    <div className='fontFamilySelectorDiv'>
             <div className='fontFamilySelector'>
          <label className='textControlLabel'>Select Font</label>
          <select id='fontSelector' value={selectedFont} onChange={handleFontSelection}>
            {fontFamilies.map((font,index)=>(
              <option key={index} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

    </div>
  )
}

export default FontFamilySelector