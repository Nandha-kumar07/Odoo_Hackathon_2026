import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import MapView from '../components/MapView';
import { Search as SearchIcon, Filter, ChevronDown, Star, Heart, Clock, Info, Check, Plus, Minus, Calendar as CalendarIcon } from 'lucide-react';
import { tripService } from '../services/trips';
import { activityService } from '../services/activities';

const Search = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState('');
  const [addingId, setAddingId] = useState(null);

  // Mock Data for "Search Results"
  // In a real app, this would come from an external Places API
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: 'Louvre Museum Guided Tour',
      rating: 4.8,
      reviews: '1.2k reviews',
      description: 'Skip the long lines and join a guided tour of the Louvre Museum. See the Mona Lisa, Venus de Milo, and other masterpieces with an expert guide.',
      tags: ['History', '3 Hours', 'Instant Confirmation'],
      price: 45,
      location: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1499856871940-a09627c6d7db?q=80&w=2070&auto=format&fit=crop',
      isAdded: false
    },
    {
      id: 2,
      title: 'Eiffel Tower Summit',
      rating: 5.0,
      reviews: '3.4k reviews',
      description: 'Access the summit of the Eiffel Tower for breathtaking views of Paris. Includes elevator access and a glass of champagne option.',
      tags: ['Landmark', '2.5 Hours', 'Selling Fast'],
      price: 62,
      location: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?q=80&w=1974&auto=format&fit=crop',
      isAdded: false
    },
    {
      id: 3,
      title: 'Seine River Sunset Cruise',
      rating: 4.2,
      reviews: '850 reviews',
      description: 'Enjoy a romantic evening cruise on the Seine River. See the illuminated monuments of Paris, including the Eiffel Tower and Notre Dame.',
      tags: ['Romantic', '1 Hour'],
      price: 25,
      location: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=2070&auto=format&fit=crop',
      isAdded: false
    },
    {
      id: 4,
      title: 'Montmartre Cheese & Wine',
      rating: 4.9,
      reviews: '420 reviews',
      description: 'Discover the culinary delights of Montmartre. Taste artisanal cheeses and fine wines while exploring the charming streets of this artistic...',
      tags: ['Foodie', '2 Hours'],
      price: 85,
      location: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop',
      isAdded: false
    },
  ]);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const data = await tripService.getAllTrips();
        setTrips(data);
        if (data.length > 0) {
          // Auto-select ongoing or first trip
          const active = data.find(t => t.status === 'ongoing') || data[0];
          setSelectedTripId(active.id);
        }
      } catch (err) {
        console.error("Failed to load trips", err);
      }
    };
    loadTrips();
  }, []);

  const handleAddActivity = async (activity) => {
    if (!selectedTripId) {
      alert("Please select a trip first");
      return;
    }
    setAddingId(activity.id);
    try {
      const trip = trips.find(t => t.id == selectedTripId);
      // Add to backend
      await activityService.addActivity(selectedTripId, {
        title: activity.title,
        description: activity.description,
        activity_date: trip.start_date, // Default to start date
        activity_time: '10:00:00',
        location: activity.location,
        price: activity.price,
        activity_type: activity.tags[0] || 'Sightseeing',
        is_added: true
      });

      // Update UI
      setActivities(prev => prev.map(a =>
        a.id === activity.id ? { ...a, isAdded: true } : a
      ));
    } catch (err) {
      console.error("Failed to add activity", err);
      alert("Failed to add activity to trip");
    } finally {
      setAddingId(null);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto pb-12">
        {/* Headers and Breadcrumbs */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-4">
            <span onClick={() => navigate('/home')} className="cursor-pointer hover:text-slate-900">Dashboard</span>
            <ChevronDown size={14} className="-rotate-90" />
            <span className="text-slate-900 font-bold">Explore Activities</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Explore & Add Activities</h1>

              {/* Trip Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-500">Add to Trip:</span>
                <div className="relative">
                  <select
                    value={selectedTripId}
                    onChange={(e) => setSelectedTripId(e.target.value)}
                    className="appearance-none bg-blue-50 text-blue-700 pl-4 pr-10 py-2 rounded-xl text-sm font-bold border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {trips.length === 0 && <option value="">No trips found</option>}
                    {trips.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="w-full md:w-72">
              {/* Optional: Show selected trip budget status? */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="hidden lg:block space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-lg">Filters</h3>
                <button className="text-blue-600 text-xs font-bold hover:underline">Reset All</button>
              </div>

              <div className="space-y-6">
                {/* Interests */}
                <div>
                  <h4 className="font-bold text-slate-800 mb-3 text-sm">Interests</h4>
                  <div className="space-y-2">
                    {['Sightseeing', 'Food & Drink', 'Adventure', 'History', 'Art & Culture'].map(tag => (
                      <label key={tag} className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-4 h-4 rounded border border-slate-300 group-hover:border-blue-500 transition-colors flex items-center justify-center">
                          <Check size={10} className="text-white opacity-0" />
                        </div>
                        <span className="text-sm text-slate-600 font-medium group-hover:text-blue-600 transition-colors">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Bar */}
            <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 mb-6">
              <div className="pl-4 text-slate-400">
                <SearchIcon size={20} />
              </div>
              <input
                type="text"
                placeholder="Search activities, tours, or destinations..."
                className="flex-1 bg-transparent border-none focus:outline-none text-slate-900 font-bold placeholder:font-medium placeholder:text-slate-400"
              />
              <button className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">
                Search
              </button>
            </div>

            {/* Results List */}
            <div className="space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row gap-6 group">
                  <div className="w-full md:w-64 h-48 md:h-auto shrink-0 relative rounded-2xl overflow-hidden">
                    <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-red-500 transition-all">
                      <Heart size={18} />
                    </button>
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-500 mb-1">
                          <Star size={14} fill="currentColor" />
                          <span>{activity.rating}</span>
                          <span className="text-slate-400 font-medium">({activity.reviews})</span>
                        </div>
                        <div className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">Popular</div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2">{activity.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-2 mb-4">{activity.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {activity.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">From</p>
                        <p className="text-2xl font-black text-slate-900">${activity.price}</p>
                      </div>

                      <button
                        onClick={() => handleAddActivity(activity)}
                        disabled={activity.isAdded || addingId === activity.id}
                        className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${activity.isAdded
                            ? 'bg-green-100 text-green-700 cursor-default'
                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20'
                          }`}
                      >
                        {addingId === activity.id ? (
                          'Adding...'
                        ) : activity.isAdded ? (
                          <>
                            <Check size={18} />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus size={18} />
                            Add to Trip
                          </>
                        )}
                      </button>
                    </div>
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

export default Search;
