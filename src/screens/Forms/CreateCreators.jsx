import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import TopBar from "../global/TopBar";
import SideBar from "../global/SideBar";
import Header from "../../components/Header";

const CreateCreators = () => {
  const [age, setAge] = React.useState("None");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box display="flex" sx={{ height: "100%" }}>
      <SideBar />
      <Box sx={{ width: "100%" }}>
        <TopBar />
        <Box mx="auto" p={{ base: "10px", md: "10px" }}>
          <Header
            title="Create Creators"
            subtitle="Create Creators - Registration"
          />
        </Box>
        <Box>
          <Box
            // component="form"
            mx="auto"
            p={{ base: "15px", md: "10px" }}
            // sx={{
            //   "& .MuiTextField-root": { m: 1, width: "25ch" },
            // }}
            // noValidate
            // autoComplete="off"
          >
            <FormControl fullWidth margin="dense">
             
              <TextField
                style={{ width: "100%"}}
                color="secondary"
                // focused
                id="outlined-basic"
                label="Name"
                variant="outlined"
              />
              <FormHelperText id="my-helper-text">
                Please enter creator name.
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="dense">
              
              <TextField
                style={{ width: "100%" }}
                color="secondary"
                // focused
                id="outlined-basic"
                label="Creator username"
                variant="outlined"
              />
              <FormHelperText id="my-helper-text">
                Please enter creator username.
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="dense">
              
              <TextField
                style={{ width: "100%" }}
                color="secondary"
                // focused
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
              />
              <FormHelperText id="my-helper-text">
                Please enter creator email.
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <FormLabel>Category</FormLabel>
              <Select
                value={age}
                onChange={handleChange}
                autoWidth
                id="outlined-basic"
                label="Category"
                color="secondary"
                style={{ width: "100%" }}
                variant="outlined"
              >
                <MenuItem value="">
                  
                </MenuItem>
                <MenuItem value={10}>Verfied / Sponsored</MenuItem>
                <MenuItem value={21}>User to Creator</MenuItem>
                <MenuItem value={22}>Vip Creator</MenuItem>
              </Select>
              <FormHelperText id="my-helper-text">
                Please select creator category.
              </FormHelperText>
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
              <FormHelperText id="my-helper-text">
                Enter the New Password.
              </FormHelperText>
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

export default CreateCreators;
