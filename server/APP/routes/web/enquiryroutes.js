let express=require("express");
const { enquiryinsert, enquiryList, enquiryDelete, single_Enquiry_Row, enquiryUpdate } = require("../../controller/enquirycontroller");
let enquiryroutes=express.Router();

enquiryroutes.post("/insert",enquiryinsert);
enquiryroutes.get("/view",enquiryList);
enquiryroutes.delete("/delete/:id",enquiryDelete);
enquiryroutes.get("/viewrow/:id",single_Enquiry_Row);
enquiryroutes.put("/update/:id",enquiryUpdate);


module.exports={enquiryroutes};