const preventOverflow = (canvas,obj) =>{

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
  
}
export default preventOverflow