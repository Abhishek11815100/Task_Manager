const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://abhiyadav5100:QJEmMbbpNXNiEUz6@cluster0.uam60r4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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