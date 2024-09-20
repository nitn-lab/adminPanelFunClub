import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, IconButton, Checkbox, FormControlLabel } from '@mui/material';

import axios from 'axios';
import { toast } from 'react-toastify';

const PromptQuestionForm = () => {
    const [prompts, setPrompts] = useState([]);
    const [newPrompt, setNewPrompt] = useState('');
    const [selectedPrompts, setSelectedPrompts] = useState([]);
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        const fetchPrompts = async () => {
            try {
                const response = await axios.get('http://3.110.156.153:5000/api/v1/getPromptQues', {
                    headers: { Authorization: ` ${token}` }
                });
                setPrompts(response.data.message);
            } catch (error) {
                console.error('Error fetching prompts:', error);
            }
        };
        fetchPrompts();
    }, [prompts]);

    const handleAddPrompt = async () => {
        if (newPrompt.trim() !== '') {
            try {
                const response = await axios.post('http://3.110.156.153:5000/api/v1/addPromptQuestions', {
                    questions: newPrompt,
                }, {
                    headers: { Authorization: ` ${token}` }
                });
               
                setPrompts( [...prompts, response.data.data.questions]);
                setNewPrompt('');
                toast.success('Prompt added successfully!');
            } catch (error) {
                toast.error('Error adding prompt');
            }
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedPrompts.length === 0) {
            toast.error('No prompts selected for deletion');
            return;
        }
        try {
            const response = await axios.delete('http://3.110.156.153:5000/api/v1/deleteQues', {
                headers: { Authorization: ` ${token}` },
                data: { ids: selectedPrompts }
            });

            if (response.status === 200) {
                const updatedPrompts = prompts.filter(prompt => !selectedPrompts.includes(prompt._id));
                setPrompts(updatedPrompts);
                setSelectedPrompts([]);
                toast.success('Selected prompts deleted successfully!');
            }
        } catch (error) {
            toast.error('Error deleting prompts');
        }
    };

    const handleSelectPrompt = (id) => {
        setSelectedPrompts(prevSelected =>
            prevSelected.includes(id) ? prevSelected.filter(promptId => promptId !== id) : [...prevSelected, id]
        );
    };

    return (
        <Box p={3}>
            <h1>Prompt Questions</h1>
            <Box>
                {prompts.map((prompt, index) => (
                    <Box key={index} display="flex" alignItems="center" mb={1}>
                    
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedPrompts.includes(prompt._id)}
                                    onChange={() => handleSelectPrompt(prompt._id)}
                                    color="secondary"
                                />
                            }
                            label={prompt.questions}
                        />
                    </Box>
                ))}
            </Box>

            <Box mt={2}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Add New Prompt"
                    value={newPrompt}
                    onChange={(e) => setNewPrompt(e.target.value)}
                    color="secondary"
                />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAddPrompt}
                    
                    sx={{ mt: 2 }}
                >
                    Add Prompt
                </Button>
            </Box>

            <Box mt={2}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteSelected}
                >
                    Delete 
                </Button>
            </Box>
        </Box>
    );
};

export default PromptQuestionForm;