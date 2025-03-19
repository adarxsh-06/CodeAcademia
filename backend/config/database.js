const mongoose = require('mongoose');
require('dotenv').config();


exports.connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}`)
        console.log(`\n MongoDB connected !! DB Host: ${connectionInstance.connection.host}`)
    } catch(err){
        console.error("MongoDB Connection Failed: ",err)
        process.exit(1)
    }
}
