import React from 'react'
import "./Header.css"
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate()
  const logoutHandler=()=>{
    localStorage.removeItem("login")
    navigate("/")
  }
  return (
    
        <div className='header-container'>
        <img src="https://auraglobal.com/wp-content/uploads/2021/11/AUG-Transparent.png" alt="Brand Logo" />
        <button onClick={logoutHandler}>Logout</button>
      </div>
    
  )
}

export default Header