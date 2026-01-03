import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Search, Bell, MapPin, ChevronRight, Star, Plus, Globe, Wallet, Calendar } from 'lucide-react';

const MainLanding = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Upcoming Trips', value: '3', sub: '+1 new', icon: <MapPin size={24} className="text-white" />, gradient: 'from-blue-500 to-blue-600' },
    { label: 'Countries Visited', value: '12', sub: '+2 this year', icon: <Globe size={24} className="text-white" />, gradient: 'from-purple-500 to-purple-600' },
    { label: 'Budget Spent', value: '$4,200', sub: 'of $8,000', icon: <Wallet size={24} className="text-white" />, gradient: 'from-amber-500 to-amber-600', isBudget: true },
  ];

  const adventures = [
    { title: 'Tokyo, Japan', date: 'Oct 15 - Oct 22', status: 'ready', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1194&auto=format&fit=crop', days: '12' },
    { title: 'Paris, France', date: 'Nov 10 - Nov 18', status: 'pending', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1173&auto=format&fit=crop', days: 'delayed' },
    { title: 'Bali, Indonesia', date: 'Dec 05 - Dec 12', status: 'ready', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=676&auto=format&fit=crop', days: '64' },
  ];

  const destinations = [
    { name: 'Rome', country: 'Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1096&auto=format&fit=crop' },
    { name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1170&auto=format&fit=crop' },
    { name: 'Sydney', country: 'Australia', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1170&auto=format&fit=crop' },
    { name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=735&auto=format&fit=crop' },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto pb-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="relative w-full max-w-md">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search destinations, trips..."
              className="w-full h-14 pl-14 pr-6 bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all shadow-sm text-slate-900 font-medium"
            />
          </div>

          <div className="flex items-center gap-5">
            <button className="w-14 h-14 flex items-center justify-center bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl text-slate-400 hover:text-blue-500 shadow-sm relative transition-all group active:scale-95">
              <Bell size={22} className="group-hover:rotate-12 transition-transform" />
              <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
            </button>

            <div className="flex items-center gap-3 p-1.5 pr-5 bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl shadow-sm cursor-pointer hover:bg-white transition-colors">
              <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop" className="w-full h-full object-cover" alt="User" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 leading-none">Alex Rivera</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Explorer</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Banner */}
        <div className="relative h-64 rounded-[32px] overflow-hidden mb-12 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2035&auto=format&fit=crop"
            alt="Travel Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-center px-12">
            <h2 className="text-5xl font-extrabold text-white mb-4 tracking-tight">Good morning, Alex</h2>
            <p className="text-xl text-white/90 font-medium max-w-lg">Ready to explore the world? Your next adventure awaits.</p>
          </div>
        </div>

        {/* Hero Greeting */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tight flex items-center gap-4 mb-2">
              Good morning, Alex <span className="animate-bounce-slow text-4xl">👋</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium">Ready for your next adventure? You have 3 upcoming trips.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="glass-card p-6 rounded-[28px] relative overflow-hidden group">
              <div className="flex justify-between items-start mb-8">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${stat.isBudget ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                  }`}>
                  {stat.sub}
                </div>
              </div>
              <div>
                <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider mb-1">{stat.label}</h3>
                <p className="text-4xl font-black text-slate-900 tracking-tight">{stat.value}</p>
              </div>
              {/* Decorative background blob */}
              <div className={`absolute -right-6 -bottom-6 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-[0.08] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
            </div>
          ))}
        </div>

        {/* Upcoming Adventures Deck */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Your Adventures</h3>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                <ChevronRight size={20} className="rotate-180" />
              </button>
              <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all shadow-sm">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide -mx-4 px-4">
            {/* New Trip Card */}
            <div
              onClick={() => navigate('/create-trip')}
              className="min-w-[300px] h-[400px] bg-white border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group snap-start"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:rotate-90 transition-transform duration-500 shadow-sm">
                <Plus size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">New Adventure</h4>
              <p className="text-slate-400 text-center px-8 text-sm font-medium">Start planning your next unforgettable journey.</p>
            </div>

            {adventures.map((adv, idx) => (
              <div key={idx} className="min-w-[320px] h-[400px] relative rounded-[32px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 snap-start">
                <img src={adv.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={adv.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Floating status pill */}
                <div className="absolute top-5 left-5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-lg border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
                  {adv.days} Days Away
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h4 className="text-2xl font-black text-white leading-none mb-3">{adv.title}</h4>
                  <div className="flex items-center gap-2 text-white/80 text-sm font-bold mb-6">
                    <Calendar size={16} />
                    {adv.date}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg">
                      View Itinerary
                    </button>
                    <div className="flex items-center justify-end -space-x-3 pr-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                          <img src={`https://i.pravatar.cc/100?u=${i + idx * 10}`} alt="Avatar" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Previous Trips */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Previous Trips</h3>
            <button className="text-blue-600 font-bold text-sm hover:underline">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Iceland Adventure', date: 'Aug 2023', image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=2000&auto=format&fit=crop', rating: 4.9 },
              { title: 'Swiss Alps', date: 'Jun 2023', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2000&auto=format&fit=crop', rating: 5.0 },
              { title: 'Morocco Explorer', date: 'Mar 2023', image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=2000&auto=format&fit=crop', rating: 4.8 },
            ].map((trip, idx) => (
              <div key={idx} className="bg-white rounded-[24px] overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer border border-slate-100">
                <div className="h-48 relative overflow-hidden">
                  <img src={trip.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={trip.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg border border-white/20 flex items-center gap-1">
                    <Star size={14} fill="gold" className="text-yellow-400" />
                    <span className="text-white text-xs font-bold">{trip.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{trip.title}</h4>
                  <p className="text-slate-500 text-sm font-medium mb-4">{trip.date}</p>
                  <button className="w-full py-2.5 bg-slate-50 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors">
                    View Memories
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Destinations */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Trending Destinations</h3>
            <button className="text-blue-600 font-bold text-sm hover:underline">View All</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {destinations.map((dest, idx) => (
              <div key={idx} className="h-[240px] rounded-[24px] overflow-hidden relative group cursor-pointer shadow-md hover:shadow-xl transition-all">
                <img src={dest.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={dest.name} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>

                <div className="absolute top-4 right-4 w-8 h-8 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  <Star size={14} fill="white" />
                </div>

                <div className="absolute bottom-5 left-5 text-white">
                  <h5 className="font-bold text-lg leading-none mb-1">{dest.name}</h5>
                  <p className="text-xs font-medium opacity-80 uppercase tracking-widest">{dest.country}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default MainLanding;
