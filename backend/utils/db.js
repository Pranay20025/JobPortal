import mongoose from "mongoose";

const connectdb = async () =>{
  try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  }
  catch (error) {
    console.log(error);
  }
}

export default connectdb;
