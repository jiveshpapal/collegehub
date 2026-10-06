import React, { useState } from 'react';
import { useCollege } from '../context/CollegeContext';
import {
  FileText,
  Search,
  Download,
  Eye,
  Upload,
  BookOpen,
  Filter,
} from 'lucide-react';
import { NoteItem } from '../types';

export const NotesLibraryView: React.FC = () => {
  const { notes, setActivePage, setPreviewNote, downloadNote } = useCollege();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = ['all', 'Internet of Things (IOT)', 'Advanced Web Programming (AWP)', 'Data Structures & Algorithms', 'Database Systems (DBMS)'];

  const filteredNotes = notes.filter((n) => {
    if (selectedSubject !== 'all' && n.subject !== selectedSubject) return false;
    if (
      searchQuery &&
      !n.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !n.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !n.authorName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1E1E1E]">Notes Library</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Available class notes - Browse resources that have been approved for students.
          </p>
        </div>

        {/* Share notes button */}
        <button
          onClick={() => setActivePage('upload')}
          className="flex items-center gap-2 px-4 py-2 bg-[#1B5E38] hover:bg-[#14472B] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Share notes</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs">
        {/* Subject Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {subjects.map((subj) => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedSubject === subj
                  ? 'bg-[#EBF5EE] text-[#1B5E38] font-semibold border border-[#1B5E38]/20'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {subj === 'all' ? 'All Subjects' : subj.split('(')[0].trim()}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notes, topics, author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#1B5E38] focus:bg-white text-stone-900"
          />
        </div>
      </div>

      {/* Notes Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-[#6B7280] font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Subject & Code</th>
                <th className="py-3 px-4">Topic / Title</th>
                <th className="py-3 px-4">Contributor</th>
                <th className="py-3 px-4">Semester</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredNotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-500">
                    <BookOpen className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                    No notes found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredNotes.map((note) => (
                  <tr key={note.id} className="hover:bg-stone-50/70 transition-colors">
                    {/* Subject */}
                    <td className="py-3.5 px-4 font-medium text-stone-900">
                      <div className="text-xs font-bold text-[#1B5E38]">{note.subject}</div>
                      <div className="text-[11px] font-mono text-stone-500">{note.subjectCode}</div>
                    </td>

                    {/* Title */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#1E1E1E] text-xs line-clamp-1">
                        {note.title}
                      </div>
                      <div className="text-[11px] text-[#6B7280] line-clamp-1 max-w-sm mt-0.5">
                        {note.summary}
                      </div>
                    </td>

                    {/* Contributor */}
                    <td className="py-3.5 px-4 text-stone-700">
                      <div className="text-xs font-medium">{note.authorName}</div>
                      <div className="text-[10px] text-stone-400">{note.uploadDate}</div>
                    </td>

                    {/* Semester */}
                    <td className="py-3.5 px-4 text-stone-600 font-medium">
                      {note.semester}
                    </td>

                    {/* Size & Pages */}
                    <td className="py-3.5 px-4 text-stone-500">
                      <div>{note.fileSize}</div>
                      <div className="text-[10px] text-stone-400">{note.pagesCount} pgs</div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                      {/* View file link */}
                      <button
                        onClick={() => setPreviewNote(note)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                        title="View file details and reading mode"
                      >
                        <Eye className="w-3.5 h-3.5 text-stone-500" />
                        <span>View file</span>
                      </button>

                      {/* Download button */}
                      <button
                        onClick={() => downloadNote(note)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-[#1B5E38] hover:bg-[#14472B] rounded-lg transition-colors cursor-pointer"
                        title="Download notes file"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Helpful bottom callout */}
      <div className="bg-[#EBF5EE] border border-[#1B5E38]/20 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xs font-bold text-[#1B5E38] uppercase tracking-wide">
            Verified Academic Material
          </h3>
          <p className="text-xs text-stone-700 mt-0.5">
            All shared notes are reviewed by faculty and student council moderators before being cataloged.
          </p>
        </div>
        <button
          onClick={() => setActivePage('upload')}
          className="px-3 py-1.5 bg-[#1B5E38] text-white text-xs font-semibold rounded-lg hover:bg-[#14472B] transition-colors cursor-pointer shrink-0"
        >
          Contribute Your Notes
        </button>
      </div>
    </div>
  );
};
