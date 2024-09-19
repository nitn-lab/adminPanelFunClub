import React, { useState, useEffect } from "react";
import { Box, Select, MenuItem, FormControl, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../global/TopBar";
import SideBar from "../global/SideBar";
import Header from "../../components/Header";
import axios from "axios";
import { toast } from "react-toastify";

const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  const age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (today.getDate() < birthDate.getDate() && month === 0)) {
    return age - 1;
  }
  return age;
};

const AllUsers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [roleFilter, setRoleFilter] = useState("All");
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get("http://3.110.156.153:5000/api/v1/users", {
          headers: {
            Authorization: `${token}`,
          },
        });

        const users = response.data.data;

        const formattedUsers = users.map((user) => ({
          id: user._id,
          name: user.username,
          email: user.email,
          active: user.active,
          age: calculateAge(user.birthdate),
          dateCreated: user.dateCreated,
          lastLogin: user.lastLogin,
          isAdmin: user.isAdmin,
          role: user.role,
        }));

        setRows(formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (location.pathname.includes('creators')) {
      setRoleFilter("creator");
    } else {
      setRoleFilter("All");
    }
  }, [location]);

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.delete(`http://3.110.156.153:5000/api/v1/delete/${id}`, {
        headers: {
          Authorization:` ${token}`,
        },
      })
      .then(() => {
          toast.success("User deleted successfully!!")
      })
      .catch((err) => {
          toast.error("Error deleting user!!", err)
      })
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleRowClick = (params, event) => {
    if (event.target.nodeName === "BUTTON") {
      return;
    }
    navigate(`/userProfile/${params.id}`);
  };

  const filteredRows =
    roleFilter === "All" ? rows : rows.filter((row) => row.role === roleFilter);

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "age", headerName: "Age", width: 120 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "isAdmin", headerName: "Admin", width: 100, renderCell: (params) => (params.value ? "Yes" : "No") },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="secondary" onClick={() => handleDelete(params.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box display="flex" height="100vh" overflow="auto">
      <SideBar />
      <Box flex="1" display="flex" flexDirection="column" overflow="auto">
        <TopBar />
        <Box p={2} sx={{ overflowX: "auto" }}>
          <Header title="All Users" />

          <Typography variant="subtitle1" sx={{ mb: 2, fontSize: "16px" }}>
            Manage all registered users in the system
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box></Box>
            <FormControl sx={{ minWidth: 150 }}>
              <Select value={roleFilter} onChange={handleRoleFilterChange}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="creator">Creator</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ height: 400, width: "100%", overflowX: "auto" }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              color="secondary"
              onRowClick={(params, event) => handleRowClick(params, event)}
              onSelectionModelChange={(newSelection) => setSelectedRows(newSelection.selectionModel)}
              selectionModel={selectedRows}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AllUsers;