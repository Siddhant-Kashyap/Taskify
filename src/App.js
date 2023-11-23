import './App.css';
import React from 'react';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import OtpSuccessful from './pages/OtpSuccessful';
import OtpVerification from './pages/OtpVerification';
import ResetPassword from './pages/ResetPassword';
import SignUp from './pages/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './utils/Auth';
import { RequiredAuth } from './utils/RequiredAuth';
import ErrorPage from './pages/ErrorPage';
import TaskPage from './components/Component/Tasks/TaskPage';
import Chat from './pages/Chats/Chat';
import AddTask from './components/Component/Tasks/AddTask';
import Lobby from './pages/Videocall/Lobby';


function App() {
  return (
    <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <Routes>
    <Route exact path ="/" element ={<RequiredAuth><Dashboard/></RequiredAuth>}/>
    <Route exact path="/login" element={<Login/>} /> 
    <Route exact path="/register" element={<SignUp/>} /> 
    <Route exact path="/resetpassword" element={<ResetPassword/>} /> 
    <Route exact path="/otpverify" element={<OtpVerification/>} /> 
    <Route exact path="/sucesspasswordchanged" element={<OtpSuccessful/>} /> 
    <Route exact path="/changepassword" element={<ChangePassword/>} /> 
    <Route exact path="/taskpage" element={<TaskPage/>} />
    <Route exact path="/chat" element={<Chat/>}/>
    <Route exact path ='/addtask' element={<AddTask/>} /> 
    <Route exact path ='/lobby' element={<Lobby/>} />
    <Route path='*' element={<ErrorPage/>}/>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
