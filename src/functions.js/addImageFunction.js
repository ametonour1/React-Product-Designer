import React from "react";
import { fabric } from "fabric";



const addImageToCanvasFunction =  async (options,canvas) => {
  console.log(options)
 const imgUrl = `/images/${options}`
 if (canvas) {
  fabric.loadSVGFromURL(imgUrl, function (objects, options) {
    var svg = fabric.util.groupSVGElements(objects, options);

    var desiredWidth = 200; 
    var scale = Math.min(desiredWidth / svg.width, desiredWidth / svg.height);

    svg.set({
      lockUniScaling:false,
      
    })
    svg.scaleX = scale
    svg.scaleY = scale
    console.log(svg.type)
    canvas.add(svg).renderAll();
  }, function (item, object) {
   
  }, function (total, loaded) {
    
  }, function (error, url) {
   
  });
}

  }

 
  export default addImageToCanvasFunction