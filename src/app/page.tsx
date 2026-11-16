'use client';

import { DashboardView } from '@/features/DashboardView';
import { LandingPageView } from '@/features/LandingPageView';
import { useWorkspace } from '@/features/WorkspaceContext';

export default function HomePage() {
  const { user, loading } = useWorkspace();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-7 h-7 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return user ? <DashboardView /> : <LandingPageView />;
}
