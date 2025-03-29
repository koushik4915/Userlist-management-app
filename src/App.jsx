import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./assets/Login";
import UserList from "./assets/UserList";
import Navbar from "./assets/Navbar";
import EditUser from "./assets/EditUser";



function App() {
  return (   
     <BrowserRouter>
     <Navbar/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/user" element={<UserList/>}/>
          <Route path="/edit/:id" element={<EditUser/>}/>
        </Routes>
     </BrowserRouter>  
  );
}

export default App;
