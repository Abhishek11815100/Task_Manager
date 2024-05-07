
import { Box,styled, Button, Dialog, DialogContent, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;


const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border: 1px solid #ccc; /* Add border around the wrapper content */
    margin-top: 100px; /* Move the Wrapper vertically up */
    max-width: 400px; /* Limit the max-width of the wrapper */
    margin: auto; /* Center the wrapper horizontally */

    & > form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 20px;
    }

    & > form > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    & > h3 {
        font-size: 24px; /* Increase the size of the "Add New Task" text */
    }
`;


export const AddTask = () =>{
  const authState = useSelector(state=>state.authReducer);

    const [message,setMessage] =useState('');
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const navigate= useNavigate();
    const [formData, setFormData] = useState({
      title:"",
      description: ""
    });

       
       
    let {taskId}=useParams();
    let mode = taskId===undefined?'add':'update';
   
    
    useEffect(() => {
      document.title = mode === "add" ? "Add task" : "Update Task";
    }, [mode]);

    useEffect(()=>{
      console.log("Updated formData",formData);
    })

    useEffect(() => {
      
      if (mode === "update" && taskId) {
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://task-manager-aq2n.onrender.com/${taskId}`);
            //console.log(response);
            const {data} = response;
            //console.log(data);
            if (data.status!=="OK") {
              throw new Error("Error fetching task data");
            }
            console.log(data.task.description);
            setFormData({
              ...formData,
              title: data.task.title,
              description: data.task.description
              // title: data.task.title,
              // description: data.task.description
            });
            console.log(formData);
          } catch (error) {
            console.error("Error fetching task:", error);
          }
        };
        fetchData();
      }
    }, [mode,taskId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if(mode==='add'){
              const res = await axios.post("http://task-manager-aq2n.onrender.com/addTask",
              // method: "POST",
              // headers: {
              //   "Content-Type": "application/json",
              // },
              { 
                title: formData.title,
                description:formData.description,
              },
              // body : JSON.stringify({
              //   title: formData.title,
              //   description:formData.description,
              // }),
              {
                withCredentials:true
              }
            );
            //let resJson = await res.json();
            //console.log(resJson);
            if (res.status === 200) {
              setTitle("");
              setDescription("");
              setMessage("Task created successfully");
              navigate('/')
            } else {
              setMessage("Please enter Title and description");
            }
          }else{
            // const res = await fetch(`https://task-manager-aq2n.onrender.com/${taskId}`, {
            //   method: "PUT",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({
            //     title: formData.title,
            //     description: formData.description,
            //   }),
            // });
            // let resJson = await res.json();
           
            //console.log(resJson);/
            console.log(title,description);
            const res = await axios.put(`https://task-manager-aq2n.onrender.com/${taskId}`,
              {
                title: formData.title,
                description: formData.description,
              },
              {
                withCredentials:true
              }
            );
           
            if (res.status === 200) {
              setTitle("");
              setDescription("");
              setMessage("Task updated successfully");
              navigate('/')
            } else {
              setMessage("Please enter Title and description");
            }
          }
          
        } catch (err) {
          console.log(err);
        }
    };
    const handleChange = e => {
      setFormData({
        ...formData, [e.target.name]: e.target.value
      });
    }

    return(
      <Wrapper>
          <Typography variant="h3">{mode==='add'?"Add new Task": "update Task"}</Typography>
          <form action="/" method="POST" onSubmit={handleSubmit}>
              <TextField varient='standard' name="title" value={formData.title} onChange={handleChange} label='Task Title'/>
              <TextField varient='standard' name="description" value={formData.description} onChange={handleChange} label='Task Description'/>

              <Button type="submit" variant="contained">{mode==='add'?"add Task": "update Task"}</Button>
              <Button variant="contained" onClick={() => navigate("/")}>Cancel</Button>
          </form>
          
          <div className="message">{message ? <p>{message}</p> : null}</div> 
      </Wrapper>
    )
}