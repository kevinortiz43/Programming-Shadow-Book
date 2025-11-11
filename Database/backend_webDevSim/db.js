import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongo db testing ");
  } catch (error) {
    console.log("Error connecting to MONGODB", error);
    process.exit(1); // exit with failure
  }
};
