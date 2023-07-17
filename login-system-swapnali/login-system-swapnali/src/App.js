import './App.css';
import React from 'react';
import Login from './MyComponents/login';

import { Route, Routes } from "react-router-dom";
import Dashboard from './MyComponents/dashboard';
function App() {
return (
  <div>
     <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
  </div>
);
};

export default App;
