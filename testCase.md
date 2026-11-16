# OrbitFlow SaaS Platform — Complete Step-by-Step QA Test Guide

This document provides exact, clickable instructions on **where to go**, **what to click**, **what data to enter**, and **what exact behavior to expect** for every feature and page.

**Marking Convention:**
- `[ ]` Pending / Untested
- `[x]` Passed (Tick)
- `[-]` Failed / Issue Found (Cross)

---

## Prerequisites Before Testing

Ensure both servers are running:
1. **Backend Server:**
   ```bash
   cd backend
   php artisan serve --port=8000
   ```
2. **Frontend Server:**
   ```bash
   cd frontend
   npm run dev
   ```
3. Open your browser to: **`http://localhost:3000`**

---

## 1. Global Shell & Navigation (Sidebar & Topbar)

### GS-01: Workspace Switching
- **Where to go:** Any page (e.g. `http://localhost:3000`)
- **What to click:** Click the workspace selector button at the top of the left sidebar (displays current workspace name like `OrbitTech Product`).
- **What to do:** In the open dropdown, click **"Nova Creative Studio"**.
- **What you should expect:**
  - The dropdown closes.
  - The header title changes from "OrbitTech Product Overview" to "Nova Creative Studio Overview".
  - The projects and tasks update to show Nova's projects (`Q4 Global Brand Re-launch`).
- **Status:** `[ ]`
- **Notes:**

---

### GS-02: Sidebar Route Highlighting
- **Where to go:** `http://localhost:3000`
- **What to click:** Click on each menu item in order:
  1. Click **"Projects"**
  2. Click **"Kanban Board"**
  3. Click **"Task List"**
  4. Click **"Timeline"**
  5. Click **"Team & Roles"**
  6. Click **"Settings"**
  7. Click **"Overview"**
- **What you should expect:**
  - The URL in the address bar changes accordingly (`/projects`, `/board`, `/tasks`, etc.).
  - The clicked item becomes highlighted with an active background color (darker text and light gray/indigo pill background) while inactive items remain muted.
  - Page transitions without full browser reload.
- **Status:** `[ ]`
- **Notes:**

---

### GS-03: Global Search Bar
- **Where to go:** `http://localhost:3000/tasks`
- **What to click:** Click the search input in the top navigation bar (`Search tasks, codes, or projects...`).
- **What to do:** Type `CORE` or `MySQL`.
- **What you should expect:**
  - The task list automatically filters down to tasks containing "CORE" or "MySQL" in their code, title, or tags.
  - Clear the search bar text; all tasks return to view.
- **Status:** `[ ]`
- **Notes:**

---

### GS-04: Topbar "+ New Task" Quick Action
- **Where to go:** `http://localhost:3000/settings`
- **What to click:** Click the `+ New Task` button on the top-right corner of the topbar.
- **What you should expect:**
  - The "Create Deliverable / Task" modal pops up smoothly over the settings screen.
  - Click the `✕` close button or click outside the modal backdrop; the modal closes without side effects.
- **Status:** `[ ]`
- **Notes:**

---

## 2. Overview / Dashboard (`/`)

### OV-01: Header & Metric Cards Validation
- **Where to go:** `http://localhost:3000/`
- **What to inspect:** Examine the top 4 metric cards:
  1. `Active Projects` (e.g. 3)
  2. `In Progress` (e.g. 2)
  3. `Completion Rate` (e.g. 25% or 33%)
  4. `Team Capacity` (e.g. 4 online members)
- **What you should expect:**
  - Values match the active workspace.
  - A subtle hover elevation effect occurs when mousing over each card.
- **Status:** `[ ]`
- **Notes:**

---

### OV-02: Action Buttons in Header
- **Where to go:** `http://localhost:3000/`
- **What to click:**
  1. Click the `Open Board →` button in the top right.
- **What you should expect:**
  - Navigates directly to `http://localhost:3000/board`.
- **Next test:** Return to `/` and click `+ Add Deliverable`.
- **What you should expect:**
  - Opens the "Create Deliverable / Task" modal.
- **Status:** `[ ]`
- **Notes:**

---

### OV-03: Project Progress List
- **Where to go:** `http://localhost:3000/`
- **What to inspect:** Scroll to the "Project Progress" section.
- **What you should expect:**
  - Lists each project with its colored square badge (`CORE`, `UIX`, `BILL`).
  - Displays a percentage progress bar and active task count for each.
