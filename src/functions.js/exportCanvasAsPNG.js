const exportCanvasAsPNG = (canvas) => {
    
    canvas.backgroundColor = 'rgba(0, 0, 0, 0)'; 

    
    const pngDataUrl = canvas.toDataURL({
        format: 'png',
        multiplier: 1,
        quality: 1, 
        left: 0,
        top: 0,
        width: canvas.width,
        height: canvas.height,
        enableRetinaScaling: false // Disable retina scaling
    });

    
    const downloadLink = document.createElement('a');
    downloadLink.href = pngDataUrl;
    downloadLink.download = 'canvas_image.png'; 
    downloadLink.click();
};
export default exportCanvasAsPNG