import React, { useState } from 'react';
import { useCollege } from '../context/CollegeContext';
import { Upload, FileUp, CheckCircle, ArrowLeft, BookOpen } from 'lucide-react';

export const UploadNotesView: React.FC = () => {
  const { user, addNote, setActivePage } = useCollege();

  const [authorName, setAuthorName] = useState(user?.name || 'KRISHNA KAMALA PRASAD VISHWAKARMA');
  const [semester, setSemester] = useState(user?.yearSemester || 'Year 3, Semester 5');
  const [subjectName, setSubjectName] = useState('Advanced Web Programming (AWP)');
  const [subjectCode, setSubjectCode] = useState('IT-502');
  const [noteTitle, setNoteTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [fileName, setFileName] = useState('lecture_notes_unit3.pdf');
  const [contentMarkdown, setContentMarkdown] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addNote({
        title: noteTitle,
        subject: subjectName,
        subjectCode: subjectCode,
        semester: semester,
        authorName: authorName,
        fileSize: '3.2 MB',
        fileType: 'PDF Document',
        pagesCount: 16,
        summary: summary || `Student lecture notes for ${subjectName} covering key conceptual points and code examples.`,
        contentMarkdown:
          contentMarkdown ||
          `# ${noteTitle}\n\nSubject: ${subjectName}\nAuthor: ${authorName}\nSemester: ${semester}\n\n## 1. Key Topics Covered\n- Core architectural foundations\n- Practical lab exercises and syntax demonstrations\n- Exam review notes and formula sheet\n\n## 2. Sample Code & Analysis\n\`\`\`python\n# Clean implementation snippet\ndef process_lecture_data(payload):\n    return {"status": "success", "processed_records": len(payload)}\n\`\`\``,
      });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Top navigation back button */}
      <div>
        <button
          onClick={() => setActivePage('notes')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Notes Library</span>
        </button>
      </div>

      {/* Header */}
      <div className="pb-3 border-b border-stone-200">
        <h1 className="text-2xl font-bold tracking-tight text-[#1E1E1E]">Share Class Notes</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Contribute study material to help your peers across departments and semesters.
        </p>
      </div>

      {/* Upload Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs space-y-5"
      >
        {/* Row 1: Name (pre-filled) & Class/Semester */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38] focus:bg-white"
            />
            <span className="text-[10px] text-stone-400 mt-0.5 block">
              Pre-filled from your active student profile
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Class or Semester *
            </label>
            <input
              type="text"
              required
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              placeholder="e.g. Year 2, Semester 1 or Year 3, Semester 5"
              className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
            />
          </div>
        </div>

        {/* Row 2: Subject & Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Subject Name *
            </label>
            <select
              value={subjectName}
              onChange={(e) => {
                setSubjectName(e.target.value);
                if (e.target.value.includes('IOT')) setSubjectCode('IT-501');
                else if (e.target.value.includes('AWP')) setSubjectCode('IT-502');
                else if (e.target.value.includes('DBMS')) setSubjectCode('IT-503');
                else if (e.target.value.includes('Data Structures')) setSubjectCode('CS-301');
                else setSubjectCode('ENG-101');
              }}
              className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
            >
              <option value="Advanced Web Programming (AWP)">Advanced Web Programming (AWP)</option>
              <option value="Internet of Things (IOT)">Internet of Things (IOT)</option>
              <option value="Database Systems (DBMS)">Database Systems (DBMS)</option>
              <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
              <option value="Cloud Computing & Microservices">Cloud Computing & Microservices</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Subject Code
            </label>
            <input
              type="text"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
            />
          </div>
        </div>

        {/* Row 3: Note Title */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Note Title / Topic Heading *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Unit 4: Flask Session Auth, Blueprints & REST Endpoints"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
          />
        </div>

        {/* Row 4: Summary */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Summary / Key Topics Covered
          </label>
          <textarea
            rows={2}
            placeholder="Give peers a quick description of the contents, formulas, diagrams, or questions included..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#1B5E38]"
          />
        </div>

        {/* Row 5: PDF File Upload / Attachment */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            PDF File Upload / Document Attachment
          </label>
          <div className="border-2 border-dashed border-stone-300 rounded-xl p-6 text-center hover:border-[#1B5E38] transition-colors bg-stone-50/50">
            <FileUp className="w-8 h-8 text-[#1B5E38] mx-auto mb-2" />
            <div className="text-xs font-medium text-stone-800">
              Selected File: <span className="font-mono font-bold text-[#1B5E38]">{fileName}</span>
            </div>
            <p className="text-[11px] text-[#6B7280] mt-1">
              Supported formats: PDF, DOCX, Markdown (Max size: 25MB)
            </p>
            <div className="mt-3">
              <label className="inline-block px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer">
                Choose another file
                <input
                  type="file"
                  accept=".pdf,.docx,.doc,.txt,.md"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFileName(e.target.files[0].name);
                    }
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Row 6: Detailed Note Body (Optional) */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Study Material Content / Key Code Excerpts (Optional)
          </label>
          <textarea
            rows={4}
            placeholder="Paste raw markdown notes, code examples, or lecture takeaways to be displayed in reading mode..."
            value={contentMarkdown}
            onChange={(e) => setContentMarkdown(e.target.value)}
            className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg font-mono focus:outline-none focus:border-[#1B5E38]"
          />
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
          <button
            type="button"
            onClick={() => setActivePage('notes')}
            className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#1B5E38] hover:bg-[#14472B] rounded-lg transition-colors cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>{isSubmitting ? 'Uploading...' : 'Publish to Notes Library'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
