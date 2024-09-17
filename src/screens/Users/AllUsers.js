import React, { useState, useEffect } from "react";
import { Box, Select, MenuItem, FormControl, Button, TextField, Checkbox, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../global/TopBar";
import SideBar from "../global/SideBar";
import Header from "../../components/Header";
import axios from "axios";

const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  const age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
}

const AllUsers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [roleFilter, setRoleFilter] = useState("All");
  const [rows, setRows] = useState([]);
  const [editingRowId, setEditingRowId] = useState(null);
  const [rowValues, setRowValues] = useState({});
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
        console.log(users)

        const formattedUsers = users.map((user, index) => ({
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
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      }
    };

    fetchUsers();
  }, []);


  useEffect(() => {
    if (location.pathname.includes('creators')) {
      setRoleFilter("Creator");
    } else {
      setRoleFilter("All");
    }
  }, [location]);

  useEffect(() => {
    if (editingRowId) {
      const row = rows.find((row) => row.id === editingRowId);
      setRowValues({ ...row });
    }
  }, [editingRowId, rows]);

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const handleFieldChange = (field, value) => {
    setRowValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleSave = () => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === editingRowId ? { ...rowValues } : row
      )
    );
    setEditingRowId(null); // End editing
  };

  const handleEditClick = (id) => {
    setEditingRowId(id); // Set the row to be edited
  };

  // Navigate to UserProfile on row click
  const handleRowClick = (params, event) => {
    if (event.target.nodeName === "BUTTON" || editingRowId === params.id) {
      return;
    }
    navigate(`/userProfile/${params.id}`);
  };

  const filteredRows =
    roleFilter === "All" ? rows : rows.filter((row) => row.role === roleFilter);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) =>
        editingRowId === params.id ? (
          <TextField
            value={rowValues.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            size="small"
            autoFocus
          />
        ) : (
          params.value
        ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) =>
        editingRowId === params.id ? (
          <TextField
            value={rowValues.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            size="small"
          />
        ) : (
          params.value
        ),
    },
    {
      field: "age",
      headerName: "Age",
      width: 120,
      renderCell: (params) =>
        editingRowId === params.id ? (
          <TextField
            type="number"
            value={rowValues.age}
            onChange={(e) => handleFieldChange("age", e.target.value)}
            size="small"
          />
        ) : (
          params.value
        ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      renderCell: (params) =>
        editingRowId === params.id ? (
          <FormControl>
            <Select
              value={rowValues.role}
              onChange={(e) => handleFieldChange("role", e.target.value)}
              size="small"
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Creator">Creator</MenuItem>
              <MenuItem value="Special Creator">Special Creator</MenuItem>
            </Select>
          </FormControl>
        ) : (
          params.value
        ),
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 100,
      renderCell: (params) =>
        editingRowId === params.id ? (
          <Checkbox
            checked={rowValues.isAdmin}
            onChange={(e) =>
              handleFieldChange("isAdmin", e.target.checked)
            }
          />
        ) : (
          params.value ? "Yes" : "No"
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) =>
        editingRowId === params.id ? (
          <Button variant="contained" color="secondary" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => handleEditClick(params.id)}
          >
            Edit
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

          {/* Subheading */}
          <Typography variant="subtitle1" sx={{ mb: 2, fontSize: "16px" }}>
            Manage all registered users in the system
          </Typography>

          {/* Filter box aligned to the right */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box></Box> {/* Empty space to push the filter box to the right */}
            <FormControl sx={{ minWidth: 150 }}>
              <Select value={roleFilter} onChange={handleRoleFilterChange}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Creator">Creator</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Data grid table */}
          <Box sx={{ height: 400, width: "100%", overflowX: "auto" }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              onRowClick={(params, event) => handleRowClick(params, event)} // Prevent navigation when in edit mode
              onSelectionModelChange={(newSelection) =>
                setSelectedRows(newSelection.selectionModel)
              }
              selectionModel={selectedRows}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AllUsers;