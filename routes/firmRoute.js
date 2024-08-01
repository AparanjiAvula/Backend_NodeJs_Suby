const express=require('express');
const firm=require('../controllers/firmController.js');
const verifyToken=require('../middleware/verifyToke.js');
const path=require('path');


const firmRouter=express.Router();

firmRouter.post('/addFirm',verifyToken,firm.addFirm)

firmRouter.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('content-type','image/jpg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
})

module.exports=firmRouter;