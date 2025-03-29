const { enquirymodel } = require("../model/enquirymodel")

let enquiryinsert=(req,res)=>{
    
    let name=req.body.name
    let email=req.body.email
    let phone=req.body.phone
    let message=req.body.message
    console.log(name,email,phone,message)
   
    let enquiry_insertion=new enquirymodel({
        name:name,
        email:email,
        phone:phone,
        message:message
    })

    enquiry_insertion.save().then(()=>{
        res.send({status:1,message:"Enquiry saved successfully"})
    }).catch((err)=>{
        res.send({status:0,message:"Errow while saving enquiry",error:err})
    })
}

let enquiryList=async (req,res)=>{
    let enquiry_list=await enquirymodel.find();
    res.send({Status:1,mssg:"Data Fetched",enquiry_list})
}
let enquiryDelete=async(req,res)=>{
    let enqId=req.params.id;
    let enquiry_Deletion=await enquirymodel.deleteOne({_id:enqId});
    res.send({status:1,message:"Enquiry deleted successfully",enquiry_deletion_status: enquiry_Deletion});

}

let single_Enquiry_Row=async(req,res)=>{
    let enq_Id=req.params.id;
    let row_fetched=await enquirymodel.findOne({_id:enq_Id});
    res.send({status:1,enquiry_Row:row_fetched});
}

let enquiryUpdate=async(req,res)=>{
    let enq_Id=req.params.id;
    let name=req.body.name;
    let email=req.body.email;
    let phone=req.body.phone;
    let message=req.body.message;
   
    let enquiry_updation_list=({
        name:name,
        email:email,
        phone:phone,
        message:message
    })
    let enquiry_Updation=await enquirymodel.updateOne({_id:enq_Id},{ $set: enquiry_updation_list })
    res.send({status:1,enquiry_Updation_Status:enquiry_Updation})
}


module.exports={enquiryinsert,enquiryList,enquiryDelete,single_Enquiry_Row,enquiryUpdate}