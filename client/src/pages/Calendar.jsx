import React from 'react';
import Layout from '../components/Layout';
import { ChevronLeft, ChevronRight, MapPin, Calendar as CalendarIcon } from 'lucide-react';

const Calendar = () => {
  // Mock Calendar Data
  const days = Array.from({ length: 35 }, (_, i) => i + 1); // Simple 35 day grid
  const events = [
    { day: 15, title: 'Arrival in Paris', type: 'flight', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { day: 16, title: 'Louvre Tour', type: 'activity', color: 'bg-green-100 text-green-700 border-green-200' },
    { day: 16, title: 'Dinner at Eiffel', type: 'meal', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    { day: 18, title: 'Train to Lyon', type: 'transport', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto pb-12">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Trip Calendar</h1>
            <p className="text-slate-500 font-medium">Visualize your upcoming journey.</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600">
              <ChevronLeft size={20} />
            </button>
            <button className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-900 font-bold text-sm">
              June 2026
            </button>
            <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
          {/* Days Header */}
          <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 auto-rows-[140px]">
            {days.map((day, index) => {
              const isCurrentMonth = index >= 2 && index <= 32; // Mocking correct dates
              const dayEvents = events.filter(e => e.day === day);

              return (
                <div
                  key={index}
                  className={`border-b border-r border-slate-100 p-3 relative group transition-colors hover:bg-slate-50 ${!isCurrentMonth ? 'bg-slate-50/30' : ''}`}
                >
                  <span className={`text-sm font-bold ${!isCurrentMonth ? 'text-slate-300' : 'text-slate-700'}`}>
                    {day > 31 ? day - 31 : day <= 0 ? 30 + day : day}
                  </span>

                  <div className="mt-2 space-y-1.5">
                    {dayEvents.map((evt, i) => (
                      <div
                        key={i}
                        className={`text-[10px] font-bold px-2 py-1 rounded-md border truncate cursor-pointer hover:opacity-80 transition-opacity ${evt.color}`}
                      >
                        {evt.title}
                      </div>
                    ))}
                  </div>

                  {isCurrentMonth && (
                    <button className="absolute bottom-2 right-2 w-6 h-6 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-blue-500 hover:text-white transition-all">
                      <span className="text-lg leading-none mb-0.5">+</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
