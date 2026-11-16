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
import { getMockToken, readMockDb, setMockToken, writeMockDb } from './db';
import { MockDatabase, MockUserRecord } from './seed';

const wait = (ms = 90) => new Promise((r) => setTimeout(r, ms));
const uid = (p: string) => `${p}-${Math.random().toString(36).slice(2, 9)}`;

function requireUser(db: MockDatabase): MockUserRecord {
  const token = getMockToken();
  if (!token || !token.startsWith('mock-token:')) {
    throw new Error('Unauthenticated. Please sign in.');
  }
  const userId = token.replace('mock-token:', '');
  const user = db.users.find((u) => u.id === userId);
  if (!user) throw new Error('Session expired. Please sign in again.');
  return user;
}

function requireMember(db: MockDatabase, workspaceId: string, userId: string): TeamMember {
  const member = db.members.find((m) => m.workspaceId === workspaceId && m.userId === userId);
  if (!member) throw new Error('Forbidden: you do not belong to this company.');
  return member;
}

function requireAdmin(member: TeamMember): void {
  if (member.role !== 'owner' && member.role !== 'admin') {
    throw new Error('Forbidden: only company owners or admins can perform this action.');
  }
}

function requireWriter(member: TeamMember): void {
  if (member.role === 'viewer') {
    throw new Error('Forbidden: viewers have read-only access.');
  }
}

