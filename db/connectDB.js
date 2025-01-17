import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}`
    );
    console.log(
      `MongoDB Connected !! Db Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(error);
  }
};
