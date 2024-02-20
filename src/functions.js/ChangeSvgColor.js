import React from "react";
import { fabric } from "fabric";


const ChangeSvgColor = ({canvas,selectedObject,color}) => {

            selectedObject.set({
                fill:color
            })
            canvas.renderAll()
      
}

export default ChangeSvgColor