//PWD:bSvLu1vApzuVIAry
import { error } from "console";
import express, {Express} from "express"
import mongoose from "mongoose";

const app:Express =express()
const port = process.env.PORT || 3001;

//apply middleware to allow json data to anypoint of the app
app.use(express.json());
//setting up mongo db connection
const mongoURI: string = 
    "mongodb+srv://karshgifton339:bSvLu1vApzuVIAry@personalfinancetracker.rm4iw7h.mongodb.net/";

mongoose
        .connect(mongoURI)
        .then(()=>console.log("CONNECTED TO MONGODB!"))
        .catch((err)=> console.error("FAILED TO CONNECT MONGODB: ",err));

app.listen(port, ()=> {
    console.log(`Server is running on Port ${port}`);
});