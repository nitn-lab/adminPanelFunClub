import React from "react";
import { Box, Select } from "@mui/material";
import TopBar from "../global/TopBar";
import SideBar from "../global/SideBar";
import Header from "../../components/Header";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";

const AllUsers = () => {
  function SelectEditInputCell(props) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();

    const handleChange = async (event) => {
      await apiRef.current.setEditCellValue({
        id,
        field,
        value: event.target.value,
      });
      apiRef.current.stopCellEditMode({ id, field });
    };

    return (
      <Select
        value={value}
        onChange={handleChange}
        size="small"
        sx={{ height: 1 }}
        native
        autoFocus
      >
        <option>User</option>
        <option>Creator</option>
        <option>Special Creator</option>
      </Select>
    );
  }
  const renderSelectEditInputCell = (params) => {
    return <SelectEditInputCell {...params} />;
  };
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 120,
      Filter: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 120,
    },
    {
      field: "active",
      headerName: "Active",
      width: 120,
      editable: true,
      type: "boolean",
    },
    {
      field: "age",
      headerName: "Age",
      width: 120,
    },

    {
      field: "isAdmin",
      headerName: "IsAdmin",
      width: 120,
      editable: true,
      type: "boolean",
    },
    {
      field: "role",
      headerName: "Role",
      renderEditCell: () => renderSelectEditInputCell(),
      editable: true,
      width: 180,
    },
    {
      field: "dateCreated",
      headerName: "Created",
      width: 120,
    },
    {
      field: "lastLogin",
      headerName: "LastLogin",
      width: 120,
    },
  ];

  const rows = [
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
      email: "demo@gmail.com",
      active: true,
      age: 25,
      dateCreated: "09-05-2024",
      lastLogin: "09-05-2024",
      isAdmin: true,
      role: "Creator",
    },
    {
      id: 3,
      name: "Himanshu",
      email: "demo@gmail.com",
      active: true,
      age: 25,
      dateCreated: "09-05-2024",
      lastLogin: "09-05-2024",
      isAdmin: true,
      role: "User",
    },
  ];
  return (
    <Box display="flex" sx={{ height: "100%" }}>
      <SideBar />
      <Box sx={{ width: "100%" }}>
        <TopBar />
        <Box mx="auto" p={{ base: "10px", md: "20px" }}>
          <Header title="Manage Users" subtitle="List of all users" />
        </Box>

        <Box
          mx="auto"
          p={{ base: "10px", md: "20px" }}
          sx={{
            height: 400,
            width: "100%",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AllUsers;
