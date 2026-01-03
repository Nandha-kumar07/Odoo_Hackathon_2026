import React from 'react';
import Layout from '../components/Layout';
import { Search, Bell, MapPin, ChevronRight, Star, Plus } from 'lucide-react';

const MainLanding = () => {
  const stats = [
    { label: 'Upcoming Trips', value: '3', sub: '+1 new', icon: <MapPin size={20} className="text-blue-500" />, bg: 'bg-blue-50' },
    { label: 'Countries Visited', value: '12', sub: '+2 this year', icon: <GlobeIcon />, bg: 'bg-purple-50' },
    { label: 'Yearly Budget Spent', value: '$4,200', sub: '/$8,000', icon: <div className="w-5 h-5 rounded-full border-2 border-orange-400 border-t-transparent animate-spin"></div>, bg: 'bg-orange-50', isBudget: true },
  ];

  const adventures = [
    { title: 'Tokyo, Japan', date: 'Oct 15 - Oct 22', status: 'ready', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1194&auto=format&fit=crop', days: '12' },
    { title: 'Paris, France', date: 'Nov 10 - Nov 18', status: 'pending', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1173&auto=format&fit=crop', days: 'delayed' },
  ];

  const destinations = [
    { name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=676&auto=format&fit=crop' },
    { name: 'Rome', country: 'Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1096&auto=format&fit=crop' },
    { name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1170&auto=format&fit=crop' },
    { name: 'Sydney', country: 'Australia', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1170&auto=format&fit=crop' },
    { name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=735&auto=format&fit=crop' },
  ];

  return (
    <Layout>
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div className="relative w-[400px]">
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search destinations, trips..."
            className="w-full h-14 pl-14 pr-6 bg-white border border-[#F1F5F9] rounded-[24px] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all shadow-sm text-slate-900 font-medium"
          />
        </div>

        <div className="flex items-center gap-5">
          <button className="w-14 h-14 flex items-center justify-center bg-white border border-[#F1F5F9] rounded-[22px] text-slate-400 hover:text-blue-500 shadow-sm relative transition-all group">
            <Bell size={22} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
          </button>

          <div className="flex items-center gap-3 p-1 pr-4 bg-white border border-[#F1F5F9] rounded-[22px] shadow-sm">
            <div className="w-11 h-11 rounded-[18px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop" className="w-full h-full object-cover" alt="User" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 leading-none">Alex Rivera</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Explorer</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Greeting */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-[44px] font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            Good morning, Alex <span className="animate-bounce-slow">👋</span>
          </h2>
          <p className="text-[#64748B] text-lg font-medium mt-1">Ready for your next adventure? You have 3 upcoming trips.</p>
        </div>
        <div className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-[18px] text-[13px] font-extrabold border border-blue-100/50 shadow-sm">
          Next trip in 12 days
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-8 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-7 rounded-[32px] border border-[#F1F5F9] shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
            <div className="flex justify-between items-start">
              <div className={`w-12 h-12 ${stat.bg} rounded-[20px] flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                <div className="flex items-baseline justify-end gap-2 mt-2">
                  <span className="text-[32px] font-extrabold text-slate-900 leading-none">{stat.value}</span>
                  <span className={`text-xs font-bold ${stat.isBudget ? 'text-slate-400' : 'text-green-500'}`}>{stat.sub}</span>
                </div>
              </div>
            </div>
            {stat.isBudget && (
              <div className="mt-8">
                <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase mb-2">
                  <span>Spent</span>
                  <span>Goal: $8,000</span>
                </div>
                <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 rounded-full shadow-lg shadow-orange-200" style={{ width: '52.5%' }}></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Adventures Section */}
      <section className="mb-14">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Upcoming Adventures</h3>
          <button className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all px-4 py-2 bg-blue-50 rounded-xl">
            View all
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {adventures.map((adv, idx) => (
            <div key={idx} className="bg-white rounded-[32px] border border-[#F1F5F9] shadow-sm overflow-hidden group hover:shadow-2xl transition-all h-full">
              <div className="relative h-[220px]">
                <img src={adv.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={adv.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-5 left-5 px-4 py-1.5 bg-black/30 backdrop-blur-md rounded-[12px] text-white text-xs font-bold border border-white/20 uppercase">
                  {adv.days} Days Left
                </div>
                <div className="absolute top-5 right-5 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                  {adv.status === 'ready' ? (
                    <div className="w-5 h-5 bg-[#22C55E] rounded-full flex items-center justify-center shadow-lg">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    </div>
                  ) : (
                    <div className="w-5 h-5 border-3 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
              </div>
              <div className="p-7">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{adv.title}</h4>
                </div>
                <p className="text-slate-400 font-bold text-sm mb-8 tracking-wide">{adv.date}</p>
                <div className="flex justify-between items-center pt-1 border-t border-slate-50">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-9 h-9 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm">
                        <img src={`https://i.pravatar.cc/100?u=${i + idx * 5}`} alt="Avatar" />
                      </div>
                    ))}
                    <div className="w-9 h-9 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-[10px] font-extrabold text-slate-600 shadow-sm">+2</div>
                  </div>
                  <button className="text-xs font-extrabold text-blue-600 uppercase tracking-widest hover:underline">Details</button>
                </div>
              </div>
            </div>
          ))}

          {/* Create New Card */}
          <div className="bg-blue-50/50 border-3 border-dashed border-blue-100 rounded-[40px] p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-blue-600 shadow-xl shadow-blue-900/10 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <Plus size={32} strokeWidth={2.5} />
            </div>
            <h4 className="text-xl font-extrabold text-slate-900 mb-2">Plan a New Trip</h4>
            <p className="text-slate-400 font-bold text-sm mb-8 px-4 leading-relaxed tracking-tight">Discover new places and create unforgettable memories.</p>
            <button className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">Start Planning</button>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Popular Destinations</h3>
          <div className="flex gap-3">
            <button className="w-11 h-11 flex items-center justify-center bg-white border border-[#F1F5F9] rounded-xl text-slate-400 hover:text-blue-500 shadow-sm transition-all">
              <ChevronRight size={20} className="rotate-180" />
            </button>
            <button className="w-11 h-11 flex items-center justify-center bg-white border border-[#F1F5F9] rounded-xl text-slate-400 hover:text-blue-500 shadow-sm transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-6">
          {destinations.map((dest, idx) => (
            <div key={idx} className="relative h-[280px] rounded-[32px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all">
              <img src={dest.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2" alt={dest.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

              <div className="absolute top-5 right-5 z-20">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all shadow-lg active:scale-90">
                  <Star size={18} />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 z-20">
                <h5 className="text-2xl font-black text-white leading-none mb-1 group-hover:translate-x-1 transition-transform">{dest.name}</h5>
                <p className="text-white/70 text-sm font-bold uppercase tracking-widest">{dest.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

const GlobeIcon = () => (
  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

export default MainLanding;
