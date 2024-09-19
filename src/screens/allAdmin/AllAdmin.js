import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import TopBar from "../global/TopBar";
import SideBar from "../global/SideBar";
import Header from "../../components/Header";
import axios from "axios";
import { toast } from "react-toastify";

const AllAdmin = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
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

        const formattedadmins = admins.map((admin) => ({
          id: admin._id,
          firstname: admin.firstName,
          email: admin.email,
          lastname: admin.lastName,
          active: admin.active,
          dateCreated: admin.dateCreated,
        }));

        setRows(formattedadmins);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

 
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.delete(`http://3.110.156.153:5000/api/v1/delete/${id}`, {
        headers: {
          Authorization:` ${token}`,
        },
      });

      
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      toast.success("Admin successfully deleted!");
    } catch (error) {
      toast.error("Error deleting admin");
      console.error("Error deleting admin:", error);
    }
  };

  
  const handleRowClick = (params, event) => {
    if (event.target.nodeName === "BUTTON") {
      return;
    }
    navigate(`/AdminProfile/${params.id}`);
  };

  
  const columns = [
    {
      field: "firstname",
      headerName: "First Name",
      width: 150,
    },
    {
      field: "lastname",
      headerName: "Last Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(params.id)}
        >
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