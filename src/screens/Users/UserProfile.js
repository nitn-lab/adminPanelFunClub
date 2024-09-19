import React, { useState, useEffect } from "react";
import { Box, TextField, Button, FormControl, FormControlLabel, Select, MenuItem, Checkbox, InputLabel } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.put(
               ` http://3.110.156.153:5000/api/v1/updateUsers/${id}`,
                {
                    username: user.name,
                    email: user.email,
                    birthdate: calculateBirthdateFromAge(user.age), 
                    role: user.role,
                    isAdmin: user.isAdmin,
                },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            toast.success("User successfully updated!!");
            if (onSave) {
                onSave(user);
            }
            navigate(-1); 
        } catch (error) {
            toast.error("Error updating user data");
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.delete(`http://3.110.156.153:5000/api/v1/delete/${id}`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            toast.success("User successfully deleted!");
            navigate(-1); 
        } catch (error) {
            toast.error("Error deleting user");
        }
    };

    const calculateBirthdateFromAge = (age) => {
        const today = new Date();
        const birthYear = today.getFullYear() - age;
        return `${birthYear}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
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
                <InputLabel id='role-label' color="secondary">Role</InputLabel>
                <Select
                    labelId="role-label"
                    name="role"
                    label="Role"
                    value={user.role}
                    onChange={handleChange}
                    variant="outlined"
                    color="secondary"
                >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="creator">Creator</MenuItem>
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
            <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSave}
                >
                    Save
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </Box>
        </Box>
    );
};

export default UserProfile;