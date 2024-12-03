const mongoose = require('mongoose');
const express = require('express')
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;
const mongodb = process.env.MONGODB


const LinkRouter = require('./routes/LinkRouter')

app.use('/link',LinkRouter);




mongoose.connect(mongodb).then(()=>{console.log('DB Connected successfully')}).catch((err)=>{console.log(err)});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})