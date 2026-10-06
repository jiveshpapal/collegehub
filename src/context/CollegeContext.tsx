import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  DEFAULT_USER,
  INITIAL_ASSIGNMENTS,
  INITIAL_ATTENDANCE,
  INITIAL_EVENTS,
  INITIAL_NOTES,
  INITIAL_PROJECTS,
} from '../data/seedData';
import {
  ActivePage,
  Assignment,
  AttendanceRecord,
  CampusEvent,
  CollegeProject,
  NoteItem,
  User,
} from '../types';

interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'warning';
}

interface CollegeContextType {
  user: User | null;
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  // Auth
  login: (email: string, password: string) => boolean;
  demoLogin: () => void;
  signup: (userData: Omit<User, 'id' | 'avatarInitials'>, password: string) => void;
  logout: () => void;
  updateUser: (updated: Partial<User>) => void;
  // Assignments
  assignments: Assignment[];
  toggleAssignmentSubmitted: (id: string) => void;
  addAssignment: (asg: Omit<Assignment, 'id' | 'isSubmitted'>) => void;
  // Notes
  notes: NoteItem[];
  addNote: (note: Omit<NoteItem, 'id' | 'uploadDate' | 'downloadsCount'>) => void;
  previewNote: NoteItem | null;
  setPreviewNote: (note: NoteItem | null) => void;
  downloadNote: (note: NoteItem) => void;
  // Events
  events: CampusEvent[];
  toggleRsvp: (id: string) => void;
  // Attendance
  attendanceRecords: AttendanceRecord[];
  logAttendance: (id: string, isPresent: boolean) => void;
  overallAttendancePercentage: number;
  // Projects
  projects: CollegeProject[];
  submitProject: (project: Omit<CollegeProject, 'id' | 'status' | 'submittedDate'>) => void;
  // Toast
  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const CollegeContext = createContext<CollegeContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'collegehub_user',
  ASSIGNMENTS: 'collegehub_assignments',
  NOTES: 'collegehub_notes',
  EVENTS: 'collegehub_events',
  ATTENDANCE: 'collegehub_attendance',
  PROJECTS: 'collegehub_projects',
};

