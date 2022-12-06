import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

function App() {
  const { user, isAuthReady } = useAuthContext()
  return (
    <div className="App">
      {isAuthReady &&(
        <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? (<Home />) : (<Navigate to='/login'/>) }/>
          <Route path='/login' element={!user ? (<Login />) : (<Navigate to='/' />) }/>
          <Route path='/signup' element={!user ? (<Signup />) : (<Navigate to='/' /> )}/>          
        </Routes>
        </BrowserRouter>)
      }
    </div>
  );
}

export default App
