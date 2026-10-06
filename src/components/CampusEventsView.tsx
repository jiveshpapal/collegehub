import React, { useState } from 'react';
import { useCollege } from '../context/CollegeContext';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Check,
  Plus,
  Share2,
  BookmarkCheck,
} from 'lucide-react';

export const CampusEventsView: React.FC = () => {
  const { events, toggleRsvp } = useCollege();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Academic', 'Tech Club', 'Workshops'];

  const filteredEvents = events.filter((ev) => {
    if (selectedCategory !== 'all' && ev.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-stone-200">
        <h1 className="text-2xl font-bold tracking-tight text-[#1E1E1E]">Campus Events</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Upcoming events - Find your next opportunity to connect and learn.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-lg w-fit">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {cat === 'all' ? 'All Events' : cat}
          </button>
        ))}
      </div>

      {/* Timeline Layout */}
      <div className="relative pl-4 sm:pl-8 border-l-2 border-stone-200 space-y-8 my-6">
        {filteredEvents.map((ev) => (
          <div key={ev.id} className="relative group">
            {/* Timeline node circle */}
            <div
              className={`absolute -left-[23px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-white transition-colors ${
                ev.isRsvp ? 'border-[#1B5E38] bg-[#1B5E38]' : 'border-stone-400'
              }`}
            />

            {/* Event Card */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs hover:border-stone-300 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Left info with Date badge */}
                <div className="flex items-start gap-4 flex-1">
                  {/* Clean unboxed Date Badge */}
                  <div className="w-14 h-16 rounded-lg bg-stone-50 border border-stone-200 flex flex-col items-center justify-center shrink-0">
                    <span className="text-lg font-extrabold text-[#1E1E1E] leading-none">
                      {ev.day}
                    </span>
                    <span className="text-[10px] font-bold text-[#1B5E38] uppercase tracking-wider mt-1">
                      {ev.month}
                    </span>
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    {/* Location Header badge */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-stone-600 uppercase tracking-wider text-[11px] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#1B5E38]" />
                        {ev.location}
                      </span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="text-[11px] text-[#6B7280]">{ev.category}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#1E1E1E] leading-snug">
                      {ev.title}
                    </h3>

                    <p className="text-xs text-[#6B7280] leading-relaxed max-w-xl">
                      {ev.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        {ev.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-stone-400" />
                        {ev.attendeesCount} Students Enrolled
                      </span>
                      <span>Host: {ev.organizer}</span>
                    </div>
                  </div>
                </div>

                {/* RSVP Action */}
                <div className="shrink-0 self-start sm:self-center">
                  <button
                    onClick={() => toggleRsvp(ev.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                      ev.isRsvp
                        ? 'bg-[#EBF5EE] text-[#1B5E38] border border-[#1B5E38]/30 hover:bg-stone-200'
                        : 'bg-[#1B5E38] text-white hover:bg-[#14472B]'
                    }`}
                  >
                    {ev.isRsvp ? (
                      <>
                        <BookmarkCheck className="w-4 h-4" />
                        <span>Registered (Attending)</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>RSVP / Attend</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