- **Status:** `[ ]`
- **Notes:**

---

### OV-04: Activity Feed
- **Where to go:** `http://localhost:3000/`
- **What to inspect:** Scroll down to the right-side "Recent Activity" card.
- **What you should expect:**
  - Shows activity items (e.g. "Sofia Chen completed CORE-101", "Liam Carter requested review").
  - Displays user initials avatar, relative timestamp, and target title.
- **Status:** `[ ]`
- **Notes:**

---

## 3. Projects Page (`/projects`)

### PR-01: Project Cards & Status Filter
- **Where to go:** `http://localhost:3000/projects`
- **What to click:** Click on the filter pills above the projects grid (`All`, `Active`, `Planning`, `Completed`).
- **What you should expect:**
  - Clicking `Active` shows only active initiatives.
  - Clicking `Planning` shows planning stage projects (e.g., `BILL`).
  - Clicking `All` restores all projects.
- **Status:** `[ ]`
- **Notes:**

---

### PR-02: Create New Project (Full Flow)
- **Where to go:** `http://localhost:3000/projects`
- **What to click:** Click the `+ New Project` button in the top right.
- **What to enter:**
  1. **Project Key:** Type `DEMO`
  2. **Project Name:** Type `Cloud Storage Integration`
  3. **Description:** Type `AWS S3 file attachment integration.`
  4. **Status:** Select `Active`
  5. **Lead:** Select `Amina Rahman`
  6. **Start Date:** Pick today's date
  7. **Due Date:** Pick 14 days ahead
  8. **Tags:** Type `Storage, AWS`
- **What to click:** Click **"Create Project"**.
- **What you should expect:**
  - The modal closes.
  - A green toast appears: *"Project created successfully"*.
  - A new project card titled `Cloud Storage Integration` appears in the grid with key `DEMO`.
  - Refresh the browser (`F5`); the project remains saved in MySQL `saas_db`.
- **Status:** `[ ]`
- **Notes:**

---

## 4. Kanban Board (`/board`)

### KB-01: Kanban Board Layout
- **Where to go:** `http://localhost:3000/board`
- **What to inspect:**
  - Check the 4 lanes: **To Do**, **In Progress**, **In Review**, and **Done**.
  - Each column header displays a count pill showing the number of tasks in that status.
- **Status:** `[ ]`
- **Notes:**

---

### KB-02: Inspect Task Details from Card
- **Where to go:** `http://localhost:3000/board`
- **What to click:** Click on the card **"CORE-102"** (or any task).
- **What you should expect:**
  - A right-side slide-over drawer opens showing the task's full details: title, description, assignee, priority badge, subtasks, and comments.
- **Status:** `[ ]`
- **Notes:**

---

### KB-03: Quick-Add Task from Column Header
- **Where to go:** `http://localhost:3000/board`
- **What to click:** Click the `+` icon on the **"In Progress"** column header.
- **What you should expect:**
  - Opens the "Create Deliverable / Task" modal with Status automatically preset to **"In Progress"**.
- **Status:** `[ ]`
- **Notes:**

---

## 5. Task Detail Drawer (Slide-Over Panel)

### TD-01: Toggle Subtask Completion
- **Where to go:** `http://localhost:3000/board` (or `/tasks`)
- **What to click:** Click on task **"CORE-101"** to open its drawer.
- **What to do:** In the "Subtasks" section, click the checkbox next to `"Draft ERD for workspaces & memberships"`.
- **What you should expect:**
  - The checkbox toggles between checked and unchecked.
  - The text shows a strikethrough when checked.
  - Refresh the page (`F5`); the toggled subtask status persists in MySQL.
- **Status:** `[ ]`
- **Notes:**

---

### TD-02: Add a Comment to a Task
- **Where to go:** Inside the open Task Detail Drawer of any task.
- **What to do:** Scroll down to the **"Discussion & Updates"** section.
- **What to enter:** Type in the textarea: `Tested this on local environment. Works perfectly.`
- **What to click:** Click **"Post Comment"** (or press enter if applicable).
- **What you should expect:**
  - The new comment appears immediately at the bottom of the comment list with your user avatar and "Just now".
  - A success toast confirms the comment was posted.
