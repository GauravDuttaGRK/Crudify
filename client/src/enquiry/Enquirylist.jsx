import React from 'react'
import { Table } from "flowbite-react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2/dist/sweetalert2.js'


export default function Enquirylist({data,getAllEnquiry,setFormData}) {

  let singlerowdata=(enquiryid)=>{
    axios.get(`http://localhost:8020/api/website/enquiry/viewrow/${enquiryid}`).then((res)=>{

      console.log("single row Data triggered");
      console.log(res.data.enquiry_Row)
      setFormData(res.data.enquiry_Row)

    })
    // alert(enquiryid);

  }

  let deleteEnquiry=(enquiryid)=>{
    Swal.fire({
      title: "Do you want to delete the enquiry?",
      showDenyButton: false,
      showConfirmButton:true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
  
        Swal.fire("Deleted!", "", "success");
        axios.delete(`http://localhost:8020/api/website/enquiry/delete/${enquiryid}`).then(()=>{
          toast.success("Enquiry Deleted Successfully");
          getAllEnquiry();
        })
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    
  }
  
  return (
    <div className="bg-gray-200 p-4">
      
          <h1 className="text-[20px] text-center py-6 font-bold">
            Enquiry List
          </h1>

          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Sr No</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Phone</Table.HeadCell>
                <Table.HeadCell>Message</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y">
              {
                
                data.length>=1 ?
                  data.map((item,index)=>{
                    return(
                      <tr key={index} className='bg-white dark:border-gray-700 dark:bg-gray_800'>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>{item.email}</Table.Cell>
                        <Table.Cell>{item.phone}</Table.Cell>
                        <Table.Cell>{item.message}</Table.Cell>
                        <Table.Cell>
                          <button onClick={()=>deleteEnquiry(item._id)} className='bg-red-500 text-white px-4 py-1 rounded-md'>Delete</button>
                        </Table.Cell>
                        <Table.Cell>
                          <button onClick={()=>singlerowdata(item._id)} className='bg-blue-500 text-white px-4 py-1 rounded-md'>Edit</button>
                        </Table.Cell>
                      </tr>
                    );
                  })
                :
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray_800">
                    <Table.Cell colSpan={7} className="text-center">No Data Found</Table.Cell>
                  </Table.Row>
               



              }

    
              </Table.Body>
            </Table>
          </div>
          
        </div>
  )
}
