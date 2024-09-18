import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import TopBar from "../global/TopBar";
import SideBar from "../global/SideBar";
import Header from "../../components/Header";
import {
  FormControl,
  FormHelperText,
  Button,
} from "@mui/material";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddAdmin = () => {
  // State for form values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to the backend
      const response = await axios.post("http://3.110.156.153:5000/api/v1/adminRegister", formData);
      navigate('/auth')
     
      toast.success("Registered successfully!!")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      });
    } catch (error) {
      toast.error( error.response.data.error.details[0].message);
    }
  };

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
            component="form"
            onSubmit={handleSubmit} // Form submission handler
            mx="auto"
            p={{ base: "15px", md: "20px" }}
          >
            <FormControl fullWidth margin="dense">
              <TextField
                style={{ width: "100%" }}
                color="secondary"
                
                label="First Name"
                variant="outlined"
                name="firstName" // Add name attribute
                value={formData.firstName}
                onChange={handleChange} // Handle input change
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <TextField
                style={{ width: "100%"}}
                color="secondary"
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                name="lastName" // Add name attribute
                value={formData.lastName}
                onChange={handleChange} // Handle input change
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <TextField
                style={{ width: "100%"}}
                color="secondary"
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                name="email" // Add name attribute
                value={formData.email}
                onChange={handleChange} // Handle input change
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <TextField
                style={{ width: "100%"}}
                color="secondary"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                name="password" // Add name attribute
                value={formData.password}
                onChange={handleChange} // Handle input change
              />
              <FormHelperText id="my-helper-text">
                Password entered will be used for login.
              </FormHelperText>
            </FormControl>
            <Button
              color="secondary"
              variant="contained"
              style={{ width: "20%", marginTop: 15, color: "#ffffff", fontWeight: "bold", fontSize: "13px"}}
              type="submit" // Submit the form
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddAdmin;