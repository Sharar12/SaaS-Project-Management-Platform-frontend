# OrbitFlow SaaS Platform — End-to-End QA Test Checklist

Use this checklist to verify features, visual states, user interactions, and backend data persistence across all routes of the platform.

**Legend:**
- `[ ]` Untested / Pending
- `[x]` Passed (Tick)
- `[-]` Failed / Bug Found (Cross)

---

## 1. Global Shell & Navigation (All Pages)

| ID | Test Scenario | Steps to Reproduce | Expected Result | Status | Notes |
|---|---|---|---|:---:|---|
| GS-01 | **Workspace Dropdown** | Click the workspace switcher dropdown in the sidebar. | Displays available workspaces (`OrbitTech Product`, `Nova Creative Studio`). | `[ ]` | |
| GS-02 | **Workspace Switching** | Select "Nova Creative Studio" from the dropdown. | Active workspace switches instantly; projects, tasks, and KPI metrics re-scope to the chosen workspace. | `[ ]` | |
| GS-03 | **Active Route Indicator** | Click through each sidebar link (`Overview`, `Projects`, `Kanban Board`, `Task List`, etc.). | The active page link is highlighted with an active pill background/indigo indicator. | `[ ]` | |
| GS-04 | **Global Search** | Type a task title, code, or tag into the top search bar. | Filtered results update dynamically across task-dependent views. Clear button resets search. | `[ ]` | |
| GS-05 | **Global "New Task" Button** | Click the `+ New Task` button in the top navigation bar. | Opens the Create Task modal regardless of what page you are currently viewing. | `[ ]` | |
| GS-06 | **Activity Drawer / Notifications** | Click the bell notification icon in the top header. | Drawer or badge opens showing the recent activity log trail with timestamps. | `[ ]` | |
| GS-07 | **Toast System** | Trigger any create, update, or delete action. | A toast pops up on the bottom-right confirming the action and automatically dismisses after ~3 seconds. | `[ ]` | |

---

## 2. Overview / Dashboard (`/`)

| ID | Test Scenario | Steps to Reproduce | Expected Result | Status | Notes |
|---|---|---|---|:---:|---|
| OV-01 | **Workspace Header** | Open `http://localhost:3000/`. | Displays `{Workspace Name} Overview` header and description text. | `[ ]` | |
| OV-02 | **KPI Cards Accuracy** | Verify KPI numbers (`Active Projects`, `In Progress`, `Completion Rate`, `Team Capacity`). | Stat cards match actual count of seeded/created projects and tasks. | `[ ]` | |
| OV-03 | **Quick Action "Open Board"** | Click the `Open Board →` button in the header. | Navigates to `/board`. | `[ ]` | |
| OV-04 | **Quick Action "Add Deliverable"** | Click `+ Add Deliverable`. | Opens the Create Task modal pre-filled with the current workspace. | `[ ]` | |
| OV-05 | **Project Progress Widget** | Check the project list with percentage progress bars. | Displays active projects with accurate progress bar percentages calculated from completed vs total tasks. | `[ ]` | |
| OV-06 | **Recent Activity Stream** | Review the timeline list of recent actions. | Displays recent actions (e.g. task completed, member assigned) with initials avatar and actor name. | `[ ]` | |

---

## 3. Projects (`/projects`)

| ID | Test Scenario | Steps to Reproduce | Expected Result | Status | Notes |
|---|---|---|---|:---:|---|
| PR-01 | **Project List Rendering** | Navigate to `/projects`. | Lists all projects for the active workspace with project keys, dates, and lead avatars. | `[ ]` | |
| PR-02 | **Create Project Modal** | Click `+ New Project`. | Modal opens with fields: Project Key, Name, Description, Status, Lead, Start & Due Dates, Color, and Tags. | `[ ]` | |
| PR-03 | **Create Project Submission** | Fill in valid details and click "Create Project". | Modal closes; new project appears immediately in the list; saved to backend. | `[ ]` | |
| PR-04 | **Project Filter by Status** | Switch status filters (e.g., `All`, `Active`, `Planning`, `Completed`). | Projects filter accordingly without page reload. | `[ ]` | |
| PR-05 | **Empty State** | Switch to a workspace with 0 projects or search for a non-existent name. | Displays friendly Empty State illustration and CTA to create the first project. | `[ ]` | |

---

## 4. Kanban Board (`/board`)

| ID | Test Scenario | Steps to Reproduce | Expected Result | Status | Notes |
|---|---|---|---|:---:|---|
| KB-01 | **Kanban Columns** | Navigate to `/board`. | 4 columns render: `To Do`, `In Progress`, `In Review`, `Done` with badge counts. | `[ ]` | |
| KB-02 | **Task Card Details** | Inspect any task card on the board. | Card displays task code, title, priority badge, tags, assignee avatar, and due date. | `[ ]` | |
| KB-03 | **Open Task Details** | Click on a task card. | Right-side Task Detail Drawer slides in smoothly with full task data. | `[ ]` | |
| KB-04 | **Status Transition via Detail Drawer** | Change the task status in the drawer (e.g., from `To Do` to `In Progress`). | Card moves to the new column immediately and database is updated. | `[ ]` | |
| KB-05 | **Add Task from Column Header** | Click `+` on any Kanban column header. | Create Task modal opens with status pre-selected to that column. | `[ ]` | |

---

## 5. Task List (`/tasks`)

