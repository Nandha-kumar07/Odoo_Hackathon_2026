import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import MapView from '../components/MapView';
import { tripService } from '../services/trips';
import {
    Calendar, MapPin, PersonStanding,
    ChevronRight, Copy, Globe
} from 'lucide-react';
import { format, parseISO, differenceInDays } from 'date-fns';

const PublicItineraryView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await tripService.getPublicTrip(id);
                const { trip: tripData, itinerary: itineraryData, activities: activitiesData } = data;

                setTrip(tripData);

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
                console.error("Failed to load public itinerary", err);
                setError("Trip not found or is private.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
            <div className="text-xl font-bold text-slate-500 animate-pulse">Loading itinerary details...</div>
        </div>
    );

    if (error || !trip) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans p-6">
            <div className="text-3xl font-extrabold text-slate-900 mb-2">Trip Unavailable</div>
            <p className="text-slate-500 font-medium mb-6">This trip does not exist or has not been made public.</p>
            <button onClick={() => navigate('/')} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all">
                Go Home
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Public Navbar Placeholder */}
            <nav className="bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-3" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <Globe size={24} />
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">GlobeTrotter</span>
                </div>
                <button onClick={() => navigate('/register')} className="px-5 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-all">
                    Plan Your Own Trip
                </button>
            </nav>

            <div className="max-w-7xl mx-auto py-12 px-6">
                {/* Header Section */}
                <div className="mb-8 relative">
                    <div className="absolute top-0 right-0">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                            <Globe size={12} /> Public Itinerary
                        </span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">{trip.name}</h1>
                    <div className="flex items-center gap-2 text-slate-500 font-medium">
                        <Calendar size={18} />
                        <span>{format(parseISO(trip.start_date), 'MMM d')} - {format(parseISO(trip.end_date), 'MMM d, yyyy')}</span>
                        <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                        <span>{timeline.length} Days</span>
                        <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                        <span>{trip.destination}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Main Timeline Content */}
                    <div className="xl:col-span-2 space-y-10">
                        {timeline.map((day) => (
                            <div key={day.dayNumber} className="relative pl-8 border-l-2 border-slate-200/60 pb-8 last:pb-0">
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
                                        <div key={idx} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm transition-all">
                                            <div className="flex justify-between items-start">
                                                <div className="flex gap-6">
                                                    <div className="text-center min-w-[60px]">
                                                        <div className="text-xl font-black text-slate-900">{activity.activity_time ? activity.activity_time.slice(0, 5) : '--:--'}</div>
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
                                                        {activity.description && <p className="text-slate-500 text-sm mt-2">{activity.description}</p>}
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
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Map Card */}
                        <div className="bg-white p-3 rounded-[24px] border border-slate-100 shadow-sm sticky top-24">
                            <MapView
                                center={[51.5074, -0.1278]} // Mock location default
                                zoom={12}
                                height="300px"
                                markers={[
                                    { position: [51.5074, -0.1278], title: trip.destination, description: 'Trip Destination' },
                                    // Add markers for activities if coordinates available
                                ]}
                            />
                            <div className="mt-3 px-3">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Destination</div>
                                <div className="flex items-center gap-1 font-bold text-slate-900">
                                    <MapPin size={16} className="text-blue-600" />
                                    {trip.destination}
                                </div>
                            </div>

                            <div className="mt-6 border-t border-slate-100 pt-4 px-3">
                                <button
                                    onClick={() => {
                                        const url = window.location.href;
                                        navigator.clipboard.writeText(url);
                                        alert('Link copied to clipboard!');
                                    }}
                                    className="w-full py-3 bg-slate-50 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                                >
                                    <Copy size={18} /> Copy Link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicItineraryView;