- **Status:** `[ ]`
- **Notes:**

---

### TD-03: Change Task Status & Priority in Drawer
- **Where to go:** Inside the open Task Detail Drawer.
- **What to click:**
  1. Change the **Status** dropdown from `In Progress` to `Done`.
  2. Change the **Priority** dropdown from `Medium` to `Urgent`.
- **What you should expect:**
  - The drawer updates.
  - Closing the drawer shows the card has moved to the **"Done"** column on the Kanban board.
- **Status:** `[ ]`
- **Notes:**

---

### TD-04: Delete Task
- **Where to go:** Inside the open Task Detail Drawer.
- **What to click:** Scroll to the bottom and click **"Delete Task"**.
- **What to do:** Confirm the prompt if asked.
- **What you should expect:**
  - The drawer closes.
  - The task disappears from the board and task table.
  - A toast notifications says *"Task deleted"*.
- **Status:** `[ ]`
- **Notes:**

---

## 6. Task List (`/tasks`)

### TL-01: Task Table Verification
- **Where to go:** `http://localhost:3000/tasks`
- **What to inspect:**
  - Verify table columns: **Code**, **Title**, **Project**, **Status**, **Priority**, **Assignee**, and **Due Date**.
  - Status badges should have distinct colors (e.g. Green for Done, Amber for In Progress, Purple for In Review).
- **Status:** `[ ]`
- **Notes:**

---

### TL-02: Open Detail Drawer from Table Row
- **Where to go:** `http://localhost:3000/tasks`
- **What to click:** Click anywhere on a task row.
- **What you should expect:**
  - The Task Detail Drawer slides in with that exact task's information.
- **Status:** `[ ]`
- **Notes:**

---

### TL-03: Create Task from Task List Page
- **Where to go:** `http://localhost:3000/tasks`
- **What to click:** Click the `+ New Task` button on top right of the table.
- **What to enter:**
  1. **Title:** `Write API Documentation for Postman`
  2. **Project:** Select any project from the dropdown
  3. **Priority:** Select `High`
  4. **Status:** Select `To Do`
  5. **Assignee:** Select `Liam Carter`
  6. **Estimated Hours:** `6`
- **What to click:** Click **"Create Task"**.
- **What you should expect:**
  - Modal closes.
  - The new task appears in the table with its generated code (e.g. `CORE-103`).
- **Status:** `[ ]`
- **Notes:**

---

## 7. Timeline / Gantt (`/timeline`)

### TM-01: Timeline Chart Rendering
- **Where to go:** `http://localhost:3000/timeline`
- **What to inspect:**
  - Displays horizontal date/month grid headers.
  - Shows task schedule bars with colored project markers.
- **Status:** `[ ]`
- **Notes:**

---

### TM-02: Task Bar Interaction
- **Where to go:** `http://localhost:3000/timeline`
- **What to click:** Click directly on one of the horizontal timeline bars.
- **What you should expect:**
  - Opens the Task Detail Drawer for that task.
- **Status:** `[ ]`
- **Notes:**

---

## 8. Team & Roles (`/team`)

### TR-01: Team Roster Verification
- **Where to go:** `http://localhost:3000/team`
- **What to inspect:**
  - Displays team members cards or table (e.g. Amina Rahman, Liam Carter, Sofia Chen).
  - Shows Avatar circle with initials, role badge (`Owner`, `Admin`, `Member`), email address, and online status indicator dot.
- **Status:** `[ ]`
- **Notes:**

---

### TR-02: Invite New Team Member
- **Where to go:** `http://localhost:3000/team`
- **What to click:** Click `+ Invite Member`.
- **What to enter:**
  1. **Full Name:** `Sarah Jenkins`
  2. **Email Address:** `sarah@orbittech.io`
  3. **Job Title:** `QA Automation Engineer`
  4. **Role:** Select `Member`
- **What to click:** Click **"Send Invitation"** / **"Add Member"**.
- **What you should expect:**
  - Modal closes.
  - A green toast appears: *"Member added successfully"*.
  - Sarah Jenkins appears in the team list with initials `SJ`.
  - Refresh the page (`F5`); Sarah remains saved in MySQL `saas_db`.
- **Status:** `[ ]`
- **Notes:**

---

