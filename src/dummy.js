<div className=" flex-1 flex max-h-full relative bg-slate-500">
<img className=" absolute inset-0 max-h-full max-w-full z-10 " src={TSHIRT}/>
<img className=" absolute inset-0 max-h-full h-1/3 max-w-full top-64 left-5 z-0 " src={PHOTO1}/>
<img className=" absolute inset-0 max-h-full h-1/3 max-w-full left-2/4 top-80 z-0   " src={PHOTO2}/>
<img className=" absolute inset-0 max-h-full max-w-full h-2/3 z-20 left-32 top-16  " src={PHOTO3}/>
<img className=" absolute inset-0 max-h-full max-w-full  z-30  " src={PHOTO4}/>
</div>


<div className="flex h-full  flex-col lg:flex-row ">
<div className='flex-1'>
    <h1>Your Design</h1>
    <button>Start Now</button>
</div>
 <div id='divm' className=" flex-1 grid grid-cols-12 grid-rows-12 h-full md: bg-slate-500">
    <img id='divt' className=" row-start-1 row-end-13 col-end-13 col-start-1  max-h-full flex-1  z-10 " src={TSHIRT}/>
    <motion.div  className="row-start-5 row-end-8 col-end-5 col-start-2 max-h-full   z-0 ">
    <img id='div1' src={PHOTO1}/>
    </motion.div>
    <motion.div className="row-start-6 row-end-8 col-end-11 col-start-9 max-h-full   z-0   ">
     <img id='div2'  src={PHOTO2}/>
     </motion.div>
     <motion.div className=" row-start-2 row-end-11 col-end-11 col-start-3 max-h-full   z-20   " >
     <img id='div3' src={PHOTO3}/>
     </motion.div>
     <motion.div className="row-start-2 row-end-11 col-end-11 col-start-3 max-h-full z-30  ">
     <img id='div4'  src={PHOTO4}/>
     </motion.div>

  </div>

</div>