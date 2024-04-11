const mongoose = require("mongoose");

const MONGO_URI = "mongodb://0.0.0.0:27017/MyTask";

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
    .then(()=>{
        console.log("MongoDB instance is connected");
    })
    .catch((error)=>{
        console.log("Error in connecting MongoDB:",error)
    }); 