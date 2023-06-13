import mongoose from "mongoose";

const connectToMongoDb = ()=>{
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(process.env.mongo_url);
      console.log("Connected to Mongo Successfully!");
    } catch (error) {
      console.log(error);
    }
}

export {connectToMongoDb};