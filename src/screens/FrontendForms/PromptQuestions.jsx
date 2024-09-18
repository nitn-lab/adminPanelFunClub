import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, IconButton } from '@mui/material';
import { Add, Delete } from "@mui/icons-material";
import axios from 'axios';

const PromptQuestionForm = () => {
  const [prompts, setPrompts] = useState([]); 
  const [newPrompt, setNewPrompt] = useState(''); 

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await axios.get('/api/prompts'); 
        setPrompts(response.data);
      } catch (error) {
        console.error('Error fetching prompts:', error);
      }
    };
    fetchPrompts();
  }, []);

  const handleAddPrompt = () => {
    if (newPrompt.trim() !== '') {
      setPrompts([...prompts, newPrompt]);
      setNewPrompt(''); 
    }
  };

 
  const handleDeletePrompt = (index) => {
    const updatedPrompts = prompts.filter((_, i) => i !== index);
    setPrompts(updatedPrompts);
  };

 
  const savePrompts = async () => {
    try {
      await axios.post('/api/prompts', { prompts }); 
      alert('Prompts saved successfully!');
    } catch (error) {
      console.error('Error saving prompts:', error);
    }
  };

  return (
    <Box p={3}>
      <h1>Prompt Questions</h1>
      <Box>
        {prompts.map((prompt, index) => (
          <Box key={index} display="flex" alignItems="center" mb={1}>
            <TextField
              fullWidth
              variant="outlined"
              value={prompt}
              InputProps={{
                readOnly: true,
              }}
            />
            <IconButton onClick={() => handleDeletePrompt(index)} color="secondary">
              <Delete />
            </IconButton>
          </Box>
        ))}
      </Box>
      
      
      <Box  mt={2}>
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
                color="primary"
                onClick={handleAddPrompt}
                startIcon={<Add />}
                sx={{ mt: 2 }}
            >
                Add Prompt
            </Button>

      </Box>
      
      
      <Button variant="contained" color="secondary" onClick={savePrompts} sx={{ mt: 2 }}>
        Save Prompts
      </Button>
    </Box>
  );
};

export default PromptQuestionForm;