export {default as Home} from './Home'
export {default as Login} from './Login'
export {default as SignUp} from './SignUp'

/*const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const {data} = await axios.post(
        'http://localhost:8000/signup',
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