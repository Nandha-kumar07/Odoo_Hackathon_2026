import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import MapView from '../components/MapView';
import { Calendar, MapPin, Sparkles, Plus, Image as ImageIcon, Wallet } from 'lucide-react';
import { tripService } from '../services/trips';

const CreateTrip = () => {
  const navigate = useNavigate();
  const [selectedDest, setSelectedDest] = useState(null);
  const [tripName, setTripName] = useState('');
  const [dates, setDates] = useState({ start: '', end: '' });
  const [budget, setBudget] = useState('');
  const [travelerType, setTravelerType] = useState('Solo');
  const [generateSmart, setGenerateSmart] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const travelerTypes = [
    { id: 'Solo', label: 'Solo', icon: PersonStanding },
    { id: 'Couple', label: 'Couple', icon: PersonStanding }, // Placeholder, would use Heart or similar
    { id: 'Friends', label: 'Friends', icon: PersonStanding }, // Placeholder, would use Users
    { id: 'Family', label: 'Family', icon: PersonStanding }, // Placeholder, would use Home
  ];

  const suggestions = [
    { id: 1, name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, name: 'Maui', country: 'Hawaii', image: 'https://images.unsplash.com/photo-1542259659-4ab2877c9175?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, name: 'Marrakech', country: 'Morocco', image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=1000&auto=format&fit=crop' },
    { id: 5, name: 'Banff', country: 'Canada', image: 'https://images.unsplash.com/photo-1561134643-6d0eb1c850eb?q=80&w=1000&auto=format&fit=crop' },
    { id: 6, name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1170&auto=format&fit=crop' },
  ];

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    if (!selectedDest) {
      setError('Please select a destination from suggestions or map');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const newTrip = await tripService.createTrip({
        name: tripName,
        destination: `${selectedDest.name}, ${selectedDest.country}`,
        start_date: dates.start,
        end_date: dates.end,
        budget: parseFloat(budget) || 0,
        image_url: selectedDest.image,
        traveler_type: travelerType
      });

      if (generateSmart) {
        // Call the smart generation endpoint
        await tripService.generateItinerary(newTrip.id);
      }

      navigate('/trips');
    } catch (err) {
      setError('Failed to create trip. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleCreateTrip}>
        <div className="max-w-4xl mx-auto pb-24">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Plan a new trip</h1>
            <p className="text-slate-500 font-medium">Start by adding the details for your next journey.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 font-medium">
              {error}
            </div>
          )}

          <div className="space-y-6">
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
                      value={selectedDest ? `${selectedDest.name}, ${selectedDest.country}` : ''}
                      onChange={() => { }}
                      placeholder="Select from suggestions below..."
                      readOnly
                      className="w-full h-14 pl-12 pr-5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-900 placeholder:text-slate-400 cursor-pointer"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">Start Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={dates.start}
                        onChange={(e) => setDates({ ...dates, start: e.target.value })}
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
                        type="date"
                        value={dates.end}
                        onChange={(e) => setDates({ ...dates, end: e.target.value })}
                        className="w-full h-14 px-5 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                        required
                      />
                      <Calendar size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-900">Estimated Budget</label>
                  <div className="relative">
                    <Wallet size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g. 5000"
                      className="w-full h-14 pl-12 pr-5 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-900">Who are you traveling with?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {['Solo', 'Couple', 'Friends', 'Family'].map((type) => (
                      <div
                        key={type}
                        onClick={() => setTravelerType(type)}
                        className={`
                          cursor-pointer p-4 rounded-xl border-2 text-center transition-all
                          ${travelerType === type ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'}
                        `}
                      >
                        <div className="font-bold">{type}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={generateSmart}
                      onChange={(e) => setGenerateSmart(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-bold text-slate-900">Generate a smart itinerary for me</span>
                  </label>
                  <p className="text-xs text-slate-500 mt-1 ml-14">We'll suggest places and food based on your traveler type.</p>
                </div>
              </div>
            </div>

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
                      <img src={place.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={place.name} />
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50 opacity-0 group-hover:opacity-0">
                        <ImageIcon className="text-slate-300" size={32} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-bold text-slate-900">{place.name}</div>
                      <div className="text-xs font-bold text-slate-500 uppercase">{place.country}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:pl-80 z-20">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <button type="button" onClick={() => navigate(-1)} className="px-6 py-3 font-bold text-slate-500 hover:text-slate-900 transition-colors">
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <Sparkles size={18} />
              {loading ? 'Creating...' : 'Create Trip'}
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default CreateTrip;
