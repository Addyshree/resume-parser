import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected MONGODB :  ${conn.connection.host}`);
  } catch (error) {
    console.log("error in connecting : ", error);
  }
};
