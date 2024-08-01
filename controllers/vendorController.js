const vendorModel=require('../models/vendorModel.js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {config}=require('dotenv');
config();


const vendorRegister=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const foundEmail=await vendorModel.findOne({email});
        if(foundEmail){
            return res.status(400).send({msg:"Email already Registered"})
        }
        const hashPassword=bcrypt.hashSync(password, 10);

        const newData=new vendorModel({
            username,
            email,
            password:hashPassword
        })
        await newData.save();
        res.status(201).send({msg:"Vendor Registered Successfully"});
    }
    catch(e){
        console.error(e);
        res.status(500).send({msg:"something went wrong"})
    }
}


//login
const vendorLogin=async(req,res)=>{
    try{
         const {email,password}=req.body;
         const found=await vendorModel.findOne({email});
         if(!found || !await bcrypt.compare(password,found.password)){
            return res.status(401).send({msg:'Invalid email or password'})
         }
         const token=jwt.sign({vendorId:found._id},process.env.secret_key,{expiresIn:"7d"});
         res.status(200).send({msg:"Login Successfully",token});
    }catch(e){
        res.status(500).send({msg:"something went wrong"});
    }
}


const getAllVendors=async(req,res)=>{
    try{
          const vendors=await vendorModel.find().populate('firm');
          return res.status(200).send({vendors});
    }catch(e){
        return res.status(501).send({msg:"something went wrong",errMsg:e.message})
    }
}


const getVendorById=async(req,res)=>{
      const vendorId=req.params.id;
    try{
         const vendor=await vendorModel.findById(vendorId).populate('firm');
         if(!vendor){
            return res.status(404).send({msg:"Vendor nor found"})
         }  
         return res.status(200).send(vendor);
    }catch(e){
        return res.status(501).send({msg:"something went wrong",errMsg:e.message})
    }
}

module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById}