import { Box, Grid } from '@mui/material';
import AddTaskForm from './AddTaskForm';
import StatsSection from './StatsSection';
import TaskSection from './TaskSection';

export default function DashboardApp({ tasks, onAddTask , onTaskSelect}) {
  const stats = [
    { label: 'Total Tasks', count: tasks.length || 0, color: '#dfd21dff' },
    { label: 'In Progress', count: tasks.filter(t => t.status === 'in-progress').length || 0, color: '#ed6c02' },
    { label: 'Completed', count: tasks.filter(t => t.status === 'completed').length || 0, color: '#2e7d32' },
    { label: 'To Do', count: tasks.filter(t => t.status === 'todo').length || 0, color: '#1976d2' },
  ];

  const taskSections = [
    { title: 'To Do', status: 'todo', color: '#1976d2' },
    { title: 'In Progress', status: 'in-progress', color: '#ed6c02' },
    { title: 'Completed', status: 'completed', color: '#2e7d32' },
  ];

  const getRecentTasks = (status) => tasks.filter(t => t.status === status).slice(0, 3);

  return (
    <Box sx={{ p: 3, margin: '0 auto', maxWidth: 1200 }}>
      <StatsSection stats={stats} />
      
      <AddTaskForm onAddTask={onAddTask} />

      <Grid container spacing={3}>
        {taskSections.map(({ title, status, color }) => (
          <Grid item xs={12} md={4} key={status}>
            <TaskSection 
              title={title}
              status={status}
              color={color}
              tasks={getRecentTasks(status)}
              onTaskSelect={onTaskSelect}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}