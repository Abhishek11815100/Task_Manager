const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URL;

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