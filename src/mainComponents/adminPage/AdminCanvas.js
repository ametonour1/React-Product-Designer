import React, { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import AdminCanvasSliders from './AdminCanvasSliders';
const AdminCanvas = ({
    productImage,
    adminCanvasHeight,
      adminCanvasWidth,
      adminCanvasPaddingTop,
      adminCanvasPaddingLeft, 
      setAdminCanvasHeight,
      setAdminCanvasWidth,
      setAdminCanvasPaddingTop,
      setAdminCanvasPaddingLeft
}) => {
    const [canvas,setCanvas] = useState(null);

    const canvasRef = useRef(null)

    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    const calcSize = Math.min(windowHeight,windowWidth)
    const initialHeight = Math.floor(calcSize * adminCanvasHeight);
    const initalWidth = Math.floor(calcSize * adminCanvasWidth);
    const initializeCanvas = () => {
     const canvas =   new fabric.Canvas("adminCanvas",{
            width:initalWidth,
            height:initialHeight    
        })
        return canvas

    }

    const resizeCanvas = () =>{
        if (canvas) {
          const windowHeight = window.innerHeight
          const windowWidth = window.innerWidth
          const calcSize = Math.min(windowHeight,windowWidth)
          console.log(windowWidth,"777")
         
            const newHeight = Math.floor(calcSize * adminCanvasHeight);
            const newWidth = Math.floor(calcSize * adminCanvasWidth);
            const w = canvas.getWidth()
            //console.log("resize",windowHeight,windowWidth,"w:",w)
            canvas.setDimensions({
              width:newWidth,
              height:newHeight
            })
            canvas.renderAll()
      
         
        }
      }

      useEffect(()=>{
        console.log("useEffet gos brr",canvas)
        resizeCanvas()

      },[adminCanvasHeight,adminCanvasWidth,adminCanvasPaddingLeft,adminCanvasPaddingTop])

    useEffect(()=>{
        const newCanvas = initializeCanvas()
        console.log(newCanvas,"newCanvas")
        setCanvas(newCanvas)
    },[])

    //window.addEventListener("resize",resizeCanvas)
    
  return (
    <div className="h-full ">
        <div className="grid grid-cols-1 grid-rows-1 h-full ">
         <div className="col-start-1 col-end-2 row-start-1 row-end-2 max-h-full flex justify-center">
        <img className=" max-h-full" src={productImage}/>
        </div>
         <div className="col-start-1 col-end-2 row-start-1 row-end-2 "
         style={{paddingLeft:`${adminCanvasPaddingLeft}%`,paddingTop:`${adminCanvasPaddingTop}%`}}>
         <canvas  ref={canvasRef.name} id="adminCanvas"></canvas>
         </div>
        </div>
    
    </div>
  )
}

export default AdminCanvas