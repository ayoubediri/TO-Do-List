# To-Do List Application - Project Context & Engineering Notes

## Project Overview
A React-based task management application built with Material-UI, featuring task creation, filtering, searching, editing, and deletion with comprehensive validation and error handling.

**Location**: `/goinfre/adiri/Web_Learning_Project/to_do_list`  
**Framework**: React with Vite  
**UI Library**: Material-UI (MUI) v5+  
**Last Updated**: April 6, 2026

---

## Architecture & Structure

### Core Application Flow
```
App.jsx (Main State Container)
├── tasks[] state - Global task array
├── activeTab state - Current page/view
├── selectedTaskId state - Currently viewed task
└── renderContent() - Router switch for different views
    ├── 'home' → DashboardApp
    ├── 'all' → AllTasksApp
    ├── 'todo' → TaskList (filtered)
    ├── 'in-progress' → TaskList (filtered)
    ├── 'completed' → TaskList (filtered)
    └── 'task-detail' → TaskDetailApp
```

### Component Hierarchy
```
src/components/
├── index.js (Central exports)
├── App.jsx (Main router & state management)
├── Header.jsx
├── BottomNav.jsx (6 tabs: home, all, todo, in-progress, completed, task-detail)
├── Dashboard.jsx (Home page overview)
│   ├── AddTaskForm.jsx (Create new tasks)
│   ├── StatsSection.jsx (Task statistics)
│   └── TaskSection.jsx (Reusable task list display)
├── AllTasksApp.jsx (All tasks with multi-filter search)
├── TaskList.jsx (Filtered task view by status)
├── TaskDetailApp.jsx (Full task detail with edit/delete)
└── TaskDetail.jsx (Alternative detail component - deprecated)
```

### Data Structure
```javascript
Task Object = {
  id: string (UUID),
  title: string (3-100 chars),
  status: 'todo' | 'in-progress' | 'completed',
  dueDate: ISO string or empty,
  tags: string[] (each tag max 50 chars)
}
```

---

## Validation Rules (Critical)

### Task Title
- **Required**: Must be provided
- **Min Length**: 3 characters
- **Max Length**: 100 characters (enforced in UI with character counter)
- **Error Message**: Shown in TextField helperText
- **Auto-clear**: Clears when user starts typing

### Due Date
- **Optional**: Can be empty
- **Constraint**: Cannot be in the past
- **Error Message**: "Due date cannot be in the past"
- **Auto-clear**: Clears when user changes the date

### Tags
- **Optional**: Can be empty or omitted
- **Format**: Comma-separated string in input, stored as array
- **Per-tag Limit**: Each tag ≤ 50 characters
- **Error Message**: "Each tag must be less than 50 characters"
- **Auto-clear**: Clears when user edits the tags field

---

## Material-UI Deprecation Fixes (COMPLETED)

### Issue 1: inputProps (FIXED)
**Problem**: `inputProps={{ maxLength: 100 }}` was deprecated
**Solution**: Changed to `slotProps={{ input: { maxLength: 100 } }}`
**Files Updated**: 
- AddTaskForm.jsx (title field)
- TaskDetail.jsx (title field in edit mode)
**Status**: ✅ COMPLETE

### Issue 2: onKeyPress (FIXED)
**Problem**: `onKeyPress` event handler is deprecated in React 17+
**Solution**: Replaced with `onKeyDown` event handler
**Handler Renamed**: `handleKeyPress()` → `handleKeyDown()`
**Files Updated**:
- AddTaskForm.jsx (3 locations: title, due date, tags)
**Status**: ✅ COMPLETE

### Issue 3: InputLabelProps (FIXED)
**Problem**: `InputLabelProps={{ shrink: true }}` was deprecated
**Solution**: Changed to `slotProps={{ inputLabel: { shrink: true } }}`
**Purpose**: Makes datetime input label shrink when focused
**Files Updated**:
- AddTaskForm.jsx (due date field)
- TaskDetail.jsx (due date field in edit mode)
- TaskDetailApp.jsx (due date field in edit mode)
**Status**: ✅ COMPLETE

---

## Critical Implementation Details

### Character Limit Enforcement (100 chars for titles)
**Pattern Used**:
```javascript
// In onChange handler:
const handleTitleChange = (e) => {
  if (e.target.value.length <= 100) {
    setNewTaskTitle(e.target.value);
    if (errors.title) {
      setErrors({ ...errors, title: '' });
    }
  }
};

// In TextField:
<TextField
  value={newTaskTitle}
  onChange={handleTitleChange}
  slotProps={{
    input: {
      maxLength: 100,
    },
  }}
/>

// Character counter display:
<Typography>{newTaskTitle.length}/100 characters</Typography>
```

