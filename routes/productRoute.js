const express=require('express');
const {addProduct,getProductByFirm,productDeleteById}=require('../controllers/productController.js');
const path=require('path');
const productRouter=express.Router();


productRouter.post('/addProduct/:firmId',addProduct);
productRouter.get('/:firmId/products',getProductByFirm);
productRouter.delete('/delete/:productId',productDeleteById);

productRouter.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('content-type','image/jpg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
})
module.exports=productRouter;

