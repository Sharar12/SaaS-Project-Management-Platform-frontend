'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  ActivityLog,
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
} from '@/contracts';
import { apiService } from '@/services/apiService';
import { AppShell, Button, Card, Input, ToastContainer, ToastItem } from '@/ui';
import { CreateCompanyModal, CreateProjectModal, CreateTaskModal } from './CreateModals';
import { TaskDetailDrawer } from './TaskDetailDrawer';
import { Building2 } from 'lucide-react';

interface WorkspaceContextValue {
  loading: boolean;
  user: AuthUser | null;
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  currentRole: MemberRole | null;
  canManageCompany: boolean;
  canEditWork: boolean;
  setActiveWorkspaceId: (id: string) => Promise<void>;
  projects: Project[];
  tasks: Task[];
  members: TeamMember[];
  activities: ActivityLog[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedTask: Task | null;
  openTaskDrawer: (taskId: string) => void;
  closeTaskDrawer: () => void;
  openCreateTaskModal: (defaultProjectId?: string) => void;
  openCreateProjectModal: () => void;
  openCreateCompanyModal: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  createCompany: (input: CreateWorkspaceInput) => Promise<void>;
  createProject: (input: Omit<CreateProjectInput, 'workspaceId'>) => Promise<void>;
  updateProject: (projectId: string, patch: UpdateProjectInput) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  createTask: (input: Omit<CreateTaskInput, 'workspaceId'>) => Promise<void>;
  updateTask: (taskId: string, patch: Partial<Task>, activityNote?: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  addComment: (taskId: string, content: string) => Promise<void>;
  createMember: (input: Omit<CreateMemberInput, 'workspaceId'>) => Promise<void>;
  updateMemberRole: (memberId: string, role: MemberRole) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
  updateWorkspace: (
    patch: Partial<Pick<Workspace, 'name' | 'industry' | 'plan' | 'accentColor'>>
  ) => Promise<void>;
  notify: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(undefined);
const AUTH_ROUTES = ['/login', '/register'];

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activeWorkspaceId, setActiveWsIdState] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [rawTasks, setRawTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [defaultTaskProjectId, setDefaultTaskProjectId] = useState<string | undefined>();
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [createCompanyOpen, setCreateCompanyOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Onboarding state when a new user has 0 companies
  const [onboardName, setOnboardName] = useState('');
  const [onboardIndustry, setOnboardIndustry] = useState('Software & Technology');
  const [onboardSaving, setOnboardSaving] = useState(false);

  const notify = useCallback(
    (message: string, type: 'success' | 'info' | 'error' = 'success') => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3800);
    },
    []
  );

  const runSafe = async <T,>(fn: () => Promise<T>): Promise<T> => {
    try {
      return await fn();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Action failed';
      notify(msg, 'error');
      throw err;
    }
  };

  const loadBundle = useCallback(async (wsId?: string) => {
    setLoading(true);
    try {
      const bundle = await apiService.getBundle(wsId);
      setUser(bundle.user);
      setWorkspaces(bundle.workspaces);
      setActiveWsIdState(bundle.activeWorkspaceId);
      setProjects(bundle.projects);
      setRawTasks(bundle.tasks);
      setMembers(bundle.members);
      setActivities(bundle.activities);
    } catch {
      setUser(null);
      if (!AUTH_ROUTES.includes(window.location.pathname)) {
        router.replace('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadBundle();
  }, [loadBundle]);

  const setActiveWorkspaceId = async (id: string) => {
    await loadBundle(id);
  };

  const login = async (email: string, password: string) => {
    await runSafe(async () => {
      await apiService.login(email, password);
      await loadBundle();
      router.replace('/');
    });
  };

  const register = async (name: string, email: string, password: string) => {
    await runSafe(async () => {
      await apiService.register(name, email, password);
      await loadBundle();
      router.replace('/');
    });
  };

  const logout = async () => {
    await apiService.logout();
    setUser(null);
    setWorkspaces([]);
    router.replace('/login');
  };

  const activeWorkspace = useMemo(
    () => workspaces.find((w) => w.id === activeWorkspaceId) ?? null,
    [workspaces, activeWorkspaceId]
  );

  const currentRole: MemberRole | null = useMemo(() => {
    if (activeWorkspace?.myRole) return activeWorkspace.myRole;
    return members.find((m) => m.userId === user?.id)?.role ?? null;
  }, [activeWorkspace, members, user]);

  const canManageCompany = currentRole === 'owner' || currentRole === 'admin';
  const canEditWork = currentRole !== null && currentRole !== 'viewer';

  const tasks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return rawTasks;
    return rawTasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.code.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [rawTasks, searchQuery]);

  const selectedTask = useMemo(
    () => rawTasks.find((t) => t.id === selectedTaskId) ?? null,
    [rawTasks, selectedTaskId]
  );

  const createCompany = async (input: CreateWorkspaceInput) => {
    await runSafe(async () => {
      const ws = await apiService.createWorkspace(input);
      await loadBundle(ws.id);
      notify(`Company "${ws.name}" created. You are now Owner (Admin).`);
    });
  };

  const createProject = async (input: Omit<CreateProjectInput, 'workspaceId'>) => {
    if (!activeWorkspaceId) return;
    await runSafe(async () => {
      const created = await apiService.createProject({ ...input, workspaceId: activeWorkspaceId });
      setProjects((prev) => [created, ...prev]);
      notify(`Project "${created.name}" created`);
    });
  };

  const updateProject = async (projectId: string, patch: UpdateProjectInput) => {
    await runSafe(async () => {
      const updated = await apiService.updateProject(projectId, patch);
      setProjects((prev) => prev.map((p) => (p.id === projectId ? updated : p)));
      notify('Project updated');
    });
  };

  const deleteProject = async (projectId: string) => {
    await runSafe(async () => {
      await apiService.deleteProject(projectId);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      setRawTasks((prev) => prev.filter((t) => t.projectId !== projectId));
      notify('Project deleted', 'info');
    });
  };

  const createTask = async (input: Omit<CreateTaskInput, 'workspaceId'>) => {
    if (!activeWorkspaceId) return;
    await runSafe(async () => {
      const created = await apiService.createTask({ ...input, workspaceId: activeWorkspaceId });
      setRawTasks((prev) => [created, ...prev]);
      notify(`Task ${created.code} created`);
    });
  };

  const updateTask = async (taskId: string, patch: Partial<Task>, activityNote?: string) => {
    await runSafe(async () => {
      const updated = await apiService.updateTask(taskId, patch, activityNote);
      setRawTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
      if (activityNote) notify(`Updated ${updated.code}`);
    });
  };

  const deleteTask = async (taskId: string) => {
    await runSafe(async () => {
      await apiService.deleteTask(taskId);
      setRawTasks((prev) => prev.filter((t) => t.id !== taskId));
      setSelectedTaskId(null);
      notify('Task deleted', 'info');
    });
  };

  const addComment = async (taskId: string, content: string) => {
    await runSafe(async () => {
      const updated = await apiService.addTaskComment(taskId, content);
      setRawTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
      notify('Comment added');
    });
  };

  const createMember = async (input: Omit<CreateMemberInput, 'workspaceId'>) => {
    if (!activeWorkspaceId) return;
    await runSafe(async () => {
      const member = await apiService.createMember({ ...input, workspaceId: activeWorkspaceId });
      setMembers((prev) => [...prev, member]);
      notify(`Member "${member.name}" added as ${member.role}`);
    });
  };

  const updateMemberRole = async (memberId: string, role: MemberRole) => {
    if (!activeWorkspaceId) return;
    await runSafe(async () => {
      const updated = await apiService.updateMemberRole(activeWorkspaceId, memberId, role);
      setMembers((prev) => prev.map((m) => (m.id === memberId ? updated : m)));
      notify(`Updated ${updated.name} to ${role}`);
    });
  };

  const removeMember = async (memberId: string) => {
    if (!activeWorkspaceId) return;
    await runSafe(async () => {
      await apiService.removeMember(activeWorkspaceId, memberId);
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
      notify('Member removed', 'info');
    });
  };

  const updateWorkspace = async (
    patch: Partial<Pick<Workspace, 'name' | 'industry' | 'plan' | 'accentColor'>>
  ) => {
    if (!activeWorkspaceId) return;
    await runSafe(async () => {
      const updated = await apiService.updateWorkspace(activeWorkspaceId, patch);
      setWorkspaces((prev) => prev.map((w) => (w.id === activeWorkspaceId ? updated : w)));
      notify('Company settings saved');
    });
  };

  const handleOnboardCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onboardName.trim()) return;
    setOnboardSaving(true);
    try {
      await createCompany({
        name: onboardName.trim(),
        industry: onboardIndustry.trim(),
        accentColor: '#4F46E5',
      });
      setOnboardName('');
    } finally {
      setOnboardSaving(false);
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        loading,
        user,
        workspaces,
        activeWorkspace,
        currentRole,
        canManageCompany,
        canEditWork,
        setActiveWorkspaceId,
        projects,
        tasks,
        members,
        activities,
        searchQuery,
        setSearchQuery,
        selectedTask,
        openTaskDrawer: (id) => setSelectedTaskId(id),
        closeTaskDrawer: () => setSelectedTaskId(null),
        openCreateTaskModal: (projectId) => {
          setDefaultTaskProjectId(projectId);
          setCreateTaskOpen(true);
        },
        openCreateProjectModal: () => setCreateProjectOpen(true),
        openCreateCompanyModal: () => setCreateCompanyOpen(true),
        login,
        register,
        logout,
        createCompany,
        createProject,
        updateProject,
        deleteProject,
        createTask,
        updateTask,
        deleteTask,
        addComment,
        createMember,
        updateMemberRole,
        removeMember,
        updateWorkspace,
        notify,
      }}
    >
      {isAuthPage ? (
        children
      ) : !user && !loading ? null : (
        <AppShell
          currentUser={user}
          workspaces={workspaces}
          activeWorkspace={activeWorkspace}
          onSelectWorkspace={setActiveWorkspaceId}
          onCreateCompanyClick={() => setCreateCompanyOpen(true)}
          onLogoutClick={logout}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewTaskClick={() => {
            setDefaultTaskProjectId(projects[0]?.id);
            setCreateTaskOpen(true);
          }}
          canEditWork={canEditWork}
        >
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-8 w-56 bg-slate-100 rounded-xl" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-28 bg-slate-100 rounded-2xl" />
                ))}
              </div>
            </div>
          ) : !activeWorkspace ? (
            /* Onboarding View for New Accounts with 0 Companies */
            <div className="max-w-lg mx-auto py-12 animate-fade-in">
              <Card padding="lg">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">
                  Welcome, {user?.name}! Create your Company
                </h1>
                <p className="text-sm text-slate-500 mt-1.5">
                  Start your isolated company workspace. You will automatically become the{' '}
                  <strong>Owner (Admin)</strong> and can add team members right away.
                </p>
                <form onSubmit={handleOnboardCreate} className="space-y-4 mt-6">
                  <Input
                    label="Company / Group Name"
                    placeholder="e.g., Acme Software Ltd."
                    value={onboardName}
                    onChange={(e) => setOnboardName(e.target.value)}
                    required
                  />
                  <Input
                    label="Industry"
                    value={onboardIndustry}
                    onChange={(e) => setOnboardIndustry(e.target.value)}
                  />
                  <Button type="submit" className="w-full" size="lg" loading={onboardSaving}>
                    Create Company & Enter Workspace
                  </Button>
                </form>
              </Card>
            </div>
          ) : (
            children
          )}
        </AppShell>
      )}

      <TaskDetailDrawer
        task={selectedTask}
        projects={projects}
        members={members}
        onClose={() => setSelectedTaskId(null)}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
        onAddComment={addComment}
        readOnly={!canEditWork}
      />

      <CreateTaskModal
        open={createTaskOpen}
        onClose={() => setCreateTaskOpen(false)}
        projects={projects}
        members={members}
        defaultProjectId={defaultTaskProjectId}
        onSubmit={createTask}
      />

      <CreateProjectModal
        open={createProjectOpen}
        onClose={() => setCreateProjectOpen(false)}
        members={members}
        onSubmit={createProject}
      />

      <CreateCompanyModal
        open={createCompanyOpen}
        onClose={() => setCreateCompanyOpen(false)}
        onSubmit={createCompany}
      />

      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspace must be used inside WorkspaceProvider');
  return ctx;
}
