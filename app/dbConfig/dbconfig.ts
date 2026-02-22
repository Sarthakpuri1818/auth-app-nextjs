import mongoose from "mongoose";

export async function connect() {
  try {
    const uri = process.env.MONGO_URL;
    if (!uri) throw new Error("MONGO_URL is undefined");

    await mongoose.connect(uri);
    console.log("connected to mongoDB"); // ✅ reliable log

    mongoose.connection.on("error", (err) => {
      console.log("mongo error:", err);
    });
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
    throw error;
  }
}

