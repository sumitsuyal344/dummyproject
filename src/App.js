import React from 'react'
import {  Route, Routes, } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/Register" element={ <Register/> } />
      <Route path="/" element={ <Login/> } />
      <Route path="/Home" element={ <Home/> } />
    </Routes>
  </div>
   
  )
}

export default App