import {
  CreateProjectInput,
  CreateTaskInput,
  InviteMemberInput,
  MemberRole,
  Project,
  Task,
  TeamMember,
  Workspace,
  WorkspaceBundle,
} from '@/contracts';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://127.0.0.1:8000/api/v1';

export const API_MODE = 'real';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let errorMsg = `API request failed with status ${response.status}`;
    try {
      const errJson = await response.json();
      errorMsg = errJson.message || JSON.stringify(errJson);
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const apiService = {
  getBundle(): Promise<WorkspaceBundle> {
    return request<WorkspaceBundle>('/bundle');
  },

  resetDemoData(): Promise<WorkspaceBundle> {
    return request<WorkspaceBundle>('/demo/reset', {
      method: 'POST',
    });
  },

  updateWorkspace(
    workspaceId: string,
    patch: Partial<Pick<Workspace, 'name' | 'industry' | 'plan' | 'accentColor'>>
  ): Promise<Workspace> {
    return request<Workspace>(`/workspaces/${encodeURIComponent(workspaceId)}`, {
      method: 'PATCH',
      body: JSON.stringify(patch),
    });
  },

  createProject(input: CreateProjectInput): Promise<Project> {
    return request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  createTask(input: CreateTaskInput, actorId: string): Promise<Task> {
    return request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify({ ...input, actorId }),
    });
  },

  updateTask(
    taskId: string,
    patch: Partial<Task>,
    actorId?: string,
    activityNote?: string
  ): Promise<Task> {
    return request<Task>(`/tasks/${encodeURIComponent(taskId)}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...patch,
        actorId,
        activityNote,
      }),
    });
  },

  deleteTask(taskId: string): Promise<void> {
    return request<void>(`/tasks/${encodeURIComponent(taskId)}`, {
      method: 'DELETE',
    });
  },

  addTaskComment(taskId: string, authorId: string, content: string): Promise<Task> {
    return request<Task>(`/tasks/${encodeURIComponent(taskId)}/comments`, {
      method: 'POST',
      body: JSON.stringify({ authorId, content }),
    });
  },

  inviteMember(input: InviteMemberInput): Promise<TeamMember> {
    return request<TeamMember>('/members', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  updateMemberRole(memberId: string, role: MemberRole): Promise<TeamMember> {
    return request<TeamMember>(`/members/${encodeURIComponent(memberId)}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  },
};
