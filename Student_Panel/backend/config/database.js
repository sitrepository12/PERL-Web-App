const mongoose = require("mongoose");

// Set strictQuery to false to prepare for the upcoming change
mongoose.set('strictQuery', false);

const connectDatabase = async (DB_URL) => {

    await mongoose.connect(process.env.DB_URL);
    console.log("connected succesfully..");


}

module.exports = connectDatabase;