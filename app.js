const dotenv = require('dotenv');
const express = require("express");
const app = express();

dotenv.config({ path: './config.env' });

require("./db/conn")


app.use(express.json());
// const User = require('./models/userSchema');
app.use(require('./router/auth'));




const port = process.env.PORT



app.listen(port, () => {
    console.log(`server is  ${port}`)
})