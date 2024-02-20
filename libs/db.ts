import mongoose, { connect } from "mongoose";

export const connectToDatabase = async () => {
    try {
      const isDisconnected = mongoose.connection.readyState === 0;
      if (isDisconnected) {
        await mongoose.connect(process.env.MONGODB_URI ?? "");
        console.log("DATABASE", "Connected successfully");
      } else {
        console.log(
          "DATABASE",
          "Already connected, status: ",
          mongoose.connection.readyState
        );
      }
    } catch (e) {
      console.log("DATABASE", "Failed connecting to databse: " + e);
      throw new Error("Failed connecting to database");
    }
};


