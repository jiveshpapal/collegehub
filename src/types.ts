export interface User {
  id: string;
  name: string;
  studentId: string;
  email: string;
  department: string;
  yearSemester: string;
  avatarInitials: string;
  phone?: string;
  bio?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  dueDate: string;
  dueDateFormatted: string;
  daysRemaining: number;
  isSubmitted: boolean;
  submittedAt?: string;
  totalPoints: number;
  description: string;
  submissionFormat: string;
  professor: string;
}

export interface NoteItem {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  semester: string;
  authorName: string;
  uploadDate: string;
  fileSize: string;
  fileType: string;
  pagesCount: number;
  summary: string;
  contentMarkdown: string;
  downloadsCount: number;
}

export interface CampusEvent {
  id: string;
  day: string;
  month: string;
  location: string;
  title: string;
  time: string;
  description: string;
  category: 'Academic' | 'Tech Club' | 'Career' | 'Workshops' | 'Culture';
  organizer: string;
  attendeesCount: number;
  isRsvp: boolean;
}

export interface AttendanceRecord {
  id: string;
  subject: string;
  code: string;
  attended: number;
  total: number;
  professor: string;
  recentStatus: ('P' | 'A')[];
}

export interface CollegeProject {
  id: string;
  title: string;
  domain: string;
  abstract: string;
  techStack: string[];
  studentName: string;
  studentId: string;
  department: string;
  supervisor: string;
  year: string;
  githubUrl?: string;
  demoUrl?: string;
  status: 'Approved' | 'Under Review' | 'Needs Revision';
  submittedDate: string;
}

export type ActivePage = 
  | 'dashboard' 
  | 'assignments' 
  | 'notes' 
  | 'upload' 
  | 'events' 
  | 'attendance'
  | 'projects' 
  | 'profile';
