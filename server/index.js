let express=require("express");
let mongoose=require("mongoose");
const { enquiryroutes } = require("./APP/routes/web/enquiryroutes");
require("dotenv").config();
var cors = require('cors');

let app=express();
app.use(express.json());
app.use(cors());


app.use("/api/website/enquiry",enquiryroutes)
// http://localhost:8020/api/website/enquiry/insert

mongoose.connect(process.env.MYDBURL).then(()=>{
    console.log("connected to mongodb");
    app.listen(process.env.PORT,()=>{
        console.log("server is running");
    })
}).catch((err)=>{
    console.log("error :",err);
})