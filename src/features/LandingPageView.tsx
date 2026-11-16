'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Building2,
    Check,
    FolderKanban,
    GanttChartSquare,
    Kanban,
    Lock,
    ShieldCheck,
    Sparkles,
    Users,
    Zap,
} from 'lucide-react';
import { Avatar, Badge, Button, Card, ProgressBar } from '@/ui';

type PreviewTab = 'board' | 'companies' | 'team';

export function LandingPageView() {
    const [previewTab, setPreviewTab] = useState<PreviewTab>('board');

    return (
        <div className="min-h-screen bg-white text-slate-900">
            {/* Sticky White Header */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/70">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="text-base font-bold tracking-tight text-slate-900">OrbitFlow</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <a href="#workflow" className="hover:text-slate-900 transition-colors">
                            How It Works
                        </a>
                        <a href="#features" className="hover:text-slate-900 transition-colors">
                            Features
                        </a>
                        <a href="#pricing" className="hover:text-slate-900 transition-colors">
                            Pricing
                        </a>
                    </nav>

                    <div className="flex items-center gap-2.5">
                        <Link href="/login">
                            <Button variant="ghost" size="sm">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                                Start Free
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-200/70 text-xs font-semibold text-indigo-700 mb-6 animate-fade-in">
                        <Zap className="w-3.5 h-3.5" />
                        Multi-Company Project Management SaaS
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.1]">
                        Run every company, team, and project on{' '}
                        <span className="text-indigo-600">one clean workspace.</span>
                    </h1>

                    <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Sign up in seconds, create your own company workspace as Owner, onboard team members
                        with custom roles, and ship faster with Kanban boards and multi-month roadmaps.
                    </p>

                    <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                        <Link href="/register">
                            <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                                Create Your Company Free
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="secondary" size="lg">
                                Try Live Demo Account
                            </Button>
                        </Link>
                    </div>

                    <p className="mt-4 text-xs text-slate-400">
                        Free starter tier for up to 5 members • No credit card required
                    </p>

                    {/* Interactive Live Product Preview Window */}
                    <div className="mt-14 max-w-5xl mx-auto rounded-3xl border border-slate-200/90 bg-white shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] overflow-hidden text-left animate-slide-up">
                        {/* Browser Bar + Interactive Tabs */}
                        <div className="px-4 sm:px-6 py-3.5 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                <span className="ml-3 text-xs font-medium text-slate-400 hidden sm:inline">
                                    app.orbitflow.io
                                </span>
                            </div>

                            <div className="inline-flex p-1 rounded-xl bg-white border border-slate-200/80 gap-1">
                                {[
                                    { id: 'board', label: 'Kanban Board' },
                                    { id: 'companies', label: 'Multi-Company Switcher' },
                                    { id: 'team', label: 'Admin & Members' },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setPreviewTab(tab.id as PreviewTab)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${previewTab === tab.id
                                                ? 'bg-indigo-600 text-white shadow-xs'
                                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Preview Body */}
                        <div className="p-6 sm:p-8 bg-white min-h-[320px]">
                            {previewTab === 'board' && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                                    {[
                                        {
                                            title: 'To Do',
                                            dot: 'bg-sky-500',
                                            cards: [
                                                { code: 'CORE-104', name: 'Webhook delivery queue', prio: 'medium', tone: 'sky' as const },
                                                { code: 'UIX-208', name: 'Keyboard command search', prio: 'low', tone: 'neutral' as const },
                                            ],
                                        },
                                        {
                                            title: 'In Progress',
                                            dot: 'bg-indigo-600',
                                            cards: [
                                                { code: 'CORE-102', name: 'Sanctum multi-tenant guards', prio: 'urgent', tone: 'rose' as const },
                                            ],
                                        },
                                        {
                                            title: 'Done',
                                            dot: 'bg-emerald-500',
                                            cards: [
                                                { code: 'CORE-101', name: 'MySQL tenant isolation schema', prio: 'high', tone: 'amber' as const },
                                                { code: 'UIX-201', name: 'White-canvas design system', prio: 'medium', tone: 'sky' as const },
                                            ],
                                        },
                                    ].map((col) => (
                                        <div
                                            key={col.title}
                                            className="rounded-2xl bg-slate-50/70 border border-slate-200/70 p-3.5 space-y-2.5"
                                        >
                                            <div className="flex items-center justify-between px-1">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                                                    <span className="text-xs font-semibold text-slate-800">{col.title}</span>
                                                </div>
                                                <span className="text-[11px] font-semibold text-slate-400">
                                                    {col.cards.length}
                                                </span>
                                            </div>
                                            {col.cards.map((c) => (
                                                <div
                                                    key={c.code}
                                                    className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-soft hover:-translate-y-0.5 hover:border-indigo-300 transition-all"
                                                >
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <span className="text-[10px] font-bold text-slate-400">{c.code}</span>
                                                        <Badge tone={c.tone}>{c.prio}</Badge>
                                                    </div>
                                                    <p className="text-xs font-semibold text-slate-900">{c.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {previewTab === 'companies' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
                                    {[
                                        {
                                            name: 'OrbitTech Product',
                                            role: 'OWNER (ADMIN)',
                                            plan: 'Pro SaaS',
                                            color: '#4F46E5',
                                            progress: 78,
                                            members: 8,
                                        },
                                        {
                                            name: 'Nova Creative Studio',
                                            role: 'OWNER (ADMIN)',
                                            plan: 'Enterprise',
                                            color: '#0EA5E9',
                                            progress: 62,
                                            members: 14,
                                        },
                                    ].map((co) => (
                                        <Card key={co.name} interactive>
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2.5">
                                                    <span
                                                        className="w-3 h-3 rounded-full"
                                                        style={{ backgroundColor: co.color }}
                                                    />
                                                    <h4 className="text-sm font-bold text-slate-900">{co.name}</h4>
                                                </div>
                                                <Badge tone="indigo">{co.role}</Badge>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-3">
                                                Isolated database scope • {co.members} team members • {co.plan}
                                            </p>
                                            <ProgressBar value={co.progress} />
                                        </Card>
                                    ))}
                                </div>
                            )}

                            {previewTab === 'team' && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
                                    {[
                                        { name: 'Amina Rahman', role: 'owner', title: 'Founder & Admin', init: 'AR', bg: 'bg-indigo-600' },
                                        { name: 'Liam Carter', role: 'admin', title: 'Engineering Lead', init: 'LC', bg: 'bg-sky-600' },
                                        { name: 'Sofia Chen', role: 'member', title: 'Backend Developer', init: 'SC', bg: 'bg-emerald-600' },
                                    ].map((m) => (
                                        <Card key={m.name} interactive>
                                            <div className="flex items-center justify-between mb-3">
                                                <Avatar initials={m.init} colorClass={m.bg} status="online" />
                                                <Badge tone={m.role === 'owner' ? 'indigo' : 'neutral'}>{m.role}</Badge>
                                            </div>
                                            <p className="text-sm font-semibold text-slate-900">{m.name}</p>
                                            <p className="text-xs text-slate-500">{m.title}</p>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3-Step Workflow Section */}
            <section id="workflow" className="py-20 border-t border-slate-100 bg-slate-50/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <Badge tone="indigo">Simple Onboarding</Badge>
                        <h2 className="text-3xl font-bold text-slate-900 mt-3 tracking-tight">
                            Launch your company workspace in 3 steps
                        </h2>
                        <p className="text-sm text-slate-500 mt-2">
                            Designed for founders, agencies, and engineering leaders who need instant structure.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                step: '01',
                                icon: <Lock className="w-5 h-5 text-indigo-600" />,
                                title: 'Create Your Account',
                                desc: 'Sign up with your name and work email in under 15 seconds with secure token authentication.',
                            },
                            {
                                step: '02',
                                icon: <Building2 className="w-5 h-5 text-indigo-600" />,
                                title: 'Create Your Company',
                                desc: 'Start one or multiple isolated company groups. You automatically become the Owner & Admin.',
                            },
                            {
                                step: '03',
                                icon: <Users className="w-5 h-5 text-indigo-600" />,
                                title: 'Create Members & Ship',
                                desc: 'Add teammates with Admin, Member, or Viewer permissions and manage projects on Kanban & Timelines.',
                            },
                        ].map((item) => (
                            <Card key={item.step} interactive padding="lg">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <span className="text-xs font-bold text-slate-300">{item.step}</span>
                                </div>
                                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                            Everything modern teams need—nothing they don’t
                        </h2>
                        <p className="text-sm text-slate-500 mt-2">
                            Clean white surfaces built for deep focus, speed, and enterprise tenant isolation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
                                title: 'Strict Tenant Isolation',
                                desc: 'Every company has its own isolated projects, tasks, members, and activity logs enforced by policy.',
                            },
                            {
                                icon: <Kanban className="w-5 h-5 text-sky-600" />,
                                title: 'Drag-and-Drop Kanban',
                                desc: 'Move deliverables across Backlog, To Do, In Progress, Review, and Done with instant sync.',
                            },
                            {
                                icon: <GanttChartSquare className="w-5 h-5 text-emerald-600" />,
                                title: 'Multi-Month Timeline',
                                desc: 'Visualize overlapping project schedules and target deadlines across weeks and months.',
                            },
                            {
                                icon: <Users className="w-5 h-5 text-amber-600" />,
                                title: 'Role-Based Access Control',
                                desc: 'Assign Owner, Admin, Member, or Viewer roles—protecting sensitive company settings.',
                            },
                            {
                                icon: <FolderKanban className="w-5 h-5 text-rose-600" />,
                                title: 'Checklists & Discussions',
                                desc: 'Slide-over task drawers keep subtasks, comments, priorities, and due dates one click away.',
                            },
                            {
                                icon: <Building2 className="w-5 h-5 text-violet-600" />,
                                title: 'Multiple Companies, One Login',
                                desc: 'Switch seamlessly between every company you founded or joined from a single sidebar.',
                            },
                        ].map((f) => (
                            <Card key={f.title} interactive padding="lg">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-4">
                                    {f.icon}
                                </div>
                                <h3 className="text-sm font-bold text-slate-900">{f.title}</h3>
                                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{f.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 border-t border-slate-100 bg-slate-50/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                            Transparent SaaS Pricing
                        </h2>
                        <p className="text-sm text-slate-500 mt-2">
                            Start free with your first company and scale seats anytime.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                name: 'Starter',
                                price: '$0',
                                period: 'forever',
                                highlight: false,
                                features: ['Up to 5 company members', '3 active projects', 'Kanban & List views'],
                                cta: 'Start Free',
                            },
                            {
                                name: 'Pro SaaS',
                                price: '$18',
                                period: 'per seat / mo',
                                highlight: true,
                                features: [
                                    'Unlimited company members',
                                    'Unlimited projects & tasks',
                                    'Multi-month Timeline & RBAC',
                                    'Priority support',
                                ],
                                cta: 'Launch Pro Trial',
                            },
                            {
                                name: 'Enterprise',
                                price: '$45',
                                period: 'per seat / mo',
                                highlight: false,
                                features: [
                                    'Dedicated tenant isolation',
                                    'Custom audit logs & SSO',
                                    'Dedicated onboarding SLA',
                                ],
                                cta: 'Get Started',
                            },
                        ].map((tier) => (
                            <Card
                                key={tier.name}
                                padding="lg"
                                className={`flex flex-col justify-between ${tier.highlight ? 'border-indigo-500 ring-4 ring-indigo-500/10' : ''
                                    }`}
                            >
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base font-bold text-slate-900">{tier.name}</h3>
                                        {tier.highlight && <Badge tone="indigo">Most Popular</Badge>}
                                    </div>
                                    <div className="mt-4 flex items-baseline gap-1.5">
                                        <span className="text-3xl font-extrabold text-slate-900">{tier.price}</span>
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
                                    <Button
                                        variant={tier.highlight ? 'primary' : 'secondary'}
                                        className="w-full"
                                        size="md"
                                    >
                                        {tier.cta}
                                    </Button>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA & Footer */}
            <section className="py-16 bg-white border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        Ready to organize your company?
                    </h2>
                    <p className="text-sm text-slate-500 mt-2">
                        Create your account, launch your workspace, and invite your team in minutes.
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                        <Link href="/register">
                            <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                                Create Free Account
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="border-t border-slate-100 py-8 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                    <div className="flex items-center gap-2 font-semibold text-slate-700">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        OrbitFlow SaaS Platform
                    </div>
                    <p>© {new Date().getFullYear()} OrbitFlow. Universal Reusable Project Management.</p>
                </div>
            </footer>
        </div>
    );
}