import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import MapView from '../components/MapView';
import { tripService } from '../services/trips';
import { activityService } from '../services/activities';
import {
  Share2, Calendar, MapPin, PersonStanding,
  ChevronRight, IndianRupee, Plus, Link, Check
} from 'lucide-react';
import { format, parseISO, differenceInDays } from 'date-fns';

const ItineraryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [timeline, setTimeline] = useState([]); // Array of days with activities
  const [loading, setLoading] = useState(true);
  const [isPublic, setIsPublic] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripData = await tripService.getTrip(id);
        setTrip(tripData);
        setIsPublic(tripData.is_public);

        // Fetch itineraries and activities
        const [itineraryData, activitiesData] = await Promise.all([
          activityService.getTripItinerary(id),
          activityService.getTripActivities(id)
        ]);

        // Build Timeline
        let days = [];
        if (tripData.start_date && tripData.end_date) {
          const start = parseISO(tripData.start_date);
          const end = parseISO(tripData.end_date);
          const diff = differenceInDays(end, start) + 1;

          for (let i = 0; i < diff; i++) {
            const dayNum = i + 1;
            const itinDay = itineraryData.find(d => d.day_number === dayNum);
            const dayDate = new Date(start.getTime() + i * 86400000);

            days.push({
              dayNumber: dayNum,
              date: dayDate,
              title: itinDay?.title || `Day ${dayNum}`,
              description: itinDay?.description || '',
              activities: activitiesData.filter(a => {
                if (!a.activity_date) return false;
                const aDate = new Date(a.activity_date);
                return aDate.toDateString() === dayDate.toDateString();
              })
            });
          }
        }
        setTimeline(days);

      } catch (err) {
        console.error("Failed to load itinerary", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleShare = async () => {
    try {
      if (!isPublic) {
        // Enable sharing
        await tripService.shareTrip(id, true);
        setIsPublic(true);
      }

      // Copy link
      const url = `${window.location.origin}/share/${id}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to share trip", err);
    }
  };

  if (loading) return <div className="text-center py-20">Loading itinerary...</div>;
  if (!trip) return <div className="text-center py-20">Trip not found</div>;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto pb-12">
        {/* Header Section */}
        <div className="mb-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-4">
            <span onClick={() => navigate('/home')} className="cursor-pointer hover:text-slate-900">Dashboard</span>
            <ChevronRight size={14} />
            <span onClick={() => navigate('/trips')} className="cursor-pointer hover:text-slate-900">My Trips</span>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-bold">{trip.name}</span>
          </div>

          <div className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-end">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">{trip.name}</h1>
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <Calendar size={18} />
                <span>{format(parseISO(trip.start_date), 'MMM d')} - {format(parseISO(trip.end_date), 'MMM d')}</span>
                <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                <span>{timeline.length} Days</span>
                <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                <span>{trip.destination}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className={`px-6 py-2.5 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 ${isPublic ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-500/20' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'}`}
              >
                {copied ? <Check size={18} /> : <Share2 size={18} />}
                {copied ? 'Link Copied!' : (isPublic ? 'Share Link' : 'Make Public')}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Timeline Content */}
          <div className="xl:col-span-2 space-y-10">
            {timeline.map((day) => (
              <div key={day.dayNumber} className="relative pl-8 border-l-2 border-slate-100/50">
                {/* Day Header */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white"></div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-bold">Day {day.dayNumber}</span>
                    <h2 className="text-xl font-bold text-slate-900">{day.title}</h2>
                  </div>
                  <span className="text-slate-400 font-bold text-sm">{format(day.date, 'MMM d, EEE')}</span>
                </div>

                <div className="space-y-4">
                  {day.activities.length > 0 ? day.activities.map((activity, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-6">
                          <div className="text-center min-w-[60px]">
                            <div className="text-xl font-black text-slate-900">{activity.activity_time ? activity.activity_time.slice(0, 5) : '--:--'}</div>
                            <div className="text-xs font-bold text-slate-400 uppercase"></div>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{activity.title}</h3>
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium text-sm mb-3"
                            >
                              <MapPin size={16} />
                              {activity.location || 'No location'}
                            </a>
                            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                              {activity.activity_type || 'Activity'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-slate-400 text-sm italic">No activities planned for this day.</div>
                  )}
                </div>
              </div>
            ))}

            {/* Add Activity Button */}
            <div className="pl-8">
              <button
                onClick={() => navigate('/search')}
                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[24px] text-slate-500 font-bold hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Add Activity
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Map Card */}
            <div className="bg-white p-3 rounded-[24px] border border-slate-100 shadow-sm">
              <MapView
                center={[51.5074, -0.1278]} // Mock location
                zoom={12}
                height="240px"
                markers={[
                  { position: [51.5074, -0.1278], title: trip.destination, description: 'Trip Destination' }
                ]}
              />
              <div className="mt-3 px-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Location</div>
                <div className="flex items-center gap-1 font-bold text-slate-900">
                  <MapPin size={16} className="text-blue-600" />
                  {trip.destination}
                </div>
              </div>
            </div>

            {/* Budget Overview (Mock functionality for now) */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900">Budget Overview</h3>
                <div className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded">On Track</div>
              </div>

              <div className="mb-2 flex justify-between text-sm font-medium">
                <span className="text-slate-500">Spent</span>
                <span className="text-slate-900 font-extrabold">₹130 / ₹{trip.budget}</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '26%' }}></div>
              </div>
            </div>

            {/* Trip Summary */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6">Trip Summary</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                      <IndianRupee size={20} />
                    </div>
                    <span className="font-medium text-slate-600">Total Budget</span>
                  </div>
                  <span className="font-extrabold text-slate-900">₹{trip.budget}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItineraryView;
