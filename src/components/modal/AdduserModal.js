import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/adduser/addUserSlice';

import "./AdduserModal.css"


const AddUserModal = ({setOpenModal,triggetTable,setTriggerTable}) => {



  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [json, setJson] = useState('');
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
    if (json) {
      try {
        JSON.parse(json);
      } catch (error) {
        errors.json = 'JSON is invalid';
      }
    }
  
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
  
    const newUser = {
      username,
      email,
      password,
      mobile,
      json,
    };
    dispatch(addUser(newUser));
  
    setTriggerTable(!triggetTable);
    setOpenModal(false);
  };
  


  return(
    <div className="modal">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
          {errors.username && <span className="error">{errors.username}</span>}

        </label>
        <br />
        <label>
          Email:
          <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
          {errors.email && <span className="error">{errors.email}</span>}

        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          {errors.password && <span className="error">{errors.password}</span>}
        </label>
        
        <br />
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

        </label>
        <br />
        <label>
          Mobile:
          <input type="text" value={mobile} onChange={(event) => setMobile(event.target.value)} />
          {errors.mobile && <span className="error">{errors.mobile}</span>}

        </label>
        <br />
        <label>
          JSON:
          <textarea value={json} onChange={(event) => setJson(event.target.value)} />
          {errors.json && <span className="error">{errors.json}</span>}

        </label>
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};
export default AddUserModal