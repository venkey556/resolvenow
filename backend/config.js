const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/Reslove now",
{dbname:'Reslove-now'})
.then(()=>{
   console.log("connected to mongodb")
})