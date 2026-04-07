import { AppBar, Box, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DetailsIcon from '@mui/icons-material/Details';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useState } from 'react';

export default function Header({ title, onChange, darkMode, onToggleDarkMode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { label: 'Home', value: 'home', icon: <HomeIcon /> },
    { label: 'All Tasks', value: 'all', icon: <FormatListBulletedIcon /> },
    { label: 'To Do', value: 'todo', icon: <ListAltIcon /> },
    { label: 'In Progress', value: 'in-progress', icon: <PendingActionsIcon /> },
    { label: 'Completed', value: 'completed', icon: <DoneAllIcon /> },
    { label: 'Task Detail', value: 'task-detail', icon: <DetailsIcon /> },
  ];

  const handleMenuClick = (value) => {
    onChange && onChange(value);
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#324f6bff' }} elevation={10}>
        <Toolbar sx={{ position: 'relative', justifyContent: 'space-between' }}>
          {/* Hamburger Menu - Visible on small screens */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo - Centered */}
          <Box
            onClick={() => handleMenuClick('home')}
            sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, justifyContent: 'center' }}
          >
            <TaskAltIcon sx={{ fontSize: '28px' }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                fontFamily: 'monospace',
              }}
            >
              {title}
            </Typography>
          </Box>

          {/* Placeholder for right side balance */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, width: 40 }} />

          {/* Dark Mode Toggle - Visible on all screens */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="toggle dark mode"
            onClick={onToggleDarkMode}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer Menu */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 280 }} role="presentation">
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <TaskAltIcon sx={{ fontSize: '24px' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          </Box>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.value}
                button
                onClick={() => handleMenuClick(item.value)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <Divider sx={{ my: 1 }} />
            <ListItem
              button
              onClick={() => {
                onToggleDarkMode();
                setDrawerOpen(false);
              }}
            >
              <ListItemIcon>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </ListItemIcon>
              <ListItemText primary={darkMode ? 'Light Mode' : 'Dark Mode'} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
