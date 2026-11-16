'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  ChevronDown,
  FolderKanban,
  GanttChartSquare,
  Kanban,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { Button } from '../primitives/Button';

export interface NavWorkspaceItem {
  id: string;
  name: string;
  plan: string;
  accentColor: string;
  myRole?: string;
}

interface AppShellProps {
  currentUser: { name: string; email: string } | null;
  workspaces: NavWorkspaceItem[];
  activeWorkspace: NavWorkspaceItem | null;
  onSelectWorkspace: (id: string) => void;
  onCreateCompanyClick: () => void;
  onLogoutClick: () => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onNewTaskClick: () => void;
  canEditWork: boolean;
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/board', label: 'Kanban Board', icon: Kanban },
  { href: '/tasks', label: 'Task List', icon: ListTodo },
  { href: '/timeline', label: 'Timeline', icon: GanttChartSquare },
  { href: '/team', label: 'Team & Roles', icon: Users },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function AppShell({
  currentUser,
  workspaces,
  activeWorkspace,
  onSelectWorkspace,
  onCreateCompanyClick,
  onLogoutClick,
  searchQuery,
  onSearchChange,
  onNewTaskClick,
  canEditWork,
  children,
}: AppShellProps) {
  const pathname = usePathname();
  const [wsOpen, setWsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/80">
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-3.5">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105 group-hover:rotate-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 tracking-tight block leading-none">
                OrbitFlow
              </span>
              <span className="text-[10px] font-medium text-slate-400">Multi-Company SaaS</span>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Company Switcher */}
        <div className="relative">
          <button
            onClick={() => setWsOpen((v) => !v)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-200 hover:shadow-soft transition-all duration-200 text-left"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 ring-4 ring-slate-100"
                style={{ backgroundColor: activeWorkspace?.accentColor ?? '#4F46E5' }}
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {activeWorkspace?.name ?? 'No Company Yet'}
                </p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                  {activeWorkspace?.myRole ?? 'create'} • {activeWorkspace?.plan ?? 'pro'}
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
                wsOpen ? 'rotate-180 text-indigo-600' : ''
              }`}
            />
          </button>

          {wsOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200/90 rounded-2xl shadow-glass p-1.5 z-30 animate-scale-in">
              {workspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => {
                    onSelectWorkspace(ws.id);
                    setWsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left text-xs transition-all ${
                    ws.id === activeWorkspace?.id
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: ws.accentColor }}
                  />
                  <span className="truncate flex-1">{ws.name}</span>
                  <span className="text-[10px] uppercase text-slate-400">{ws.myRole}</span>
                </button>
              ))}
              <div className="my-1 border-t border-slate-100" />
              <button
                onClick={() => {
                  setWsOpen(false);
                  onCreateCompanyClick();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                <Building2 className="w-3.5 h-3.5" />
                Create New Company
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation with active accent indicator */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Company Menu
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-indigo-50/90 text-indigo-700 font-semibold shadow-[inset_0_0_0_1px_rgba(99,102,241,0.15)]'
                  : 'text-slate-600 hover:bg-slate-50/90 hover:text-slate-900 hover:translate-x-0.5'
              }`}
            >
              {active && (
                <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-indigo-600" />
              )}
              <Icon
                className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                  active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-700'
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logged-in User Footer */}
      <div className="p-3 border-t border-slate-100">
        <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/70 flex items-center justify-between gap-2 hover:border-slate-300 transition-colors">
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">
              {currentUser?.name ?? 'User'}
            </p>
            <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
          </div>
          <button
            onClick={onLogoutClick}
            title="Sign out"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50/50 transition-all active:scale-95 shrink-0"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 flex">
      <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/25 backdrop-blur-xs animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative z-10 w-64 h-full bg-white shadow-glass">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <header className="sticky top-0 z-30 h-16 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="relative flex-1 group">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search tasks, codes, or tags..."
                className="w-full h-9 pl-9 pr-14 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-semibold text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2">
                ⌘K
              </kbd>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<Building2 className="w-3.5 h-3.5" />}
              onClick={onCreateCompanyClick}
            >
              New Company
            </Button>
            {activeWorkspace && canEditWork && (
              <Button size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />} onClick={onNewTaskClick}>
                New Task
              </Button>
            )}
          </div>
        </header>

        <main key={pathname} className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto animate-page-enter">
          {children}
        </main>
      </div>
    </div>
  );
}
