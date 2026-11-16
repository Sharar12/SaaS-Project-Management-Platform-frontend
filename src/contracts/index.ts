export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ProjectStatus = 'active' | 'planning' | 'on_hold' | 'completed';
export type MemberRole = 'owner' | 'admin' | 'member' | 'viewer';
export type PlanTier = 'free' | 'pro' | 'enterprise';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  industry: string;
  plan: PlanTier;
  accentColor: string;
  myRole?: MemberRole;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  userId?: string | null;
  workspaceId: string;
  name: string;
  email: string;
  role: MemberRole;
  title: string;
  avatarColor: string;
  initials: string;
  status: 'online' | 'away' | 'offline';
}

export interface Project {
  id: string;
  workspaceId: string;
  key: string;
  name: string;
  description: string;
  status: ProjectStatus;
  color: string;
  startDate: string;
  dueDate: string;
  leadId: string;
  memberIds: string[];
  tags: string[];
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskComment {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface Task {
  id: string;
  workspaceId: string;
  projectId: string;
  code: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string | null;
  dueDate: string;
  startDate: string;
  tags: string[];
  subtasks: Subtask[];
  comments: TaskComment[];
  estimatedHours: number;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  workspaceId: string;
  actorId: string;
  action: string;
  targetTitle: string;
  timestamp: string;
}

export interface CreateWorkspaceInput {
  name: string;
  industry: string;
  accentColor: string;
}

export interface CreateProjectInput {
  workspaceId: string;
  name: string;
  key: string;
  description: string;
  status: ProjectStatus;
  color: string;
  startDate: string;
  dueDate: string;
  leadId: string;
  tags: string[];
}

export interface UpdateProjectInput {
  name?: string;
  description?: string;
  status?: ProjectStatus;
  color?: string;
  dueDate?: string;
  tags?: string[];
}

export interface CreateTaskInput {
  workspaceId: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string | null;
  startDate: string;
  dueDate: string;
  tags: string[];
  estimatedHours: number;
}

export interface CreateMemberInput {
  workspaceId: string;
  name: string;
  email: string;
  password?: string;
  role: MemberRole;
  title: string;
}

export interface WorkspaceBundle {
  user: AuthUser;
  workspaces: Workspace[];
  activeWorkspaceId: string | null;
  projects: Project[];
  tasks: Task[];
  members: TeamMember[];
  activities: ActivityLog[];
}
