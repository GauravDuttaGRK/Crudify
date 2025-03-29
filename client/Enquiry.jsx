import React, { useEffect, useState } from "react";
import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";

import Enquirylist from "./enquiry/Enquirylist";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';




export default function Enquiry() {

  let [enquiryList,setEnquiryList]=useState([])

  let [formData,setFormData]= useState({

    name:"",
    email:"",
    phone:"",
    message:"",
    
  })


  let saveEnquiry = (e) => {
    e.preventDefault();

    // let formdata={
    //   name:e.target.name.value,
    //   email:e.target.email.value,
    //   phone:e.target.phone.value,
    //   message:e.target.message.value
    // }
    if(formData._id)
    {
      //Update
      axios.put(`http://localhost:8020/api/website/enquiry/update/${formData._id}`,formData).then((res)=>{
        console.log(res.data)
        toast.success("Enquiry Updated Successfully");
        getAllEnquiry();
        setFormData({
          name:"",
          email:"",
          phone:"",
          message:""
        })
      })
    }
    else
    {
      //Insert
      axios.post("http://localhost:8020/api/website/enquiry/insert",formData).then((res)=>{
        console.log(res.data)
        toast.success("Enquiry Saved Sccessfully");
        getAllEnquiry();
        setFormData({
          name:"",
          email:"",
          phone:"",
          message:""
        })
      })

    }

  };

  let getvalue=(e)=>{
    let inputName=e.target.name;
    let inputvalue=e.target.value;
    let olddata={...formData};
    olddata[inputName]=inputvalue;
    setFormData(olddata)
  }

  let getAllEnquiry=()=>{
    axios.get("http://localhost:8020/api/website/enquiry/view").then((res)=>{
      return res.data;
    }).then((finalData)=>{
      if(finalData.Status)
      {
        setEnquiryList(finalData.enquiry_list)
        console.log("Final data",finalData.enquiry_list)
      
      }
    })
  }

  useEffect(()=>{
    getAllEnquiry()
  },[])

  return (
    <div>
      <ToastContainer />
      <h1 className="text-[40px] text-center py-6 font-bold">User Enquiry</h1>
      <div className="grid grid-cols-[30%_auto] gap-4">
        
        <div className="bg-gray-200 p-5">
          <h2 className="text-[20px] font-bold">Enquiry-Form</h2>
          
          <form action="" onSubmit={saveEnquiry}>
            <div className="py-3">
              <Label htmlFor="name" value="Your Name" />
              <TextInput type="text" value={formData.name} onChange={getvalue} name="name" placeholder="Enter Your Name" required />
            </div>
            <div className="py-3">
              <Label htmlFor="email" value="Your Email" />
              <TextInput type="email" value={formData.email} onChange={getvalue} name="email" placeholder="Enter Your Email" required/>
            </div>
            <div className="py-3">
              <Label htmlFor="phone" value="Your Phone No" />
              <TextInput type="text" value={formData.phone} onChange={getvalue} name="phone" placeholder="Enter Your Phone" required />
            </div>
            <div className="py-3">
              <Label htmlFor="message" value="Your Message" />
              <Textarea
                name="message" value={formData.message} onChange={getvalue} placeholder="Enter Your Message" required rows={4}/>
            </div>
            <div className="py-3">
              <Button  type="submit" className="w-[100%]">
                {formData._id ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </div>

        <Enquirylist data={enquiryList} getAllEnquiry={getAllEnquiry} setFormData={setFormData} />
      </div>
    </div>
  );
}
