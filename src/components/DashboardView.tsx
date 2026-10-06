import React from 'react';
import { useCollege } from '../context/CollegeContext';
import {
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  FileCheck,
  AlertCircle,
  FolderGit2,
  ExternalLink,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    user,
    setActivePage,
    assignments,
    toggleAssignmentSubmitted,
    events,
    attendanceRecords,
    logAttendance,
    overallAttendancePercentage,
    projects,
  } = useCollege();

  const firstName = user?.name ? user.name.split(' ')[0] : 'Student';

  // Date formatted nicely
  const currentDateFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  const pendingAssignments = assignments.filter((a) => !a.isSubmitted);
  const submittedAssignments = assignments.filter((a) => a.isSubmitted);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. Header with Personalized Greeting & Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E1E1E]">
            Good to see you, {firstName}.
          </h1>
          <p className="text-sm text-[#6B7280] mt-1 flex items-center gap-2">
            <span>{currentDateFormatted}</span>
            <span aria-hidden="true">·</span>
            <span>{user?.department || 'Information Technology'}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-xs text-stone-500">{user?.studentId}</span>
          </p>
        </div>

        {/* Profile Avatar quick-link */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage('profile')}
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-all cursor-pointer text-left shadow-2xs"
          >
            <div className="w-9 h-9 rounded-full bg-[#1B5E38] text-white flex items-center justify-center font-bold text-xs tracking-wider">
              {user?.avatarInitials || 'KP'}
            </div>
            <div>
              <div className="text-xs font-semibold text-[#1E1E1E]">Student Profile</div>
              <div className="text-[11px] text-[#6B7280]">
                {user?.yearSemester || 'Year 3, Sem 5'}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* 2. Top Metrics Section (4 Summary Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance % */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs hover:border-stone-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
              Attendance %
            </span>
            <Clock className="w-4 h-4 text-[#1B5E38]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#1E1E1E]">
              {overallAttendancePercentage}%
            </span>
            <span className="text-xs font-medium text-[#1B5E38] flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5 inline" /> Good
            </span>
          </div>
          <p className="text-[11px] text-[#6B7280] mt-1.5">
            Campus threshold requirement is 75%
          </p>
        </div>

        {/* Assignments Due */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs hover:border-stone-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
              Assignments Due
            </span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#1E1E1E]">
              {pendingAssignments.length}
            </span>
            <span className="text-xs text-amber-600 font-medium">Action pending</span>
          </div>
          <p className="text-[11px] text-[#6B7280] mt-1.5">
            Next deadline in 3 days (Data Structures)
          </p>
        </div>

        {/* Submitted */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs hover:border-stone-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
              Submitted
            </span>
            <FileCheck className="w-4 h-4 text-[#1B5E38]" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#1E1E1E]">
              {submittedAssignments.length}
            </span>
            <span className="text-xs text-[#1B5E38] font-medium">Logged & verified</span>
          </div>
          <p className="text-[11px] text-[#6B7280] mt-1.5">
            Continuous internal evaluation
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs hover:border-stone-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
              Upcoming Events
            </span>
            <Calendar className="w-4 h-4 text-stone-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#1E1E1E]">
              {events.length}
            </span>
            <span className="text-xs text-[#6B7280] font-medium">Scheduled</span>
          </div>
          <p className="text-[11px] text-[#6B7280] mt-1.5">
            Research hours & tech meetups
          </p>
        </div>
      </div>

      {/* 3. Main Section: 3-Column / Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* COLUMN 1: Assignments Tracker (Span 5) */}
        <section className="lg:col-span-5 bg-white border border-stone-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
              <h2 className="text-base font-bold text-[#1E1E1E]">Assignments Tracker</h2>
              <button
                onClick={() => setActivePage('assignments')}
                className="text-xs font-medium text-[#1B5E38] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {assignments.slice(0, 4).map((asg) => (
                <div
                  key={asg.id}
                  className={`p-3.5 rounded-lg border transition-all ${
                    asg.isSubmitted
                      ? 'bg-stone-50/70 border-stone-200 text-stone-500'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      {/* Quiet Subject Text Tag */}
                      <div className="text-[11px] font-semibold tracking-wide text-[#1B5E38] uppercase">
                        {asg.subject}
                      </div>
                      <h3
                        className={`text-xs font-bold mt-1 line-clamp-1 ${
                          asg.isSubmitted ? 'line-through text-stone-400' : 'text-[#1E1E1E]'
                        }`}
                      >
                        {asg.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-[#6B7280]">
                        <span>Due: {asg.dueDateFormatted}</span>
                        <span aria-hidden="true">·</span>
                        <span>{asg.totalPoints} pts</span>
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="shrink-0 mt-1">
                      {asg.isSubmitted ? (
                        <button
                          onClick={() => toggleAssignmentSubmitted(asg.id)}
                          className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-[#1B5E38] bg-[#EBF5EE] rounded hover:bg-stone-200 cursor-pointer"
                          title="Click to reopen assignment"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Submitted</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleAssignmentSubmitted(asg.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-white bg-[#1B5E38] hover:bg-[#14472B] rounded transition-colors cursor-pointer"
                        >
                          Mark done
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-[#6B7280]">
            <span>{pendingAssignments.length} pending items</span>
            <button
              onClick={() => setActivePage('assignments')}
              className="text-[#1B5E38] font-medium hover:underline cursor-pointer"
            >
              Open assignment hub &rarr;
            </button>
          </div>
        </section>

        {/* COLUMN 2: Class Participation / Attendance (Span 3) */}
        <section className="lg:col-span-3 bg-white border border-stone-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="pb-3 mb-4 border-b border-stone-100">
              <h2 className="text-base font-bold text-[#1E1E1E]">Class Attendance</h2>
              <p className="text-[11px] text-[#6B7280]">Real-time semester records</p>
            </div>

            {/* Circular Percentage Display */}
            <div className="flex flex-col items-center justify-center py-4 bg-stone-50 rounded-xl border border-stone-100 mb-4">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-stone-200"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#1B5E38]"
                    strokeDasharray={`${overallAttendancePercentage}, 100`}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-extrabold text-[#1E1E1E]">
                    {overallAttendancePercentage}%
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-[#6B7280]">
                    Present
                  </span>
                </div>
              </div>
              <div className="text-xs text-stone-600 mt-2 text-center px-4 font-medium">
                Overall: {attendanceRecords.reduce((a, b) => a + b.attended, 0)} of{' '}
                {attendanceRecords.reduce((a, b) => a + b.total, 0)} sessions
              </div>
            </div>

            {/* Quick breakdown list */}
            <div className="space-y-2">
              {attendanceRecords.slice(0, 3).map((rec) => {
                const pct = Math.round((rec.attended / rec.total) * 100);
                return (
                  <div
                    key={rec.id}
                    className="flex items-center justify-between text-xs py-1 border-b border-stone-50"
                  >
                    <span className="font-medium text-stone-700 truncate pr-2">
                      {rec.code}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-stone-900">{pct}%</span>
                      <button
                        onClick={() => logAttendance(rec.id, true)}
                        className="text-[10px] text-[#1B5E38] hover:bg-[#EBF5EE] px-1.5 py-0.5 rounded border border-[#1B5E38]/30 cursor-pointer"
                        title="Quick check-in for today's lecture"
                      >
                        + Check in
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-stone-100">
            <button
              onClick={() => setActivePage('attendance')}
              className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center"
            >
              Detailed Attendance Ledger &rarr;
            </button>
          </div>
        </section>

        {/* COLUMN 3: Campus Events & Quick Feed (Span 4) */}
        <section className="lg:col-span-4 bg-white border border-stone-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
              <h2 className="text-base font-bold text-[#1E1E1E]">Campus Events</h2>
              <button
                onClick={() => setActivePage('events')}
                className="text-xs font-medium text-[#1B5E38] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Full calendar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3.5">
              {events.slice(0, 3).map((ev) => (
                <div key={ev.id} className="flex items-start gap-3">
                  {/* Clean unboxed Date Badge */}
                  <div className="w-11 h-12 bg-stone-100 rounded-lg flex flex-col items-center justify-center shrink-0 border border-stone-200">
                    <span className="text-xs font-extrabold text-[#1E1E1E] leading-none">
                      {ev.day}
                    </span>
                    <span className="text-[9px] font-bold text-[#1B5E38] uppercase mt-0.5">
                      {ev.month}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                      {ev.location}
                    </span>
                    <h4 className="text-xs font-bold text-[#1E1E1E] leading-snug truncate">
                      {ev.title}
                    </h4>
                    <p className="text-[11px] text-[#6B7280] mt-0.5 line-clamp-1">
                      {ev.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-stone-500">
                      <span>{ev.time}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#1B5E38] font-medium">
                        {ev.isRsvp ? '✓ Attending' : `${ev.attendeesCount} enrolled`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Notes / Upload banner at bottom of col 3 */}
          <div className="mt-4 pt-3 border-t border-stone-100 bg-[#EBF5EE]/50 p-3 rounded-lg flex items-center justify-between">
            <div className="text-xs text-[#1E1E1E]">
              <div className="font-semibold">Need Study Notes?</div>
              <div className="text-[11px] text-[#6B7280]">
                Access IOT, AWP & DSA lecture files
              </div>
            </div>
            <button
              onClick={() => setActivePage('notes')}
              className="px-2.5 py-1 bg-[#1B5E38] text-white text-xs font-medium rounded hover:bg-[#14472B] cursor-pointer"
            >
              Browse
            </button>
          </div>
        </section>
      </div>

      {/* 4. College Projects Banner */}
      <div className="bg-stone-900 text-white rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <FolderGit2 className="w-4 h-4" />
            <span>College Projects Repository</span>
          </div>
          <h2 className="text-xl font-bold mt-1.5 tracking-tight text-white">
            Semester Capstone Projects & Submissions
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Manage your project submissions, explore peer repositories, and connect with faculty supervisors for semester evaluations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setActivePage('projects')}
            className="px-4 py-2 bg-white text-stone-900 rounded-lg text-xs font-bold hover:bg-stone-100 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[#1B5E38]" />
            <span>Explore Projects ({projects.length})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
