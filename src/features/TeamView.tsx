'use client';

import React, { useState } from 'react';
import { Mail, Shield, Trash2, UserPlus } from 'lucide-react';
import { MemberRole } from '@/contracts';
import { Avatar, Badge, Button, Card, Input, Modal, Select } from '@/ui';
import { useWorkspace } from './WorkspaceContext';

export function TeamView() {
  const {
    user,
    members,
    tasks,
    canManageCompany,
    createMember,
    updateMemberRole,
    removeMember,
  } = useWorkspace();

  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [title, setTitle] = useState('');
  const [role, setRole] = useState<MemberRole>('member');
  const [submitting, setSubmitting] = useState(false);

  const handleCreateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    try {
      await createMember({
        name: name.trim(),
        email: email.trim(),
        password: password.trim() || 'password123',
        role,
        title: title.trim() || 'Team Member',
      });
      setName('');
      setEmail('');
      setPassword('password123');
      setTitle('');
      setCreateOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Company Team & Roles
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Owners and Admins can create member accounts, assign roles, and manage access.
          </p>
        </div>
        {canManageCompany && (
          <Button leftIcon={<UserPlus className="w-4 h-4" />} onClick={() => setCreateOpen(true)}>
            Create Member
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {members.map((member) => {
          const assignedCount = tasks.filter(
            (t) => t.assigneeId === member.id && t.status !== 'done'
          ).length;
          const isSelf = member.userId === user?.id;

          return (
            <Card key={member.id} interactive>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar
                    initials={member.initials}
                    colorClass={member.avatarColor}
                    size="lg"
                    status={member.status}
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {member.name} {isSelf && <span className="text-xs text-indigo-600">(You)</span>}
                    </h3>
                    <p className="text-xs text-slate-500">{member.title}</p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                      <Mail className="w-3 h-3" />
                      {member.email}
                    </p>
                  </div>
                </div>
                <Badge tone={member.role === 'owner' ? 'indigo' : 'neutral'}>
                  {member.role}
                </Badge>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500">
                  <strong className="text-slate-800">{assignedCount}</strong> open tasks
                </span>

                <div className="flex items-center gap-2">
                  {canManageCompany && !isSelf ? (
                    <>
                      <div className="flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5 text-slate-400" />
                        <select
                          value={member.role}
                          onChange={(e) => updateMemberRole(member.id, e.target.value as MemberRole)}
                          className="h-8 px-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-indigo-500"
                        >
                          <option value="owner">Owner</option>
                          <option value="admin">Admin</option>
                          <option value="member">Member</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </div>
                      <button
                        onClick={() => removeMember(member.id)}
                        title="Remove from company"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <span className="text-[11px] text-slate-400 uppercase">{member.role}</span>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create Company Member"
        subtitle="Creates a user account (if new) and adds them to this company."
      >
        <form onSubmit={handleCreateMember} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="e.g., Rafiq Hasan"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="rafiq@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Initial Password (for new accounts)"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Job Title"
              placeholder="Backend Engineer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Select
              label="Company Role"
              value={role}
              onChange={(e) => setRole(e.target.value as MemberRole)}
            >
              <option value="admin">Admin</option>
              <option value="member">Member</option>
              <option value="viewer">Viewer</option>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              Create Member
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
