'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Button, Card, Input } from '@/ui';
import { useWorkspace } from '@/features/WorkspaceContext';

export default function RegisterPage() {
  const { register } = useWorkspace();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await register(name, email, password);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md" padding="lg">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-none">Create Your Account</h1>
            <p className="text-xs text-slate-500 mt-1">
              Create your own company & invite team members
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="e.g., Tanvir Ahmed"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Work Email"
            type="email"
            placeholder="tanvir@mycompany.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Minimum 6 characters"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" size="lg" loading={submitting}>
            Create Account
          </Button>
        </form>

        <p className="text-xs text-center text-slate-500 mt-5">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-indigo-600 hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
