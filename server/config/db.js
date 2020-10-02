const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async() => {
    try{
        await mongoose.connect(db, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify:false
         } );
    } catch(error) {
        console.log(error);

        // Exit Process with Failure
        process.exit(1);
    }
} 

module.exports = connectDB;