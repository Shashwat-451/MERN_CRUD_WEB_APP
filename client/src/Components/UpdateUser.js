import React,{useState} from "react"
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const UpdateUser = (props) => {

  const{id}=useParams();
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[age,setAge]=useState('');
  const navigate=useNavigate();

  useEffect(()=>{
    axios.get('http://localhost:3001/getUser/'+id)
    .then(result=>{
      console.log(result)
      setName(result.data.name);
      setEmail(result.data.email);
      setAge(result.data.age);
    })
    .catch(err=>console.log(err))

  },[])
  const Update=(e)=>{
    e.preventDefault();
    //.then() and .catch() are part of the Promise chain used by Axios. Axios is a popular JavaScript library used for making HTTP requests, and it is built on top of Promises. Promises are a way to handle asynchronous operations, such as network requests, in a more elegant and readable manner.
    axios.put('http://localhost:3001/updateUser/'+id,{name,email,age})
    .then(result=>{
      console.log(result);
      navigate('/');
    })
    .catch(err=>console.log(err))
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
   <form onSubmit={Update}>
    <h2>Update User</h2>
    <div className='mb-2'>
        <label htmlFor="">Name</label>
        <input type="text" placeholder="Enter Name" className='form-control'
        value={name} onChange={(e)=>setName(e.target.value)}
        />
    </div>
    <div className='mb-2'>
        <label htmlFor="">Email</label>
        <input type="email" placeholder="Enter Email" className='form-control'
        value={email}  onChange={(e)=>setEmail(e.target.value)} />
        </div>

        <div className='mb-2'>
        <label htmlFor="">Age</label>
        <input type="text" placeholder="Enter Age" className='form-control'
        value={age} onChange={(e)=>setAge(e.target.value)}/>
        </div>

 <button className='btn btn-success'>Update</button>
   </form>
   </div>
    </div>
  )
};

export default UpdateUser;