import React, { useState, useEffect } from "react";
import { Box, TextField, Button, FormControl, FormControlLabel, Select, MenuItem, Checkbox } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = ({ onSave }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        age: "",
        role: "",
        isAdmin: false,
        dateCreated: "",
        lastLogin: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get(`http://3.110.156.153:5000/api/v1/userById/${id}`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                const fetchedUser = response.data.data;
                setUser({
                    name: fetchedUser.username,
                    email: fetchedUser.email,
                    age: calculateAge(fetchedUser.birthdate), 
                    role: fetchedUser.role,
                    isAdmin: fetchedUser.isAdmin,
                    dateCreated: formatDate(fetchedUser.dateCreated),
                    lastLogin: formatDate(fetchedUser.lastLogin),
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [id]);

    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); 
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser({
            ...user,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSave = () => {
        if (onSave) {
            onSave(user);
        }
        console.log("Saved user data:", user);
        navigate(-1);
    };

    return (
        <Box p={3}>
            <h1>User Profile</h1>
            <TextField
                name="name"
                label="Name"
                value={user.name}
                onChange={handleChange}
                fullWidth
                color="secondary"
                margin="normal"
                variant="outlined"
            />
            <TextField
                name="email"
                label="Email"
                value={user.email}
                onChange={handleChange}
                fullWidth
                color="secondary"
                margin="normal"
                variant="outlined"
            />
            <TextField
                name="age"
                label="Age"
                type="number"
                value={user.age}
                onChange={handleChange}
                fullWidth
                color="secondary"
                margin="normal"
                variant="outlined"
            />
            <FormControl fullWidth margin="normal">
                <Select
                    name="role"
                    color="secondary"
                    value={user.role}
                    onChange={handleChange}
                >
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Creator">Creator</MenuItem>
                    <MenuItem value="Special Creator">Special Creator</MenuItem>
                </Select>
            </FormControl>
            <Box display="flex" alignItems="center" margin="normal">
                <FormControlLabel 
                    label="Admin" 
                    labelPlacement="start" 
                    control={
                        <Checkbox 
                            name="isAdmin" 
                            checked={user.isAdmin} 
                            onChange={handleChange} 
                            color="secondary"
                        />
                    }
                />
            </Box>
            <TextField
                name="dateCreated"
                label="Date Created"
                value={user.dateCreated}
                fullWidth
                color="secondary"
                margin="normal"
                variant="outlined"
                disabled
            />
            <TextField
                name="lastLogin"
                label="Last Login"
                value={user.lastLogin}
                fullWidth
                color="secondary"
                margin="normal"
                variant="outlined"
                disabled
            />
            <Button
                variant="contained"
                color="secondary"
                onClick={handleSave}
                sx={{ mt: 2 }}
            >
                Save
            </Button>
        </Box>
    );
};

export default UserProfile;