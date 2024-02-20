import React from 'react'
import ColorSlide from '../subComponents/ColorSlide';
import ColorSurfaceControls from '../subComponents/ColorSurfaceControls';
import TextControlSliders from '../subComponents/TextControlSliders';
import TextControlButtons from '../subComponents/TextControlButtons';
import FontFamilySelector from '../subComponents/FontFamilySelector';
import "../css/sidePanelText.css"
const SidePanelText = ({
        canvas,
        selectedColor,
        setSelectedColor,
        selectColorSurface,
        setSelectedColorSurface,
        fontSize,
        setFontSize,
        fontWeight,
        setFontWeight,
        lineheight,
        setLineHeight,
        charSpacing,
        setCharSpacing,
        textAlign,
        setTextAlign,
        fontStyle,
        setFontStyle,
        textDecoration,
        setTextDecoration,
        selectedFont,
        setSelectedFont,
        fontFamilies,
}) => {
  return (
    <div className='sidePanelText'>
       <TextControlSliders
        canvas={canvas}
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontWeight={fontWeight}
        setFontWeight={setFontWeight}
        lineheight={lineheight}
        setLineHeight={setLineHeight}
        charSpacing={charSpacing}
        setCharSpacing={setCharSpacing}
        />
          <FontFamilySelector
        canvas={canvas}
        selectedFont = {selectedFont}
        setSelectedFont = {setSelectedFont}
        fontFamilies={fontFamilies}
        />

        <TextControlButtons
        canvas={canvas}
        textAlign={textAlign}
        setTextAlign={setTextAlign}
        fontStyle={fontStyle}
        setFontStyle={setFontStyle}
        textDecoration={textDecoration}
        setTextDecoration = {setTextDecoration}
        />

       

        <ColorSurfaceControls
        setSelectedColorSurface={setSelectedColorSurface}
        selectColorSurface={selectColorSurface}
        />

        <ColorSlide 
        canvas={canvas}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectColorSurface={selectColorSurface}    
        />

       


      
    </div>
  )
}

export default SidePanelText