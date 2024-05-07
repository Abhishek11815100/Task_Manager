export {default as Home} from './Home'
export {default as Login} from './Login'
export {default as SignUp} from './SignUp'

/*const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const {data} = await axios.post(
        'https://task-manager-aq2n.onrender.com/signup',
        {
          ...inputValue,
        },
        { withCredential: true }
      )
      const {success,message} =data;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/')
        },1000);
      } else{
        handleError(message)
      }
    } catch(err){
      console.log(err);
    }
    setInputValue({
      email: "",
      username: "",
      password: ""
    })
  }*/