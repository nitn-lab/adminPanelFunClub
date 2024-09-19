import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminProfile = ({ onSave }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [admin, setAdmin] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dateCreated: "",
        lastLogin: "",
    });

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get(`http://3.110.156.153:5000/api/v1/adminById/${id}`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                const fetchedAdmin = response.data.data;
                setAdmin({
                    firstName: fetchedAdmin.firstName,
                    lastName: fetchedAdmin.lastName,
                    email: fetchedAdmin.email,
                    dateCreated: fetchedAdmin.dateCreated,
                });
            } catch (error) {
                console.error("Error fetching Admin data:", error);
            }
        };

        fetchAdminData();
    }, [id]);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdmin({
            ...admin,
            [name]: value,
        });
    };

   
    const handleSave = () => {
        if (onSave) {
            onSave(admin);
        }
        console.log("Saved admin data:", admin);
        navigate(-1);
    };

   
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.delete(`http://3.110.156.153:5000/api/v1/delete/${id}`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            toast.success("Admin successfully deleted!");
            navigate(-1); 
        } catch (error) {
            toast.error("Error deleting admin");
            console.error("Error deleting admin:", error);
        }
    };

    return (
        <Box p={3}>
            <h1>Admin Profile</h1>
            <TextField
                name="firstName"
                label="First Name"
                value={admin.firstName}
                onChange={handleChange}
                fullWidth
                color="secondary"
                margin="normal"
                variant="outlined"
            />
            <TextField
                name="lastName"
                label="Last Name"
                value={admin.lastName}
                onChange={handleChange}
                fullWidth
                color="secondary"
                margin="normal"
                variant="outlined"
            />
            <TextField
                name="email"
                label="Email"
                value={admin.email}
                onChange={handleChange}
                fullWidth
                color="secondary"
                margin="normal"
                variant="outlined"
            />
            <TextField
                name="dateCreated"
                label="Date Created"
                value={admin.dateCreated}
                fullWidth
                color="secondary"
                margin="normal"
                variant="outlined"
                disabled
            />

            <Box mt={2} display="flex" justifyContent="space-between">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSave}
                    sx={{ mt: 2 }}
                >
                    Save
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    sx={{ mt: 2 }}
                >
                    Delete
                </Button>
            </Box>
        </Box>
    );
};

export default AdminProfile;