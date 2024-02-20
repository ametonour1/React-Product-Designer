import React from 'react'
import "../css/taskBar.css"
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BorderInnerIcon from '@mui/icons-material/BorderInner';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import { Tooltip } from 'react-tooltip';

const ObjectControls = ({canvas}) => {

    const centerObject = () => {
        if (canvas) {
          const selecetObject = canvas.getActiveObject();
          if (selecetObject) {
            const canvasCenterX = canvas.width/2;
            const canvasCenterY = canvas.height/2;
            const boundingBox = selecetObject.getBoundingRect();
    
            const offsetX = canvasCenterX - boundingBox.width / 2 -boundingBox.left;
            const offsetY = canvasCenterY - boundingBox.height / 2 -boundingBox.top;
    
            selecetObject.set({
              left:selecetObject.left+offsetX,
              top:selecetObject.top+offsetY,
            });
            canvas.renderAll()
          }
        }
       
      }

      const moveObjectUp = () => {
        const selectedObject = canvas.getActiveObject();
        if (selectedObject) {
          canvas.bringForward(selectedObject);
          canvas.renderAll()
        }
      }
      const moveObjectDown = () => {
        const selectedObject = canvas.getActiveObject();
        if (selectedObject) {
          canvas.sendBackwards(selectedObject);
          canvas.renderAll()
        }
      }

      const clearLocal = () => {
        localStorage.removeItem("savedCanvas");
      }
      const removeObject = () => {
        const selectedObject = canvas.getActiveObject();
        if (selectedObject) {
          canvas.remove(selectedObject);
          canvas.renderAll()
        }
      }

      
  return (
    <div className='objectControls'>
        
        <button data-tooltip-id='toolTipLayerUp' data-tooltip-content="Layer Up" className='taskBarBtn' onClick={moveObjectUp}><ArrowDropUpIcon fontSize="large"  /></button>
        <button data-tooltip-id='toolTipLayerDown' data-tooltip-content="Layer Down" className='taskBarBtn' onClick={moveObjectDown}><ArrowDropDownIcon fontSize="large" /></button>
        <button  data-tooltip-id='toolTipCenter' data-tooltip-content="Center Object"className='taskBarBtn' onClick={centerObject}><BorderInnerIcon fontSize="large" /></button>
       <button data-tooltip-id='toolTipRemove' data-tooltip-content="Remove Object" className='taskBarBtn' onClick={removeObject}><DeleteIcon fontSize="large" /></button>
       <button data-tooltip-id='toolTipClear' data-tooltip-content="Clear Canvas" className='taskBarBtn' onClick={clearLocal}><ClearIcon fontSize="large" /></button>
       <Tooltip id='toolTipLayerUp' className='toolTip'/>
       <Tooltip id='toolTipLayerDown' className='toolTip'/>
       <Tooltip id='toolTipCenter' className='toolTip'/>
       <Tooltip id='toolTipRemove' className='toolTip'/>
       <Tooltip id='toolTipClear' className='toolTip'/>
    </div>
  )
}

export default ObjectControls