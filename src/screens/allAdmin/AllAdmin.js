import React from "react";
import { Box } from "@mui/material";
import TopBar from "../global/TopBar";
import SideBar from "../global/SideBar";
import Header from "../../components/Header";

const AllAdmin = () => {
  return (
    <Box display="flex" sx={{ height: "100%" }}>
      <SideBar />
      <Box sx={{ width: "100%" }}>
        <TopBar />
        <Box mx="auto" p={{ base: "10px", md: "20px" }}>
          <Header title="Manage Admins" subtitle="List of all Admins" />
        </Box>
      </Box>
    </Box>
  );
};

export default AllAdmin;
