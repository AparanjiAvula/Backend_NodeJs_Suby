const firmModel=require('../models/firmModel.js');
const vendorModel=require('../models/vendorModel.js');
const multer=require('multer');
const path=require('path');

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


const addFirm=async(req,res)=>{
    try{
        const {firmName,area,category,region,offer}=req.body;

    const image=req.file?req.file.filename:undefined;


    const vendorFound=await vendorModel.findById(req.vendorId);
     
    if(!vendorFound){
        return res.status(404).send({msg:"vendor not found"});
    }
    if(vendorFound.firm.length>0){
      return res.status(400).send({msg:"Vendor Should have only one Firm or restaurant"});
   }

    const firmData=new firmModel({
        firmName,area,category,region,offer,image,vendor:vendorFound._id
    })

   let savedFirm=await firmData.save();

    const firmId=savedFirm._id;

    vendorFound.firm.push(savedFirm);

    await vendorFound.save();
   
    
    res.status(201).send({msg:"Firm Data added Successfully",firmId});
    }
    catch(e){
        res.status(501).send({msg:"something went wrong",errMsg:e.message})
    }
}



module.exports={addFirm:[upload.single('image'),addFirm]}