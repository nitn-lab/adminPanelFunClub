import React, { useState, useEffect } from "react";
import { Box, Select, MenuItem, FormControl, Button, TextField, Checkbox, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../global/TopBar";
import SideBar from "../global/SideBar";
import Header from "../../components/Header";

const AllUsers = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const [roleFilter, setRoleFilter] = useState("All");
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "Raj",
      email: "demo@gmail.com",
      active: true,
      age: 25,
      dateCreated: "09-05-2024",
      lastLogin: "09-05-2024",
      isAdmin: true,
      role: "User",
    },
    {
      id: 2,
      name: "Nitin",
      email: "demo2@gmail.com",
      active: true,
      age: 30,
      dateCreated: "09-05-2024",
      lastLogin: "09-05-2024",
      isAdmin: true,
      role: "Creator",
    },
    {
      id: 3,
      name: "Himanshu",
      email: "demo3@gmail.com",
      active: true,
      age: 28,
      dateCreated: "09-05-2024",
      lastLogin: "09-05-2024",
      isAdmin: true,
      role: "Creator",
    },
  ]);

  const [editingRowId, setEditingRowId] = useState(null);
  const [rowValues, setRowValues] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
     if(location.pathname.includes('creators')){
      setRoleFilter("Creator")
     }
     else{
      setRoleFilter("All")
     }
  }, [location])

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
    // Prevent navigation if Edit button is clicked or the row is in editing mode
    if (event.target.nodeName === "BUTTON" || editingRowId === params.id) {
      return;
    }
    navigate(`/userProfile/${params.id}`); // Redirect to user profile with the selected row's ID
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
          <Typography variant="subtitle1" sx={{ mb: 2, fontSize : "16px" }}>
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