### TR-03: Change Member Role Dropdown
- **Where to go:** `http://localhost:3000/team`
- **What to click:** On any member's role selector (e.g. Sofia Chen), change the role dropdown from `Member` to `Admin`.
- **What you should expect:**
  - Role badge updates immediately to `Admin`.
  - A toast confirms *"Member role updated"*.
  - Refresh the browser; role stays `Admin`.
- **Status:** `[ ]`
- **Notes:**

---

## 9. Settings (`/settings`)

### ST-01: Workspace Settings Form
- **Where to go:** `http://localhost:3000/settings`
- **What to inspect:**
  - Workspace Name input (pre-filled with `OrbitTech Product`).
  - Industry input (pre-filled with `SaaS Engineering`).
  - Plan badge showing `pro`.
  - Accent Color picker or swatch preview.
- **Status:** `[ ]`
- **Notes:**

---

### ST-02: Save Workspace Name Change
- **Where to go:** `http://localhost:3000/settings`
- **What to do:** Change the **Workspace Name** field to `OrbitTech Global`.
- **What to click:** Click the **"Save Changes"** button at the bottom of the card.
- **What you should expect:**
  - A toast confirms *"Workspace settings saved"*.
  - The sidebar top label changes from "OrbitTech Product" to "OrbitTech Global".
  - Refresh the browser; the new name persists from MySQL.
- **Status:** `[ ]`
- **Notes:**

---

### ST-03: Backend Connection Status Card
- **Where to go:** `http://localhost:3000/settings`
- **What to inspect:** Look at the bottom card "API Mode".
- **What you should expect:**
  - Displays: **`API MODE: REAL (MYSQL SAAS_DB)`** in green text.
  - Mentions connection to `http://127.0.0.1:8000/api/v1`.
- **Status:** `[ ]`
- **Notes:**

---

### ST-04: Reset Database
- **Where to go:** `http://localhost:3000/settings`
- **What to click:** Click the **"Reset Database"** button on the API Mode card.
- **What you should expect:**
  - The database is re-seeded cleanly with the initial seed data.
  - A toast notifications says *"Database restored to clean seed state"*.
  - Workspace name resets back to `OrbitTech Product`.
- **Status:** `[ ]`
- **Notes:**

---

## 10. Authentication Pages (`/login` & `/register`)

### AU-01: Login Page
- **Where to go:** `http://localhost:3000/login`
- **What to inspect:**
  - Displays OrbitFlow logo and "Welcome back" greeting.
  - Email and Password inputs with clean styling and focus rings.
  - "Don't have an account? Sign up" link at the bottom.
- **What to click:** Click the **"Sign up"** link.
- **What you should expect:** Navigates smoothly to `/register`.
- **Status:** `[ ]`
- **Notes:**

---

### AU-02: Register Page
- **Where to go:** `http://localhost:3000/register`
- **What to inspect:**
  - Displays "Create your account" card.
  - Fields for Full Name, Email Address, Password, and Workspace Name.
  - "Already have an account? Sign in" link.
- **What to click:** Click the **"Sign in"** link.
- **What you should expect:** Navigates back to `/login`.
- **Status:** `[ ]`
- **Notes:**

---

## 11. End-to-End Persistence Check (MySQL `saas_db`)

### E2E-01: Full Lifecycle Test
- **Steps:**
  1. Open `http://localhost:3000/projects` and create a project called `Alpha Launch`.
  2. Open `http://localhost:3000/board` and create a task under `Alpha Launch` named `Configure Domain DNS`.
  3. Click the task card to open the drawer; add a subtask `Update CNAME record`.
  4. Change task status to `In Progress`.
  5. Close the browser tab completely.
  6. Re-open browser and go to `http://localhost:3000/board`.
- **What you should expect:**
  - `Alpha Launch` project and `Configure Domain DNS` task are still present in `In Progress` column with the subtask preserved.
  - Confirms frontend is 100% communicating with Laravel and MySQL `saas_db`.
- **Status:** `[ ]`
- **Notes:**

---

## Test Execution Summary

- **Total Test Cases:** 27 Detailed Scenarios
- **Passed (`[x]`):** 0
- **Failed (`[-]`):** 0
- **Pending (`[ ]`):** 27
- **Tested By:** _________________________
- **Date Tested:** _________________________
