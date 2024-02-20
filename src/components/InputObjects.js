import React from 'react'
import { fabric } from 'fabric'
import { useState ,useEffect} from 'react';

import 'rc-slider/assets/index.css';

import "../css/inputObjects.css"

import SidePanelMenu from './SidePanelMenu';
import SidePanelText from './SidePanelText';
import SidePanelFilters from "./SidePanelFilters"
import SidePanelSvg from "./SidePanelSvg"
import SidePanelSvgColor from "./SidePanelSvgColor"
const InputObjects = ({
  canvas,
  initializeCanvasToLocal,
  sidePanel,
  setSidePanel,
  setQuery,
  fetchSvg,
  downloadedImages
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFont,setSelectedFont] =useState("Ubuntu");
  const [fontSize,setFontSize] = useState(21)
  const [fontWeight,setFontWeight] = useState(300)
  const [selectedColor,setSelectedColor] = useState("rgba(245, 40, 145,1)");
  const [selectColorSurface,setSelectedColorSurface] = useState("fill")
  const [lineheight,setLineHeight] = useState(1)
  const [charSpacing,setCharSpacing] = useState(0)
  const [textAlign,setTextAlign] = useState("center")
  const [fontStyle,setFontStyle] = useState("normal")
  const [textDecoration,setTextDecoration] = useState("")
  const fontFamilies = [
    "Roboto, sans-serif",
    "Ubuntu, sans-serif",
    "Open Sans ,sans serif",
    "Julius Sans One, sans-serif",
    "Montserrat, sans serif",
    "Lato ,sans serif",
    "Oswald, sans serif",
    "Raleway, sans serif",
    "Pt Sans, sans serif",
    "Nunito, sans serif",
    "Playfair Display ,sans serif",
    "Merriweather, sans serif",
    "Source Sans Pro, sans serif",
    "Poppins,sans serif",
    "Quicksand,sans serif",
    "Muli, sans serif",
    "Whisper, sans serif",
    "Silkscreen ,sans serif",
    "DM Serif Display ,serif"
  ];



      const syncTextAjustmentSliders = (selecetObject) =>{
        if(canvas){
     
         if (selecetObject) {
           if ( selecetObject.type === "textbox") {
             const getFontWeight = selecetObject.get("fontWeight")
             const getFontSize = selecetObject.get("fontSize")
             const getLineHeight = selecetObject.get("lineHeight")
             const getCharSpacing = selecetObject.get("charSpacing")
             const getFontStyle = selecetObject.get("fontStyle")
             const getTextAlign = selecetObject.get("textAlign")
             const getUnderLine = selecetObject.get("underline")
             const getlineTrough = selecetObject.get("linethrough")
             const getFontFamily = selecetObject.get("fontFamily")
             if (getUnderLine === true) {
               setTextDecoration("underline")
             }else if (getlineTrough === true) {
               setTextDecoration("line-through")
             }else {
               setTextDecoration("")
             }
             
             setTextAlign(getTextAlign)
             setFontStyle(getFontStyle)
             setCharSpacing(getCharSpacing)
             setLineHeight(getLineHeight)
             setFontSize(getFontSize)
             setFontWeight(getFontWeight)
             setSelectedFont(getFontFamily)
             syncColorPicker()
             console.log(selecetObject,"syncCompleated")
           }
         }
        
        }
       }
       const syncColorPicker = () => {
        const selecetObject = canvas.getActiveObject()
        if (selecetObject && selecetObject.type === "textbox") {
          const getBackgroundColor = selecetObject.get("backgroundColor");
          const getTextFill = selecetObject.get("fill");
          if (selectColorSurface === "backgroundColor") {
            setSelectedColor(getBackgroundColor)
          }else if (selectColorSurface === "fill") {
            setSelectedColor(getTextFill)
          }
        }
      }
      const resetTextAjustmentSliders = () =>{
        if (canvas){
            setCharSpacing(0)
            setLineHeight(1)
            setFontSize(21)
            setFontWeight(400)
            setTextAlign("center")
            setFontStyle("normal")
            setTextDecoration("")
            console.log("reset text slider reset")
        }
      }

      useEffect(()=>{
        if (canvas) {
          syncColorPicker()
        }
      },[selectColorSurface])

      if (canvas) {
        canvas.on('mouse:down', (options) => {
            if (options.target) {
              const selectedObject = options.target;
           console.log(selectedObject)
              if (selectedObject && selectedObject instanceof fabric.Object) {
                canvas.setActiveObject(selectedObject);
                const active =canvas.getActiveObject()
                console.log("this is the active obj",active.type)
               
               if (selectedObject instanceof fabric.Textbox) {
                  syncTextAjustmentSliders(selectedObject);
                  setSidePanel("text")
                }else if( selectedObject.type == "path"){
                  setSidePanel("svgColor")
                }else if(selectedObject instanceof fabric.Image){
                  setSidePanel("image")
                }
              }
            } else {
              resetTextAjustmentSliders()
            }
          });
      }

      const renderSidePanel = () => {
        switch (sidePanel) {
          case "menu":
            return      <SidePanelMenu
            canvas={canvas} 
            selectedFile = {selectedFile}
            setSelectedFile ={setSelectedFile}
            selectedFont={selectedFont}
            fontSize={fontSize}
            fontWeight={fontWeight}
            setSidePanel={setSidePanel}
            />
            case "image":
              return  <SidePanelFilters
              canvas={canvas} 
              initializeCanvasToLocal={initializeCanvasToLocal}
              />
            case "svgColor":
              return <SidePanelSvgColor
              canvas={canvas}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectColorSurface={selectColorSurface}
             />
            case "text":
              return  <SidePanelText
              canvas={canvas}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectColorSurface={selectColorSurface}
              setSelectedColorSurface={setSelectedColorSurface}
              fontSize={fontSize}
              setFontSize={setFontSize}
              fontWeight={fontWeight}
              setFontWeight={setFontWeight}
              lineheight={lineheight}
              setLineHeight={setLineHeight}
              charSpacing={charSpacing}
              setCharSpacing={setCharSpacing}
              textAlign={textAlign}
              setTextAlign={setTextAlign}
              fontStyle={fontStyle}
              setFontStyle={setFontStyle}
              textDecoration={textDecoration}
              setTextDecoration = {setTextDecoration}
              selectedFont = {selectedFont}
              setSelectedFont = {setSelectedFont}
              fontFamilies={fontFamilies}
              />
            case "svg":
              return <SidePanelSvg
              canvas={canvas}
              setQuery={setQuery}
              fetchSvg={fetchSvg}
              downloadedImages={downloadedImages}
              />
        }
      }
      
  return (
    <div className='inputObjects'>
      {renderSidePanel()}
    </div>
  )
}

export default InputObjects