import {
  AuthResponse,
  AuthUser,
  CreateMemberInput,
  CreateProjectInput,
  CreateTaskInput,
  CreateWorkspaceInput,
  MemberRole,
  Project,
  Task,
  TeamMember,
  UpdateProjectInput,
  Workspace,
  WorkspaceBundle,
} from '@/contracts';
import { mockApiClient } from '@/mock-backend/mockApiClient';

export const API_MODE = process.env.NEXT_PUBLIC_API_MODE ?? 'mock';

export const apiService = {
  register: (name: string, email: string, password: string): Promise<AuthResponse> =>
    mockApiClient.register(name, email, password),

  login: (email: string, password: string): Promise<AuthResponse> =>
    mockApiClient.login(email, password),

  logout: (): Promise<void> => mockApiClient.logout(),

  me: (): Promise<AuthUser> => mockApiClient.me(),

  getBundle: (workspaceId?: string): Promise<WorkspaceBundle> =>
    mockApiClient.getBundle(workspaceId),

  createWorkspace: (input: CreateWorkspaceInput): Promise<Workspace> =>
    mockApiClient.createWorkspace(input),

  updateWorkspace: (
    workspaceId: string,
    patch: Partial<Pick<Workspace, 'name' | 'industry' | 'plan' | 'accentColor'>>
  ): Promise<Workspace> => mockApiClient.updateWorkspace(workspaceId, patch),

  createProject: (input: CreateProjectInput): Promise<Project> =>
    mockApiClient.createProject(input),

  updateProject: (projectId: string, patch: UpdateProjectInput): Promise<Project> =>
    mockApiClient.updateProject(projectId, patch),

  deleteProject: (projectId: string): Promise<void> => mockApiClient.deleteProject(projectId),

  createTask: (input: CreateTaskInput): Promise<Task> => mockApiClient.createTask(input),

  updateTask: (taskId: string, patch: Partial<Task>, activityNote?: string): Promise<Task> =>
    mockApiClient.updateTask(taskId, patch, activityNote),

  deleteTask: (taskId: string): Promise<void> => mockApiClient.deleteTask(taskId),

  addTaskComment: (taskId: string, content: string): Promise<Task> =>
    mockApiClient.addTaskComment(taskId, content),

  createMember: (input: CreateMemberInput): Promise<TeamMember> =>
    mockApiClient.createMember(input),

  updateMemberRole: (
    workspaceId: string,
    memberId: string,
    role: MemberRole
  ): Promise<TeamMember> => mockApiClient.updateMemberRole(workspaceId, memberId, role),

  removeMember: (workspaceId: string, memberId: string): Promise<void> =>
    mockApiClient.removeMember(workspaceId, memberId),
};
