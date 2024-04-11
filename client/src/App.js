import Header from './components/header';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import { useSelector } from 'react-redux';
import { About } from './components/pages/About';
import { AddTask } from './components/AddTask/addTask';

function App() {
  const {isLoggedIn} = useSelector(state=>state.authReducer);
  return (
    <div>
      <Header isLoggedIn={isLoggedIn}/>
      <div>
        {/*<Route path='/login/user' element={<Task style={{ position: 'relative', left: '50px', top: '20px' }} />}/>*/}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/add' element={<AddTask/>}/>
          <Route path='/:taskId' element={<AddTask/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
