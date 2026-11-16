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

export const API_MODE = 'real';
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://127.0.0.1:8000/api/v1';
const TOKEN_KEY = 'orbitflow_token';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string | null): void {
  if (typeof window === 'undefined') return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(init?.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers,
  });

  if (!res.ok) {
    let msg = `API Error ${res.status}`;
    try {
      const err = await res.json();
      msg = err.message || JSON.stringify(err);
    } catch {
      // ignore
    }
    throw new Error(msg);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const apiService = {
  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const data = await request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, password_confirmation: password }),
    });
    setToken(data.token);
    return data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const data = await request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    return data;
  },

  async logout(): Promise<void> {
    try {
      await request<void>('/auth/logout', { method: 'POST' });
    } finally {
      setToken(null);
    }
  },

  me: (): Promise<AuthUser> => request<AuthUser>('/auth/me'),

  getBundle: (workspaceId?: string): Promise<WorkspaceBundle> =>
    request<WorkspaceBundle>(
      workspaceId ? `/bundle?workspaceId=${encodeURIComponent(workspaceId)}` : '/bundle'
    ),

  createWorkspace: (input: CreateWorkspaceInput): Promise<Workspace> =>
    request<Workspace>('/workspaces', { method: 'POST', body: JSON.stringify(input) }),

  updateWorkspace: (
    workspaceId: string,
    patch: Partial<Pick<Workspace, 'name' | 'industry' | 'plan' | 'accentColor'>>
  ): Promise<Workspace> =>
    request<Workspace>(`/workspaces/${encodeURIComponent(workspaceId)}`, {
      method: 'PATCH',
      body: JSON.stringify(patch),
    }),

  createProject: (input: CreateProjectInput): Promise<Project> =>
    request<Project>('/projects', { method: 'POST', body: JSON.stringify(input) }),

  updateProject: (projectId: string, patch: UpdateProjectInput): Promise<Project> =>
    request<Project>(`/projects/${encodeURIComponent(projectId)}`, {
      method: 'PATCH',
      body: JSON.stringify(patch),
    }),

  deleteProject: (projectId: string): Promise<void> =>
    request<void>(`/projects/${encodeURIComponent(projectId)}`, { method: 'DELETE' }),

  createTask: (input: CreateTaskInput): Promise<Task> =>
    request<Task>('/tasks', { method: 'POST', body: JSON.stringify(input) }),

  updateTask: (taskId: string, patch: Partial<Task>, activityNote?: string): Promise<Task> =>
    request<Task>(`/tasks/${encodeURIComponent(taskId)}`, {
      method: 'PATCH',
      body: JSON.stringify({ ...patch, activityNote }),
    }),

  deleteTask: (taskId: string): Promise<void> =>
    request<void>(`/tasks/${encodeURIComponent(taskId)}`, { method: 'DELETE' }),

  addTaskComment: (taskId: string, content: string): Promise<Task> =>
    request<Task>(`/tasks/${encodeURIComponent(taskId)}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),

  createMember: (input: CreateMemberInput): Promise<TeamMember> =>
    request<TeamMember>(`/workspaces/${encodeURIComponent(input.workspaceId)}/members`, {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  updateMemberRole: (
    workspaceId: string,
    memberId: string,
    role: MemberRole
  ): Promise<TeamMember> =>
    request<TeamMember>(
      `/workspaces/${encodeURIComponent(workspaceId)}/members/${encodeURIComponent(memberId)}/role`,
      {
        method: 'PATCH',
        body: JSON.stringify({ role }),
      }
    ),

  removeMember: (workspaceId: string, memberId: string): Promise<void> =>
    request<void>(
      `/workspaces/${encodeURIComponent(workspaceId)}/members/${encodeURIComponent(memberId)}`,
      { method: 'DELETE' }
    ),
};
