import { DashboardApp, AllTasksApp, TaskList, TaskDetailApp } from './index';

export default function AppContent({
  activeTab,
  tasks,
  selectedTaskId,
  onAddTask,
  onTaskSelect,
  onUpdateTask,
  onDeleteTask,
  onBack,
  onChangeTab
}) {
  const getTaskForDetail = () => {
    return selectedTaskId !== null ? tasks.find(t => t.id === selectedTaskId) : null;
  };

  const handleTaskSelect = (taskId) => {
    onTaskSelect(taskId);
    onChangeTab('task-detail');
  };

  const handleBack = () => {
    onChangeTab('all');
  };

  const handleDelete = () => {
    onDeleteTask(selectedTaskId);
    onBack();
    onChangeTab('all');
  };

  switch (activeTab) {
    case 'home':
      return (
        <DashboardApp
          tasks={tasks}
          onAddTask={onAddTask}
          onTaskSelect={handleTaskSelect}
        />
      );

    case 'all':
      return (
        <AllTasksApp
          tasks={tasks}
          onTaskSelect={handleTaskSelect}
        />
      );

    case 'task-detail':
      return (
        <TaskDetailApp
          task={getTaskForDetail()}
          onBack={handleBack}
          onUpdate={onUpdateTask}
          onDelete={handleDelete}
          allTasks={tasks}
        />
      );

    case 'completed':
      return (
        <TaskList
          type="completed"
          title="Completed Tasks"
          tasks={tasks.filter(t => t.status === 'completed')}
          onTaskSelect={handleTaskSelect}
        />
      );

    case 'in-progress':
      return (
        <TaskList
          type="in-progress"
          title="In Progress"
          tasks={tasks.filter(t => t.status === 'in-progress')}
          onTaskSelect={handleTaskSelect}
        />
      );

    case 'todo':
      return (
        <TaskList
          type="todo"
          title="To Do Tasks"
          tasks={tasks.filter(t => t.status === 'todo')}
          onTaskSelect={handleTaskSelect}
        />
      );

    default:
      return (
        <DashboardApp
          tasks={tasks}
          onAddTask={onAddTask}
          onTaskSelect={handleTaskSelect}
        />
      );
  }
}
