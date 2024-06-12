const express= require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv= require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors(
  {
    origin: ["https://CRM-Application-1whq.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
  }

));

const userRouter =require("./router/userRoute");

app.use(express.json());

mongoose.connect(mongodb+srv://anshul:test123@cluster0.5hffpzq.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0)

mongoose
  .connect(process.env.URI)
  .then(() =>{
    console.log("connected successfully");
    app.listen(process.env.PORT || 8000, (err)=>{
      if(err) console.log(err);
      console.log("running successful at" , process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("error", error);
  });

  app.use(userRouter);


 
