const productModel=require('../models/productModel.js');
const firmModel=require('../models/firmModel.js');
const multer=require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the destination folder
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = Date.now() + ext;
      cb(null, filename); // Set the filename
    }
  });
  
  const upload = multer({ storage: storage });



  const addProduct=async(req,res)=>{
    try{
          const {productName,price,category,bestSeller,description}=req.body;
          const image=req.file?req.file.filename:undefined;

          const firmId=req.params.firmId;
          const firm=await firmModel.findById(firmId);
          if(!firm){
            return res.status(404).send({msg:"No firm found"})
          }
          const product=new productModel({
            productName,price,category,bestSeller,description,image,firm:firm._id
          })

          const savedProduct=await product.save();
          firm.product.push(savedProduct);
          await firm.save();
          res.status(200).send(savedProduct);
    }catch(e){
        return res.status(500).send({msg:"something went wrong",errMsg:e.message})
    }
  }


  const getProductByFirm=async(req,res)=>{;
    try{
         const firmId=req.params.firmId;
         
         const firm=await firmModel.findById(firmId);
         if(!firm){
          return res.status(404).send({msg:"Firm not found"})
         }
         const restaurant_Name=firm.firmName;
        const products=await productModel.find({firm:firmId});
        res.status(200).send({restaurant_Name,products});
    }catch(err){
      res.status(501).send({msg:"something went wrong",errMsg:err.message})
    }
  }
  
  
  const productDeleteById=async(req,res)=>{
    try{
         const productId=req.params.productId;
         const deleted=await productModel.findByIdAndDelete(productId)
         if(!deleted){
          return res.status(404).send({msg:"product not found"})
         }
         res.status(200).send({msg:"product deleted Successfully"});
    }catch(err){
      res.status(501).send({msg:"something went wrong",errMsg:err.message})
    }
  }
  


  module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,productDeleteById};