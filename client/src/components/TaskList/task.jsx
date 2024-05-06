import * as React from 'react';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const StyledList = styled(List)({
  width: '100%',
  maxWidth: 600,
  margin: 'auto',
});

const StyledListItem = styled(ListItem)({
  borderRadius: 8,
  marginBottom: 16,
  backgroundColor: '#f9f9f9',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
});

const TaskText = styled(ListItemText)({
  color: '#333',
  marginLeft:'20px',
});

const TaskIconButton = styled(IconButton)({
  color: '#666',
});

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [open,setOpen] = useState(false);

  useEffect(() => {
    const fetchData= async()=>{
      const res= await axios.get('http://localhost:8000/myTasks');
      //const response= res.json();
      console.log(res);
      setTasks(res.data);
    }
    fetchData();
    
    // fetch('http://localhost:8000/myTasks')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data,"e!!!");
    //     setTasks(data);
    //   });
  }, []);

  const handleDelete = async (id)=>{
    try{
      // const response = await fetch(`http://localhost:8000/${id}`, {
      //   method: "delete"
      // })
      const res= await axios.delete(`http://localhost:8000/${id}`,
        {withCredentials:true}
      )
      const updatedTask =tasks.filter(task=>task._id!==id);
      setTasks(updatedTask);
    }catch(error){
      console.error("Error deleting task",error);
    }
  }

  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Task List
      </Typography>
      <StyledList>
        {tasks.map((value) => (
          <StyledListItem key={value._id} disableGutters>
            <TaskText primary={value.title} />
            <TaskIconButton>
              <Link to={`/${value._id}`}>
                <EditIcon />
              </Link>
              
            </TaskIconButton>
            <TaskIconButton onClick={()=>handleDelete(value._id)}> 
              <DeleteIcon/>
            </TaskIconButton>
          </StyledListItem>
        ))} 
      </StyledList>
    </Container>
  );
}
