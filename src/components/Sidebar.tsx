import React from 'react';
import { useCollege } from '../context/CollegeContext';
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  Clock,
  Calendar,
  User,
  FolderGit2,
  PlusCircle,
} from 'lucide-react';
import { ActivePage } from '../types';

export const Sidebar: React.FC = () => {
  const { user, activePage, setActivePage, assignments } = useCollege();

  const pendingAssignmentsCount = assignments.filter((a) => !a.isSubmitted).length;

  const navItems: { label: string; page: ActivePage; icon: React.ReactNode; badge?: number }[] = [
    {
      label: 'Overview',
      page: 'dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      label: 'Notes library',
      page: 'notes',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      label: 'Assignments',
      page: 'assignments',
      icon: <CheckSquare className="w-4 h-4" />,
      badge: pendingAssignmentsCount > 0 ? pendingAssignmentsCount : undefined,
    },
    {
      label: 'Attendance',
      page: 'attendance',
      icon: <Clock className="w-4 h-4" />,
    },
    {
      label: 'Campus events',
      page: 'events',
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      label: 'College projects',
      page: 'projects',
      icon: <FolderGit2 className="w-4 h-4" />,
    },
    {
      label: 'My profile',
      page: 'profile',
      icon: <User className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-stone-200 shrink-0 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="p-5">
        {/* Section title */}
        <div className="text-[11px] font-semibold tracking-wider text-[#6B7280] uppercase mb-3 px-2">
          STUDENT SPACE
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activePage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => setActivePage(item.page)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#EBF5EE] text-[#1B5E38] font-semibold'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-[#1B5E38]' : 'text-stone-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="text-[11px] px-1.5 py-0.5 rounded font-mono bg-stone-100 text-stone-700">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Fast Action: Upload Notes */}
        <div className="mt-6 pt-5 border-t border-stone-100">
          <button
            onClick={() => setActivePage('upload')}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border border-dashed border-[#1B5E38] text-[#1B5E38] hover:bg-[#EBF5EE] transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Share Class Notes</span>
          </button>
        </div>
      </div>

      {/* User profile snippet at bottom */}
      <div className="p-4 border-t border-stone-200 bg-stone-50/50">
        <button
          onClick={() => setActivePage('profile')}
          className="w-full flex items-center gap-3 p-1.5 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer text-left"
        >
          {/* User Initials Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#1B5E38] text-white flex items-center justify-center font-bold text-sm tracking-wider shrink-0 shadow-xs">
            {user?.avatarInitials || 'ST'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-[#1E1E1E] truncate uppercase leading-tight">
              {user?.name || 'STUDENT'}
            </div>
            <div className="text-[11px] text-[#6B7280] truncate font-mono mt-0.5">
              {user?.studentId || 'ID: 2023-000'}
            </div>
          </div>
        </button>
      </div>
    </aside>
  );
};