export const mockApiClient = {
  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    await wait();
    const db = readMockDb();
    const cleanEmail = email.trim().toLowerCase();
    if (db.users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      throw new Error('An account with this email already exists.');
    }
    const user: MockUserRecord = {
      id: uid('usr'),
      name: name.trim(),
      email: cleanEmail,
      password,
    };
    db.users.push(user);
    writeMockDb(db);
    const token = `mock-token:${user.id}`;
    setMockToken(token);
    return { token, user: { id: user.id, name: user.name, email: user.email } };
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    await wait();
    const db = readMockDb();
    const cleanEmail = email.trim().toLowerCase();
    const user = db.users.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );
    if (!user) throw new Error('Invalid email or password.');
    const token = `mock-token:${user.id}`;
    setMockToken(token);
    return { token, user: { id: user.id, name: user.name, email: user.email } };
  },

  async logout(): Promise<void> {
    await wait(40);
    setMockToken(null);
  },

  async me(): Promise<AuthUser> {
    await wait(40);
    const db = readMockDb();
    const user = requireUser(db);
    return { id: user.id, name: user.name, email: user.email };
  },

  async getBundle(requestedWorkspaceId?: string): Promise<WorkspaceBundle> {
    await wait();
    const db = readMockDb();
    const user = requireUser(db);

    const myMemberships = db.members.filter((m) => m.userId === user.id);
    const myWorkspaceIds = new Set(myMemberships.map((m) => m.workspaceId));
    const workspaces = db.workspaces
      .filter((w) => myWorkspaceIds.has(w.id))
      .map((w) => ({
        ...w,
        myRole: myMemberships.find((m) => m.workspaceId === w.id)?.role,
      }));

    const activeWorkspaceId =
      requestedWorkspaceId && myWorkspaceIds.has(requestedWorkspaceId)
        ? requestedWorkspaceId
        : workspaces[0]?.id ?? null;

    if (!activeWorkspaceId) {
      return {
        user: { id: user.id, name: user.name, email: user.email },
        workspaces: [],
        activeWorkspaceId: null,
        projects: [],
        tasks: [],
        members: [],
        activities: [],
      };
    }

    return {
      user: { id: user.id, name: user.name, email: user.email },
      workspaces,
      activeWorkspaceId,
      projects: db.projects.filter((p) => p.workspaceId === activeWorkspaceId),
      tasks: db.tasks.filter((t) => t.workspaceId === activeWorkspaceId),
      members: db.members.filter((m) => m.workspaceId === activeWorkspaceId),
      activities: db.activities.filter((a) => a.workspaceId === activeWorkspaceId),
    };
  },

  async createWorkspace(input: CreateWorkspaceInput): Promise<Workspace> {
    await wait();
    const db = readMockDb();
    const user = requireUser(db);

    const baseSlug = input.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const workspace: Workspace = {
      id: uid('ws'),
      name: input.name.trim(),
      slug: `${baseSlug || 'company'}-${Math.random().toString(36).slice(2, 6)}`,
      industry: input.industry.trim() || 'Technology',
      plan: 'pro',
      accentColor: input.accentColor || '#4F46E5',
      myRole: 'owner',
      createdAt: new Date().toISOString(),
    };
    db.workspaces.push(workspace);

    const parts = user.name.trim().split(/\s+/);
    const initials = ((parts[0]?.[0] ?? 'U') + (parts[1]?.[0] ?? parts[0]?.[1] ?? '')).toUpperCase();

    db.members.push({
      id: uid('mem'),
      userId: user.id,
      workspaceId: workspace.id,
      name: user.name,
      email: user.email,
      role: 'owner',
      title: 'Founder / Admin',
      avatarColor: 'bg-indigo-600',
      initials,
      status: 'online',
    });

    writeMockDb(db);
    return workspace;
  },

  async updateWorkspace(
    workspaceId: string,
    patch: Partial<Pick<Workspace, 'name' | 'industry' | 'plan' | 'accentColor'>>
  ): Promise<Workspace> {
    await wait();
    const db = readMockDb();
    const user = requireUser(db);
    const me = requireMember(db, workspaceId, user.id);
    requireAdmin(me);

    const idx = db.workspaces.findIndex((w) => w.id === workspaceId);
    if (idx === -1) throw new Error('Company not found.');
    db.workspaces[idx] = { ...db.workspaces[idx], ...patch };
    writeMockDb(db);
    return { ...db.workspaces[idx], myRole: me.role };
  },

  async createProject(input: CreateProjectInput): Promise<Project> {
    await wait();
    const db = readMockDb();
    const user = requireUser(db);
    const me = requireMember(db, input.workspaceId, user.id);
    requireAdmin(me);

    if (input.leadId && !db.members.some((m) => m.id === input.leadId && m.workspaceId === input.workspaceId)) {
      throw new Error('Project lead must belong to this company.');
    }
    const key = input.key.toUpperCase().slice(0, 6);
    if (db.projects.some((p) => p.workspaceId === input.workspaceId && p.key === key)) {
      throw new Error(`Project key "${key}" already exists in this company.`);
    }

    const project: Project = {
      id: uid('proj'),
      workspaceId: input.workspaceId,
      key,
      name: input.name,
      description: input.description,
      status: input.status,
      color: input.color,
      startDate: input.startDate,
      dueDate: input.dueDate,
      leadId: input.leadId || me.id,
      memberIds: [input.leadId || me.id],
      tags: input.tags,
    };
    db.projects.unshift(project);
    db.projectSequences[project.id] = 101;
    db.activities.unshift({
      id: uid('act'),
      workspaceId: input.workspaceId,
      actorId: me.id,
      action: 'created project',
      targetTitle: project.name,
      timestamp: new Date().toISOString(),
    });
    writeMockDb(db);
    return project;
  },

  async updateProject(projectId: string, patch: UpdateProjectInput): Promise<Project> {
    await wait();
    const db = readMockDb();
    const user = requireUser(db);
    const idx = db.projects.findIndex((p) => p.id === projectId);
    if (idx === -1) throw new Error('Project not found.');
    const me = requireMember(db, db.projects[idx].workspaceId, user.id);
    requireAdmin(me);

    db.projects[idx] = { ...db.projects[idx], ...patch };
    writeMockDb(db);
    return db.projects[idx];
  },

  async deleteProject(projectId: string): Promise<void> {
    await wait();
    const db = readMockDb();
    const user = requireUser(db);
    const proj = db.projects.find((p) => p.id === projectId);
    if (!proj) throw new Error('Project not found.');
    const me = requireMember(db, proj.workspaceId, user.id);
    requireAdmin(me);

    db.projects = db.projects.filter((p) => p.id !== projectId);
    db.tasks = db.tasks.filter((t) => t.projectId !== projectId);
    writeMockDb(db);
  },

  async createTask(input: CreateTaskInput): Promise<Task> {
    await wait();
    const db = readMockDb();
    const user = requireUser(db);
    const me = requireMember(db, input.workspaceId, user.id);
    requireWriter(me);

    const project = db.projects.find((p) => p.id === input.projectId && p.workspaceId === input.workspaceId);
    if (!project) throw new Error('Project not found in this company.');
    if (input.assigneeId && !db.members.some((m) => m.id === input.assigneeId && m.workspaceId === input.workspaceId)) {
      throw new Error('Assignee must belong to this company.');
    }
    const seq = db.projectSequences[project.id] ?? 101;
    db.projectSequences[project.id] = seq + 1;

    const task: Task = {
      id: uid('task'),
      workspaceId: input.workspaceId,
      projectId: input.projectId,
      code: `${project.key}-${seq}`,
      title: input.title,
      description: input.description,
      status: input.status,
      priority: input.priority,
      assigneeId: input.assigneeId,
      startDate: input.startDate,
      dueDate: input.dueDate,
      tags: input.tags,
      subtasks: [],
      comments: [],
      estimatedHours: input.estimatedHours,
      createdAt: new Date().toISOString(),
    };

    db.tasks.unshift(task);
    db.activities.unshift({
      id: uid('act'),
      workspaceId: input.workspaceId,
      actorId: me.id,
      action: 'created task',
      targetTitle: `${task.code} ${task.title}`,
      timestamp: new Date().toISOString(),
    });
    writeMockDb(db);
    return task;
  },

  async updateTask(taskId: string, patch: Partial<Task>, activityNote?: string): Promise<Task> {
    await wait(60);
    const db = readMockDb();
    const user = requireUser(db);
    const idx = db.tasks.findIndex((t) => t.id === taskId);
    if (idx === -1) throw new Error('Task not found.');
    const current = db.tasks[idx];
    const me = requireMember(db, current.workspaceId, user.id);
    requireWriter(me);
    if (Object.prototype.hasOwnProperty.call(patch, 'assigneeId') && patch.assigneeId !== null && patch.assigneeId !== undefined) {
      if (!db.members.some((m) => m.id === patch.assigneeId && m.workspaceId === current.workspaceId)) {
        throw new Error('Assignee must belong to this company.');
      }
    }

    const safePatch: Partial<Task> = {};
    if ('title' in patch) safePatch.title = patch.title;
    if ('description' in patch) safePatch.description = patch.description;
    if ('status' in patch) safePatch.status = patch.status;
    if ('priority' in patch) safePatch.priority = patch.priority;
    if ('assigneeId' in patch) safePatch.assigneeId = patch.assigneeId;
    if ('dueDate' in patch) safePatch.dueDate = patch.dueDate;
    if ('startDate' in patch) safePatch.startDate = patch.startDate;
    if ('tags' in patch) safePatch.tags = patch.tags;
    if ('subtasks' in patch) safePatch.subtasks = patch.subtasks;
    if ('estimatedHours' in patch) safePatch.estimatedHours = patch.estimatedHours;
    db.tasks[idx] = { ...current, ...safePatch };
    if (activityNote) {
      db.activities.unshift({
        id: uid('act'),
        workspaceId: db.tasks[idx].workspaceId,
        actorId: me.id,
        action: activityNote,
        targetTitle: `${db.tasks[idx].code} ${db.tasks[idx].title}`,
        timestamp: new Date().toISOString(),
      });
    }
    writeMockDb(db);
    return db.tasks[idx];
  },

  async deleteTask(taskId: string): Promise<void> {
    await wait(60);
    const db = readMockDb();
    const user = requireUser(db);
    const task = db.tasks.find((t) => t.id === taskId);
    if (!task) throw new Error('Task not found.');
    const me = requireMember(db, task.workspaceId, user.id);
    requireWriter(me);

    db.tasks = db.tasks.filter((t) => t.id !== taskId);
    writeMockDb(db);
  },

  async addTaskComment(taskId: string, content: string): Promise<Task> {
    await wait(60);
    const db = readMockDb();
    const user = requireUser(db);
    const idx = db.tasks.findIndex((t) => t.id === taskId);
    if (idx === -1) throw new Error('Task not found.');
    const me = requireMember(db, db.tasks[idx].workspaceId, user.id);
    requireWriter(me);

    db.tasks[idx].comments.push({
      id: uid('cm'),
      authorId: me.id,
      content,
      createdAt: new Date().toISOString(),
    });
    writeMockDb(db);
    return db.tasks[idx];
  },

  async createMember(input: CreateMemberInput): Promise<TeamMember> {
    await wait();
    const db = readMockDb();
    const user = requireUser(db);
    const me = requireMember(db, input.workspaceId, user.id);
    requireAdmin(me);

    const workspace = db.workspaces.find((w) => w.id === input.workspaceId);
    const currentMembers = db.members.filter((m) => m.workspaceId === input.workspaceId);
    if (workspace?.plan === 'free' && currentMembers.length >= 5) {
      throw new Error('Starter (Free) plan supports up to 5 members. Upgrade to Pro.');
    }

    const cleanEmail = input.email.trim().toLowerCase();
    if (currentMembers.some((m) => m.email.toLowerCase() === cleanEmail)) {
      throw new Error('This email is already a member of this company.');
    }

    let linkedUser = db.users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!linkedUser) {
      linkedUser = {
        id: uid('usr'),
        name: input.name.trim(),
        email: cleanEmail,
        password: input.password || 'password123',
      };
      db.users.push(linkedUser);
    }

    const palette = ['bg-indigo-600', 'bg-sky-600', 'bg-emerald-600', 'bg-amber-600', 'bg-rose-600'];
    const parts = input.name.trim().split(/\s+/);
    const initials = ((parts[0]?.[0] ?? 'M') + (parts[1]?.[0] ?? parts[0]?.[1] ?? '')).toUpperCase();

    const member: TeamMember = {
      id: uid('mem'),
      userId: linkedUser.id,
      workspaceId: input.workspaceId,
      name: input.name.trim(),
      email: cleanEmail,
      role: input.role,
      title: input.title.trim() || 'Team Member',
      avatarColor: palette[currentMembers.length % palette.length],
      initials,
      status: 'online',
    };
    db.members.push(member);
    writeMockDb(db);
    return member;
  },

  async updateMemberRole(workspaceId: string, memberId: string, role: MemberRole): Promise<TeamMember> {
    await wait();
    const db = readMockDb();
    const user = requireUser(db);
    const me = requireMember(db, workspaceId, user.id);
    requireAdmin(me);

    const idx = db.members.findIndex((m) => m.id === memberId && m.workspaceId === workspaceId);
    if (idx === -1) throw new Error('Member not found.');
    db.members[idx].role = role;
    writeMockDb(db);
    return db.members[idx];
  },

  async removeMember(workspaceId: string, memberId: string): Promise<void> {
    await wait();
    const db = readMockDb();
    const user = requireUser(db);
    const me = requireMember(db, workspaceId, user.id);
    requireAdmin(me);

    const target = db.members.find((m) => m.id === memberId && m.workspaceId === workspaceId);
    if (!target) throw new Error('Member not found.');
    if (target.id === me.id) throw new Error('You cannot remove yourself from the company.');

    db.members = db.members.filter((m) => m.id !== memberId);
    writeMockDb(db);
  },
};
