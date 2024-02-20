import './App.css';
import React, { useState, useEffect, useCallback, useRef } from "react";
import { fabric } from 'fabric';
import _ from 'lodash';
import useUndo from 'use-undo';
import {snapingFunction} from "./snapingFunction"
import {v4 as uuidv4} from "uuid"
import InputObjects from './components/InputObjects';
import triggerCleanup from './functions.js/triggerCleanup';
import TaskBar from './components/TaskBar';
import TSHIRT from "./assets/tshirt.png"
import preventOverflow from './functions.js/preventOverflow';
function App() {
  //all the useStates 
  const [canvas, setCanvas] = useState(null);
  const [isUndoRedoAction,setIsUndoRedoAction] = useState(false)
  const [canvasState,{ set:setCanvasState, undo:undoCanvas,redo:redoCanvas, canUndo, canRedo}] = useUndo("")
  const [query,setQuery] = useState("tree")
  const [apiSvgData,setApiSvgData] = useState(null)
  const [downloadedImages,setDownloadedImages] = useState([])
  const [sidePanel,setSidePanel] = useState("menu")


const canvasRef = useRef(null)
const canvasDivRef = useRef(null)


const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;


const canvasWidth = Math.floor(windowWidth * 0.4);
const canvasHeight = Math.floor(windowWidth * 0.4);


const getDownloadedImages = () => {
  setDownloadedImages([])
  fetch("/api/images")
   .then((response)=>response.json())
   .then((data)=> setDownloadedImages(data))
   .catch((error)=>console.error("error fetching images for local"))
}
const fetchSvg = async () => {

  triggerCleanup(downloadedImages)

  const proxyUrl ="http://localhost:4000/api/data"

  const response = await fetch(`${proxyUrl}?query=${encodeURIComponent(query)}`)

  if (!response.ok) {
    throw new Error("failed to fetch data",response)
  }

  const data = await response.json()
  setApiSvgData(data)
  getDownloadedImages()
  console.log("api call successful",data)
}




  const renderCanvas = () => {
    const savedCanvas = localStorage.getItem("savedCanvas");
    if (savedCanvas !== null && savedCanvas !== "null") {
      canvas.loadFromJSON(savedCanvas,()=>{
        canvas.renderAll()
        console.log("loading canvas")
      })
    }
  }


  
  //create labeled Rect

  //event listeners
  if (canvas) {

 
    canvas.off('object:removed'); // Remove previous 'object:removed' listener
    canvas.off('object:added'); // Remove previous 'object:added' listener
    canvas.off('object:modified'); // Remove previous 'object:modified' listener
    canvas.off('mouse:down'); // Remove previous 'mouse:down' listener
  
  
  
    canvas.on('object:removed', (options) => {
      const savedCanvas = JSON.stringify(canvas);
      initializeCanvasToLocal(savedCanvas);
      
      
        undoRedoFunction()
      
      //setIsUndoRedoAction(false)
      
    });
  
    canvas.on('object:added', (options) => {
      const obj = options.target;
      if (!obj.id) {
        obj.set("id",uuidv4());
        canvas.requestRenderAll()
      }
      const savedCanvas = JSON.stringify(canvas);
      initializeCanvasToLocal(savedCanvas);
      
        
        undoRedoFunction()
      
      //setIsUndoRedoAction(false)
      
    });
  
    canvas.on('object:modified', (options) => {
      const savedCanvas = JSON.stringify(canvas);
      initializeCanvasToLocal(savedCanvas);
      
        undoRedoFunction()
      
      //setIsUndoRedoAction(false)

    });
  }

//initialize canvas
  const initCanvas = () => (
    new fabric.Canvas("canvas", {
      width: canvasWidth,
      height: canvasHeight,
      testBlock:false
      
    })
  )

  //Undo Redo function
const loadCanvas = () => {
  if (canvasState && canvasState !== "" && isUndoRedoAction === true) {
    //console.log(isUndoRedoAction)
    
    console.log(canvasState)
    const currentState = canvasState.present
    //console.log(currentState)
    if (currentState !== null && currentState !== "" ) {
      canvas.loadFromJSON(currentState,()=> {
        canvas.renderAll();
        console.log("canvas is loaded")
        setIsUndoRedoAction(false)
      })
    }else {
      console.log("somethign went wrong")
    }
  
  } else {
    console.log("err")
  }

  
}
const handleUndo = () => { 
  setIsUndoRedoAction(true)
  undoCanvas()
 
}
useEffect(()=>{
  if (isUndoRedoAction === true) {
    loadCanvas()
  }
  
},[isUndoRedoAction,canvasState])

const handleRedo = () => {
  setIsUndoRedoAction(true)
  redoCanvas()
}

const undoRedoFunction = ()=> {
 if (canvas && !isUndoRedoAction) {
  const json = JSON.stringify(canvas);
  setCanvasState(json)
  console.log("undoRedoFunctionRan")
  console.log(isUndoRedoAction)
 }
}
 
const initializeCanvasToLocal = (savedCanvas) => {
  if (canvas) {
    localStorage.setItem("savedCanvas",savedCanvas)
   
  }
} 

const resizeCanvas = () =>{
  if (canvas) {
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    const calcSize = Math.min(windowHeight,windowWidth)
    console.log(windowWidth,"555")
   
      const newHeight = Math.floor(calcSize * 0.4);
      const newWidth = Math.floor(calcSize * 0.4);
      const w = canvas.getWidth()
      //console.log("resize",windowHeight,windowWidth,"w:",w)
      canvas.setDimensions({
        width:newWidth,
        height:newHeight
      })
      canvas.renderAll()

   
  }
}


window.addEventListener("resize",resizeCanvas)

//useEffect section

  useEffect(()=> {
    if (canvas) {
        renderCanvas()
        resizeCanvas()

        
    }
  },[canvas])
 
  const [isSnapping,setIsSnapping] = useState(true)

  let snap = true
  const handleIsSnapping = () =>{
   setIsSnapping((prev)=>!prev)
   snap = false
  }

  useEffect(() => {

   
    const newCanvas = initCanvas();
    setCanvas(newCanvas);
    newCanvas.lowerCanvasEl.style.userSelect = "none";
   
   
   
    
  }, []);

  useEffect(()=>{

    if(canvas) {

      canvas.on("object:moving",(options)=>{
        const obj = options.target
        if (obj.left < 0) {
          obj.left = 0;
        }
        if (obj.top < 0) {
          obj.top = 0;
        }
        if (obj.left + obj.width * obj.scaleX > canvas.width) {
          obj.left = canvas.width - obj.width * obj.scaleX;
        }
        if (obj.top + obj.height * obj.scaleY > canvas.height) {
          obj.top = canvas.height - obj.height * obj.scaleY;
        }
      })
    }
  
  },[canvas,isSnapping])


    useEffect(()=>{

      if(canvas ){
       
  
if (isSnapping) {

  const newCanvas = canvas
  snapingFunction(newCanvas)
  console.log("snapping",isSnapping)

}else{
  canvas.off("object:moving")

  canvas.on("object:moving",(options)=>{
    const obj = options.target
   preventOverflow(canvas,obj)
  })

}    
      }
    },[canvas,isSnapping])
  

    
  

  return (
    <div className="App">
     <div className='mainDiv'>
        <img className='tShirt' src={TSHIRT} alt="tshirt"/>
      <div className='canvasDiv'>
        <div ref={canvasDivRef} className='canvasSubDiv'>
       <canvas ref={canvasRef} id="canvas"></canvas>
      
        </div>
       </div>
      </div>
      <div className='controlsDiv'>
      <div className='taskBarDiv'>
       <TaskBar
       canvas={canvas}
       handleRedo={handleRedo}
       handleUndo={handleUndo}
       canUndo={canUndo}
       canRedo={canRedo}
       setSidePanel={setSidePanel}
       isSnapping={isSnapping}
       setIsSnapping={setIsSnapping}
       />
       </div>
      <div className='inputObjectsDiv'>
        <InputObjects
         canvas={canvas}
         initializeCanvasToLocal={initializeCanvasToLocal}
         sidePanel={sidePanel}
         setSidePanel={setSidePanel}
         setQuery={setQuery}
         fetchSvg={fetchSvg}
         downloadedImages={downloadedImages}
        />
      </div>
      </div>
      
    
    </div>
  );
}

export default App;
