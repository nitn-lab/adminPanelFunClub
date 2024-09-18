import React, { useState, useEffect } from "react";
import { Box, Select, MenuItem, FormControl, Button, TextField, Checkbox, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../global/TopBar";
import SideBar from "../global/SideBar";
import Header from "../../components/Header";
import axios from "axios";

const AllAdmin = () => {
 
  const navigate = useNavigate();
 
  const [rows, setRows] = useState([]);
  const [editingRowId, setEditingRowId] = useState(null);
  const [rowValues, setRowValues] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem('jwtToken');

        const response = await axios.get("http://3.110.156.153:5000/api/v1/admins", {
          headers: {
            Authorization: `${token}`,
          },
        });

        const admins = response.data.data;
        

        const formattedadmins = admins.map((admin, index) => ({
          id: admin._id,
          firstname: admin.firstName,
          email: admin.email,
          lastname: admin.lastName,
          active: admin.active,

          dateCreated: admin.dateCreated,



        }));

        setRows(formattedadmins);
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

    fetchAdmins();
  }, []);





  useEffect(() => {
    if (editingRowId) {
      const row = rows.find((row) => row.id === editingRowId);
      setRowValues({ ...row });
    }
  }, [editingRowId, rows]);



  const handleFieldChange = (field, value) => {
    setRowValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleSave = () => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === editingRowId ? { ...rowValues } : row
      )
    );
    setEditingRowId(null);
  };

  const handleEditClick = (id) => {
    setEditingRowId(id);
  };

  const handleRowClick = (params, event) => {
    if (event.target.nodeName === "BUTTON" || editingRowId === params.id) {
      return;
    }
    navigate(`/AdminProfile/${params.id}`);
  };


  const columns = [
    {
      field: "firstname",
      headerName: "First Name",
      width: 150,
      renderCell: (params) =>
        editingRowId === params.id ? (
          <TextField
            value={rowValues.firstname}
            onChange={(e) => handleFieldChange("firstname", e.target.value)}
            size="small"
            autoFocus
          />
        ) : (
          params.value
        ),
    },
    {
      field: "lastname",
      headerName: "Last Name",
      width: 150,
      renderCell: (params) =>
        editingRowId === params.id ? (
          <TextField
            value={rowValues.lastname}
            onChange={(e) => handleFieldChange("lastname", e.target.value)}
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
          <Header title="All Admins" />


          <Typography variant="subtitle1" sx={{ mb: 2, fontSize: "16px" }}>
            Manage all admins!!
          </Typography>



          <Box sx={{ height: 400, width: "100%", overflowX: "auto" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              onRowClick={(params, event) => handleRowClick(params, event)}
              onRowSelectionModelChange={(newSelection) =>
                setSelectedRows(newSelection)
              }
              selectionModel={selectedRows}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AllAdmin;