import React, { useEffect, useState } from 'react'
import addImageToCanvasFunction from '../functions.js/addImageFunction';
import { fabric } from 'fabric';
import "../css/sidePanelSvg.css"
const RenderSvg = ({downloadedImages,canvas}) => {

    const [images,setImages] = useState([])
console.log(canvas,"canvas log")
    useEffect(() => {
        const fetchData = async () => {
          try {
            if (downloadedImages) {
              console.log('Downloaded Images:', downloadedImages);
      
              const imagePromises = await Promise.all(
                Object.values(downloadedImages).map(async (item) => {
                  try {
                    console.log("item:",item)
                    console.log(canvas)
                    if (item.url) {
                      //const module = await import(`../images/${item.fileName}`);
                      const imageSrc = `/images/${item.fileName}`;
      
                      return (
                        <img
                        onClick={() => addImageToCanvasFunction(item.fileName, canvas)}
                          className='svgImage'
                          key={item.fileName}
                          src={imageSrc}
                          alt="image"
                        />
                      );
                    } else {
                      console.log('Skipping image import due to undefined fileName:', item);
                      return null;
                    }
                  } catch (error) {
                    console.error('Error importing image module:', error.message);
                    return null;
                  }
                })
              );
      
              const imageComponents = await Promise.all(imagePromises);
              setImages(imageComponents);
            }
          } catch (error) {
            console.error('Error in fetchData:', error.message);
          }
        };
      
        fetchData();
      }, [downloadedImages]);
  return (
    <div className='renderSvg'>
        {images}
    </div>
  )
}

export default RenderSvg