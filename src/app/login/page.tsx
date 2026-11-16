'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Button, Card, Input } from '@/ui';
import { useWorkspace } from '@/features/WorkspaceContext';

export default function LoginPage() {
  const { login } = useWorkspace();
  const [email, setEmail] = useState('amina@orbittech.io');
  const [password, setPassword] = useState('password123');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-auth-enter shadow-soft" padding="lg">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-none">Sign in to OrbitFlow</h1>
            <p className="text-xs text-slate-500 mt-1">Access your companies & projects</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" size="lg" loading={submitting}>
            Sign In
          </Button>
        </form>

        <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px] text-slate-600 space-y-1">
          <p className="font-semibold text-slate-800">Demo Accounts (password: password123)</p>
          <p>• Owner (OrbitTech): <code>amina@orbittech.io</code></p>
          <p>• Owner (Nova Studio): <code>elena@novastudio.co</code></p>
        </div>

        <p className="text-xs text-center text-slate-500 mt-5">
          New here?{' '}
          <Link href="/register" className="font-semibold text-indigo-600 hover:underline">
            Create an account & company
          </Link>
        </p>
      </Card>
    </div>
  );
}
