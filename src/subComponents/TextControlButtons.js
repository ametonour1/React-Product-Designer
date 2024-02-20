import React from 'react'
import "../css/sidePanelText.css"
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
const TextControlButtons = ({canvas,textAlign,setTextAlign,fontStyle,setFontStyle,textDecoration,setTextDecoration}) => {

        
  const handleTextAlignChange = (selected) => {
    if (canvas) {
      const selecetObject = canvas.getActiveObject()
      console.log(selecetObject)
      if (selecetObject && selecetObject.type === "textbox") {
        selecetObject.set("textAlign",selected);
        setTextAlign(selected);
        canvas.renderAll();
        canvas.fire("object:modified");
        console.log("textaligned",selected)
      }else {
        console.log("no active object")
      }
    }
      }
      const handleTextDecorationChange = (selected) => {
        if (canvas) {
          const selecetObject = canvas.getActiveObject()
          console.log(selecetObject)
          if (selecetObject && selecetObject.type === "textbox") {
            if (selected === "") {
              selecetObject.set({underline:false,linethrough:false})
            }else if (selected === "line-through"){
              selecetObject.set({linethrough:true,underline:false})
            }else if (selected === "underline") {
              selecetObject.set({underline:true,linethrough:false});
            }
            setTextDecoration(selected)
            canvas.renderAll();
            canvas.fire("object:modified");
            console.log("textDecoration",selected)
          }else {
            console.log("no active object")
          }
        }
      }
      const handleFontStyleChange = (selected) => {
        if (canvas) {
          const selecetObject = canvas.getActiveObject()
          console.log(selecetObject)
          if (selecetObject && selecetObject.type === "textbox") {
            selecetObject.set("fontStyle",selected);
            setFontStyle(selected);
            canvas.renderAll();
            canvas.fire("object:modified");
            console.log("fontStyle",selected)
          }else {
            console.log("no active object")
          }
        }
      }

  return (
    
          <div className='textControlButtonsDiv'>
            <div className='textControlButtons'>
      <div className='textControlButton' >
          <label className='textControlLabel'>Text Align</label>
          <div className='textControlSubButtons'>
          <button onClick={() => handleTextAlignChange("left")}
          className={textAlign === "left" ? "uniformButtonActive" : "uniformButtonInactive"}><FormatAlignLeftIcon id="buttonIcons"/></button>
          <button onClick={() => handleTextAlignChange("center")}
          className={textAlign === "center" ? "uniformButtonActive" : "uniformButtonInactive"}><FormatAlignJustifyIcon id="buttonIcons"/></button>
          <button onClick={() => handleTextAlignChange("right")}
          className={textAlign === "right" ? "uniformButtonActive" : "uniformButtonInactive"}><FormatAlignRightIcon id="buttonIcons"/></button>
         </div>
        </div>
        <div className='textControlButton'>
          <label className='textControlLabel'>Font Style</label>
          <div className='textControlSubButtons'>
          <button onClick={() => handleFontStyleChange("normal")}
          className={fontStyle === "normal" ? "uniformButtonActive" : "uniformButtonInactive"}>Normal</button>
          <button onClick={() => handleFontStyleChange("oblique")}
          className={fontStyle === "oblique" ? "uniformButtonActive" : "uniformButtonInactive"}><FormatBoldIcon id="buttonIcons"/></button>
          <button onClick={() => handleFontStyleChange("italic")}
          className={fontStyle === "italic" ? "uniformButtonActive" : "uniformButtonInactive"}><FormatItalicIcon id="buttonIcons"/></button>
        </div>
        </div>
        <div className='textControlButton'>
          <label className='textControlLabel'>Text Decoration</label>
          <div className='textControlSubButtons'>
          <button onClick={() => handleTextDecorationChange("")}
          className={textDecoration === "" ? "uniformButtonActive" : "uniformButtonInactive"}>None</button>
          <button onClick={() => handleTextDecorationChange("underline")}
           className={textDecoration === "underline" ? "uniformButtonActive" : "uniformButtonInactive"}><FormatUnderlinedIcon id="buttonIcons"/></button>
          <button onClick={() => handleTextDecorationChange("line-through")}
         className={textDecoration === "line-through" ? "uniformButtonActive" : "uniformButtonInactive"}><FormatStrikethroughIcon id="buttonIcons"/></button>
        </div>
        </div>
        </div>
      </div>
    
  )
}

export default TextControlButtons