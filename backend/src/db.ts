import { connect } from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log("MONGO URI not found!");
      process.exit(1);
    }
    await connect(process.env.MONGO_URI);
    console.log("Connected to DB!");
  } catch (e: any) {
    console.log(e);
    process.exit(1);
  }
};

export { connectDB };
