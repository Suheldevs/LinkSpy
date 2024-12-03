import React, { useEffect, useState } from 'react'
import {Button, Label, TextInput,Table} from 'flowbite-react'
import axios from 'axios';
function Url() {
const backendUrl = import.meta.env.VITE_BACKENDURL;
const [linksData,setLinksData] = useState([])
const HandleNewUrl = async(e)=>{
    e.preventDefault();
    const formData = {email:'mohdsuhel.dev@gmail.com',originalUrl:e.target.url.value};
    try{
        const res = await axios.post(`${backendUrl}/link/url`,formData);
        console.log(res);
    }
    catch(err){
        console.log(err);
    }
    
}
useEffect(()=>{
    getData();
},[])
const getData = async()=>{
    try{
        const res = await axios.get(`${backendUrl}/link/data/mohdsuhel.dev@gmail.com`);
        console.log(res.data);
        setLinksData(res.data.LinkData);
    }
    catch(err){
console.log(err);
    }
}


  return (
    <div className='flex justify-center flex-col items-center min-h-[80vh]'>
        <form className='flex gap-4 justify-center items-center shadow-lg p-10' onSubmit={HandleNewUrl}>
            <div className=''>
        <Label value='Create a new link'/>
        <TextInput type='url' name="url" placeholder='Type full url of your website' />
            </div>
        <Button type="submit">Submit</Button>
        </form>
        <div className="overflow-x-auto mt-4">
      <Table striped className='table table-'>
        <Table.Head>
          <Table.HeadCell>original Url</Table.HeadCell>
          <Table.HeadCell>Short Url</Table.HeadCell>
          <Table.HeadCell>Clicks</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
{linksData.map((item)=>(

          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {item.originalUrl}
            </Table.Cell>
            <Table.Cell>{item.shortUrl}</Table.Cell>
            <Table.Cell>{item.clickCount}</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
))}

          </Table.Body>
          </Table>
          </div>
    </div>
  )
}

export default Url