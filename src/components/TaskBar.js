import React from 'react'
import exportCanvasAsPNG from '../functions.js/exportCanvasAsPNG'
import ObjectControls from '../subComponents/ObjectControls'
import "../css/taskBar.css"
import WidgetsIcon from '@mui/icons-material/Widgets';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
const TaskBar = ({
       canvas,
       handleRedo,
       handleUndo,
       canUndo,
       canRedo,
       setSidePanel,
       isSnapping,
       setIsSnapping
}) => {
  const handleMenuSwitch = () => {
    setSidePanel("menu")
  }
  const handleIsSnapping = () => {
    setIsSnapping(!isSnapping)
  }
  return (
    <div className='taskBar'>
       <button className='taskBarBtn' data-tooltip-id='toolTipMenu' data-tooltip-content="Menu" onClick={handleMenuSwitch}><WidgetsIcon fontSize="large" /></button>
       {isSnapping ?   
       <button 
       className='taskBarBtn' 
       id='taskBtnActive'
       data-tooltip-id='toolTipSnap' 
       data-tooltip-content="Snapping On"
        onClick={handleIsSnapping} >
          <AlignHorizontalCenterIcon fontSize='large'/>
          </button> : 
          <button 
          className='taskBarBtn' 
          data-tooltip-id='toolTipSnap'
           data-tooltip-content="Snapping Off"
           onClick={handleIsSnapping}>
            <AlignHorizontalCenterIcon fontSize='large'/>
            </button>}
       <button className='taskBarBtn'  data-tooltip-id='toolTipUndo' data-tooltip-content="Undo"  onClick={handleUndo} disabled={!canUndo}><UndoIcon fontSize="large" /></button>
        <button className='taskBarBtn'  data-tooltip-id='toolTipRedo' data-tooltip-content="Redo"  onClick={handleRedo} disabled={!canRedo}><RedoIcon fontSize="large" /></button>
       <button className='taskBarBtn'  data-tooltip-id='toolTipExport' data-tooltip-content="Export PNG"  onClick={()=>exportCanvasAsPNG(canvas)}><FileDownloadIcon fontSize="large" /></button>
       <ObjectControls
       canvas={canvas}/>
       <Tooltip id='toolTipMenu' className='toolTip'/>
       <Tooltip id='toolTipSnap' className='toolTip'/>
       <Tooltip id='toolTipUndo' className='toolTip'/>
       <Tooltip id='toolTipRedo' className='toolTip'/>
       <Tooltip id='toolTipExport' className='toolTip'/>
    </div>
  )
}

export default TaskBar