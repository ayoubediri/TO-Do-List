import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Alert,
} from '@mui/material';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default function TaskDetailApp({ task, onBack, onUpdate, onDelete}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setEditedTask(task);
    setIsEditing(false);
    setErrors({});
  }, [task]);

  if (!task) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Alert severity="warning">
          No task selected. Please select a task from the list.
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ mt: 2 }}
        >
          Back to All Tasks
        </Button>
      </Box>
    );
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!editedTask.title.trim()) {
      newErrors.title = 'Please enter a task title';
    } else if (editedTask.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (editedTask.title.trim().length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if(!editedTask.content.trim()) {
      newErrors.content = 'Please add task details';
    } else if (editedTask.content.trim().length < 3) {
      newErrors.content = 'Content must be at least 3 characters';
    } else if (editedTask.content.trim().length > 1000) {
      newErrors.content = 'Content must be less than 1000 characters';
    }

    if (editedTask.endTime && new Date(editedTask.endTime) < new Date()) {
      newErrors.endTime = 'End time cannot be in the past';
    }
    
    if (editedTask.tags && editedTask.tags.some(tag => tag.trim().length > 50)) {
      newErrors.tags = 'Each tag must be less than 50 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditChange = (field, value) => {
    setEditedTask({ ...editedTask, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      const updatedTaskWithTimestamp = {
        ...editedTask,
        lastEditedTime: new Date().toISOString()
      };
      onUpdate(updatedTaskWithTimestamp);
      setIsEditing(false);
      setSuccessMessage('Task updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleDelete = () => {
    onDelete(task.id);
    setDeleteDialog(false);
    onBack();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 900, margin: '0 auto' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        sx={{ mb: 3, textTransform: 'none', fontSize: '1rem' }}
      >
        ← Back to All Tasks
      </Button>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 1 }} onClose={() => setSuccessMessage('')}>
           {successMessage}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
        {/* Title Section */}
        <Box sx={{ mb: 4, pb: 3, borderBottom: '2px solid', borderBottomColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, minWidth: 0 }}>
            {isEditing ? (
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <TextField
                  fullWidth
                  label="Task Title"
                  value={editedTask.title}
                  onChange={(e) => {
                    if (e.target.value.length <= 100) {
                      handleEditChange('title', e.target.value);
                    }
                  }}
                  variant="outlined"
                  error={!!errors.title}
                  helperText={errors.title}
                  multiline
                  rows={2}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderWidth: 2,
                      borderColor: '#ffb74d',
                      '&:hover': {
                        borderColor: '#ffa726',
                      },
                      '&.Mui-focused': {
                        borderColor: '#ff9800',
                        boxShadow: '0 0 0 3px rgba(255, 183, 77, 0.1)',
                      },
                    },
                  }}
                  slotProps={{
                    input: {
                      maxLength: 100,
                    },
                  }}
                />
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
                  {editedTask.title.length}/100 characters
                </Typography>
              </Box>
            ) : (
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    flex: 1, 
                    minWidth: 0, 
                    wordWrap: 'break-word', 
                    overflowWrap: 'break-word',
                    color: 'primary.light',
                    lineHeight: 1.4,
                  }}
                >
                  {task.title}
                </Typography>
              </Box>
            )}
            <Chip
              label={getStatusLabel(isEditing ? editedTask.status : task.status)}
              color={getStatusColor(isEditing ? editedTask.status : task.status)}
              size="medium"
              sx={{ flexShrink: 0, height: 32, fontSize: '0.9rem', fontWeight: 600 }}
            />
          </Box>
        </Box>

        {/* Content Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
            Details
          </Typography>
          {isEditing ? (
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <TextField
                fullWidth
                label="Task Content"
                value={editedTask.content}
                onChange={(e) => {
                  if (e.target.value.length <= 1000) {
                    handleEditChange('content', e.target.value);
                  }
                }}
                variant="outlined"
                error={!!errors.content}
                helperText={errors.content}
                multiline
                rows={8}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderWidth: 2,
                    borderColor: '#90caf9',
                    '&:hover': {
                      borderColor: '#64b5f6',
                    },
                    '&.Mui-focused': {
                      borderColor: '#42a5f5',
                      boxShadow: '0 0 0 3px rgba(144, 202, 249, 0.1)',
                    },
                  },
                }}
                slotProps={{
                  input: {
                    maxLength: 1000,
                  },
                }}
              />
              <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
                {editedTask.content.length}/1000 characters
              </Typography>
            </Box>
          ) : (
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 3, 
                borderWidth: 2,
                borderColor: 'divider',
                borderRadius: 1.5,
                backgroundColor: 'rgba(144, 202, 249, 0.03)',
                minHeight: 150,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography 
                variant="body1" 
                sx={{ 
                  whiteSpace: 'pre-wrap', 
                  wordWrap: 'break-word', 
                  overflowWrap: 'break-word',
                  lineHeight: 1.6,
                  color: 'text.primary',
                }}
              >
                {task.content}
              </Typography>
            </Paper>
          )}
        </Box>

        <Divider sx={{ mb: 4 }} />
        {isEditing && (
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={editedTask.status}
              label="Status"
              onChange={(e) => handleEditChange('status', e.target.value)}
            >
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        )}

        {/* End Time */}
        <Grid container spacing={3} sx={{ mb: 4, pb: 3, borderBottom: '1px solid', borderBottomColor: 'divider' }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CalendarTodayIcon />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>End Time</Typography>
            </Box>
            {isEditing ? (
              <TextField
                fullWidth
                type="datetime-local"
                value={editedTask.endTime || ''}
                onChange={(e) => handleEditChange('endTime', e.target.value)}
                variant="outlined"
                slotProps={{ inputLabel: { shrink: true } }}
              />
            ) : (
              <Typography variant="body1" sx={{ ml: 4, fontFamily: 'monospace' }}>
                {task.endTime
                  ? new Date(task.endTime).toLocaleString()
                  : 'No end time set'}
              </Typography>
            )}
          </Grid>
          
          {/* Creation Time */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CalendarTodayIcon />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Created On</Typography>
            </Box>
            <Typography variant="body1" sx={{ ml: 4, fontFamily: 'monospace' }}>
              {new Date(task.creationTime).toLocaleString()}
            </Typography>
          </Grid>

          {/* Last Edited Time */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CalendarTodayIcon />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Last Edited</Typography>
            </Box>
            <Typography variant="body1" sx={{ ml: 4, fontFamily: 'monospace' }}>
              {task.lastEditedTime ? new Date(task.lastEditedTime).toLocaleString() : 'Never edited'}
            </Typography>
          </Grid>
        </Grid>

        {/* Tags */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <LocalOfferIcon />
            <Typography variant="h6">Tags</Typography>
          </Box>
          {isEditing ? (
            <TextField
              fullWidth
              label="Tags (comma-separated)"
              value={editedTask.tags.join(', ')}
              onChange={(e) =>
                handleEditChange(
                  'tags',
                  e.target.value.split(',').map(t => t.trim()).filter(t => t)
                )
              }
              variant="outlined"
              placeholder="e.g., urgent, work, personal"
            />
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {task.tags && task.tags.length > 0 ? (
                task.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    icon={<LocalOfferIcon />}
                    variant="outlined"
                  />
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No tags
                </Typography>
              )}
            </Box>
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          {isEditing ? (
            <>
              <Button
                variant="outlined"
                onClick={() => {
                  setEditedTask(task);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                color="success"
              >
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
                color="primary"
              >
                Edit
              </Button>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={() => setDeleteDialog(true)}
                color="error"
              >
                Delete
              </Button>
            </>
          )}
        </Box>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Task?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this task? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
