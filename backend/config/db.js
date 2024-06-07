const mongoose = require("mongoose");

// conntect to mongodb function
const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
      console.log(`connected to MongoDb database ${conn.connection.host}`);
    }
  } catch (err) {
    console.log(`Error in MongoDb ${err}`);
  }
};

module.exports = { connectToDB };
