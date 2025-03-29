const { default: mongoose } = require("mongoose");

let enquiryschema=mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    phone : {
        type:String,
        required:true
    },
    message : {
        type:String,
        required:true
    }
})

let enquirymodel=mongoose.model("Enquiry",enquiryschema);
module.exports={enquirymodel};