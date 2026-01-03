import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import MapView from '../components/MapView';
import { Calendar, MapPin, Sparkles, Plus, Image as ImageIcon } from 'lucide-react';

const CreateTrip = () => {
  const navigate = useNavigate();
  const [selectedDest, setSelectedDest] = useState(null);
  const [tripName, setTripName] = useState('');

  const suggestions = [
    { id: 1, name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, name: 'Maui', country: 'Hawaii', image: 'https://images.unsplash.com/photo-1542259659-4ab2877c9175?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, name: 'Marrakech', country: 'Morocco', image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=1000&auto=format&fit=crop' },
    { id: 5, name: 'Banff', country: 'Canada', image: 'https://images.unsplash.com/photo-1561134643-6d0eb1c850eb?q=80&w=1000&auto=format&fit=crop' },
    { id: 6, name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1170&auto=format&fit=crop' },
  ];

  const handleContinue = (e) => {
    e.preventDefault();
    navigate('/build-itinerary');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Plan a new trip</h1>
          <p className="text-slate-500 font-medium">Start by adding the details for your next journey.</p>
        </div>

        <form onSubmit={handleContinue} className="space-y-6">
          {/* Card 1: Form Details */}
          <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-900">Trip Name</label>
                <input
                  type="text"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  placeholder="e.g., Summer in Kyoto"
                  className="w-full h-14 px-5 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-900">Select a Place</label>
                <div className="relative">
                  <MapPin size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    value={selectedDest ? selectedDest.name : ''}
                    onChange={() => { }}
                    className="w-full h-14 pl-12 pr-5 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-900">Start Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="mm/dd/yyyy"
                      onFocus={(e) => e.target.type = 'date'}
                      onBlur={(e) => e.target.type = 'text'}
                      className="w-full h-14 px-5 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                      required
                    />
                    <Calendar size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-900">End Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="mm/dd/yyyy"
                      onFocus={(e) => e.target.type = 'date'}
                      onBlur={(e) => e.target.type = 'text'}
                      className="w-full h-14 px-5 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                      required
                    />
                    <Calendar size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Suggestions */}
          <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
            <label className="block text-lg font-bold text-slate-900 mb-6">Suggestion for Places to Visit/Activities to prefer</label>

            {/* World Map */}
            <div className="mb-8">
              <MapView
                center={[30, 0]} // World view
                zoom={2}
                height="350px"
                markers={[
                  { position: [35.0116, 135.7681], title: 'Kyoto, Japan', description: 'Cultural Heritage' },
                  { position: [36.3932, 25.4615], title: 'Santorini, Greece', description: 'Island Paradise' },
                  { position: [20.7984, -156.3319], title: 'Maui, Hawaii', description: 'Beach Destination' },
                  { position: [31.6295, -7.9811], title: 'Marrakech, Morocco', description: 'Exotic Adventure' },
                  { position: [51.1784, -115.5708], title: 'Banff, Canada', description: 'Mountain Escape' },
                  { position: [40.7128, -74.0060], title: 'New York, USA', description: 'Urban Experience' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {suggestions.map((place) => (
                <div
                  key={place.id}
                  onClick={() => setSelectedDest(place)}
                  className={`
                                        group cursor-pointer rounded-2xl border-2 transition-all p-4 bg-slate-50 hover:bg-white hover:shadow-lg
                                        ${selectedDest?.id === place.id ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-slate-100 hover:border-blue-200'}
                                    `}
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 mb-4 relative">
                    {/* Mocking the 'skeleton' look from design if images fail, or just using images */}
                    <img src={place.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={place.name} />
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50 opacity-0 group-hover:opacity-0">
                      <ImageIcon className="text-slate-300" size={32} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4 group-hover:bg-slate-100 transition-colors"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2 group-hover:bg-slate-100 transition-colors"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 h-14 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-[0.98] transition-all"
            >
              Create Trip
            </button>
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="flex-1 h-14 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateTrip;
