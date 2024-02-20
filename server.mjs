import express, { json } from "express";
import fetch from "node-fetch";
import cors from "cors"
import fs from "fs"
import path from "path";
import { optimize } from "svgo";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
//const fs = require("fs")
const app = express()
const PORT = process.env.PORT || 4000;
let downloadedImages = []
const url = "https://freesvg.org/storage/zip/blog/dead-tree1.svg" 
const options = {
    uri:"https://freesvg.org/storage/zip/blog/dead-tree1.svg",
    dest:"./src/images"
}
const apiCredentials = {
    email:"havakef275@evvgo.com",
    password:"johnparker55V"
}
let flag = false

fetch(url)
     .then(res =>
        res.body.pipe(fs.createWriteStream("output.svg")))


app.use(express.json({origin:"https://api.unsplash.com"}));
app.use(cors())
app.get("/api/proxy",async (req,res)=>{
    try {
        const apiUrl = req.query.url;

        if(!apiUrl) {
            throw new Error ("api url missing")
        }

        const response = await fetch (apiUrl,{
            method: 'GET',
            changeOrigin: true,
            headers: {
              'Accept-Version': 'v1',
              'Authorization': 'Client-ID ptg9A8zdmb1_wy4UULlnxU0KXkE2crjjwiGqdOQE8cI', // Replace with your actual access key
            },
        })
        if (!response.ok) {
            throw new Error ("failed to fetch data");
        }
        const data = await response.json()
        console.log(data)
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");

        res.json(data)

    } catch (error) {
        console.error("error:",error.message)
        res.status(500).json({error:"internal server error"})
    }
})

app.use(express.json())

app.delete("/api/cleanup",(req,res)=>{
    const {downloadedImages} = req.body;

    if(!downloadedImages || !Array.isArray(downloadedImages)){
        return res.status(400).json({error:"invalid arry"})
    }

    downloadedImages.forEach((image)=>{
        try {
            fs.unlinkSync(`./src/images/${image.fileName}`);
            console.log(`deleted file ${image.fileName}`)

        }catch(error){
            console.error(`error deleting file ${image.fileName}`,error)
        }
    })
    res.status(200).json({message:"cleanup succesfull"})

})

app.get("/api/data",async(req,res)=>{
    try {
        const query = req.query.query

        if (!query) {
            throw new Error("query is missing")
        }
        const authToken = await authWithApi(apiCredentials)
        const apiData = await makeApiCall(authToken,query)

        
     await DownloadImages(apiData)
       
        res.json(apiData)
    }catch (error) {
        console.error("error in main function",error.message)
        res.status(500).json({ error: 'Internal server error' });
    }
   
})

const authWithApi = async (credentials) =>{
    try {
        const response = await fetch("https://reserve.freesvg.org/api/v1/auth/login",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify(credentials),
        })
        if (!response.ok) {
            throw new Error ("failed to auth")
        }
        const data = await response.json()
        const authToken = data.token;

        return authToken
    }catch (error) {
        throw new Error("error",error.message)
    }
}

const makeApiCall = async (token,query) => {
    try {
        const apiUrl = `https://reserve.freesvg.org/api/v1/search?query=${encodeURIComponent(query)}`

        const response = await fetch(apiUrl,{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error ("failed to fetch data",response.status)
        }
        const apiData = await response.json()

       
        return apiData
    }catch(error) {
        throw new Error("error" , error.message)
    }
}

const DownloadImages = async  (apiData) => {

    const data = apiData?.data
    downloadedImages = []
  Object.values(data).map((item)=> {
        const imageUrl = `https://freesvg.org/storage/zip/blog/${item.svg}`
        const directory = "./src/images";
        const fileName = `${item.id}.svg`

        fetch(imageUrl)
         .then((responce)=>responce.buffer())
         .then((Buffer)=> optimize(Buffer.toString()))
         .then((optimizedSvg)=>{
            fs.writeFile(path.join(directory,fileName),Buffer.from(optimizedSvg.data),(err)=>{
                if (err) {
                    console.log(err)
                } else {
                    console.log("compeated")
                }
                item.localImageUrl = `./images/${fileName}`
            })
         })
         .then(downloadedImages.push(fileName))
         .then(flag=true)
         .catch((error)=>{
            console.log(error)
         })
       
      })
    
}
const getDownloadedImages = () => {
    return downloadedImages
}

app.get("/api/images",async (req,res)=>{
    
    try {
        const imagesArray = getDownloadedImages();
        let allImagesExist = false;

        while (!allImagesExist) {
            const checkExistingPromises = imagesArray.map(async (fileName) => {
                try {
                    await new Promise((resolve, reject) => {
                        fs.access(`./src/images/${fileName}`, fs.constants.F_OK, (err) => {
                            if (err) reject(err);
                            resolve();
                        });
                    });
                    console.log("File accessed", fileName);
                    return { fileName, url: `./images/${fileName}` };
                } catch (error) {
                    console.log("Error accessing file", fileName);
                    return null;
                }
            });

            const existingImages = await Promise.all(checkExistingPromises);
            const imageData = existingImages.filter((image) => image !== null);

            if (imageData.length === imagesArray.length) {
                allImagesExist = true;
                console.log("all operations compleated",imageData)
                res.json(imageData);
            } else {
                console.log("Not all images exist. Retrying...");
                // Add a delay before retrying (e.g., wait for 1 second)
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
    } catch (error) {
        console.error("Error getting images:", error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.use('/images', express.static(path.join(__dirname, 'src/images')));

app.listen(PORT,()=> {
    console.log(`server is running on port ${PORT}`)
})