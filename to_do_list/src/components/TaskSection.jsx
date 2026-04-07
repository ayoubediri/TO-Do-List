import { Box, Paper, Typography, Divider, List, ListItem, ListItemText, Chip } from '@mui/material';

export default function TaskSection({ title, status, color, tasks, onTaskSelect }) {
  return (
    <Paper sx={{ p: 2, borderRadius: 2, height: '100%', borderLeft: `4px solid ${color}` }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>{title}</Typography>
      <Divider />
      <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <ListItem 
              key={task.id} 
              disablePadding 
              divider={index < tasks.length - 1}
              onClick={() => onTaskSelect && onTaskSelect(task.id)}
              sx={{ 
                py: 1, 
                px: 1,
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                '&:hover': { backgroundColor: 'action.hover' }
              }}
            >
              <ListItemText 
                primary={task.title}
                slotProps={{
                  primary: {
                    sx: {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      wordBreak: 'break-word',
                    },
                    title: task.title
                  },
                  secondary: { component: 'div' }
                }}
                secondary={
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
                    {task.endTime && (
                      <Typography variant="caption" color="error">
                        End: {new Date(task.endTime).toLocaleString()}
                      </Typography>
                    )}
                    {task.tags && task.tags.length > 0 && (
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {task.tags.map((tag, i) => (
                          <Chip key={i} label={tag} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                        ))}
                      </Box>
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            No tasks
          </Typography>
        )}
      </List>
    </Paper>
  );
}
