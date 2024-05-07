/*{ <form action="/" method="POST" onSubmit={handleSubmit}>
                        <TextField varient='standard' name="title" value={title} onChange={(e)=>setTitle(e.target.value)} label='Task Title'/>
                        <TextField varient='standard' name="description" value={description} onChange={(e)=>setDescription(e.target.value)} label='Task Description'/>

                        <Button type="submit" variant="contained" onClick={handleClose}>Submit</Button>
                    </form>


<form action="/" method="POST" onSubmit={handleSubmit}>
                        <label for="title">Task Title</label>
                        <input type="text" id="title" name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        <label for="description">Task Description</label>
                        <input type="text" id="description" name="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>

                        <Button type="submit" variant="contained" onClick={handleClose}>Submit</Button>
                    </form>


const data = Array.from(e.target.elements)
.filter((input) => input.name)
.reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {}); }*/
// const handleSubmit = async (e)=>{
//     e.preventDefault();
//     console.log(e);
//     try{
//         const res = await fetch("https://task-manager-aq2n.onrender.com/addTask",{
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 title: title,
//                 description: description,
//             }),
//             crossorigin: true,    
//             mode: 'no-cors', 
//         });
//         console.log(res.body);
//         let resJson = await res.json();
//         console.log(resJson);
//         if(res.status === 200){
//             setTitle("");
//             setDescription("");
//             setMessage("User created successfully");
//         }
//         else{
//             setMessage("Error occured");
//         }
//     }catch(err) {
//         console.log(err);
//     } 
// }