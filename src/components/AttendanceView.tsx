import React from 'react';
import { useCollege } from '../context/CollegeContext';
import { Clock, TrendingUp, CheckCircle, AlertTriangle, Plus, Check } from 'lucide-react';

export const AttendanceView: React.FC = () => {
  const { attendanceRecords, logAttendance, overallAttendancePercentage } = useCollege();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-stone-200">
        <h1 className="text-2xl font-bold tracking-tight text-[#1E1E1E]">Class Attendance</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Monitor your semester attendance rates across each registered course. Minimum required: 75%.
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
            Aggregate Percentage
          </div>
          <div className="text-3xl font-extrabold text-[#1E1E1E] mt-2">
            {overallAttendancePercentage}%
          </div>
          <div className="text-xs text-[#1B5E38] font-medium mt-1 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Eligible for semester end exams (&gt; 75%)</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
            Total Sessions Attended
          </div>
          <div className="text-3xl font-extrabold text-[#1E1E1E] mt-2">
            {attendanceRecords.reduce((acc, r) => acc + r.attended, 0)}
          </div>
          <div className="text-xs text-[#6B7280] mt-1">
            Out of {attendanceRecords.reduce((acc, r) => acc + r.total, 0)} conducted sessions
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
            Courses in Good Standing
          </div>
          <div className="text-3xl font-extrabold text-[#1E1E1E] mt-2">
            {attendanceRecords.filter((r) => (r.attended / r.total) >= 0.75).length} / {attendanceRecords.length}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            0 courses with attendance shortage
          </div>
        </div>
      </div>

      {/* Detailed Course-Wise Attendance List */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1E1E1E]">Course-Wise Breakdown</h2>
          <span className="text-xs text-stone-500">Click &ldquo;+ Present&rdquo; to simulate today&apos;s attendance</span>
        </div>

        <div className="divide-y divide-stone-100">
          {attendanceRecords.map((rec) => {
            const pct = Math.round((rec.attended / rec.total) * 100);
            const isSafe = pct >= 75;

            return (
              <div key={rec.id} className="p-5 hover:bg-stone-50/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1B5E38]">{rec.subject}</span>
                      <span className="text-xs font-mono text-stone-400">({rec.code})</span>
                    </div>
                    <div className="text-xs text-stone-500">
                      Instructor: {rec.professor}
                    </div>

                    {/* Recent roll calls indicators */}
                    <div className="flex items-center gap-1.5 pt-2">
                      <span className="text-[11px] text-stone-400 mr-1">Recent:</span>
                      {rec.recentStatus.map((st, i) => (
                        <span
                          key={i}
                          className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                            st === 'P'
                              ? 'bg-[#EBF5EE] text-[#1B5E38] border border-[#1B5E38]/20'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Attendance Meter & Quick Actions */}
                  <div className="flex items-center gap-6 self-start sm:self-center">
                    <div className="text-right">
                      <div className="text-xl font-black text-stone-900">{pct}%</div>
                      <div className="text-xs text-stone-500 font-mono">
                        {rec.attended}/{rec.total} classes
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => logAttendance(rec.id, true)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[#1B5E38] hover:bg-[#14472B] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        title="Mark Present for this session"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>+ Present</span>
                      </button>
                      <button
                        onClick={() => logAttendance(rec.id, false)}
                        className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                        title="Mark Absent for this session"
                      >
                        Absent
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-stone-100 h-2 rounded-full mt-4 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isSafe ? 'bg-[#1B5E38]' : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
