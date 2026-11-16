'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  FolderKanban,
  GanttChartSquare,
  Kanban,
  Layers,
  Lock,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  TrendingUp,
  LayoutDashboard,
  CalendarDays,
  CheckCircle2,
} from 'lucide-react';
import { Avatar, Badge, Button, Card, ProgressBar, Reveal } from '@/ui';

type PreviewTab = 'board' | 'companies' | 'team';
type DemoCol = 'todo' | 'in_progress' | 'done';

interface DemoCard {
  code: string;
  title: string;
  prio: string;
  tone: 'sky' | 'rose' | 'amber' | 'neutral';
  col: DemoCol;
}

const INITIAL_DEMO_CARDS: DemoCard[] = [
  { code: 'CORE-101', title: 'MySQL tenant isolation schema', prio: 'high', tone: 'amber', col: 'done' },
  { code: 'CORE-102', title: 'Sanctum role permission guards', prio: 'urgent', tone: 'rose', col: 'in_progress' },
  { code: 'UIX-204', title: 'Animated white-canvas Kanban', prio: 'medium', tone: 'sky', col: 'in_progress' },
  { code: 'CORE-108', title: 'Webhook event retry queue', prio: 'medium', tone: 'sky', col: 'todo' },
  { code: 'UIX-209', title: 'Global Cmd+K command search', prio: 'low', tone: 'neutral', col: 'todo' },
];

const FAQS = [
  {
    q: 'Can multiple people create their own separate companies?',
    a: 'Yes. Every user can register an account and create one or multiple isolated companies. Data is strictly scoped per company in MySQL.',
  },
  {
    q: 'What happens when I create a new company?',
    a: 'You automatically become the Company Owner (full Admin). From the Team page, you can create member accounts, assign roles, and manage access.',
  },
  {
    q: 'Can I connect to the Laravel + MySQL backend?',
    a: 'Yes. The application is completely connected to the Laravel API and MySQL saas_db database using secure Sanctum authentication.',
  },
];

