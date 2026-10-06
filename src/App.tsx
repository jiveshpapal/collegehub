/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CollegeProvider, useCollege } from './context/CollegeContext';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { AssignmentsView } from './components/AssignmentsView';
import { NotesLibraryView } from './components/NotesLibraryView';
import { UploadNotesView } from './components/UploadNotesView';
import { CampusEventsView } from './components/CampusEventsView';
import { AttendanceView } from './components/AttendanceView';
import { ProjectsView } from './components/ProjectsView';
import { ProfileView } from './components/ProfileView';
import { AuthView } from './components/AuthView';
import { NotePreviewModal } from './components/NotePreviewModal';
import { ToastContainer } from './components/Toast';

const AppContent: React.FC = () => {
  const { user, activePage } = useCollege();

  // If unauthenticated, show clean login / signup
  if (!user) {
    return (
      <>
        <AuthView />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col font-sans text-[#1E1E1E]">
      {/* Top Bar */}
      <TopBar />

      {/* Main Split Layout: Left Sidebar + Main Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {activePage === 'dashboard' && <DashboardView />}
          {activePage === 'assignments' && <AssignmentsView />}
          {activePage === 'notes' && <NotesLibraryView />}
          {activePage === 'upload' && <UploadNotesView />}
          {activePage === 'events' && <CampusEventsView />}
          {activePage === 'attendance' && <AttendanceView />}
          {activePage === 'projects' && <ProjectsView />}
          {activePage === 'profile' && <ProfileView />}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <NotePreviewModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <CollegeProvider>
      <AppContent />
    </CollegeProvider>
  );
}
