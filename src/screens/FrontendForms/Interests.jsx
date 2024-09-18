import React, { useState, useEffect } from "react";
import { Box, TextField, Button, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

const InterestsForm = () => {
    const [newInterest, setNewInterest] = useState("");
    const [interests, setInterests] = useState([]);

    
    useEffect(() => {
        const fetchInterests = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get("http://api-url/api/v1/interests", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setInterests(response.data.interests || []);
            } catch (error) {
                toast.error("Error fetching interests from the backend");
            }
        };
        
        fetchInterests();
    }, []);

    
    const handleAddInterest = () => {
        if (newInterest.trim()) {
            setInterests([...interests, newInterest.trim()]);
            setNewInterest("");
        }
    };

  
    const handleDeleteInterest = (interestToDelete) => {
        setInterests(interests.filter(interest => interest !== interestToDelete));
    };

    
    const handleSave = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.put(
                "http://-url/api/v1/interests", 
                { interests },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Interests successfully updated!");
        } catch (error) {
            toast.error("Error updating interests");
        }
    };

    return (
        <Box p={3}>
            <h1>Manage Interests</h1>

          
            <TextField
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                label="New Interest"
                fullWidth
                margin="normal"
                variant="outlined"
                color="secondary"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddInterest}
                startIcon={<Add />}
                sx={{ mt: 2 }}
            >
                Add Interest
            </Button>

           
            <List>
                {interests.map((interest, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={interest} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => handleDeleteInterest(interest)}>
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
                Save Interests
            </Button>
        </Box>
    );
};

export default InterestsForm;