import React from 'react'
import RenderSvg from './RenderSvg'
import "../css/sidePanelSvg.css"
import SVGICON from "../assets/searchSvgIcon.svg"

const SidePanelSvg = ({
  canvas,
  setQuery,
  fetchSvg,
  downloadedImages
}) => {

  const handleSearchInput = (e) => {
    setQuery(e.target.value)
  }

  
  return (
    <div className='sidePanelSvg'>
      <div className='sidePanelSvgDiv'>
        <div className='svgSearchBar'>
        <input placeholder='Search for Images' className='svgSearchBarInput' onChange={handleSearchInput}/>
        <button  className='svgSearchBarButton' onClick={fetchSvg}>Search for SVGs</button>
        </div>
        
        {downloadedImages.length > 0  ? 
         <div className='renderSvgDiv'><RenderSvg
         downloadedImages={downloadedImages} 
         canvas={canvas}
         /> </div> : <div className='svgPlaceholder'>
         <img className='svgSearchIcon' src={SVGICON}/>
         <p className='svgPlaceholderP'>Search for Images</p>
         </div>}
        
        </div>
    </div>
  )
}

export default SidePanelSvg

