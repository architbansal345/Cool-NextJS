import { error } from "console";
import mongoose from "mongoose";
export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected',async() => {
            console.log("DataBase Connected")
        })
        connection.on('error',(err) => {
            console.log("Database Connected Error"+err)
        })
    }
    catch{
        console.log("somthing went wrong");
        console.log(error);
        process.exit();
    }
}