| ID | Test Scenario | Steps to Reproduce | Expected Result | Status | Notes |
|---|---|---|---|:---:|---|
| TL-01 | **Table View Rendering** | Navigate to `/tasks`. | Renders full table view with columns: Code, Title, Project, Status, Priority, Assignee, Due Date. | `[ ]` | |
| TL-02 | **Search & Filter in List** | Use list search or status dropdown filter. | Rows filter dynamically without layout shifts. | `[ ]` | |
| TL-03 | **Row Click to Inspect** | Click on any row in the table. | Opens the Task Detail Drawer for that specific task. | `[ ]` | |
| TL-04 | **Sort Order** | Click column headers (e.g., Due Date, Priority). | Table sorts in ascending/descending order. | `[ ]` | |

---

## 6. Task Detail Drawer (Slide-Over Panel)

| ID | Test Scenario | Steps to Reproduce | Expected Result | Status | Notes |
|---|---|---|---|:---:|---|
| TD-01 | **Subtasks Checklist** | Click on a subtask checkbox inside the drawer. | Checkbox toggles strikethrough; progress updates and persists. | `[ ]` | |
| TD-02 | **Add Comment** | Type a message into the comment box and click Send / Submit. | Comment appears immediately in the comment thread with current user timestamp. | `[ ]` | |
| TD-03 | **Edit Task Properties** | Change priority, due date, or estimated hours in the drawer. | Auto-saves changes or saves on blur; updates the card in background. | `[ ]` | |
| TD-04 | **Delete Task** | Click "Delete Task" with confirmation. | Task is removed from state and database; drawer closes; toast confirms deletion. | `[ ]` | |
| TD-05 | **Close Drawer** | Click the backdrop or the `✕` close button. | Drawer closes smoothly. | `[ ]` | |

---

## 7. Timeline / Gantt (`/timeline`)

| ID | Test Scenario | Steps to Reproduce | Expected Result | Status | Notes |
|---|---|---|---|:---:|---|
| TM-01 | **Timeline View Rendering** | Navigate to `/timeline`. | Tasks and initiatives are plotted across date ranges and months. | `[ ]` | |
| TM-02 | **Time Horizon Switch** | Switch between view modes (Weeks / Months / Quarters). | Timeline scale updates correctly. | `[ ]` | |
| TM-03 | **Task Bar Click** | Click on a horizontal task timeline bar. | Opens the Task Detail Drawer for quick inspection. | `[ ]` | |

---

## 8. Team & Roles (`/team`)

| ID | Test Scenario | Steps to Reproduce | Expected Result | Status | Notes |
|---|---|---|---|:---:|---|
| TR-01 | **Member List Rendering** | Navigate to `/team`. | Displays all team members of the workspace with Avatar initials, email, role badge, and status indicator. | `[ ]` | |
| TR-02 | **Invite Member Modal** | Click `+ Invite Member`. | Modal opens with fields for Full Name, Email Address, Job Title, and Role (`Owner`, `Admin`, `Member`, `Viewer`). | `[ ]` | |
| TR-03 | **Invite Member Submit** | Fill valid details and submit. | New member is added with generated initials and palette avatar; persists to backend. | `[ ]` | |
| TR-04 | **Change Member Role** | Change a member's role from `Member` to `Admin` in the dropdown. | Role badge updates; persists to backend. | `[ ]` | |

---

## 9. Settings (`/settings`)

| ID | Test Scenario | Steps to Reproduce | Expected Result | Status | Notes |
|---|---|---|---|:---:|---|
| ST-01 | **Workspace Details Form** | Navigate to `/settings`. | Workspace Name, Industry, Plan, and Brand Accent Color display current settings. | `[ ]` | |
| ST-02 | **Save Settings** | Modify Workspace Name and Accent Color, then click "Save Changes". | Workspace updates in the sidebar and top switcher; database reflects change. | `[ ]` | |
| ST-03 | **API Status Card** | Review the API Mode indicator card. | Shows `API Mode: REAL (MySQL saas_db)` connected to `http://127.0.0.1:8000/api/v1`. | `[ ]` | |
| ST-04 | **Reset Database Button** | Click "Reset Database" button. | Database re-seeds with clean demo data; displays confirmation toast; views refresh. | `[ ]` | |

---

## 10. Authentication & Security Routes (`/login` & `/register`)

| ID | Test Scenario | Steps to Reproduce | Expected Result | Status | Notes |
|---|---|---|---|:---:|---|
| AU-01 | **Login Page UI** | Navigate to `/login`. | Clean login card with email, password, and sign-in button renders without errors. | `[ ]` | |
| AU-02 | **Register Page UI** | Navigate to `/register`. | Account creation form with name, email, password, and workspace setup renders properly. | `[ ]` | |
| AU-03 | **Navigation Link** | Click "Create an account" on login page (and vice versa). | Smooth routing between `/login` and `/register`. | `[ ]` | |

---

## 11. Backend API & Database Persistence (MySQL `saas_db`)

| ID | Test Scenario | Steps to Reproduce | Expected Result | Status | Notes |
|---|---|---|---|:---:|---|
| BE-01 | **Health Check** | Open `http://127.0.0.1:8000/up`. | Returns HTTP 200 health check response. | `[ ]` | |
| BE-02 | **Bundle API Endpoint** | Send `GET http://127.0.0.1:8000/api/v1/bundle`. | Returns JSON with `workspaces`, `projects`, `tasks`, `members`, and `activities`. | `[ ]` | |
| BE-03 | **CORS Configuration** | Inspect network headers on requests from `http://localhost:3000`. | Access-Control-Allow-Origin allows `http://localhost:3000` with credential support. | `[ ]` | |
| BE-04 | **Database Persistence Check** | Refresh page in browser after creating a task or changing a role. | Data remains intact and does not disappear on reload. | `[ ]` | |

---

## Test Execution Summary

- **Total Test Cases:** 42
- **Passed (`[x]`):** 0
- **Failed (`[-]`):** 0
- **Pending (`[ ]`):** 42
- **Tester:** ___________________
- **Date Tested:** ___________________
