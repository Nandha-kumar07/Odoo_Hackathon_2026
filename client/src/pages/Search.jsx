import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Search as SearchIcon, Filter, ChevronDown, Star, Heart, MapPin, Check, Plus, Loader2, Building2, Map as MapIcon, RotateCcw } from 'lucide-react';
import { tripService } from '../services/trips';
import { activityService } from '../services/activities';
import { searchService } from '../services/search';
import { useDebounce } from '../hooks/useDebounce'; // We assume this hook exists or we implement a simple timeout

const Search = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('activities'); // 'activities' | 'cities'

  // Data States
  const [trips, setTrips] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addingId, setAddingId] = useState(null);

  // Filter States
  const [selectedTripId, setSelectedTripId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Debounce search query to avoid API spam
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load Trips for "Add to Trip" dropdown
  useEffect(() => {
    const loadTrips = async () => {
      try {
        const data = await tripService.getAllTrips();
        setTrips(data);
        if (data.length > 0) {
          const active = data.find(t => t.status === 'ongoing') || data[0];
          setSelectedTripId(active.id);
        }
      } catch (err) {
        console.error("Failed to load trips", err);
      }
    };
    loadTrips();
  }, []);

  // Fetch Results
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        let data;
        if (activeTab === 'activities') {
          data = await searchService.searchActivities({
            query: debouncedQuery,
            category: selectedCategory,
            minPrice: priceRange.min,
            maxPrice: priceRange.max
          });
        } else {
          data = await searchService.searchCities({
            query: debouncedQuery
          });
        }
        setResults(data.data);
      } catch (err) {
        console.error("Failed to search", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [activeTab, debouncedQuery, selectedCategory, priceRange]);

  const handleAddActivity = async (activity) => {
    if (!selectedTripId) {
      alert("Please select a trip first");
      return;
    }
    setAddingId(activity.id);
    try {
      const trip = trips.find(t => t.id == selectedTripId);
      await activityService.addActivity(selectedTripId, {
        title: activity.title,
        description: activity.description,
        activity_date: trip.start_date,
        activity_time: '10:00:00',
        location: activity.location,
        price: activity.price,
        activity_type: activity.category || 'Sightseeing',
        is_added: true
      });

      // Optimistic update
      setResults(prev => prev.map(a =>
        a.id === activity.id ? { ...a, isAdded: true } : a
      ));
    } catch (err) {
      console.error("Failed to add activity", err);
      alert("Failed to add activity to trip");
    } finally {
      setAddingId(null);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Explore & Plan</h1>
              <p className="text-slate-500 font-medium">Discover top activities and destinations for your next journey.</p>
            </div>

            {/* Mode Toggle */}
            <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
              <button
                onClick={() => setActiveTab('activities')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'activities' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Activities
              </button>
              <button
                onClick={() => setActiveTab('cities')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'cities' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Cities
              </button>
            </div>
          </div>

          {/* Search & Trip Select Bar */}
          <div className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex items-center gap-3 bg-slate-50 px-4 rounded-xl border border-slate-100">
              <SearchIcon className="text-slate-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeTab === 'activities' ? "Search for tours, museums, landmarks..." : "Search for cities, countries..."}
                className="flex-1 bg-transparent h-12 outline-none font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-medium"
              />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="bg-slate-200 rounded-full p-1"><RotateCcw size={12} /></button>}
            </div>

            {activeTab === 'activities' && (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                <span className="text-sm font-bold text-slate-500 whitespace-nowrap">Add to:</span>
                <div className="relative min-w-[200px]">
                  <select
                    value={selectedTripId}
                    onChange={(e) => setSelectedTripId(e.target.value)}
                    className="w-full appearance-none bg-blue-50 text-blue-700 pl-4 pr-10 py-3 rounded-xl text-sm font-bold border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {trips.length === 0 && <option value="">No trips found</option>}
                    {trips.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar (Only for Activities) */}
          {activeTab === 'activities' && (
            <div className="hidden lg:block space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Filter size={18} /> Filters
                </div>
                {(selectedCategory || priceRange.min || priceRange.max) && (
                  <button onClick={handleResetFilters} className="text-xs font-bold text-blue-600 hover:underline">Reset</button>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Category</label>
                <div className="space-y-2">
                  {['Sightseeing', 'Food & Drink', 'Adventure', 'History', 'Art & Culture'].map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selectedCategory === cat ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-500'}`}>
                        {selectedCategory === cat && <Check size={12} className="text-white" />}
                      </div>
                      <input
                        type="radio"
                        name="category"
                        className="hidden"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                      />
                      <span className={`text-sm font-medium transition-colors ${selectedCategory === cat ? 'text-blue-700' : 'text-slate-600 group-hover:text-slate-900'}`}>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Price Range</label>
                <div className="flex gap-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      className="w-full pl-6 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      className="w-full pl-6 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Grid */}
          <div className={activeTab === 'activities' ? "lg:col-span-3" : "lg:col-span-4"}>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Loader2 size={32} className="animate-spin mb-4 text-blue-600" />
                <span className="font-bold">Searching {activeTab}...</span>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[24px] border border-dashed border-slate-200">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <SearchIcon size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No matches found</h3>
                <p className="text-slate-500">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {results.map((item) => (
                  activeTab === 'activities' ? (
                    // Activity Card
                    <div key={item.id} className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row gap-6 group">
                      <div className="w-full md:w-64 h-48 md:h-auto shrink-0 relative rounded-2xl overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-900">
                          {item.category}
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-amber-500 mb-1">
                              <Star size={14} fill="currentColor" />
                              <span>{item.rating}</span>
                              <span className="text-slate-400 font-medium">({item.reviews})</span>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                          <p className="text-sm text-slate-500 line-clamp-2 mb-4">{item.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.tags.map(tag => (
                              <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{tag}</span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">From</p>
                            <p className="text-2xl font-black text-slate-900">₹{item.price}</p>
                          </div>
                          <button
                            onClick={() => handleAddActivity(item)}
                            disabled={item.isAdded || addingId === item.id}
                            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${item.isAdded ? 'bg-green-100 text-green-700' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20'}`}
                          >
                            {addingId === item.id ? <Loader2 size={18} className="animate-spin" /> : item.isAdded ? <><Check size={18} /> Added</> : <><Plus size={18} /> Add to Trip</>}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // City Card
                    <div key={item.id} className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row gap-6 group">
                      <div className="w-full md:w-64 h-48 md:h-auto shrink-0 relative rounded-2xl overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-slate-900">
                          Cost: <span className="text-green-600">{item.cost_index}</span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center py-2">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                          <MapIcon size={14} /> {item.country}
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">{item.name}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">{item.description}</p>

                        <div className="mt-6 flex gap-3">
                          <button onClick={() => navigate('/create-trip')} className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2">
                            <Plus size={18} /> Plan Trip Here
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
