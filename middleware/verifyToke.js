const vendorModel=require('../models/vendorModel.js');
const jwt=require('jsonwebtoken');
const {config}=require('dotenv');
config();

const verifyToken=async(req,res,next)=>{
    const  token=req.headers.token;
    if(!token){
        return res.status(401).send({msg:"token is required"})
    }
    try{
          const decode=jwt.verify(token,process.env.secret_key);
          const found=await vendorModel.findById(decode.vendorId);
          if(!found){
            return res.status(401).send({msg:"user not found"})
          }
          req.vendorId=found._id;
          next();
    }catch(e){
        console.log(e)
        return res.status(501).send({msg:"something went wrong",e})
    }
}


module.exports=verifyToken;