const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const UserModel=require('./models/Users')
const app=express()
app.use(cors())
app.use(express.json())




mongoose.connect("mongodb+srv://mishrashashwat985:MERN_CRUD_PASSWORD45@cluster0.xqbyaa3.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });

  app.get('/',(req,res)=>{
     UserModel.find({})
     .then(users=>res.json(users))
     .catch(err=>res.json(err))
  })

  app.get('/getUser/:id',(req,res)=>{
    const {id}=req.params.id;
    UserModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
  })

  app.put('/updateUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id:id},
      {name:req.body.name,
      email:req.body.email,
      age:req.body.age})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
  })

  app.delete('/deleteUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res=>res.json(res))
    .catch(err=>res.json(err))
  })
    app.post('/createUser',(req,res)=>{
        UserModel.create(req.body)
        .then(users =>res.json(users))
        .catch(err=>res.status(400).json('Error'+err))
    })

  app.listen(3001,()=>{
    console.log('server is running')
})