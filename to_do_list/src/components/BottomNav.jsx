import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import HomeIcon from '@mui/icons-material/Home';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DetailsIcon from '@mui/icons-material/Details';
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function BottomNav({ value, onChange }) {
  const icons = [
    { label: 'Home', value: 'home', icon: <HomeIcon /> },
    { label: 'All Tasks', value: 'all', icon: <FormatListBulletedIcon /> },
    { label: 'To Do', value: 'todo', icon: <ListAltIcon /> },
    { label: 'In progress', value: 'in-progress', icon: <PendingActionsIcon /> },
    { label: 'Completed', value: 'completed', icon: <DoneAllIcon /> },
    { label: 'Task Detail', value: 'task-detail', icon: <DetailsIcon /> },
  ];

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, display: { xs: 'none', sm: 'block' } }} elevation={5}>
      <BottomNavigation 
        value={value} 
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
      >
        {icons.map((item) => (
          <BottomNavigationAction key={item.value} label={item.label} value={item.value} icon={item.icon} />
        ))}
      </BottomNavigation>
    </Paper>
  );
}