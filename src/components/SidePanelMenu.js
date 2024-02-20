import React from 'react'
import InputButtons from '../subComponents/InputButtons';
import "../css/sidePanelMenu.css"

const SidePanelMenu = ({canvas,selectedFile,setSelectedFile,selectedFont,fontSize,fontWeight,setSidePanel}) => {
  return (
    <div className='sidePanelMenu'>
      <InputButtons canvas={canvas} 
        selectedFile = {selectedFile}
        setSelectedFile ={setSelectedFile}
        selectedFont={selectedFont}
        fontSize={fontSize}
        fontWeight={fontWeight}
        setSidePanel={setSidePanel}/>
    </div>
  )
}

export default  SidePanelMenu