import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Loader2, MapPin, ExternalLink } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from 'date-fns';
import { activityService } from '../services/activities';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await activityService.getAllActivities();
        setActivities(data);
      } catch (err) {
        console.error("Failed to fetch activities", err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Calendar Logic
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const getActivityColor = (type) => {
    const types = {
      'sightseeing': 'bg-blue-100 text-blue-700 border-blue-200',
      'food': 'bg-amber-100 text-amber-700 border-amber-200',
      'transport': 'bg-purple-100 text-purple-700 border-purple-200',
      'accommodation': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'adventure': 'bg-green-100 text-green-700 border-green-200',
      'history': 'bg-red-100 text-red-700 border-red-200',
      'art': 'bg-pink-100 text-pink-700 border-pink-200'
    };
    return types[type?.toLowerCase()] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto pb-12">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Trip Calendar</h1>
            <p className="text-slate-500 font-medium">Visualize your upcoming journey across all trips.</p>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-slate-50 rounded-xl text-slate-600 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="text-sm font-black text-slate-900 min-w-[140px] text-center uppercase tracking-widest">
              {format(currentDate, 'MMMM yyyy')}
            </div>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-slate-50 rounded-xl text-slate-600 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm h-[600px] flex flex-col items-center justify-center text-slate-400">
            <Loader2 size={40} className="animate-spin mb-4 text-blue-600" />
            <span className="font-bold">Syncing your schedule...</span>
          </div>
        ) : (
          <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 auto-rows-[160px]">
              {calendarDays.map((day, idx) => {
                const dayActivities = activities.filter(acc => acc.activity_date && isSameDay(parseISO(acc.activity_date), day));
                const isCurrent = isSameMonth(day, monthStart);
                const isToday = isSameDay(day, new Date());

                return (
                  <div
                    key={idx}
                    className={`border-b border-r border-slate-100 p-2 relative group transition-all hover:bg-blue-50/30 ${!isCurrent ? 'bg-slate-50/30' : ''} ${isToday ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-black w-6 h-6 flex items-center justify-center rounded-full ${!isCurrent ? 'text-slate-300' : isToday ? 'bg-blue-600 text-white' : 'text-slate-700'}`}>
                        {format(day, 'd')}
                      </span>
                      {dayActivities.length > 0 && isCurrent && (
                        <div className="flex gap-0.5">
                          {dayActivities.slice(0, 3).map((_, i) => (
                            <div key={i} className="w-1 h-1 rounded-full bg-blue-400"></div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      {dayActivities.slice(0, 3).map((evt, i) => (
                        <div
                          key={evt.id}
                          onClick={() => navigate(`/itinerary/${evt.trip_id}`)}
                          className={`text-[9px] font-bold px-1.5 py-1 rounded-md border truncate cursor-pointer hover:scale-[1.02] transition-transform ${getActivityColor(evt.activity_type)} relative group/event`}
                        >
                          <div className="flex items-center gap-1">
                            <span className="opacity-60">{evt.activity_time ? evt.activity_time.substring(0, 5) : ''}</span>
                            <span className="truncate">{evt.title}</span>
                          </div>

                          {/* Hover Details Overlay */}
                          <div className="absolute left-0 bottom-full mb-1 hidden group-hover/event:block z-50 bg-slate-900 p-3 rounded-xl shadow-2xl min-w-[180px]">
                            <p className="text-white text-[10px] uppercase font-black text-blue-400 mb-1">{evt.trip_name}</p>
                            <p className="text-white font-bold text-xs mb-1">{evt.title}</p>
                            <p className="text-slate-400 text-[10px] flex items-center gap-1 mb-2">
                              <MapPin size={10} /> {evt.location}
                            </p>
                            <div className="text-[9px] text-blue-300 font-bold flex items-center gap-1">
                              Click to view trip <ExternalLink size={8} />
                            </div>
                          </div>
                        </div>
                      ))}
                      {dayActivities.length > 3 && (
                        <div className="text-[8px] text-slate-400 font-bold px-1.5 pt-1 uppercase tracking-tighter">
                          + {dayActivities.length - 3} more
                        </div>
                      )}
                    </div>

                    {/* Add Button Shortcut */}
                    {isCurrent && (
                      <button
                        onClick={() => navigate('/search')}
                        className="absolute bottom-2 right-2 w-6 h-6 bg-white/80 backdrop-blur shadow-sm text-slate-400 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-slate-900 hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0"
                      >
                        <span className="text-lg leading-none">+</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-4 items-center justify-center px-4">
          {[
            { label: 'Sightseeing', color: 'bg-blue-400' },
            { label: 'Food', color: 'bg-amber-400' },
            { label: 'Transport', color: 'bg-purple-400' },
            { label: 'Accommodation', color: 'bg-indigo-400' },
            { label: 'Adventure', color: 'bg-green-400' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
