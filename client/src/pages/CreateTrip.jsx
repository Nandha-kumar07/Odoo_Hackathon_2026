import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Calendar, MapPin, ArrowRight, Sparkles, Plus } from 'lucide-react';

const CreateTrip = () => {
  const navigate = useNavigate();
  const [selectedDest, setSelectedDest] = useState(null);

  const suggestions = [
    { id: 1, name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, name: 'Reykjavik', country: 'Iceland', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, name: 'Maui', country: 'Hawaii', image: 'https://images.unsplash.com/photo-1542259659-4ab2877c9175?q=80&w=1000&auto=format&fit=crop' },
    { id: 5, name: 'Marrakech', country: 'Morocco', image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=1000&auto=format&fit=crop' },
    { id: 6, name: 'Banff', country: 'Canada', image: 'https://images.unsplash.com/photo-1561134643-6d0eb1c850eb?q=80&w=1000&auto=format&fit=crop' },
  ];

  const handleContinue = (e) => {
    e.preventDefault();
    navigate('/build-itinerary');
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Plan a New Trip</h1>
          <p className="text-slate-500 font-medium">Start your journey by selecting a destination and dates.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-blue-900/5 sticky top-24">
              <form onSubmit={handleContinue} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Trip Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Summer Vacation 2024"
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Destination</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Where to?"
                      value={selectedDest ? `${selectedDest.name}, ${selectedDest.country}` : ''}
                      onChange={() => { }} // Controlled by selection below for demo
                      className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-900"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Start Date</label>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="date"
                        className="w-full h-12 pl-11 pr-2 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-900 text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">End Date</label>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="date"
                        className="w-full h-12 pl-11 pr-2 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-900 text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full h-14 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                  >
                    Start Planning
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Suggestions Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={20} className="text-amber-500" />
              <h2 className="text-lg font-bold text-slate-900">Popular Destinations</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {suggestions.map((place) => (
                <div
                  key={place.id}
                  onClick={() => setSelectedDest(place)}
                  className={`
                    relative group cursor-pointer rounded-2xl overflow-hidden aspect-[3/4] transition-all duration-300
                    ${selectedDest?.id === place.id ? 'ring-4 ring-blue-500 ring-offset-2' : 'hover:shadow-xl'}
                  `}
                >
                  <img src={place.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={place.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                      <Plus size={24} />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-bold text-lg leading-none mb-1">{place.name}</h3>
                    <p className="text-white/70 text-xs font-bold uppercase tracking-wider">{place.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateTrip;