export function LandingPageView() {
  const [previewTab, setPreviewTab] = useState<PreviewTab>('board');
  const [demoCards, setDemoCards] = useState<DemoCard[]>(INITIAL_DEMO_CARDS);
  const [annualBilling, setAnnualBilling] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const cycleDemoCard = (code: string) => {
    const order: DemoCol[] = ['todo', 'in_progress', 'done'];
    setDemoCards((prev) =>
      prev.map((c) => {
        if (c.code !== code) return c;
        const next = order[(order.indexOf(c.col) + 1) % order.length];
        return { ...c, col: next };
      })
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Sticky White Glass Header */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
            <a href="#preview" className="hover:text-indigo-600 transition-colors">
              Platform Demo
            </a>
            <a href="#workflow" className="hover:text-indigo-600 transition-colors">
              How it Works
            </a>
            <a href="#features" className="hover:text-indigo-600 transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 border-b border-slate-100 bg-white-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal animation="fade-down" duration={600}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-xs font-semibold text-indigo-700 mb-6 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
              <span>Multi-Tenant Architecture</span>
              <span className="text-slate-300">•</span>
              <span className="text-indigo-900/80 font-normal">Next.js 16 + Laravel API</span>
            </div>
          </Reveal>

          <Reveal animation="zoom-in" delay={150} duration={800}>
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.08]">
              Manage multiple companies, projects, & teams on a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-sky-600">
                pure white canvas.
              </span>
            </h1>
          </Reveal>

          <Reveal animation="fade-up" delay={300} duration={700}>
            <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Every founder creates their own company space with isolated data. Invite your team,
              collaborate on responsive Kanban boards, and track milestones with zero clutter.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={450} duration={700}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link href="/register">
                <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Start Free Company Workspace
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="lg">
                  Sign In to Existing Account
                </Button>
              </Link>
            </div>
          </Reveal>

          <Reveal animation="fade-up" delay={600} duration={700}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Free 14-day trial
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Isolated per-company workspaces
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Real MySQL saas_db persistence
              </span>
            </div>
          </Reveal>

          {/* Interactive Live Product Preview Showcase */}
          <div id="preview" className="mt-14 max-w-5xl mx-auto">
            <Reveal animation="flip-up" delay={200} duration={900}>
              <div className="rounded-3xl border border-slate-200/90 bg-white shadow-2xl overflow-hidden text-left">
                <div className="px-4 sm:px-6 py-3.5 bg-slate-50/90 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="ml-2 text-xs font-medium text-slate-400 hidden sm:inline">
                      Live Preview — Click cards to advance columns
                    </span>
                  </div>

                  <div className="inline-flex p-1 rounded-xl bg-white border border-slate-200/80 gap-1">
                    {[
                      { id: 'board', label: 'Live Kanban' },
                      { id: 'companies', label: 'Companies' },
                      { id: 'team', label: 'Team RBAC' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setPreviewTab(tab.id as PreviewTab)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          previewTab === tab.id
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 sm:p-8 bg-white min-h-[360px]">
                  {previewTab === 'board' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                      {(
                        [
                          { id: 'todo', title: 'To Do', dot: 'bg-sky-500' },
                          { id: 'in_progress', title: 'In Progress', dot: 'bg-indigo-600' },
                          { id: 'done', title: 'Done', dot: 'bg-emerald-500' },
                        ] as const
                      ).map((col) => {
                        const colCards = demoCards.filter((c) => c.col === col.id);
                        return (
                          <div
                            key={col.id}
                            className="rounded-2xl bg-slate-50/70 border border-slate-200/70 p-3.5 space-y-2.5"
                          >
                            <div className="flex items-center justify-between px-1">
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                                <span className="text-xs font-bold text-slate-800">{col.title}</span>
                              </div>
                              <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200/70 text-[10px] font-bold text-slate-500">
                                {colCards.length}
                              </span>
                            </div>
                            {colCards.map((c) => (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => cycleDemoCard(c.code)}
                                className="w-full text-left p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-soft hover:-translate-y-0.5 hover:shadow-soft-hover hover:border-indigo-300 transition-all duration-200 group"
                              >
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-[10px] font-bold text-slate-400">{c.code}</span>
                                  <Badge tone={c.tone}>{c.prio}</Badge>
                                </div>
                                <p className="text-xs font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                                  {c.title}
                                </p>
                                <p className="text-[10px] text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  Click to move →
                                </p>
                              </button>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {previewTab === 'companies' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                      {[
                        {
                          name: 'OrbitTech Product',
                          industry: 'SaaS Engineering',
                          role: 'Owner (Full Admin)',
                          projects: 3,
                          tasks: 4,
                          accent: '#4F46E5',
                        },
                        {
                          name: 'Nova Creative Studio',
                          industry: 'Design & Brand Agency',
                          role: 'Owner (Full Admin)',
                          projects: 1,
                          tasks: 1,
                          accent: '#0EA5E9',
                        },
                      ].map((co) => (
                        <Card key={co.name} interactive>
                          <div className="flex items-center gap-3 mb-3">
                            <span
                              className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                              style={{ backgroundColor: co.accent }}
                            />
                            <div>
                              <p className="text-sm font-bold text-slate-900">{co.name}</p>
                              <p className="text-xs text-slate-500">{co.industry}</p>
                            </div>
                          </div>
                          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <span>{co.role}</span>
                            <span className="font-semibold text-slate-900">
                              {co.projects} projects • {co.tasks} tasks
                            </span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {previewTab === 'team' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fade-in">
                      {[
                        { name: 'Amina Rahman', role: 'owner', title: 'VP of Product', init: 'AR', bg: 'bg-indigo-600' },
                        { name: 'Liam Carter', role: 'admin', title: 'Staff Frontend Architect', init: 'LC', bg: 'bg-sky-600' },
                        { name: 'Sofia Chen', role: 'member', title: 'Laravel Architect', init: 'SC', bg: 'bg-emerald-600' },
                      ].map((m) => (
                        <Card key={m.name} interactive>
                          <div className="flex items-center justify-between mb-3">
                            <Avatar initials={m.init} colorClass={m.bg} status="online" />
                            <Badge tone={m.role === 'owner' ? 'indigo' : 'neutral'}>{m.role}</Badge>
                          </div>
                          <p className="text-sm font-bold text-slate-900">{m.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{m.title}</p>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Visual Feature Spotlight (Image + Copy Showcase) */}
      <section className="py-24 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Spotlight 1: Kanban & Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal animation="fade-right" duration={800}>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                  <LayoutDashboard className="w-3.5 h-3.5" /> High-Velocity Execution
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Drag, drop, and conquer your sprint deliverables.
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Experience lightweight Kanban workflows with instant card animations, multi-tagging,
                  and subtask checklists. Every move syncs seamlessly with your MySQL backend.
                </p>
                <div className="pt-2 space-y-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Instant card elevation & state transitions
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Right-side slide-over detail drawer for comments & subtasks
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal animation="fade-left" delay={200} duration={800}>
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern Kanban Product Management UI"
                  className="w-full h-80 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs uppercase font-bold tracking-wider text-indigo-300">Fluid Kanban</p>
                    <p className="text-sm font-semibold">Real-time status synchronizations with zero lag</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Spotlight 2: Timeline & Roadmaps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal animation="fade-right" delay={200} duration={800} className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
                  alt="Gantt Timeline and Roadmap Scheduling"
                  className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs uppercase font-bold tracking-wider text-sky-300">Gantt Roadmaps</p>
                    <p className="text-sm font-semibold">Multi-month delivery charts across multiple teams</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal animation="fade-left" duration={800} className="order-1 lg:order-2">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold">
                  <CalendarDays className="w-3.5 h-3.5" /> Long-Term Clarity
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Keep initiatives on track with visual timelines.
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Never miss a delivery date. Visually map initiatives, track progress indicators,
                  and inspect critical path deliverables directly from the timeline view.
                </p>
                <div className="pt-2 space-y-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Configurable time horizons: Weeks, Months, Quarters
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Color-coded project bars with instant detail drawer inspection
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* 3-Step Workflow */}
      <section id="workflow" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal animation="fade-down" duration={600}>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <Badge tone="indigo" dot>
                3-Step Launch
              </Badge>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
                From signup to shipping in under 60 seconds
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Every founder gets instant company ownership and fine-grained team controls.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: <Lock className="w-5 h-5 text-indigo-600" />,
                title: 'Create Your Account',
                desc: 'Register with your name and email. Zero setup friction with token-backed authentication.',
                anim: 'fade-right' as const,
              },
              {
                step: '02',
                icon: <Building2 className="w-5 h-5 text-indigo-600" />,
                title: 'Create Your Company',
                desc: 'Launch one or many isolated company groups. The creator automatically becomes Owner (Admin).',
                anim: 'fade-up' as const,
              },
              {
                step: '03',
                icon: <Users className="w-5 h-5 text-indigo-600" />,
                title: 'Create Members & Ship',
                desc: 'Add teammates directly as Admins, Members, or Viewers and collaborate on Kanban & Roadmaps.',
                anim: 'fade-left' as const,
              },
            ].map((item, index) => (
              <Reveal key={item.step} animation={item.anim} delay={index * 150} duration={750}>
                <Card interactive padding="lg" className="group h-full">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      {item.icon}
                    </div>
                    <span className="text-xs font-extrabold text-slate-300">{item.step}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Features Grid */}
      <section id="features" className="py-24 border-t border-slate-100 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal animation="zoom-in" duration={600}>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Built for focus, scale, and absolute clarity
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Every primitive is engineered for speed on a clean white workspace.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
                title: 'Strict Tenant Isolation',
                desc: 'Company A and Company B never cross paths—enforced by Laravel Policies and scoped queries.',
                anim: 'fade-up' as const,
              },
              {
                icon: <Kanban className="w-5 h-5 text-sky-600" />,
                title: 'Fluid Kanban Boards',
                desc: 'Drag tasks across customizable workflow stages with optimistic updates and live badges.',
                anim: 'fade-up' as const,
              },
              {
                icon: <GanttChartSquare className="w-5 h-5 text-emerald-600" />,
                title: 'Multi-Month Timelines',
                desc: 'Visual roadmap scheduling spanning weeks and months so deadlines never slip.',
                anim: 'fade-up' as const,
              },
              {
                icon: <Users className="w-5 h-5 text-amber-600" />,
                title: 'Role-Based Permissions',
                desc: 'Owner, Admin, Member, and Viewer scopes keep company settings and projects safe.',
                anim: 'fade-up' as const,
              },
              {
                icon: <FolderKanban className="w-5 h-5 text-rose-600" />,
                title: 'Task Drawers & Checklists',
                desc: 'Slide-over detail drawers unite subtasks, comments, priorities, and due dates.',
                anim: 'fade-up' as const,
              },
              {
                icon: <Layers className="w-5 h-5 text-violet-600" />,
                title: 'Decoupled Architecture',
                desc: 'Next.js + TypeScript frontend paired cleanly with PHP Laravel + MySQL REST APIs.',
                anim: 'fade-up' as const,
              },
            ].map((f, i) => (
              <Reveal key={f.title} animation={f.anim} delay={i * 100} duration={650}>
                <Card interactive padding="lg" className="group h-full">
                  <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    {f.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{f.title}</h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{f.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section with Interactive Monthly/Annual Switch */}
      <section id="pricing" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal animation="fade-down" duration={600}>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Simple, predictable SaaS pricing
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Start free with your first company and upgrade anytime as your team grows.
              </p>

              {/* Billing Cycle Switch */}
              <div className="mt-6 inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200/70">
                <button
                  onClick={() => setAnnualBilling(false)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    !annualBilling ? 'bg-white text-slate-900 shadow-soft' : 'text-slate-500'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setAnnualBilling(true)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    annualBilling ? 'bg-white text-slate-900 shadow-soft' : 'text-slate-500'
                  }`}
                >
                  Annual
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                    -20%
                  </span>
                </button>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$0',
                period: 'forever',
                highlight: false,
                features: ['Up to 5 company members', '3 active projects', 'Kanban & List views'],
                cta: 'Start Free',
                anim: 'fade-right' as const,
              },
              {
                name: 'Pro SaaS',
                price: annualBilling ? '$14' : '$18',
                period: 'per seat / mo',
                highlight: true,
                features: [
                  'Unlimited company members',
                  'Unlimited projects & tasks',
                  'Multi-month Timeline & RBAC',
                  'Priority support',
                ],
                cta: 'Launch Pro Trial',
                anim: 'zoom-in' as const,
              },
              {
                name: 'Enterprise',
                price: annualBilling ? '$36' : '$45',
                period: 'per seat / mo',
                highlight: false,
                features: [
                  'Dedicated tenant isolation',
                  'Custom audit logs & SSO',
                  'Dedicated onboarding SLA',
                ],
                cta: 'Get Started',
                anim: 'fade-left' as const,
              },
            ].map((tier, idx) => (
              <Reveal key={tier.name} animation={tier.anim} delay={idx * 150} duration={800}>
                <Card
                  interactive
                  padding="lg"
                  className={`flex flex-col justify-between h-full ${
                    tier.highlight ? 'border-indigo-500 ring-4 ring-indigo-500/10' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900">{tier.name}</h3>
                      {tier.highlight && (
                        <Badge tone="indigo" dot pulse>
                          Most Popular
                        </Badge>
                      )}
                    </div>
                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        {tier.price}
                      </span>
                      <span className="text-xs text-slate-500">{tier.period}</span>
                    </div>
                    <ul className="mt-6 space-y-2.5">
                      {tier.features.map((feat) => (
                        <li key={feat} className="text-xs text-slate-600 flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/register" className="mt-8 block">
                    <Button variant={tier.highlight ? 'primary' : 'secondary'} className="w-full">
                      {tier.cta}
                    </Button>
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section id="faq" className="py-20 bg-slate-50/40 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Reveal animation="fade-down" duration={600}>
            <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-10">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <div className="space-y-3">
            {FAQS.map((item, idx) => {
              const open = openFaq === idx;
              return (
                <Reveal key={item.q} animation="fade-up" delay={idx * 100} duration={500}>
                  <Card padding="none" className="overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(open ? null : idx)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 hover:bg-slate-50/60 transition-colors"
                    >
                      <span className="text-sm font-semibold text-slate-900">{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          open ? 'rotate-180 text-indigo-600' : ''
                        }`}
                      />
                    </button>
                    {open && (
                      <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed animate-fade-in">
                        {item.a}
                      </div>
                    )}
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Reveal animation="zoom-in" duration={700}>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 mb-3">
              <Zap className="w-3.5 h-3.5" /> Ready when you are
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Create your company workspace today
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Start free, invite your team, and ship every project on schedule.
            </p>
            <div className="mt-7 flex justify-center gap-3">
              <Link href="/register">
                <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Create Free Account
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            OrbitFlow SaaS Platform
          </div>
          <p>© {new Date().getFullYear()} OrbitFlow. Universal Reusable Project Management.</p>
        </div>
      </footer>
    </div>
  );
}
