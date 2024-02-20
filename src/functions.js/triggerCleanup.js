const triggerCleanup = async (downloadedImages) =>{
try{
const response = await fetch("/api/cleanup",{
    method:"DELETE",
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ downloadedImages })
})
if (response.ok) {
    console.log("cleanup succesful")
}else{
    console.error("cleanup failed")
}
}catch(error) {
    console.error("error during cleanup",error)
}
}

export default triggerCleanup