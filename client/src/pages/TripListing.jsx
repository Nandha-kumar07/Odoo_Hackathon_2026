import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Plus, Calendar, MapPin, Users, MoreVertical, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { tripService } from '../services/trips';

const TripListing = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await tripService.getAllTrips();
        setTrips(data);
      } catch (error) {
        console.error('Failed to fetch trips:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const ongoingTrips = trips.filter(t => t.status === 'ongoing');
  const upcomingTrips = trips.filter(t => t.status === 'planning');
  const completedTrips = trips.filter(t => t.status === 'completed');

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl font-bold text-slate-500">Loading trips...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto pb-12">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1">My Trips</h1>
            <p className="text-slate-500 font-medium">Manage and organize your travel adventures</p>
          </div>
          <button
            onClick={() => navigate('/create-trip')}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            <Plus size={20} strokeWidth={3} />
            <span>Create New Trip</span>
          </button>
        </div>

        {/* Sections */}
        <div className="space-y-12">

          {/* ONGOING SECTION */}
          {ongoingTrips.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
                <h2 className="text-xl font-bold text-slate-900">Ongoing</h2>
              </div>
              {ongoingTrips.map(trip => (
                <div key={trip.id} className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm flex flex-col lg:flex-row group hover:shadow-md transition-all cursor-pointer" onClick={() => navigate(`/itinerary/${trip.id}`)}>
                  {/* Image Side */}
                  <div className="lg:w-2/5 relative h-64 lg:h-auto overflow-hidden">
                    <img src={trip.image_url || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop"} alt={trip.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-lg">
                        Currently Traveling
                      </span>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="lg:w-3/5 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-black text-slate-900">{trip.name}</h3>
                        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                          <MoreVertical size={20} />
                        </button>
                      </div>
                      <p className="text-slate-500 mb-6 line-clamp-2">Enjoying the adventure in {trip.destination}!</p>

                      <div className="flex flex-wrap gap-6 mb-8">
                        <div className="flex items-center gap-2 text-slate-600 font-medium">
                          <Calendar size={18} className="text-blue-500" />
                          <span>{new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 font-medium">
                          <MapPin size={18} className="text-blue-500" />
                          <span>{trip.destination}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase">Budget Used</span>
                        <div className="flex items-end gap-1">
                          <span className="text-xl font-black text-slate-900">$0</span> {/* Placeholder for now */}
                          <span className="text-sm font-bold text-slate-400 mb-0.5">/ ${trip.budget}</span>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors" onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/itinerary/${trip.id}`);
                      }}>
                        <span>View Itinerary</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* UPCOMING SECTION */}
          {(upcomingTrips.length > 0 || (ongoingTrips.length === 0 && completedTrips.length === 0)) && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-purple-600 rounded-full"></div>
                <h2 className="text-xl font-bold text-slate-900">Upcoming Adventures</h2>
              </div>

              {upcomingTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingTrips.map((trip) => (
                    <div key={trip.id} className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm group hover:shadow-md transition-all cursor-pointer" onClick={() => navigate(`/itinerary/${trip.id}`)}>
                      <div className="flex justify-between items-start mb-6">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md">
                          <img src={trip.image_url || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"} alt={trip.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="px-3 py-1 bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                          {Math.ceil((new Date(trip.start_date) - new Date()) / (1000 * 60 * 60 * 24))} days left
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2 truncate">{trip.name}</h3>
                      <p className="text-slate-500 text-sm mb-6 line-clamp-2">Trip to {trip.destination}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                          <Calendar size={16} className="text-purple-500" />
                          <span>{new Date(trip.start_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                          <MapPin size={16} className="text-purple-500" />
                          <span>{trip.destination}</span>
                        </div>
                      </div>

                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-200 w-0"></div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs font-bold text-slate-400">0% Planned</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-500 font-bold">No upcoming trips. Time to plan one!</p>
                </div>
              )}
            </section>
          )}

          {/* COMPLETED SECTION */}
          {completedTrips.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-green-600 rounded-full"></div>
                <h2 className="text-xl font-bold text-slate-900">Completed</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedTrips.map(trip => (
                  <div key={trip.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm opacity-80 hover:opacity-100 transition-all cursor-pointer" onClick={() => navigate(`/itinerary/${trip.id}`)}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{trip.name}</h4>
                        <span className="text-xs text-slate-500 font-bold">{new Date(trip.end_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default TripListing;