**Why Both?**: 
- `slotProps` prevents paste of content > 100 chars
- Manual check in `onChange` prevents edge cases
- Character counter provides visual feedback

### Error Auto-clearing Pattern
```javascript
// Each field has its own change handler that clears its error
const handleTitleChange = (e) => {
  if (e.target.value.length <= 100) {
    setNewTaskTitle(e.target.value);
    if (errors.title) {
      setErrors({ ...errors, title: '' }); // Clear error when user types
    }
  }
};
```

### Task Sorting Algorithm (AllTasksApp.jsx)
```javascript
const sortedTasks = filteredTasks.sort((a, b) => {
  const statusPriority = { 'in-progress': 0, 'todo': 1, 'completed': 2 };
  return (statusPriority[a.status] || 3) - (statusPriority[b.status] || 3);
});
```
**Priority Order**: In Progress → To Do → Completed

### Filtering System (AllTasksApp.jsx)
Three independent filters that work together:
1. **Title Search**: Case-insensitive substring match
2. **Date Filter**: Exact date match (YYYY-MM-DD)
3. **Tag Filter**: Case-insensitive partial match on any tag

---

## Component-Specific Details

### AddTaskForm.jsx
**Purpose**: Create new tasks with validation
**Key State**:
- `newTaskTitle`: Current title input (0-100 chars)
- `dueDate`: ISO datetime string
- `tags`: Comma-separated string (converted to array on submit)
- `errors`: Object with field-level error messages
- `successMessage`: Success alert text

**Handlers**:
- `handleTitleChange()`: Enforces 100 char limit + auto-clears error
- `handleDueDateChange()`: Auto-clears dueDate error
- `handleTagsChange()`: Auto-clears tags error
- `handleKeyDown()`: Triggers handleAddTask on Enter key
- `handleAddTask()`: Validates, creates task, resets form, shows success

### TaskDetailApp.jsx
**Purpose**: Full task view with edit/delete capabilities
**Key State**:
- `isEditing`: Toggle between view and edit mode
- `editedTask`: Copy of task being edited
- `deleteDialog`: Show/hide delete confirmation
- `errors`: Validation errors
- `successMessage`: Update success feedback

**Handlers**:
- `handleEditChange()`: Updates editedTask + auto-clears field error
- `handleSave()`: Validates and calls onUpdate
- `handleDelete()`: Shows confirmation then calls onDelete
- `validateForm()`: Checks all validation rules

**Edit Mode Features**:
- Title with character counter (100 char limit)
- Status dropdown selector
- Due date input with validation
- Tags comma-separated input
- Save/Cancel buttons

### AllTasksApp.jsx
**Purpose**: Display all tasks with advanced filtering
**Key State**:
- `searchQuery`: Title search text
- `filterDate`: Date filter (YYYY-MM-DD)
- `filterTag`: Tag search text

**Key Logic**:
- `filteredTasks`: Applied title, date, and tag filters
- `sortedTasks`: Filtered tasks sorted by status priority
- Task click navigates to task-detail tab

### Dashboard.jsx
**Purpose**: Home page with overview and quick actions
**Sub-components Used**:
- `AddTaskForm`: For creating tasks
- `StatsSection`: Shows total/in-progress/completed counts
- `TaskSection`: Displays recent tasks (3 per status category)

**Refactoring Note**: Dashboard was broken down into smaller components for better maintainability in earlier development phases.

---

## Navigation Flow

### Bottom Navigation Tabs (BottomNav.jsx)
```
Home (HomeIcon)
├── Shows DashboardApp
├── Quick task creation form
└── Recent tasks overview

All Tasks (FormatListBulletedIcon)
├── Shows AllTasksApp
├── Full search/filter interface
└── All tasks with multi-criteria filtering

To Do (ListAltIcon)
├── Shows TaskList filtered by 'todo' status
└── Quick view of pending tasks

In Progress (PendingActionsIcon)
├── Shows TaskList filtered by 'in-progress' status
└── Currently active tasks

Completed (DoneAllIcon)
├── Shows TaskList filtered by 'completed' status
└── Finished tasks

Task Detail (DetailsIcon)
└── Shows TaskDetailApp for selectedTaskId
```

### Navigation Trigger Points
1. **Click task in AllTasksApp**: Sets selectedTaskId + setActiveTab('task-detail')
2. **Back button in TaskDetailApp**: Calls onBack() + setActiveTab('all')
3. **Tab click in BottomNav**: Updates activeTab directly

