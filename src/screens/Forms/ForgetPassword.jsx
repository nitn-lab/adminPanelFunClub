import React, { useState } from "react";
import {
  Box,
  FormControl,
  Button,
  TextField,
  CircularProgress,
  Typography
} from "@mui/material";
import axios from "axios";
import TopBar from "../global/TopBar";
import SideBar from "../global/SideBar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await axios.post("http://3.110.156.153:5000/api/v1/passwordReset", {
        email,
        password,
      }
      
    )
    if(response.status === 201){
      toast.success("Password reset successfully!!")
        navigate('/auth')
    }

    } catch (err) {
      
       toast.error(err)
    } finally {
      setLoading(false);
    }
  };

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
            component="form"
            mx="auto"
            p={{ base: "15px", md: "20px" }}
            onSubmit={handleResetPassword}
          >
            <FormControl fullWidth margin="dense">
              <TextField
                style={{ width: "100%" }}
                color="secondary"
                id="email"
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <TextField
                style={{ width: "100%" }}
                color="secondary"
                id="password"
                label="New Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                style={{ width: "20%", marginTop: 15, color: "#ffffff", fontWeight: "bold", fontSize: "13px" }}
              >
                Submit
              </Button>
            )}
            {message && <Typography color="green">{message}</Typography>}
            {error && <Typography color="red">{error}</Typography>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgetPassword;