import React, { useState } from 'react';
import { useCollege } from '../context/CollegeContext';
import {
  CheckSquare,
  Clock,
  Search,
  CheckCircle2,
  AlertCircle,
  Plus,
  FileCheck2,
  Calendar,
  X,
} from 'lucide-react';
import { Assignment } from '../types';

export const AssignmentsView: React.FC = () => {
  const { assignments, toggleAssignmentSubmitted, addAssignment } = useCollege();
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New assignment form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Internet of Things (IOT)');
  const [newSubjectCode, setNewSubjectCode] = useState('IT-501');
  const [newDueDate, setNewDueDate] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPoints, setNewPoints] = useState(100);

  const filteredAssignments = assignments.filter((a) => {
    if (filter === 'pending' && a.isSubmitted) return false;
    if (filter === 'submitted' && !a.isSubmitted) return false;
    if (
      searchQuery &&
      !a.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !a.subject.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const pendingCount = assignments.filter((a) => !a.isSubmitted).length;
  const submittedCount = assignments.filter((a) => a.isSubmitted).length;

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDueDate) return;

    addAssignment({
      title: newTitle,
      subject: newSubject,
      subjectCode: newSubjectCode,
      dueDate: newDueDate,
      dueDateFormatted: new Date(newDueDate).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
      }),
      daysRemaining: 7,
      totalPoints: Number(newPoints) || 100,
      description: newDescription || 'Standard academic assignment submission.',
      submissionFormat: 'PDF Document / GitHub Repository',
      professor: 'Dept Faculty',
    });

    setNewTitle('');
    setNewDescription('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1E1E1E]">Assignments</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Track deadlines and mark work you have submitted.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1B5E38] hover:bg-[#14472B] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Assignment</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All ({assignments.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              filter === 'pending'
                ? 'bg-white text-amber-700 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('submitted')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              filter === 'submitted'
                ? 'bg-white text-[#1B5E38] shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Submitted ({submittedCount})
          </button>
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search subject or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#1B5E38] focus:bg-white text-stone-900"
          />
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-3">
        {filteredAssignments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-stone-200">
            <FileCheck2 className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-stone-700">No assignments found</h3>
            <p className="text-xs text-[#6B7280] mt-1">
              Try adjusting your search criteria or filter tabs.
            </p>
          </div>
        ) : (
          filteredAssignments.map((asg) => (
            <div
              key={asg.id}
              className={`p-5 rounded-xl border transition-all bg-white shadow-2xs ${
                asg.isSubmitted
                  ? 'border-stone-200 bg-stone-50/40'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="font-semibold text-[#1B5E38] uppercase">
                      {asg.subject}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{asg.subjectCode}</span>
                    <span aria-hidden="true">·</span>
                    <span>Evaluator: {asg.professor}</span>
                  </div>

                  <h3
                    className={`text-base font-bold ${
                      asg.isSubmitted ? 'line-through text-stone-500' : 'text-[#1E1E1E]'
                    }`}
                  >
                    {asg.title}
                  </h3>

                  <p className="text-xs text-[#6B7280] line-clamp-2 max-w-2xl leading-relaxed">
                    {asg.description}
                  </p>

                  <div className="flex items-center gap-4 pt-1 text-xs text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>Due: <strong>{asg.dueDateFormatted}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>Weightage: {asg.totalPoints} points</span>
                    </div>
                    {asg.submittedAt && (
                      <span className="text-[#1B5E38] text-[11px] font-medium">
                        Submitted on {asg.submittedAt}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
                  {asg.isSubmitted ? (
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-xs font-semibold text-[#1B5E38] bg-[#EBF5EE] px-3 py-1.5 rounded-lg border border-[#1B5E38]/20">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Submitted</span>
                      </span>
                      <button
                        onClick={() => toggleAssignmentSubmitted(asg.id)}
                        className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
                        title="Re-open this submission"
                      >
                        Reopen
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleAssignmentSubmitted(asg.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1B5E38] hover:bg-[#14472B] text-white text-xs font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
                    >
                      <CheckSquare className="w-4 h-4" />
                      <span>Mark submitted</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Assignment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h2 className="text-base font-bold text-[#1E1E1E]">
                Add Assignment / Coursework Task
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MySQL Normalization and Complex JOIN Queries"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Subject
                  </label>
                  <select
                    value={newSubject}
                    onChange={(e) => {
                      setNewSubject(e.target.value);
                      if (e.target.value.includes('IOT')) setNewSubjectCode('IT-501');
                      else if (e.target.value.includes('AWP')) setNewSubjectCode('IT-502');
                      else if (e.target.value.includes('DBMS')) setNewSubjectCode('IT-503');
                      else setNewSubjectCode('CS-301');
                    }}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38] bg-white"
                  >
                    <option value="Internet of Things (IOT)">Internet of Things (IOT)</option>
                    <option value="Advanced Web Programming (AWP)">Advanced Web Programming (AWP)</option>
                    <option value="Database Systems (DBMS)">Database Systems (DBMS)</option>
                    <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Brief Instructions / Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed criteria, lab rubric, or repository submission guidelines..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1B5E38] hover:bg-[#14472B] rounded-lg transition-colors cursor-pointer"
                >
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
