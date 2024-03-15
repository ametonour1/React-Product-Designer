import React from 'react'
import { fabric } from 'fabric'
import { useState } from 'react'
import Slider from 'rc-slider'
import debounce from 'lodash.debounce'

const ImageFilters = ({canvas,initializeCanvasToLocal}) => {
  const backgroundColor = "rgb(240, 240, 247)"
  const highLightColor = "rgb(212, 44, 149, 1)"
    const [filtersEnabled,setFiltersEnabled] = useState({Grayscale:false,Sepia:false })
    const [removeAllFilters, setRemoveAllFilters] = useState(false)
    const [sliderValue,setSliderValue] = useState({
        brightness:0,
        contrast:0,
        saturation:0,
        noise:0,
        vibrance:0,
        blur:0,
        rotation:0,
        blocksize:0
      })

      const fireFilterUpdate = debounce(
        (filterName,filterValue,value) =>{
          if (canvas) {
            const selectedObject = canvas.getActiveObject()
            console.log(selectedObject)
            if (selectedObject && removeAllFilters === true) {
             console.log("hmm")
            }else {
              if (selectedObject && selectedObject instanceof fabric.Image){
                if (filterName && filterValue ) {
                  const Filter = fabric.Image.filters[filterName];  
                  if (Filter) {
        
                      let existingFilter = selectedObject.filters.find((filter) => filter instanceof Filter);
                      if (existingFilter) {
                        
                        existingFilter[filterValue] = value
                   
                      console.log(existingFilter[filterValue],"=",value)
                      }else {
                        const newFilter = new Filter({
                          [filterValue]:value
                        })
                        selectedObject.filters.push(newFilter)
                        console.log("filter added")
                      }
                      selectedObject.applyFilters();
                      canvas.renderAll()
                      canvas.fire("object:modified");
        
                  }else{
                    console.log("filter is not supported1")
                  }
                }else {
                  selectedObject.filters = [];
                  selectedObject.applyFilters();
                  canvas.renderAll()
                  setRemoveAllFilters(false)
                  canvas.fire("object:modified")
                }
              }else {
                console.log("not an image")
              }
            }
      
          }
        }
        ,200)
     

      const handleSliderStateChange = (filterValue,value) => {
        setSliderValue(prevFilters => ({
          ...prevFilters,
          [filterValue]:parseFloat(value)
        }))
      }
    
      const handleSliderChange  = (filterName,filterValue,value)=>{
        
       
        fireFilterUpdate(filterName,filterValue,value)
      }  

      const handleSliderReset = () => {
        //setRemoveAllFilters(true)
        setSliderValue({
          ...sliderValue,
          brightness:0,
          contrast:0,
          saturation:0,
          noise:0,
          vibrance:0,
          blur:0, 
          rotation:0,
          blocksize:0
        })
        setFiltersEnabled({
          ...filtersEnabled,
          Grayscale:false,
          Sepia:false
        })
       fireFilterUpdate()
      }
    
    
      const syncSliderhandles = (selectedObject) => {
        if (canvas) {
          const filterValues = {
            brightness: 0,
            contrast: 0,
            saturation: 0,
            noise:0,
            vibrance:0,
            blur:0,
            blocksize:0,
            rotation:0,
          }
          if (selectedObject && selectedObject.filters && selectedObject.filters.length > 0) {
            selectedObject.filters.forEach(filter => {
              switch (filter.type) {
                case "Brightness":
                  filterValues.brightness = filter.brightness;
                  break;
                case "Contrast":
                  filterValues.contrast = filter.contrast;
                  break;
                case "Saturation":
                  filterValues.saturation = filter.saturation;
                  break;
                case "Noise":
                  filterValues.noise =filter.noise;
                  break;
                case "Vibrance":
                  filterValues.vibrance = filter.vibrance;
                  break;
                case "Blur":
                  filterValues.blur = filter.blur;
                  break;
                case "Pixelate":
                  filterValues.blocksize = filter.blocksize;
                  break;
                case "HueRotation":
                  filterValues.rotation = filter.rotation;
                  break;
                
      
                default:
                  break;
              }
            });
            setSliderValue(filterValues);
          }else {
            setSliderValue(filterValues)
          } 
        }
      };
      
      const syncFilterButtons = (selectedObject) =>{
        if (canvas) {
          const appliedFilters = selectedObject.filters || [];
          const isGrayScale = appliedFilters.some(filter=>filter.type ==="Grayscale");
          const isSepia = appliedFilters.some(filter=>filter.type ==="Sepia");
          setFiltersEnabled({
            Grayscale:isGrayScale,
            Sepia:isSepia
          })
        }
      }
      


      const toggleFilter = (filterType) => {
        if (canvas) {
            console.log("filterToggle",filterType)
         const selectedObject = canvas.getActiveObject()
          if (selectedObject instanceof fabric.Image) {
           const Filter = fabric.Image.filters[filterType];
           if (Filter) {
            if (filtersEnabled[filterType]) {
              selectedObject.filters =selectedObject.filters.filter(
                filter => !(filter instanceof Filter)
              )
            } else {
              selectedObject.filters.push(new Filter())
            }
            selectedObject.applyFilters()
           } else {
            console.log(`filter ${filterType} not supported`)
           }
          }
          setFiltersEnabled(prevState => ({
            ...prevState,
            [filterType]:!prevState[filterType],
          }))
          canvas.requestRenderAll();
          const savedCanvas = JSON.stringify(canvas);
          initializeCanvasToLocal(savedCanvas)
        }
      }
      
      if ( canvas) {
        canvas.on('mouse:down', (options) => {
            if (options.target) {
              const selectedObject = options.target;
              if (selectedObject && selectedObject instanceof fabric.Object) {
                canvas.setActiveObject(selectedObject);
                const active =canvas.getActiveObject()
                console.log("this is the active obj",active)
                if (selectedObject instanceof fabric.Image) {
                  syncSliderhandles(selectedObject);
                  syncFilterButtons(selectedObject);
                  
      
                }else if (selectedObject instanceof fabric.Textbox) {
                  //syncTextAjustmentSliders(selectedObject);
                  console.log("hey")
                }else {
                  console.log("This is not an image that accepts filters");
                }
              }
            } else {
              handleSliderReset()
              //resetTextAjustmentSliders()
              console.log("Selected point is not an object hey");
            }
          })
    
      }
    
  return (
    <div className='imageFilters'>
              <div className='filtersDiv'>
        <div className='filterButtonsDiv'>
        <button onClick={()=> toggleFilter("Grayscale")}
        className={filtersEnabled.Grayscale ? "uniformButtonActive" : "uniformButtonInactive"}>
          {filtersEnabled.Grayscale ? "Remove Grayscale": "Apply Greyscale"}
        </button>
        <button onClick={()=> toggleFilter("Sepia")}
         className={filtersEnabled.Sepia ? "uniformButtonActive" : "uniformButtonInactive"}>
          {filtersEnabled.Sepia ? "Remove Sepia": "Apply Sepia"}
        </button>
        </div>
        <div className='sliderDiv'>
        <Slider 
        trackStyle={{backgroundColor:highLightColor}} 
          railStyle={{backgroundColor:backgroundColor}}
          handleStyle={{
            backgroundColor:backgroundColor, 
            borderColor:highLightColor,
            
          }} 
           className='brightness' step="0.01" value={sliderValue.brightness} min={-0.4} max={0.4} onChange={(value)=> handleSliderStateChange("brightness",value)}    onAfterChange ={(value) => handleSliderChange("Brightness","brightness",value)}/>
        <p className="sliderP">Brightness:{sliderValue.brightness}</p>
        </div>
        <div className='sliderDiv'>
        <Slider 
        trackStyle={{backgroundColor:highLightColor}} 
          railStyle={{backgroundColor:backgroundColor}}
          handleStyle={{
            backgroundColor:backgroundColor, 
            borderColor:highLightColor,
            
          }} 
           className='contrast' step="0.01" value={sliderValue.contrast} min={0} max={0.35} onChange={(value)=> handleSliderStateChange("contrast",value)} onAfterChange ={(value) => handleSliderChange("Contrast","contrast",value)}/>
        <p className="sliderP">Contrast:{sliderValue.contrast}</p>
        </div>
        <div className='sliderDiv'>
        <Slider 
        trackStyle={{backgroundColor:highLightColor}} 
          railStyle={{backgroundColor:backgroundColor}}
          handleStyle={{
            backgroundColor:backgroundColor, 
            borderColor:highLightColor,
            
          }} 
           className='saturation' step="0.01" value={sliderValue.saturation} min={0} max={0.8} onChange={(value)=> handleSliderStateChange("saturation",value)} onAfterChange ={(value) => handleSliderChange("Saturation","saturation",value)}/>
        <p className="sliderP">Saturation:{sliderValue.saturation}</p>
        </div>
        <div className='sliderDiv'>
        <Slider 
        trackStyle={{backgroundColor:highLightColor}} 
          railStyle={{backgroundColor:backgroundColor}}
          handleStyle={{
            backgroundColor:backgroundColor, 
            borderColor:highLightColor,
            
          }} 
           className='noise' step="2" value={sliderValue.noise} min={0} max={100} onChange={(value)=> handleSliderStateChange("noise",value)} onAfterChange ={(value) => handleSliderChange("Noise","noise",value)}/>
        <p className="sliderP">Noise:{sliderValue.noise}</p>
        </div>
        <div className='sliderDiv'>
        <Slider 
        trackStyle={{backgroundColor:highLightColor}} 
          railStyle={{backgroundColor:backgroundColor}}
          handleStyle={{
            backgroundColor:backgroundColor, 
            borderColor:highLightColor,
            
          }} 
           className='sharpen' step="0.01" value={sliderValue.vibrance} min={-1} max={1} onChange={(value)=> handleSliderStateChange("vibrance",value)} onAfterChange ={(value) => handleSliderChange("Vibrance","vibrance",value)}/>
        <p className="sliderP">Vibrance:{sliderValue.vibrance}</p>
        </div>
        <div className='sliderDiv'>
        <Slider 
        trackStyle={{backgroundColor:highLightColor}} 
          railStyle={{backgroundColor:backgroundColor}}
          handleStyle={{
            backgroundColor:backgroundColor, 
            borderColor:highLightColor,
            
          }} 
           className='blurfil'  step="0.01" value={sliderValue.blur} min={0} max={0.65} onChange={(value)=> handleSliderStateChange("blur",value)} onAfterChange ={(value) => handleSliderChange("Blur","blur",value)}/>
        <p className="sliderP">Blur:{sliderValue.blur}</p>
        </div>
        <div className='sliderDiv'>
        <Slider 
        trackStyle={{backgroundColor:highLightColor}} 
          railStyle={{backgroundColor:backgroundColor}}
          handleStyle={{
            backgroundColor:backgroundColor, 
            borderColor:highLightColor,
            
          }} 
           className='huerotation' step="0.01" value={sliderValue.rotation} min={0} max={2} onChange={(value)=> handleSliderStateChange("rotation",value)} onAfterChange ={(value) => handleSliderChange("HueRotation","rotation",value)}/>
        <p className="sliderP">Hue Rotation:{sliderValue.rotation}</p>
        </div>
        <div className='sliderDiv'>
        <Slider 
        trackStyle={{backgroundColor:highLightColor}} 
          railStyle={{backgroundColor:backgroundColor}}
          handleStyle={{
            backgroundColor:backgroundColor, 
            borderColor:highLightColor,
            
          }} 
           className='pixelate' step="0.01" value={sliderValue.blocksize} min={0} max={10} onChange={(value)=> handleSliderStateChange("blocksize",value)} onAfterChange ={(value) => handleSliderChange("Pixelate","blocksize",value)}/>
        <p className="sliderP">Pixelate:{sliderValue.blocksize}</p>
        </div>
        <button className='resetFiltersBtn' onClick={handleSliderReset}>Reset All Filters</button>
      </div>
    </div>
  )
}

export default ImageFilters