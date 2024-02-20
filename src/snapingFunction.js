import { fabric } from "fabric";
import preventOverflow from "./functions.js/preventOverflow";
export const snapingFunction = (newCanvas) => {
    let exitInterceptionY = false; 
    let exitInterceptionX = false; 
    let guideLinesArray = {}
    let boundingRectAdded = false;
    let boundingRectBox = null
  

    const clearAllGuideLines = () => {
      Object.values(guideLinesArray).forEach((guideLines)=> {
        guideLines.forEach((guideLine)=> {
          newCanvas.remove(guideLine)
        })
      })
      guideLinesArray = {}
      if (exitInterceptionY) {
        exitInterceptionY = false
      }
      if(exitInterceptionX) {
        exitInterceptionX = false
      }
    }

    const getBoundingBoxCorners = (boundingRect) =>{

      const corners = {
        tl: { x: boundingRect.left, y: boundingRect.top },
        tr: { x: boundingRect.left + boundingRect.width, y: boundingRect.top },
        bl: { x: boundingRect.left, y: boundingRect.top + boundingRect.height },
        br: { x: boundingRect.left + boundingRect.width, y: boundingRect.top + boundingRect.height },
        ml: { x: boundingRect.left, y: boundingRect.top + boundingRect.height / 2 },
        mr: { x: boundingRect.left + boundingRect.width / 2, y: boundingRect.top + boundingRect.height / 2 },
        mt: { x: boundingRect.left + boundingRect.width / 2, y: boundingRect.top },
        mb: { x: boundingRect.left + boundingRect.width / 2, y: boundingRect.top + boundingRect.height /2 }
      };
    return corners;
    }

    const potentialEdges = [
      { objEdge: 'tr', targEdge: 'tl', axisOfInterception: 'y' },
      { objEdge: 'br', targEdge: 'tl', axisOfInterception: 'y' },
      { objEdge: 'br', targEdge: 'tr', axisOfInterception: 'y' },
      { objEdge: 'br', targEdge: 'br', axisOfInterception: 'y' },
      { objEdge: 'tr', targEdge: 'tr', axisOfInterception: 'y' },
      { objEdge: 'tl', targEdge: 'tl', axisOfInterception: 'y' },
      { objEdge: 'tr', targEdge: 'br', axisOfInterception: 'y' },
      { objEdge: 'br', targEdge: 'tl', axisOfInterception: 'x' },
      { objEdge: 'tr', targEdge: 'br', axisOfInterception: 'x' },
      { objEdge: 'mr', targEdge: 'mr', axisOfInterception: 'y' },
      { objEdge: 'br', targEdge: 'tr', axisOfInterception: 'x' },
      { objEdge: 'br', targEdge: 'tr', axisOfInterception: 'y' },
      { objEdge: 'bl', targEdge: 'tr', axisOfInterception: 'x' },
      { objEdge: 'br', targEdge: 'tr', axisOfInterception: 'x' },
      { objEdge: 'bl', targEdge: 'tl', axisOfInterception: 'x' },
      { objEdge: 'tl', targEdge: 'tl', axisOfInterception: 'x' },
      { objEdge: 'tr', targEdge: 'tr', axisOfInterception: 'x' },
      { objEdge: 'tr', targEdge: 'tl', axisOfInterception: 'x' },
      { objEdge: 'tl', targEdge: 'tr', axisOfInterception: 'x' },
      { objEdge: 'mb', targEdge: 'mb', axisOfInterception: 'x' },
      // Add more potential edges as needed
    ];
    const addBoundingRect = (options) => {
      const borderRect = new fabric.Rect({
        left:options.left,
        top:options.left,
        width:options.width,
        height:options.height,
        fill:"transparent",
        stroke:"red",
        strokeWidth:2,
        selectable:false,
        isBoundingRect : true
      })
      newCanvas.add(borderRect)
      boundingRectAdded = true
      boundingRectBox = borderRect
      
    }
    const removeBoundingRect = () => {
        newCanvas.remove(boundingRectBox)
    }
    const updateBoundingRectBorder = (options) =>{
      boundingRectBox.set({
        left:options.left,
        top:options.top,
        height:options.height,
        width:options.width
      })
      newCanvas.renderAll()
    }
  
   
    newCanvas.on("mouse:up",()=> {
      console.log("mouseUp")
      clearAllGuideLines()
      if(boundingRectAdded) {
        removeBoundingRect()
        boundingRectAdded = false
        boundingRectBox = null
      }
    })

    newCanvas.on("object:scaling",(options) =>{
      const obj = options.target;
      if (boundingRectAdded && boundingRectBox !== null) {
        //updateBoundingRectBorder(obj)
       }
    }) 
    newCanvas.on("object:moving", (options) => {
      const obj = options.target;
   

      
   

    
      const addGuideLine = (x1,y1,x2,y2, targetID,lineColor,from ,to,axis) => {
        const edgeKey = targetID;
        //console.log("form",from,to)
        if (!guideLinesArray[edgeKey]) {
          guideLinesArray[edgeKey] = [];
        }
      
        if (guideLinesArray[edgeKey].length > 0) return;
      
        const guideLine = new fabric.Line([x1, y1, x2, y2], {
          stroke: lineColor,
          strokeWidth: 1,
          strokeDashArray: [5, 3],
          evented: false,
          selectable: false,
          relationId: targetID,
          isGuideLine: true,
          lineFrom:from,
          lineTo:to,
          interception:axis,
        });
      console.log("guidelineadded",x1,x2)
        newCanvas.add(guideLine);
        newCanvas.renderAll()
        guideLinesArray[edgeKey].push(guideLine);
      }
      const removeGuideLine = (edgeKey, target) => {
        const id = edgeKey;

        if (!Array.isArray(guideLinesArray[edgeKey])) {
          guideLinesArray[edgeKey] = [];

        }
      
        if (guideLinesArray[edgeKey]) {
          let remainingGuideLines = [];
          //console.log("remov")
      
          guideLinesArray[edgeKey].forEach((guideLine) => {
           // console.log(guideLine,"errr")
            if (guideLine.relationId === id) {
             // console.log("same target");
              newCanvas.remove(guideLine);
              exitInterceptionY = false;
              exitInterceptionX = false;
              console.log("removed")
            } else {
             // console.log("not the same target");
              remainingGuideLines.push(guideLine);
            }
          });
      
          guideLinesArray[edgeKey] = remainingGuideLines;
        }
      }

      preventOverflow(newCanvas,obj)
      

      const objBoundingRect = obj.getBoundingRect()
      const objScaledHeight = obj.getScaledHeight()
      const objScaledWidth = obj.getScaledWidth()

      
     
        removeGuideLine(obj.id)
        const objMiddleHorizontal = obj.top + objScaledHeight/2
        const objMiddle = obj.left + objScaledWidth /2
      
        let centralx1 = null
        let centraly1 = null
        let centralx2 = null
        let centraly2 = null
        let centralid = null
        let centralcolor = null
        
        switch (true){
          case objMiddle > newCanvas.width / 2 - 20 && objMiddle < newCanvas.width / 2 + 20 :
            obj.set({
              left:newCanvas.width / 2 - objScaledWidth /2 
            }).setCoords()
            centralx1 = newCanvas.width/2
            centraly1 = 0
            centralx2 = newCanvas.width/2
            centraly2 = newCanvas.height
            centralid = obj.id
            centralcolor = "#FC0307"
           
            addGuideLine(centralx1,centraly1,centralx2,centraly2,centralid,centralcolor,"rr","rr","r")
            break
          case objMiddleHorizontal > newCanvas.height / 2 - 20 && objMiddleHorizontal < newCanvas.height / 2 + 20  :
            obj.set({
              top:newCanvas.height/ 2 - objScaledHeight /2 
            }).setCoords()
            centralx1 = 0
            centraly1 = newCanvas.height/2
            centralx2 = newCanvas.width
            centraly2 = newCanvas.height /2
            centralid = obj.id
            centralcolor = "#FC0307"
           
            addGuideLine(centralx1,centraly1,centralx2,centraly2,centralid,centralcolor,"rr","rr","r")
            break
          default:console.log("no interception")
        }
     
      
      newCanvas.forEachObject((targ) => {

        if (obj === targ) return;
        if (targ.isGuideLine) return;
        if (targ.isBoundingRect) return;


      //get bounding box for object and target
      const objBoundingBoxCorners = getBoundingBoxCorners(objBoundingRect)
      //console.log(objBoundingBoxCorners)

      const targBoundingRect = targ.getBoundingRect()
      const targBoundingBoxCorners = getBoundingBoxCorners(targBoundingRect)
      //console.log(targBoundingBoxCorners)
      
      if (!boundingRectAdded) {
        //addBoundingRect(objBoundingRect)
      }

      if (boundingRectAdded && boundingRectBox !== null) {
       updateBoundingRectBorder(objBoundingRect)
      }

        //snappingScenarios = snappingScenarios.concat(generatedScenarios)
        const objectScaledHeight = objBoundingRect.height
        const targetScaledHeight = targBoundingRect.height 
        const targetScaledWidth = targBoundingRect.width
        const objectScaledWidth = objBoundingRect.width 
        
        const snappingThreshold = 5

       
        /////////

const deltaY_tl = Math.abs(targBoundingBoxCorners.tl.y - objBoundingBoxCorners.tl.y);
const deltaY_tr = Math.abs(targBoundingBoxCorners.tr.y - objBoundingBoxCorners.br.y);
const deltaY_br = Math.abs(targBoundingBoxCorners.br.y - objBoundingBoxCorners.br.y);
const deltaY_bt = Math.abs(targBoundingBoxCorners.br.y - objBoundingBoxCorners.tr.y);
const deltaY_mr = Math.abs(targBoundingBoxCorners.mr.y - objBoundingBoxCorners.mr.y);

let x1 = null
let y1 = null
let x2 = null
let y2 = null
let lineColor = null
let from = null
let to = null
let axis = null
let compensation= null
switch (true) {
    case deltaY_tl <= snappingThreshold  && !exitInterceptionY:
        obj.set({
             
            top:targBoundingRect.top
          }).setCoords()
          console.log("1")

         
          exitInterceptionY = true
        x1 = objBoundingBoxCorners.tl.x;
        y1 = objBoundingBoxCorners.tl.y
        x2 = targBoundingBoxCorners.tl.x
        y2 = targBoundingBoxCorners.tl.y
         lineColor = "#FC0307"
         from = "tl"
         to = "tl"
         axis = "y"

        addGuideLine(x1,y1,x2,y2,targ.id,lineColor,from,to,axis)
        break
    case deltaY_tr <= snappingThreshold && !exitInterceptionY:
        compensation = targBoundingRect.top - objectScaledHeight
          obj.set({
            
            top: compensation
          }).setCoords()
          console.log("2")
          exitInterceptionY = true
          x1 = objBoundingBoxCorners.br.x;
           y1 = objBoundingBoxCorners.br.y
           x2 = targBoundingBoxCorners.tr.x
           y2 = targBoundingBoxCorners.tr.y
           lineColor = "#FC0307"
           from = "br"
           to ="tr"
           axis = "y"

          addGuideLine(x1,y1,x2,y2,targ.id,lineColor,from,to,axis)
          break
    case deltaY_bt <= snappingThreshold && !exitInterceptionY:
        compensation = targBoundingRect.top + targetScaledHeight
            obj.set({
              
              top:compensation
            }).setCoords()
            console.log("3")

            exitInterceptionY = true
          
            x1 = objBoundingBoxCorners.tr.x;
         y1 = objBoundingBoxCorners.tr.y
        x2 = targBoundingBoxCorners.br.x
         y2 = targBoundingBoxCorners.br.y
          lineColor = "#FC0307"
         from = "tr"
          to ="br"
           axis = "y"

          addGuideLine(x1,y1,x2,y2,targ.id,lineColor,from,to,axis)
          break
    case deltaY_br <= snappingThreshold && !exitInterceptionY :
        compensation = targBoundingRect.top + targetScaledHeight - objectScaledHeight
         
            
        obj.set({
         
          top: compensation
        }).setCoords()
        console.log("4")

        
          exitInterceptionY=true
           x1 = objBoundingBoxCorners.br.x;
           y1 = objBoundingBoxCorners.br.y
           x2 = targBoundingBoxCorners.br.x
           y2 = targBoundingBoxCorners.br.y
           lineColor = "#FC0307"
           from = "br"
            to ="br"
            axis = "y"

             addGuideLine(x1,y1,x2,y2,targ.id,lineColor,from,to,axis)
             break 

    case deltaY_mr <= snappingThreshold && !exitInterceptionY:
         compensation = targBoundingBoxCorners.mr.y - objectScaledHeight/2;
            obj.set({
              
              top: compensation
            }).setCoords()
            console.log("5")

            exitInterceptionY = true
           
            x1 = objBoundingBoxCorners.mr.x;
            y1 = objBoundingBoxCorners.mr.y
            x2 = targBoundingBoxCorners.mr.x
            y2 = targBoundingBoxCorners.mr.y
           lineColor = "#FC0307"
           from = "mr"
           to ="mr"
           axis ="y"

          addGuideLine(x1,y1,x2,y2,targ.id,lineColor,from,to,axis)
          break
        default:console.log("no intercepttion")
}

const deltaX_tl = Math.abs(targBoundingBoxCorners.tl.x - objBoundingBoxCorners.tl.x);
const deltaX_tr = Math.abs(targBoundingBoxCorners.tr.x - objBoundingBoxCorners.tr.x);
const deltaX_rl = Math.abs(targBoundingBoxCorners.tr.x - objBoundingBoxCorners.tl.x);
const deltaX_lr = Math.abs(targBoundingBoxCorners.tl.x - objBoundingBoxCorners.tr.x);
const deltaX_mb = Math.abs(targBoundingBoxCorners.mb.x - objBoundingBoxCorners.mb.x);


switch (true) {
    case deltaX_tl <= snappingThreshold && !exitInterceptionX:
        obj.set({
             
            left: targBoundingRect.left
        }).setCoords();
        exitInterceptionX = true
            
         
         x1 = objBoundingBoxCorners.tl.x;
         y1 = objBoundingBoxCorners.tl.y
         x2 = targBoundingBoxCorners.tl.x
         y2 = targBoundingBoxCorners.tl.y
     lineColor = "#FC0307"
           from = "tl"
           to ="tl"
         axis = "x"

      
          addGuideLine(x1, y1, x2, y2,targ.id,lineColor,from,to,axis);
        break
    case deltaX_tr <= snappingThreshold && !exitInterceptionX:
     compensation = targBoundingRect.left + targetScaledWidth-objectScaledWidth;
        obj.set({
         
          left: compensation
      }).setCoords();
      exitInterceptionX = true
      
       x1 = objBoundingBoxCorners.tr.x;
       y1 = objBoundingBoxCorners.tr.y
       x2 = targBoundingBoxCorners.tr.x
       y2 = targBoundingBoxCorners.tr.y
      lineColor = "#FC0307"
       from = "tr"
       to ="tr"
        axis = "x"

      addGuideLine(x1, y1, x2, y2,targ.id,lineColor,from,to,axis);
          break
    case deltaX_rl <= snappingThreshold && !exitInterceptionX :
            compensation = targBoundingRect.left + targetScaledWidth;
        obj.set({
          
          left: compensation
      }).setCoords();
      exitInterceptionX = true
      
          x1 = objBoundingBoxCorners.tl.x;
          y1 = objBoundingBoxCorners.tl.y
          x2 = targBoundingBoxCorners.tr.x
          y2 = targBoundingBoxCorners.tr.y
         lineColor = "#FC0307"
          from = "tl"
          to ="tr"
        axis = "x"

  
      addGuideLine(x1, y1, x2, y2,targ.id,lineColor,from,to,axis);
          break
    case deltaX_lr <= snappingThreshold && !exitInterceptionX:
         compensation = targBoundingRect.left - objectScaledWidth  ;
        obj.set({
          
          left:compensation
      }).setCoords();
      exitInterceptionX = true
     
         x1 = objBoundingBoxCorners.tr.x;
         y1 = objBoundingBoxCorners.tr.y
         x2 = targBoundingBoxCorners.tl.x
         y2 = targBoundingBoxCorners.tl.y   
          lineColor = "#FC0307"
         from = "tr"
         to = "tl"
         axis = "x"

  
      addGuideLine(x1, y1, x2, y2,targ.id,lineColor,from,to,axis);
             break 

    case deltaX_mb <= snappingThreshold && !exitInterceptionX:
           
            compensation = targBoundingBoxCorners.mb.x - objectScaledWidth/2 ;
        obj.set({
          
          left:compensation
      }).setCoords();
      exitInterceptionX = true
     
          x1 = objBoundingBoxCorners.mb.x;
          y1 = objBoundingBoxCorners.mb.y
          x2 = targBoundingBoxCorners.mb.x
          y2 = targBoundingBoxCorners.mb.y
          lineColor = "#FC0307"
          from = "mb"
          to = "mb"
          axis = "x"

  
      addGuideLine(x1, y1, x2, y2,targ.id,lineColor,from,to,axis);
          break
        default:console.log("no intercepttion")
}

     
      
       Object.values(guideLinesArray).forEach((guideLine)=>{
        guideLine.forEach((guide)=>{
          const from = guide.lineFrom
          const to = guide.lineTo
          const axis = guide.interception

          let removalDistance = null
          let removalId = null

          
          switch(true){
            case guide.relationId !== targ.id:
              console.log("return")
              break
            case guide.relationId === targ.id:
              potentialEdges.forEach((edge)=>{
                const objEdgeValue = objBoundingBoxCorners[edge.objEdge];
                const targEdgeValue = targBoundingBoxCorners[edge.targEdge];
        
                switch(true){
                  case edge.objEdge !== from || edge.targEdge !== to:
                    console.log("no interceprion")
                    break
                  case edge.objEdge === from && edge.targEdge === to :
                    switch(true){
                      case edge.axisOfInterception === "y":
                        removalDistance = Math.abs(targEdgeValue.y - objEdgeValue.y)
                        removalId =  targ.id
              
                        switch(true) {
                          case removalDistance < 2 && axis === "y":
                            console.log("not close")
                            break
                          case removalDistance > 3 && axis === "y":
                            removeGuideLine(removalId,targ)
                        }
                        break
                      case edge.axisOfInterception === "x":
                        removalDistance = Math.abs(targEdgeValue.x - objEdgeValue.x)
                        removalId =  targ.id
              
                        switch(true) {
                          case removalDistance < 2 && axis === "x":
                            console.log("not close")
                            break
                          case removalDistance > 3 && axis === "x":
                            removeGuideLine(removalId,targ)
                        }
                        break
                      default : console.log("not close")
              
                    }
                  default:console.log("not close")
                }
                
              })
            default:console.log("return")
          }

        
        })
      })
    })//here
  });
}