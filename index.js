const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const vendorRouter=require('./routes/vendorRoute.js');
const bodyParser=require('body-parser');
const firmRouter=require('./routes/firmRoute.js')
const productRouter=require('./routes/productRoute.js');
dotenv.config();

const app=express();



app.use(express.json());
// middlewares
app.use(bodyParser.json());
app.use('/vendor',vendorRouter);
app.use('/firm',firmRouter);
app.use('/product',productRouter);
app.use('/uploads',express.static('uploads'))

//Database connection
mongoose.connect(process.env.Mongo_url)
.then(()=>console.log('Database connected successfully'))
.catch((err)=>console.log(err))

const PORT=process.env.port||4000;

app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>');
})

app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`);
})