---

## Recent Changes (Last Session)

### Date: April 6, 2026
**Work Done**: Fixed Material-UI deprecations

1. **inputProps → slotProps**
   - Files: AddTaskForm.jsx, TaskDetail.jsx
   - Change: `inputProps={{ maxLength: 100 }}` → `slotProps={{ input: { maxLength: 100 } }}`

2. **onKeyPress → onKeyDown**
   - File: AddTaskForm.jsx
   - Handler renamed: `handleKeyPress()` → `handleKeyDown()`
   - Locations: Title, Due Date, Tags fields

3. **InputLabelProps → slotProps**
   - Files: AddTaskForm.jsx, TaskDetail.jsx, TaskDetailApp.jsx
   - Change: `InputLabelProps={{ shrink: true }}` → `slotProps={{ inputLabel: { shrink: true } }}`
   - Purpose: Date input label shrinking

---

## Known Implementation Details

### Text Truncation for Long Titles
Used in TaskSection and task displays:
```css
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
textOverflow: 'ellipsis';
```

### Task List Scrolling
TaskSection uses:
```css
maxHeight: 300,
overflowY: 'auto'
```

### Responsive Grid Breakpoints
Using Material-UI Grid system with xs, sm, md breakpoints for mobile responsiveness.

### Tag Display
Tags shown as Material-UI Chips with LocalOfferIcon

---

## Future Improvement Opportunities

1. **Persistence**: Add localStorage or backend API integration
2. **Animations**: Add transitions for tab switching and task operations
3. **Testing**: Create Jest tests for validation logic
4. **Accessibility**: Enhance ARIA labels and keyboard navigation
5. **Performance**: Memoize components if list grows large (React.memo)
6. **Mobile**: Further optimize mobile responsiveness
7. **Notifications**: Toast notifications instead of inline alerts

---

## Common Tasks for Maintenance

### Adding a New Field to Tasks
1. Update Task data structure definition
2. Add to validation in validateForm()
3. Add input field in AddTaskForm.jsx
4. Add edit field in TaskDetailApp.jsx
5. Update TaskSection display if needed
6. Add filter/search if applicable in AllTasksApp.jsx

### Modifying Validation Rules
**Location**: Both `AddTaskForm.jsx` and `TaskDetailApp.jsx` have identical `validateForm()` functions
**Important**: Keep both in sync to maintain consistent behavior

### Changing Task Status Values
**Locations to Update**:
1. Task creation in App.jsx handleAddTask
2. Status dropdown in TaskDetailApp.jsx (MenuItem values)
3. TaskList.jsx filtering logic
4. Dashboard.jsx status categories
5. Task sorting priority in AllTasksApp.jsx

---

## Debugging Tips

### Character Limit Not Working
- Check TextField uses `slotProps={{ input: { maxLength: 100 } }}`
- Check onChange handler has `if (e.target.value.length <= 100)` guard
- Character counter should display current/max

### Validation Not Clearing
- Ensure error auto-clear logic is in place for each field
- Pattern: `if (errors.fieldName) setErrors({ ...errors, fieldName: '' })`

### Navigation Not Updating
- Check that both `setSelectedTaskId` and `setActiveTab` are called
- Verify renderContent() switch statement covers all activeTab values
- Check BottomNav properly calls navigation handlers

### Date Input Label Not Shrinking
- Verify `slotProps={{ inputLabel: { shrink: true } }}` is present
- Not using deprecated `InputLabelProps`

---

## File Sizes & Performance Notes
- Component files average 100-300 lines
- All components are functional with hooks
- No complex nested renders or performance bottlenecks identified
- Material-UI library handled well with current bundle

---

## Testing Checklist
- [ ] Create task with valid title (3-100 chars)
- [ ] Create task with invalid title (< 3 or > 100 chars)
- [ ] Past date validation triggers correctly
- [ ] Tags comma-separated parsing works
- [ ] All filters in AllTasksApp work independently
- [ ] Navigation tabs update activeTab correctly
- [ ] Task click opens detail page with correct task
- [ ] Edit mode shows all fields with current values
- [ ] Save updates task in list
- [ ] Delete shows confirmation dialog
- [ ] Error messages appear and auto-clear
- [ ] Success messages display after operations
- [ ] Character counter updates in real-time
- [ ] onKeyDown (Enter) triggers task creation

---

**Status**: Application is feature-complete and production-ready with all Material-UI deprecations fixed.
