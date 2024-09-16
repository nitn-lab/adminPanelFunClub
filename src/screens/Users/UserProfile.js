import React, { useState, useEffect } from "react";
import { Box, TextField, Button, FormControl, FormControlLabel, Select, MenuItem, Checkbox } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = ({ onSave }) => {
    const { userId } = useParams(); // Get the userId from URL params
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
        // Fetch user data by userId (you might want to replace this with a real API call)
        const fetchUserData = () => {
            // Placeholder: Replace this with actual data fetching logic
            const fetchedUser = {
                name: "Raj",
                email: "demo@gmail.com",
                age: 25,
                role: "User",
                isAdmin: true,
                dateCreated: "09-05-2024",
                lastLogin: "09-05-2024",
            };
            setUser(fetchedUser);
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser({
            ...user,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSave = () => {
        // Call the passed onSave function to update the users table
        if (onSave) {
            onSave(user);
        }
        console.log("Saved user data:", user);
        navigate(-1); // Go back to previous page
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
                <FormControlLabel label="Admin" labelPlacement="start" control={
                    <Checkbox name="isAdmin" checked={user.isAdmin} onChange={handleChange} variant="outlined" color="secondary"/>

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