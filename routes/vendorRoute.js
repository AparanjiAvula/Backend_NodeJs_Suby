const {vendorRegister,vendorLogin,getAllVendors,getVendorById}=require('../controllers/vendorController.js');
const express=require('express');


const vendorRouter=express.Router();

vendorRouter.post('/register',vendorRegister);
vendorRouter.post('/login',vendorLogin);

vendorRouter.get('/getAllvendors',getAllVendors);
vendorRouter.get('/getVendor/:vendorId',getVendorById);
module.exports=vendorRouter;