import React from 'react';
import { useCollege } from '../context/CollegeContext';
import { X, Download, FileText, Calendar, User, BookOpen } from 'lucide-react';

export const NotePreviewModal: React.FC = () => {
  const { previewNote, setPreviewNote, downloadNote } = useCollege();

  if (!previewNote) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-200 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span className="font-semibold text-[#1B5E38] uppercase">
                {previewNote.subject}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{previewNote.subjectCode}</span>
              <span aria-hidden="true">·</span>
              <span>{previewNote.semester}</span>
            </div>
            <h2 className="text-lg font-bold text-[#1E1E1E] leading-snug">
              {previewNote.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-stone-500 mt-2">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-stone-400" />
                {previewNote.authorName}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                {previewNote.uploadDate}
              </span>
              <span>{previewNote.fileSize}</span>
              <span>{previewNote.pagesCount} pages</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => downloadNote(previewNote)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1B5E38] hover:bg-[#14472B] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={() => setPreviewNote(null)}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-800 text-sm leading-relaxed">
          {/* Note Abstract Box */}
          <div className="bg-[#EBF5EE] border border-[#1B5E38]/20 rounded-lg p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1B5E38] uppercase tracking-wide mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Summary & Learning Outcomes</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              {previewNote.summary}
            </p>
          </div>

          {/* Formatted Notes Body */}
          <div className="prose prose-stone max-w-none text-xs sm:text-sm">
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-5 font-mono text-xs whitespace-pre-wrap leading-relaxed">
              {previewNote.contentMarkdown}
            </div>
          </div>

          <div className="text-xs text-stone-500 pt-2 border-t border-stone-100 flex items-center justify-between">
            <span>Verified student contribution · CollegeHub Academic Repository</span>
            <span>Downloaded {previewNote.downloadsCount} times</span>
          </div>
        </div>
      </div>
    </div>
  );
};
