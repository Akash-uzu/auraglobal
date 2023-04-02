import React, {  useEffect, useState } from "react";
import "./Table.css";
import { useSelector } from "react-redux";
import AddUserModal from "../../modal/AdduserModal";

import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height:"fitcontent",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Table = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [showIndex, setIndex] = useState(0);

  const [triggetTable, setTriggerTable] = useState(false);

  const users = useSelector((state) => state.addUser.users);
  // const users = useSelector(userState)

  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    let login = localStorage.getItem("login")
    if(!login){
      window.location.href="/"
    }
  }, [])
  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleView = (e, listIndex) => {
    setIndex(listIndex);
    setFilteredData(users.filter((item, index) => index === listIndex));
    setViewModal(true);
  };
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setViewModal] = useState(false);
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setViewModal(false);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="main-table">
        <div className="table-container backdrop">
          <button onClick={handleOpen}>Add User</button>
          <input type="text" onChange={handleSearch} />
          <table>
            <thead>
              <tr>
                <th>SNO</th>
                <th>USERNAME</th>
                <th>EMAIL</th>
                <th>PASSWORD</th>
                <th>MOBILE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredUsers) &&
                filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.mobile}</td>
                    <td>
                      <button onClick={(e) => handleView(e, index)}>
                        view
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          
        </div>
      </div>

      {/* modal */}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddUserModal
            setOpenModal={setOpenModal}
            setTriggerTable={setTriggerTable}
            triggetTable={triggetTable}
          />
        </Box>
      </Modal>

      <Modal
        open={openViewModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            // console.log('dfdf',filteredData)
            Array.isArray(filteredData) &&
              filteredData.map((item, index) => (
                <div  key={index}>
                  <h1>User Details</h1>
                  <p>
                    <b>SNO: </b> {showIndex + 1}
                  </p>
                  <p>
                    <b>USERNAME: </b>
                    {item.username}
                  </p>
                  <p>
                    <b>EMAIL: </b>
                    {item.email}
                  </p>
                  <p>
                    <b>PASSWORD: </b>
                    {item.password}
                  </p>
                  <p>
                    <b>MOBILE: </b>
                    {item.mobile}
                  </p>
                  <p>
                    <b>JSON:</b> {item.json}
                  </p>
                </div>
              ))
          }
        </Box>
      </Modal>
    </>
  );
};

export default Table;
