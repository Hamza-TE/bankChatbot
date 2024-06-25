import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Components/Login';
import Profile from './Components/Profile';
import { UserProvider } from './Components/UserContext'; 
import Subscription from './Components/Subscription'
import SignIn from './Components/SignIn';

const routing = (
  <Router>
    <UserProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/subscribe" element={<Subscription />} />

      </Routes>
    </UserProvider>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>
);
