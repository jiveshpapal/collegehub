import React, { useState } from 'react';
import { useCollege } from '../context/CollegeContext';
import { BookOpen, LogOut, Menu, X } from 'lucide-react';
import { ActivePage } from '../types';

export const TopBar: React.FC = () => {
  const { user, activePage, setActivePage, logout } = useCollege();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: ActivePage }[] = [
    { label: 'Dashboard', page: 'dashboard' },
    { label: 'Assignments', page: 'assignments' },
    { label: 'Campus events', page: 'events' },
    { label: 'Projects', page: 'projects' },
    { label: 'Profile', page: 'profile' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage('dashboard')}
            className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#1B5E38] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-[#1E1E1E]">
                CollegeHub
              </span>
              <span className="hidden sm:inline-block text-[11px] font-medium text-[#6B7280] ml-2 pl-2 border-l border-stone-300">
                Student Portal
              </span>
            </div>
          </button>
        </div>

        {/* Center / Right: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((item) => {
            const isActive = activePage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => setActivePage(item.page)}
                className={`transition-colors cursor-pointer py-1 ${
                  isActive
                    ? 'text-[#1B5E38] font-semibold border-b-2 border-[#1B5E38]'
                    : 'text-[#6B7280] hover:text-[#1E1E1E]'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Sign out */}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-red-700 cursor-pointer ml-2 pl-3 border-l border-stone-200 transition-colors"
            title="Sign out of student account"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-600 hover:text-stone-900 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((item) => (
            <button
              key={item.page}
              onClick={() => {
                setActivePage(item.page);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                activePage === item.page
                  ? 'bg-[#EBF5EE] text-[#1B5E38]'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setActivePage('notes');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-sm text-stone-700 hover:bg-stone-50"
          >
            Notes library
          </button>
          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Sign out ({user?.name.split(' ')[0]})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
