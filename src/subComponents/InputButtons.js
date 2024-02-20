import React from 'react'
import { fabric } from 'fabric';
import "../css/sidePanelMenu.css"
import UploadFileIcon from '@mui/icons-material/UploadFile';


const InputButtons = ({ canvas, selectedFile,setSelectedFile, selectedFont, fontSize, fontWeight,setSidePanel }) => {

 

      const handleAddCustomImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();

          await new Promise ((resolve,reject)=>{
            reader.onloadend = () => {
              if (reader.readyState === FileReader.DONE){
                setSelectedFile(reader.result)
                resolve()
              }
            }
            reader.readAsDataURL(file)
          })
         
          
        }
      }
      //add custom image

      const addCustomImage = () => {
        if (canvas) {
          console.log(selectedFile)
           fabric.Image.fromURL(selectedFile, (img)=> {
          
            img.scale(0.2)
    
            
            canvas.add(img);
            canvas.renderAll();
          })
        }
      }

      const addCustomText = () => {
        if (canvas) {
          const iText = new fabric.Textbox("tap and type",{
            fontFamily:selectedFont,
            left:60,
            top:60,
            fontSize:fontSize,
            fontWeight:fontWeight,
            editingBorderColor:"blue",
            hasBorders:true,
            editable:true,
            breakWords:false,
            
          })
    
         
          canvas.add(iText);
          iText.lockScalingY = false;
          canvas.renderAll()
        }
      }
      const handleSidePanel = () => {
        setSidePanel("svg")
      }

      const preventDefaults = (event) => {
        event.preventDefault()
       // event.stopPropagation()
      }
      const highlight = (event) =>{
        event.preventDefault();
        //event.stopPropagation();
        event.currentTarget.classList.add("drag-over")
      }
      const unhighlight = (event) =>{
        event.preventDefault();
        //event.stopPropagation();
        event.currentTarget.classList.remove("drag-over")
      }
      const handleFiles = (files) =>{
       if(files) {
        const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedFile(reader.result);
           
          }
          reader.readAsDataURL(files)
       }
      }
   

      const handleDrop = (event) => {

        event.preventDefault();
        event.currentTarget.classList.remove("drag-over")
        //event.stopPropagation();
        const files = event.dataTransfer.files
        console.log(files,"filesLog")

        if (files && files.length > 0) {
        handleFiles(files[0])
        }
      }
  return (
    <div className='inputButtons'> 
  <div className='customImageDiv'>
    <div className='customImageUpload'
      onDragEnter={highlight}
      onDragOver={preventDefaults}
      onDragLeave={unhighlight}
       onDrop={handleDrop}
    >
    <label htmlFor="imageInput" className='inputLabel'
  >
    <input 
      id='imageInput'
      type="file"
      onChange={handleAddCustomImage}
      />
      {selectedFile ? <img className='uploadPreview' src={selectedFile}/> : <UploadFileIcon className='uploadImageIcon' />}
      
      <p className='customImagep'>Drag and Drop an Image</p>
    </label>
    </div>
    </div>
    <div className='menuButtonsDiv'>
  <button className='menuBtn' onClick={addCustomImage}>Add Uploaded Image</button>
  <button className='menuBtn'  onClick={addCustomText}>Add Custom Text</button>
  <button className='menuBtn'  onClick={handleSidePanel}>Search Svgs</button>
  </div>
    </div>
  )
}

export default InputButtons