import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser,updateUser } from '../../redux/adduser/addUserSlice';

import "./AdduserModal.css"


const AddUserModal = ({setOpenModal, filteredData}) => {


  const [username, setUsername] = useState(filteredData ?filteredData.username : '');
  const [email, setEmail] = useState(filteredData ?filteredData.email : '');
  const [password, setPassword] = useState(filteredData ?filteredData.password : '');
  const [confirmPassword, setConfirmPassword] = useState(filteredData ?filteredData.password : '');
  const [mobile, setMobile] = useState(filteredData ?filteredData.mobile : '');
  const [json, setJson] = useState(filteredData ?filteredData.json : '');
  const [errors, setErrors] = useState({});
  const dispatch= useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate input fields
    let errors = {};
    if (!username) {
      errors.username = 'Username is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!mobile) {
      errors.mobile = 'Mobile is required';
    } else if (!/^[0-9]+$/.test(mobile)) {
      errors.mobile = 'Mobile must contain only digits';
    }
    if (json.length>0) {
      try {
        JSON.parse(json);
        console.log(json)
      } catch (error) {
        errors.json = 'JSON is invalid';
      }
    }else{
      errors.json = "JSON should not be Empty"
    }
  
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
  
    const user = {
      id: filteredData ? filteredData.id : Math.floor(Math.random() * 1000000) + 1,
      username,
      email,
      password,
      mobile,
      json,
    };
    if(!filteredData){
      dispatch(addUser(user));
  
      // setTriggerTable(!triggetTable);
      setOpenModal(false);

    }else{
      dispatch(updateUser(user))
      setOpenModal(false);


    }

    
  };
  


  return(
    <div className="modal">
      <h2>{filteredData ? "Update User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} autoComplete="off" onChange={(event) => setUsername(event.target.value)} />
          {errors.username && <span className="error">{errors.username}</span>}

        </label>
        <br />
        <label>
          Email:
          <input type="text" value={ email} autoComplete="off" onChange={(event) => setEmail(event.target.value)} />
          {errors.email && <span className="error">{errors.email}</span>}

        </label>
        <br />
        <label>
          Password:
          <input type="password" value={ password} autoComplete="off" onChange={(event) => setPassword(event.target.value)} />
          {errors.password && <span className="error">{errors.password}</span>}
        </label>
        
        <br />
        <label>
          Confirm Password:
          <input type="password" value={ confirmPassword} autoComplete="off" onChange={(event) => setConfirmPassword(event.target.value)} />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

        </label>
        <br />
        <label>
          Mobile:
          <input type="text" value={mobile} autoComplete="off" onChange={(event) => setMobile(event.target.value)} />
          {errors.mobile && <span className="error">{errors.mobile}</span>}

        </label>
        <br />
        <label>
          JSON:
          <textarea value={json} autoComplete="off" onChange={(event) => setJson(event.target.value)} />
          {errors.json && <span className="error">{errors.json}</span>}

        </label>
        <br />
        <button type="submit">{filteredData ? "Update" :"Add User"}</button>
      </form>
    </div>
  );
};
export default AddUserModal