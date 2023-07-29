import React from "react"
import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
const CreateUser = (props) => {

  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[age,setAge]=useState('');
  const navigate=useNavigate();
  const Submit=(e)=>{
    e.preventDefault();
    //.then() and .catch() are part of the Promise chain used by Axios. Axios is a popular JavaScript library used for making HTTP requests, and it is built on top of Promises. Promises are a way to handle asynchronous operations, such as network requests, in a more elegant and readable manner.
    axios.post('http://localhost:3001/createUser',{name,email,age})
    .then(result=>{
      console.log(result);
      navigate('/');
    })
    .catch(err=>console.log(err))
  }

  // or

  // const Submit = (e) => {
  //   e.preventDefault();
  
  //   const url = 'http://localhost:3001/createUser';
  //   const dataToSend = {
  //     name,
  //     email,
  //     age,
  //   };
  
  //   const requestOptions = {
  //     method: 'POST', // HTTP method for the request
  //     headers: {
  //       'Content-Type': 'application/json', // Specifying the data format (JSON in this case)
  //     },
  //     body: JSON.stringify(dataToSend), // Convert data to JSON format before sending
  //   };
  
  //   fetch(url, requestOptions)
  //     .then(response => response.json())
  //     .then(result => {
  //       // Handle the response from the server
  //       console.log(result);
  //     })
  //     .catch(error => {
  //       // Handle any errors that occurred during the request
  //       console.error('Error:', error);
  //     });
  // };

  
  return(
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
     <form onSubmit={Submit}>
      <h2>Add User</h2>
      <div className='mb-2'>
          <label htmlFor="">Name</label>
          <input type="text" placeholder="Enter Name" className='form-control'
          onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div className='mb-2'>
          <label htmlFor="">Email</label>
          <input type="email" placeholder="Enter Email" className='form-control'
          onChange={(e)=>setEmail(e.target.value)}
          />
          </div>

          <div className='mb-2'>
          <label htmlFor="">Age</label>
          <input type="text" placeholder="Enter Age" className='form-control'
          onChange={(e)=>setAge(e.target.value)}
          />
          </div>

   <button className='btn btn-success'>Submit</button>
     </form>
     </div>
      </div>
    )
}

export default CreateUser;
