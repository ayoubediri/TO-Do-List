import { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';

export default function AddTaskForm({ onAddTask }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskContent, setNewTaskContent] = useState('');
  const [endTime, setEndTime] = useState('');
  const [tags, setTags] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!newTaskTitle.trim()) {
      newErrors.title = 'Please enter a task title';
    } else if (newTaskTitle.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (newTaskTitle.trim().length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (newTaskContent.trim() === '') {
      newErrors.content = 'Please add task details';
    } else if (newTaskContent.trim().length < 3) {
      newErrors.content = 'Content must be at least 3 characters';
    } else if (newTaskContent.trim().length > 1000) {
      newErrors.content = 'Content must be less than 1000 characters';
    }
    
    if (endTime && new Date(endTime) < new Date()) {
      newErrors.endTime = 'End time cannot be in the past';
    }
    
    if (tags && tags.split(',').some(tag => tag.trim().length > 50)) {
      newErrors.tags = 'Each tag must be less than 50 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleAddTask = () => {
    if (validateForm()) {
      onAddTask(newTaskTitle, 'todo', endTime, tags, newTaskContent);
      setNewTaskTitle('');
      setEndTime('');
      setTags('');
      setNewTaskContent('');
      setSuccessMessage('Task added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleTitleChange = (e) => {
    if (e.target.value.length <= 100) {
      setNewTaskTitle(e.target.value);
      if (errors.title) {
        setErrors({ ...errors, title: '' });
      }
    }
  };

  const handleContentChange = (e) => {
    if (e.target.value.length <= 1000) {
      setNewTaskContent(e.target.value);
      if (errors.content) {
        setErrors({ ...errors, content: '' });
      }
    }
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
    if (errors.endTime) {
      setErrors({ ...errors, endTime: '' });
    }
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
    if (errors.tags) {
      setErrors({ ...errors, tags: '' });
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Add New Task</Typography>
      
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}
      
      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <TextField 
          fullWidth 
          label="Task Title (3-100 characters)" 
          variant="outlined"
          value={newTaskTitle}
          onChange={handleTitleChange}
          onKeyDown={handleKeyDown}
          error={!!errors.title}
          helperText={errors.title}
          slotProps={{
            input: {
              maxLength: 100,
            },
          }}
        />
        <Typography variant="caption" color="textSecondary">
          {newTaskTitle.length}/100 characters
        </Typography>

        <TextField 
          fullWidth
          label="Task Details (3-1000 characters)" 
          variant="outlined"
          value={newTaskContent}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          error={!!errors.content}
          helperText={errors.content}
          multiline
          rows={8}
          slotProps={{
            input: {
              maxLength: 1000,
            },
          }}
        />
        <Typography variant="caption" color="textSecondary">
          {newTaskContent.length}/1000 characters
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField 
            label="End Time" 
            type="datetime-local" 
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
            value={endTime}
            onChange={handleEndTimeChange}
            onKeyDown={handleKeyDown}
            error={!!errors.endTime}
            helperText={errors.endTime || '(Optional)'}
            sx={{ flex: 1, minWidth: 200 }}
          />
          <TextField 
            label="Tags (comma-separated)" 
            variant="outlined"
            value={tags}
            onChange={handleTagsChange}
            onKeyDown={handleKeyDown}
            error={!!errors.tags}
            helperText={errors.tags || '(Optional) : e.g., urgent, work, personal'}
            sx={{ flex: 2, minWidth: 200 }}
          />
          <Button 
            variant="contained" 
            size="large"
            sx={{ minWidth: 100, maxHeight: 56 }}
            onClick={handleAddTask}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
