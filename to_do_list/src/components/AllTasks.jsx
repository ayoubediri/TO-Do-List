import { useState } from 'react';
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Chip,
  InputAdornment,
  Grid,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default function AllTasksApp({ tasks, onTaskSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterTag, setFilterTag] = useState('');

  const filteredTasks = tasks.filter((task) => {
    const titleMatch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    let dateMatch = true;
    if (filterDate) {
      const selectedDate = new Date(filterDate).toDateString();
      const taskDate = task.endTime ? new Date(task.endTime).toDateString() : null;
      dateMatch = taskDate === selectedDate;
    }
    
    let tagMatch = true;
    if (filterTag) {
      const tags = task.tags ? task.tags.map(t => t.toLowerCase()) : [];
      tagMatch = tags.some(tag => tag.includes(filterTag.toLowerCase()));
    }
    
    return titleMatch && dateMatch && tagMatch;
  });

  // Sort tasks by status priority: in-progress first, then todo, then completed
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const statusOrder = { 'in-progress': 0, 'todo': 1, 'completed': 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        All Tasks
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            fullWidth
            label="Filter by Date"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            variant="outlined"
            size="small"
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon />
                  </InputAdornment>
                ),
              }
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            fullWidth
            placeholder="Filter by tag..."
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            variant="outlined"
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalOfferIcon />
                  </InputAdornment>
                ),
              }
            }}
          />
        </Grid>
      </Grid>

      <Paper elevation={0} variant="outlined" sx={{ width: '100%' } }>
        {sortedTasks.length > 0 ? (
          <List>
            {sortedTasks.map((task, index) => (
              <Box key={task.id} sx={{ width: '100%', minWidth: 0 }}>
                <ListItem 
                  sx={{ 
                    flexDirection: 'column', 
                    alignItems: 'flex-start', 
                    gap: 1,
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    minWidth: 0,
                    width: '100%',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    }
                  }}
                  onClick={() => onTaskSelect && onTaskSelect(task.id)}
                >
                  <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', gap: 2 }}>
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
                        }
                      }}
                    />
                    <Chip
                      label={task.status}
                      size="small"
                      color={
                        task.status === 'completed' ? 'success' : 
                        task.status === 'in-progress' ? 'warning' : 
                        'default'
                      }
                    />
                  </Box>
                  
                  {/* Date and Tags Display */}
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', width: '100%' }}>
                    {task.dueDate && (
                      <Chip
                        icon={<CalendarTodayIcon />}
                        label={new Date(task.dueDate).toLocaleDateString()}
                        size="small"
                        variant="outlined"
                      />
                    )}
                    {task.tags && task.tags.length > 0 && (
                      <>
                        {task.tags.map((tag, tagIndex) => (
                          <Chip
                            key={tagIndex}
                            icon={<LocalOfferIcon />}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </>
                    )}
                  </Box>
                </ListItem>
                {index < sortedTasks.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              No tasks found
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
