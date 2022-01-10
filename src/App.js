import SignUp from './components/SignUp'; 
import Login from './components/Login';  
import { Routes, Route, Navigate} from 'react-router-dom'  

function App() {
  return (
    <>
    <Routes>
      <Route path='/signup' element={ <SignUp />} />
      <Route path='login' element={ <Login /> } />
<Route path='/' element={ <Navigate to='/signup' /> } />
    </Routes>
    </>
  );
}

export default App;
