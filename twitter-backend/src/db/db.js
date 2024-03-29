import mongoose from "mongoose";

const connectDB = async () => {
    try {
      const dbConnection = await mongoose.connect(
        process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }
      );
      console.log(`MongoDB Connected: ${dbConnection.connection.host}`);
    } catch (error) {
      console.log("Error connecting to MongoDB :", error);
      process.exit(1);
    }
  };
  
  export default connectDB;