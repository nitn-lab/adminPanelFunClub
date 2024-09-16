import React from "react";
import { Box, TextField } from "@mui/material";
import TopBar from "../global/TopBar";
import SideBar from "../global/SideBar";
import Header from "../../components/Header";
import Checkbox from "@mui/material/Checkbox";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  FormLabel,
  Button,
} from "@mui/material";
const AddAdmin = () => {
  return (
    <Box display="flex" sx={{ height: "100%" }}>
      <SideBar />
      <Box sx={{ width: "100%" }}>
        <TopBar />
        <Box mx="auto" p={{ base: "10px", md: "20px" }}>
          <Header title="Add Admins" subtitle="Create Admin for dashboard" />
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
                label="First Name"
                variant="outlined"
              />
              
            </FormControl>
            <FormControl fullWidth margin="dense">
             
              <TextField
                style={{ width: "100%"}}
                color="secondary"
                // focused
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
              />
              
            </FormControl>
            <FormControl fullWidth margin="dense">
             
              <TextField
                style={{ width: "100%"}}
                color="secondary"
                // focused
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
              />
            
            </FormControl>
            <FormControl fullWidth margin="dense">
           
              <TextField
                style={{ width: "100%"}}
                color="secondary"
                // focused
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
              />
              <FormHelperText id="my-helper-text">
                Password entered will be same used for login.
              </FormHelperText>
            </FormControl>
            <Button
              color="secondary"
              variant="contained"
              style={{ width: "20%", marginTop : 15, color: "#ffffff", fontWeight: "bold", fontSize: "13px"}}
            >
              Submit
            </Button>
            {/* <div
              style={{
                width: "100%",
                backgroundColor: "transparent",
                // flexDirection: "row",
                padding: 5,
                // justifyContent: "space-evenly",
                // alignItems: "center",
              }}
            >
              <TextField
                style={{ width: "40%"}}
                color="secondary"
                focused
                id="outlined-basic"
                label="First Name"
                variant="outlined"
              />
              <TextField
                style={{ width: "40%"}}
                color="secondary"
                focused
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
              />

              <TextField
                style={{ width: "80%"}}
                color="secondary"
                focused
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />
              <TextField
                style={{ width: "80%"}}
                color="secondary"
                focused
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
              />

              <Checkbox {...label} defaultChecked color="default" />
            </div> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddAdmin;