export const CollegeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize user from localStorage or default test student
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
      return DEFAULT_USER; // Logged in by default as Krishna for immediate interactivity
    } catch {
      return DEFAULT_USER;
    }
  });

  const [activePage, setActivePage] = useState<ActivePage>('dashboard');

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
      return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
    } catch {
      return INITIAL_ASSIGNMENTS;
    }
  });

  const [notes, setNotes] = useState<NoteItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTES);
      return saved ? JSON.parse(saved) : INITIAL_NOTES;
    } catch {
      return INITIAL_NOTES;
    }
  });

  const [previewNote, setPreviewNote] = useState<NoteItem | null>(null);

  const [events, setEvents] = useState<CampusEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
      return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
    } catch {
      return INITIAL_ATTENDANCE;
    }
  });

  const [projects, setProjects] = useState<CollegeProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  // Toast helper
  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth actions
  const login = (email: string, _password: string): boolean => {
    const defaultInitials = email.substring(0, 2).toUpperCase();
    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0].replace(/[._]/g, ' ').toUpperCase(),
      studentId: 'IT-2023-099',
      email: email,
      department: 'Information Technology',
      yearSemester: 'Year 3, Semester 5',
      avatarInitials: defaultInitials,
    };
    setUser(newUser);
    setActivePage('dashboard');
    showToast(`Welcome back, ${newUser.name}!`, 'success');
    return true;
  };

  const demoLogin = () => {
    setUser(DEFAULT_USER);
    setActivePage('dashboard');
    showToast(`Signed in as demo student: ${DEFAULT_USER.name}`, 'success');
  };

  const signup = (userData: Omit<User, 'id' | 'avatarInitials'>, _password: string) => {
    const initials = userData.name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'ST';

    const newUser: User = {
      ...userData,
      id: 'usr_' + Date.now(),
      avatarInitials: initials,
    };
    setUser(newUser);
    setActivePage('dashboard');
    showToast(`Account registered successfully. Welcome to CollegeHub!`, 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('You have been signed out.', 'info');
  };

  const updateUser = (updated: Partial<User>) => {
    if (!user) return;
    const modified = { ...user, ...updated };
    setUser(modified);
    showToast('Profile updated successfully!', 'success');
  };

  // Assignments
  const toggleAssignmentSubmitted = (id: string) => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextState = !a.isSubmitted;
          showToast(
            nextState
              ? `Marked "${a.title.slice(0, 32)}..." as submitted!`
              : `Reopened assignment "${a.title.slice(0, 32)}..."`,
            nextState ? 'success' : 'info'
          );
          return {
            ...a,
            isSubmitted: nextState,
            submittedAt: nextState ? new Date().toISOString().replace('T', ' ').slice(0, 16) : undefined,
          };
        }
        return a;
      })
    );
  };

  const addAssignment = (asg: Omit<Assignment, 'id' | 'isSubmitted'>) => {
    const newAsg: Assignment = {
      ...asg,
      id: 'asg_' + Date.now(),
      isSubmitted: false,
    };
    setAssignments((prev) => [newAsg, ...prev]);
    showToast(`Assignment added: ${newAsg.title}`, 'success');
  };

  // Notes
  const addNote = (noteData: Omit<NoteItem, 'id' | 'uploadDate' | 'downloadsCount'>) => {
    const newNote: NoteItem = {
      ...noteData,
      id: 'note_' + Date.now(),
      uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      downloadsCount: 1,
    };
    setNotes((prev) => [newNote, ...prev]);
    showToast(`Notes successfully added to library: ${newNote.title}`, 'success');
    setActivePage('notes');
  };

  const downloadNote = (note: NoteItem) => {
    // Generate simulated markdown/txt blob download for instant real interaction
    try {
      const blob = new Blob(
        [
          `# ${note.title}\n\nSubject: ${note.subject} (${note.subjectCode})\nSemester: ${note.semester}\nAuthor: ${note.authorName}\nDate: ${note.uploadDate}\n\n${note.summary}\n\n---\n\n${note.contentMarkdown}`,
        ],
        { type: 'text/markdown;charset=utf-8' }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${note.subjectCode}_${note.title.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Increment downloads count in state
      setNotes((prev) =>
        prev.map((n) => (n.id === note.id ? { ...n, downloadsCount: n.downloadsCount + 1 } : n))
      );
      showToast(`Downloaded: ${note.title}`, 'success');
    } catch {
      showToast(`Downloading ${note.title}...`, 'info');
    }
  };

  // Events
  const toggleRsvp = (id: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === id) {
          const nextRsvp = !ev.isRsvp;
          showToast(
            nextRsvp ? `RSVP Confirmed for ${ev.title}` : `RSVP Cancelled for ${ev.title}`,
            nextRsvp ? 'success' : 'info'
          );
          return {
            ...ev,
            isRsvp: nextRsvp,
            attendeesCount: nextRsvp ? ev.attendeesCount + 1 : Math.max(0, ev.attendeesCount - 1),
          };
        }
        return ev;
      })
    );
  };

  // Attendance
  const logAttendance = (id: string, isPresent: boolean) => {
    setAttendanceRecords((prev) =>
      prev.map((rec) => {
        if (rec.id === id) {
          const newAttended = isPresent ? rec.attended + 1 : rec.attended;
          const newTotal = rec.total + 1;
          const newStatus = [...rec.recentStatus.slice(1), isPresent ? ('P' as const) : ('A' as const)];
          showToast(
            `Logged ${isPresent ? 'Present (+1)' : 'Absent'} for ${rec.code}`,
            isPresent ? 'success' : 'warning'
          );
          return {
            ...rec,
            attended: newAttended,
            total: newTotal,
            recentStatus: newStatus,
          };
        }
        return rec;
      })
    );
  };

  // Calculate overall attendance percentage
  const totalAttended = attendanceRecords.reduce((acc, r) => acc + r.attended, 0);
  const totalClasses = attendanceRecords.reduce((acc, r) => acc + r.total, 0);
  const overallAttendancePercentage =
    totalClasses > 0 ? Math.round((totalAttended / totalClasses) * 100) : 0;

  // Projects
  const submitProject = (projectData: Omit<CollegeProject, 'id' | 'status' | 'submittedDate'>) => {
    const newProj: CollegeProject = {
      ...projectData,
      id: 'proj_' + Date.now(),
      status: 'Under Review',
      submittedDate: new Date().toISOString().split('T')[0],
    };
    setProjects((prev) => [newProj, ...prev]);
    showToast(`Project "${newProj.title}" submitted for faculty approval!`, 'success');
    setActivePage('projects');
  };

  return (
    <CollegeContext.Provider
      value={{
        user,
        activePage,
        setActivePage,
        login,
        demoLogin,
        signup,
        logout,
        updateUser,
        assignments,
        toggleAssignmentSubmitted,
        addAssignment,
        notes,
        addNote,
        previewNote,
        setPreviewNote,
        downloadNote,
        events,
        toggleRsvp,
        attendanceRecords,
        logAttendance,
        overallAttendancePercentage,
        projects,
        submitProject,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </CollegeContext.Provider>
  );
};

export const useCollege = () => {
  const context = useContext(CollegeContext);
  if (!context) {
    throw new Error('useCollege must be used within a CollegeProvider');
  }
  return context;
};
