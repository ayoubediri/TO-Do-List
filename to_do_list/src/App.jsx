import { CssBaseline, Box, ThemeProvider } from "@mui/material"
import { Header, BottomNav, AppContent } from "./components";
import { useState, useEffect } from "react"
import { lightTheme, darkTheme } from "./theme";

function App() 
{
  const [tasks, setTasks] = useState(() => 
    {
      const savedTasks = localStorage.getItem('todo_tasks');
      if (savedTasks) {
        try {
          return JSON.parse(savedTasks);
        } catch (e) {
          console.error("Failed to parse tasks from localStorage", e);
        }
      }
      return [];
    });
  
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (title, status, endTime, tags, content) =>
  {  
    const newTask=
    { 
      id: crypto.randomUUID(),
      creationTime: new Date().toISOString(),
      lastEditedTime: new Date().toISOString(),
      title : title || 'Untitled Task',
      status: status || 'todo',
      content : content || 'no details provided',
      endTime: endTime || null,
      tags: tags ? tags.split(',').map(t => t.trim()).filter(t => t) : []
    };
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header 
        title="TO DO LIST" 
        onChange={setActiveTab}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />
      <Box sx={{ pb: { xs: 2, sm: 10 } }}>
        <AppContent
          activeTab={activeTab}
          tasks={tasks}
          selectedTaskId={selectedTaskId}
          onAddTask={handleAddTask}
          onTaskSelect={setSelectedTaskId}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onBack={() => setSelectedTaskId(null)}
          onChangeTab={setActiveTab}
        />
      </Box>
      <BottomNav value={activeTab} onChange={setActiveTab} />
    </ThemeProvider>
  );
}

export default App;
