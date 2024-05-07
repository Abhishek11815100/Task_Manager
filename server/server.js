const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/db");
const cors = require('cors');
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const profileRoutes = require('./routes/profileRoutes')


const app=express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'https://task-manager-f.onrender.com',
    credentials: true,
}));

app.use('/',taskRoutes);
app.use('/',authRoutes);
app.use('/',profileRoutes)


const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`Appplication is running on Port ${PORT}`);
})