import React, { useState, useEffect } from "react";
import { Box, TextField, Button, FormControl, Select, MenuItem, InputLabel, Avatar, FormControlLabel, Checkbox } from "@mui/material";
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
        active: false, 
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
                    active: fetchedUser.active,
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
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        setUser({
            ...user,
            active: e.target.checked,  
        });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.put(
               ` http://3.110.156.153:5000/api/v1/updateUsers/${id}`,
                {
                    // username: user.name,
                    // email: user.email,
                    // birthdate: calculateBirthdateFromAge(user.age), 
                    role: user.role,
                    active: user.active,
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

    // const calculateBirthdateFromAge = (age) => {
    //     const today = new Date();
    //     const birthYear = today.getFullYear() - age;
    //     return `${birthYear}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    // };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 5, borderRadius: 2 }}>
            <Avatar 
                alt={user.name} 
                src="https://i.pravatar.cc/150?img=7"
                sx={{ width: 100, height: 100, mb: 3 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                <TextField
                    name="name"
                    label="Name"
                    value={user.name}
                    disabled
                    fullWidth
                    color="secondary"
                    margin="normal"
                    variant="outlined"
                    sx={{  marginBottom: '8px' }}
                />
                <TextField
                    name="email"
                    label="Email"
                    value={user.email}
                    disabled
                    fullWidth
                    color="secondary"
                    margin="normal"
                    variant="outlined"
                    sx={{  marginBottom: '8px', ml: 2 }}
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <TextField
                    name="age"
                    label="Age"
                    type="number"
                    value={user.age}
                    disabled
                    fullWidth
                    color="secondary"
                    margin="normal"
                    variant="outlined"
                    sx={{ marginBottom: '8px' }}
                />
                <FormControl fullWidth margin="normal" sx={{ ml: 2 }}>
                    <InputLabel id='role-label' color="secondary">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        name="role"
                        label="Role"
                        value={user.role}
                        onChange={handleChange}
                        variant="outlined"
                        color="secondary"
                        sx={{ marginBottom: '8px' }}
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="creator">Creator</MenuItem>
                    </Select>
                </FormControl>
            </Box>

          
            <FormControlLabel
                control={
                    <Checkbox
                        checked={user.active}
                        onChange={handleCheckboxChange}
                        color="secondary"
                    />
                }
                labelPlacement="start"
                label="Active"
                sx={{ alignSelf: 'flex-start' }}
            />

            <TextField
                name="dateCreated"
                label="Date Created"
                value={user.dateCreated}
                fullWidth
                color="secondary"
                margin="normal"
                variant="outlined"
                disabled
                sx={{ marginBottom: '8px' }}
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
                sx={{ marginBottom: '8px' }}
            />
            
         
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSave}
                    sx={{ mr: 2, width: 'fit-content', px: 3 }}
                >
                    Save
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    sx={{ width: 'fit-content', px: 3 }}
                >
                    Delete
                </Button>
            </Box>
        </Box>
    );
};

export default UserProfile;