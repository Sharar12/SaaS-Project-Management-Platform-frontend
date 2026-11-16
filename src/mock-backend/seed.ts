import { ActivityLog, AuthUser, Project, Task, TeamMember, Workspace } from '@/contracts';

export interface MockUserRecord extends AuthUser {
  password: string;
}

export interface MockDatabase {
  users: MockUserRecord[];
  workspaces: Workspace[];
  members: TeamMember[];
  projects: Project[];
  tasks: Task[];
  activities: ActivityLog[];
  projectSequences: Record<string, number>;
}

export const SEED_DATA: MockDatabase = {
  users: [
    {
      id: 'usr-1',
      name: 'Amina Rahman',
      email: 'amina@orbittech.io',
      password: 'password123',
    },
    {
      id: 'usr-2',
      name: 'Liam Carter',
      email: 'liam@orbittech.io',
      password: 'password123',
    },
    {
      id: 'usr-3',
      name: 'Elena Rostova',
      email: 'elena@novastudio.co',
      password: 'password123',
    },
  ],
  workspaces: [
    {
      id: 'ws-1',
      name: 'OrbitTech Product',
      slug: 'orbittech-product',
      industry: 'SaaS Engineering',
      plan: 'pro',
      accentColor: '#4F46E5',
      createdAt: '2026-11-01T09:00:00Z',
    },
    {
      id: 'ws-2',
      name: 'Nova Creative Studio',
      slug: 'nova-creative',
      industry: 'Design & Brand Agency',
      plan: 'enterprise',
      accentColor: '#0EA5E9',
      createdAt: '2026-11-02T11:30:00Z',
    },
  ],
  members: [
    {
      id: 'mem-1',
      userId: 'usr-1',
      workspaceId: 'ws-1',
      name: 'Amina Rahman',
      email: 'amina@orbittech.io',
      role: 'owner',
      title: 'VP of Product',
      avatarColor: 'bg-indigo-600',
      initials: 'AR',
      status: 'online',
    },
    {
      id: 'mem-2',
      userId: 'usr-2',
      workspaceId: 'ws-1',
      name: 'Liam Carter',
      email: 'liam@orbittech.io',
      role: 'member',
      title: 'Staff Frontend Architect',
      avatarColor: 'bg-sky-600',
      initials: 'LC',
      status: 'online',
    },
    {
      id: 'mem-3',
      userId: 'usr-3',
      workspaceId: 'ws-2',
      name: 'Elena Rostova',
      email: 'elena@novastudio.co',
      role: 'owner',
      title: 'Creative Director',
      avatarColor: 'bg-rose-600',
      initials: 'ER',
      status: 'online',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      workspaceId: 'ws-1',
      key: 'CORE',
      name: 'Multi-Tenant Core v2.4',
      description: 'Unified workspace RBAC, tenant isolation, and Laravel API integration.',
      status: 'active',
      color: '#4F46E5',
      startDate: '2026-11-01',
      dueDate: '2026-12-12',
      leadId: 'mem-1',
      memberIds: ['mem-1', 'mem-2'],
      tags: ['Platform', 'API'],
    },
    {
      id: 'proj-2',
      workspaceId: 'ws-2',
      key: 'NOVA',
      name: 'Q4 Global Brand Re-launch',
      description: 'Interactive campaign microsite and client deliverables.',
      status: 'active',
      color: '#EC4899',
      startDate: '2026-11-05',
      dueDate: '2026-12-18',
      leadId: 'mem-3',
      memberIds: ['mem-3'],
      tags: ['Brand', 'Campaign'],
    },
  ],
  projectSequences: {
    'proj-1': 103,
    'proj-2': 102,
  },
  tasks: [
    {
      id: 'task-1',
      workspaceId: 'ws-1',
      projectId: 'proj-1',
      code: 'CORE-101',
      title: 'Design tenant isolation middleware & MySQL schema',
      description: 'Scope all queries by company workspace_id.',
      status: 'done',
      priority: 'urgent',
      assigneeId: 'mem-1',
      startDate: '2026-11-01',
      dueDate: '2026-11-12',
      tags: ['Database', 'Laravel'],
      estimatedHours: 10,
      subtasks: [
        { id: 'st-1', title: 'Add workspace policies', completed: true },
        { id: 'st-2', title: 'Verify role checks', completed: true },
      ],
      comments: [],
      createdAt: '2026-11-01T10:00:00Z',
    },
    {
      id: 'task-2',
      workspaceId: 'ws-1',
      projectId: 'proj-1',
      code: 'CORE-102',
      title: 'Build Kanban drag-and-drop & cross-month timeline',
      description: 'Support multi-month date span math and optimistic UI.',
      status: 'in_progress',
      priority: 'high',
      assigneeId: 'mem-2',
      startDate: '2026-11-10',
      dueDate: '2026-12-08',
      tags: ['Frontend', 'Motion'],
      estimatedHours: 8,
      subtasks: [],
      comments: [],
      createdAt: '2026-11-05T10:00:00Z',
    },
    {
      id: 'task-3',
      workspaceId: 'ws-2',
      projectId: 'proj-2',
      code: 'NOVA-101',
      title: 'Finalize interactive hero motion storyboard',
      description: 'White-surface micro-interactions for launch.',
      status: 'in_progress',
      priority: 'high',
      assigneeId: 'mem-3',
      startDate: '2026-11-08',
      dueDate: '2026-12-02',
      tags: ['Motion', 'Brand'],
      estimatedHours: 12,
      subtasks: [],
      comments: [],
      createdAt: '2026-11-08T10:00:00Z',
    },
  ],
  activities: [
    {
      id: 'act-1',
      workspaceId: 'ws-1',
      actorId: 'mem-1',
      action: 'completed',
      targetTitle: 'CORE-101 Design tenant isolation middleware & MySQL schema',
      timestamp: '2026-11-15T10:00:00Z',
    },
    {
      id: 'act-2',
      workspaceId: 'ws-2',
      actorId: 'mem-3',
      action: 'created project',
      targetTitle: 'Q4 Global Brand Re-launch',
      timestamp: '2026-11-14T12:00:00Z',
    },
  ],
};
