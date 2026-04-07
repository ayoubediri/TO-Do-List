
import { Box, List, ListItem, ListItemText, Paper, Typography, Chip } from '@mui/material';

export default function TaskList({type, title, tasks, onTaskSelect }) {
  if (!tasks || tasks.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>{title}</Typography>
        <Paper elevation={0} variant="outlined" sx={{ width: '100%' }}>
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No {type} tasks found.
            </Typography>
          </Box>
        </Paper>
      </Box>
    );
  }
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>{title}</Typography>
      <Paper elevation={0} variant="outlined" sx={{ width: '100%' }}>
        <List sx={{ width: '100%', minWidth: 0 }}>
          {tasks.map((task) => (
            <ListItem 
              key={task.id} 
              divider
              onClick={() => onTaskSelect && onTaskSelect(task.id)}
              sx={{ cursor: 'pointer', transition: 'background-color 0.3s', '&:hover': { backgroundColor: 'action.hover' }, minWidth: 0, width: '100%' }}
            >
              <ListItemText primary={task.title} />

              {task.tags && task.tags.length > 0 && (
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}></Box>
              )}
              <Chip 
                label={task.status} 
                size="small" 
                color={task.status === 'completed' ? 'success' : 'warning'} 
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}