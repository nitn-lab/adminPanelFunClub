import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Button,
  TextField
} from "@mui/material";
import TopBar from "../global/TopBar";
import SideBar from "../global/SideBar";
import Header from "../../components/Header";

const ForgetPassword = () => {
  return (
    <Box display="flex" sx={{ height: "100%" }}>
      <SideBar />
      <Box sx={{ width: "100%" }}>
        <TopBar />
        <Box mx="auto" p={{ base: "10px", md: "20px" }}>
          <Header title="Forget Password" subtitle="Reset Password - Admin / Users / Creators" />
        </Box>
        <Box>
          <Box
            // component="form"
            mx="auto"
            p={{ base: "15px", md: "20px" }}
            // sx={{
            //   "& .MuiTextField-root": { m: 1, width: "25ch" },
            // }}
            // noValidate
            // autoComplete="off"
          >
            
          
            <FormControl fullWidth margin="dense">
             
              <TextField
                style={{ width: "100%" }}
                color="secondary"
                // focused
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
              />
             
            </FormControl>
            <FormControl fullWidth margin="dense">
              
              <TextField
                style={{ width: "100%" }}
                color="secondary"
                // focused
                id="outlined-basic"
                label="New Password"
                variant="outlined"
                type="password"
              />
             
            </FormControl>
            <Button
              color="secondary"
              variant="contained"
              style={{ width: "20%", marginTop : 15, color: "#ffffff", fontWeight: "bold", fontSize: "13px"}}
            >
              Submit
            </Button>
          
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
