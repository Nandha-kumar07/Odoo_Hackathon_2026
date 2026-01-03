import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Plus, Calendar, MapPin, Users, MoreVertical, ArrowRight, Clock } from 'lucide-react';

const TripListing = () => {
  const navigate = useNavigate();

  // Mock Data
  const ongoingTrip = {
    id: 1,
    title: 'Euro Summer Tour',
    description: 'Exploring the hidden gems of Paris, Rome, and Barcelona. Currently enjoying croissants by the Seine.',
    dates: 'Jul 15 - Aug 01, 2024',
    location: 'Paris • Rome • Barcelona',
    travelers: '2 Adults',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop'
  };

  const upcomingTrips = [
    {
      id: 2,
      title: 'Japan Spring Adventure',
      description: 'Cherry blossoms, sushi, and ancient temples in Kyoto.',
      dates: 'Apr 10 - Apr 24',
      destinations: 'Tokyo, Kyoto, Osaka',
      daysLeft: 14,
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2067&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Patagonia Hike',
      description: 'Planning stage for the W Trek.',
      dates: 'TBD',
      destinations: 'Chile, Argentina',
      status: 'draft',
      image: null
    }
  ];

  const completedTrips = [
    {
      id: 4,
      title: 'Bali Retreat',
      date: 'Sep 2023',
      location: 'Ubud, Bali',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 5,
      title: 'NYC Business Trip',
      date: 'Oct 2023',
      location: 'Manhattan, NY',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 6,
      title: 'London Weekend',
      date: 'Dec 2023',
      location: 'London, UK',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop'
    }
  ];

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
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
              <h2 className="text-xl font-bold text-slate-900">Ongoing</h2>
            </div>

            <div className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm flex flex-col lg:flex-row group hover:shadow-md transition-all">
              {/* Image Side */}
              <div className="lg:w-2/5 relative h-64 lg:h-auto overflow-hidden">
                <img src={ongoingTrip.image} alt={ongoingTrip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-lg">
                    Currently Traveling
                  </span>
                </div>
              </div>

              {/* Content Side */}
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-extrabold text-slate-900">{ongoingTrip.title}</h3>
                    <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={20} /></button>
                  </div>
                  <p className="text-slate-500 font-medium mb-6 leading-relaxed">{ongoingTrip.description}</p>

                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Dates</div>
                        <div className="text-sm font-bold text-slate-900">{ongoingTrip.dates}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Location</div>
                        <div className="text-sm font-bold text-slate-900">{ongoingTrip.location}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <Users size={18} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Travelers</div>
                        <div className="text-sm font-bold text-slate-900">{ongoingTrip.travelers}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                    View Itinerary Details
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* UPCOMING SECTION */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-amber-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-slate-900">Up-coming</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trip Card 1 */}
              <div className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm flex flex-col group hover:shadow-lg transition-all">
                <div className="h-48 relative overflow-hidden">
                  <img src={upcomingTrips[0].image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold rounded-lg shadow-sm">
                      {upcomingTrips[0].daysLeft} Days Left
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 text-white hover:bg-white/20 p-1 rounded-full cursor-pointer transition-colors">
                    <MoreVertical size={20} />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-lg font-extrabold text-slate-900 mb-1">{upcomingTrips[0].title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{upcomingTrips[0].description}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">Dates</span>
                      <span className="font-bold text-slate-700">{upcomingTrips[0].dates}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">Destinations</span>
                      <span className="font-bold text-slate-700">{upcomingTrips[0].destinations}</span>
                    </div>
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <button className="py-2.5 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors">Edit</button>
                    <button className="py-2.5 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-colors">View</button>
                  </div>
                </div>
              </div>

              {/* Draft Card */}
              <div className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm flex flex-col group hover:shadow-lg transition-all relative">
                <div className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 cursor-pointer z-10">
                  <MoreVertical size={20} />
                </div>
                <div className="flex-1 flex items-center justify-center bg-slate-50/50 p-8 min-h-[200px]">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                    <MapPin size={32} />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded">Draft</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-1">{upcomingTrips[1].title}</h3>
                  <p className="text-sm text-slate-500 mb-6">{upcomingTrips[1].description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">Dates</span>
                      <span className="font-bold text-slate-700 italic">{upcomingTrips[1].dates}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">Destinations</span>
                      <span className="font-bold text-slate-700">{upcomingTrips[1].destinations}</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                    Continue Planning
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* COMPLETED SECTION */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-slate-400 rounded-full"></div>
              <h2 className="text-xl font-bold text-slate-900">Completed</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {completedTrips.map(trip => (
                <div key={trip.id} className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm group hover:shadow-lg transition-all">
                  <div className="h-40 overflow-hidden relative">
                    <img src={trip.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={trip.title} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 mb-1">{trip.title}</h3>
                    <div className="text-xs font-bold text-slate-400 mb-4">{trip.date}</div>

                    <div className="flex items-center gap-2 mb-4 text-slate-500 text-sm font-medium">
                      <MapPin size={14} className="text-blue-500" />
                      {trip.location}
                    </div>

                    <a href="#" className="flex items-center gap-1 text-blue-600 text-xs font-bold hover:gap-2 transition-all">
                      View Memories
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TripListing;
