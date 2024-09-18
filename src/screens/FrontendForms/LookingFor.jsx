import React, { useState, useEffect } from "react";
import { Box, TextField, Button, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

const LookingForForm = () => {
    const [newLookingFor, setNewLookingFor] = useState("");
    const [lookingFor, setLookingFor] = useState([]);

    
    useEffect(() => {
        const fetchLookingFor = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get("http://api-url/api/v1/lookingFor", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLookingFor(response.data.lookingFor || []);
            } catch (error) {
                toast.error("Error fetching Looking For interests from the backend");
            }
        };
        
        fetchLookingFor();
    }, []);

    
    const handleAddLookingFor = () => {
        if (newLookingFor.trim()) {
            setLookingFor([...lookingFor, newLookingFor.trim()]);
            setNewLookingFor("");
        }
    };

  
    const handleDeleteLookingFor = (lookingForToDelete) => {
        setLookingFor(lookingFor.filter(item => item !== lookingForToDelete));
    };

    
    const handleSave = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.put(
                "http://api-url/api/v1/lookingFor",  
                { lookingFor },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Looking For interests successfully updated!");
        } catch (error) {
            toast.error("Error updating Looking For interests");
        }
    };

    return (
        <Box p={3}>
            <h1>Manage Looking For Interests</h1>

          
            <TextField
                value={newLookingFor}
                onChange={(e) => setNewLookingFor(e.target.value)}
                label="Write Looking For"
                fullWidth
                margin="normal"
                variant="outlined"
                color="secondary"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddLookingFor}
                startIcon={<Add />}
                sx={{ mt: 2 }}
            >
                Add Looking For
            </Button>

            
            <List>
                {lookingFor.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={item} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => handleDeleteLookingFor(item)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

          
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

export default LookingForForm;