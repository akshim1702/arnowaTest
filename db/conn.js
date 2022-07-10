const mongoose = require('mongoose');
const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
    console.log(`connnnection is done`)
}).catch((err) => {
    console.log(err);
})