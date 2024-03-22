import React from 'react'
import Slider from 'rc-slider'

const AdminCanvasSliders = ({
    adminCanvasHeight,
      adminCanvasWidth,
      adminCanvasPaddingTop,
      adminCanvasPaddingLeft, 
      setAdminCanvasHeight,
      setAdminCanvasWidth,
      setAdminCanvasPaddingTop,
      setAdminCanvasPaddingLeft
}) => {
   
    const handleAdminCanvasHeightChange = (value) =>{
        setAdminCanvasHeight(value)
    }
    const handleAdminCanvasWidthChange = (value) =>{
        setAdminCanvasWidth(value)
    }
    const handleAdminCanvasPaddingTopChange = (value) =>{
        setAdminCanvasPaddingTop(value)
    }
    const handleAdminCanvasPaddingLeftChange = (value) =>{
        setAdminCanvasPaddingLeft(value)
    }
  return (
    <div className="h-auto w-auto pl-1 pr-1 flex flex-col gap-1 ">
        <Slider value={adminCanvasWidth} onChange={(value)=> handleAdminCanvasWidthChange(value)} min={0} max={1} step={0.1} className="bg-red-300"/>
        <Slider value={adminCanvasHeight} onChange={(value)=> handleAdminCanvasHeightChange(value)} min={0} max={1} step={0.1} className="bg-red-300"/>
        <Slider value={adminCanvasPaddingTop} onChange={(value)=> handleAdminCanvasPaddingTopChange(value)} min={1} max={100} className="bg-red-300"/>
        <Slider value={adminCanvasPaddingLeft} onChange={(value)=> handleAdminCanvasPaddingLeftChange(value)} min={1} max={100} className="bg-red-300"/>
    
      <div>
        <p>width{adminCanvasWidth}</p>
        <p>height{adminCanvasHeight}</p>
        <p>paddingTop{adminCanvasPaddingTop}</p>
        <p>padddingLeft{adminCanvasPaddingLeft}</p>
      </div>
    </div>
  )
}

export default AdminCanvasSliders