import React, { useState } from 'react';
import Layout from '../components/Layout';
import MapView from '../components/MapView';
import { Search as SearchIcon, Filter, ChevronDown, Star, Heart, Clock, Info, Check, Plus, Minus } from 'lucide-react';

const Search = () => {
  // Mock Data
  const activities = [
    {
      id: 1,
      title: 'Louvre Museum Guided Tour',
      rating: 4.8,
      reviews: '1.2k reviews',
      description: 'Skip the long lines and join a guided tour of the Louvre Museum. See the Mona Lisa, Venus de Milo, and other masterpieces with an expert guide.',
      tags: ['History', '3 Hours', 'Instant Confirmation'],
      price: 45,
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
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?q=80&w=1974&auto=format&fit=crop',
      isAdded: true
    },
    {
      id: 3,
      title: 'Seine River Sunset Cruise',
      rating: 4.2,
      reviews: '850 reviews',
      description: 'Enjoy a romantic evening cruise on the Seine River. See the illuminated monuments of Paris, including the Eiffel Tower and Notre Dame.',
      tags: ['Romantic', '1 Hour'],
      price: 25,
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
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop',
      isAdded: false
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto pb-12">
        {/* Headers and Breadcrumbs */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-4">
            <span>Home</span>
            <span>&gt;</span>
            <span>Trip to Paris</span>
            <span>&gt;</span>
            <span className="text-slate-900 font-bold">Paris Activities</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Explore Activities in Paris</h1>
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold">
                <CalendarIcon className="mr-2" size={16} />
                Dec 12 - Dec 15
              </div>
            </div>

            <div className="w-full md:w-72">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-400 uppercase tracking-wider">Itinerary Budget</span>
                <span className="text-slate-900">$840 / $1200 used</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
              </div>
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
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Interests</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded-md border-2 border-blue-500 bg-blue-500 flex items-center justify-center text-white transition-colors">
                        <Check size={12} strokeWidth={4} />
                      </div>
                      <span className="text-slate-600 font-medium group-hover:text-slate-900">Museums & Art</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded-md border-2 border-slate-200 group-hover:border-blue-400 transition-colors"></div>
                      <span className="text-slate-600 font-medium group-hover:text-slate-900">Food & Drink</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded-md border-2 border-blue-500 bg-blue-500 flex items-center justify-center text-white transition-colors">
                        <Check size={12} strokeWidth={4} />
                      </div>
                      <span className="text-slate-600 font-medium group-hover:text-slate-900">Landmarks</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded-md border-2 border-slate-200 group-hover:border-blue-400 transition-colors"></div>
                      <span className="text-slate-600 font-medium group-hover:text-slate-900">Nightlife</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded-md border-2 border-slate-200 group-hover:border-blue-400 transition-colors"></div>
                      <span className="text-slate-600 font-medium group-hover:text-slate-900">Outdoors</span>
                    </label>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Price Range</h4>
                    <span className="text-xs font-bold text-slate-900">$0 - $200+</span>
                  </div>
                  <input type="range" className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                </div>

                {/* Duration */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Duration</h4>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">Any</button>
                    <button className="px-3 py-1.5 bg-white text-slate-600 text-xs font-bold rounded-lg border border-slate-200 hover:border-slate-300">&lt; 2h</button>
                    <button className="px-3 py-1.5 bg-white text-slate-600 text-xs font-bold rounded-lg border border-slate-200 hover:border-slate-300">Half Day</button>
                    <button className="px-3 py-1.5 bg-white text-slate-600 text-xs font-bold rounded-lg border border-slate-200 hover:border-slate-300">Full Day</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Sort */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search specific activities (e.g. Louvre, Wine Tasting)"
                  className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-900"
                />
              </div>
              <button className="px-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50">
                <Filter size={18} />
                <span className="hidden sm:inline">Recommended</span>
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Map Section */}
            <div className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-3">Activity Locations</h3>
              <MapView
                center={[48.8566, 2.3522]} // Paris coordinates
                zoom={12}
                height="300px"
                markers={[
                  { position: [48.8606, 2.3376], title: 'Louvre Museum', description: '$45 - 3 Hours' },
                  { position: [48.8584, 2.2945], title: 'Eiffel Tower', description: '$62 - 2.5 Hours' },
                  { position: [48.8566, 2.3522], title: 'Seine River Cruise', description: '$25 - 1 Hour' },
                  { position: [48.8867, 2.3431], title: 'Montmartre', description: '$85 - 2 Hours' },
                ]}
              />
            </div>

            <div className="text-sm font-medium text-slate-500 px-1">
              Showing <span className="text-slate-900 font-bold">6</span> activities matching your filters
            </div>

            {/* Activities List */}
            <div className="space-y-6">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className={`bg-white rounded-[20px] p-4 flex flex-col md:flex-row gap-6 border transition-all hover:shadow-lg ${activity.isAdded ? 'border-blue-500 ring-4 ring-blue-500/5' : 'border-slate-100'}`}
                >
                  {/* Image */}
                  <div className="w-full md:w-64 h-48 md:h-auto rounded-xl overflow-hidden relative shrink-0">
                    <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                    {activity.tags.includes('Best Seller') && (
                      <div className="absolute top-3 left-3 bg-amber-400 text-amber-950 text-[10px] font-black uppercase px-2 py-1 rounded shadow-sm">
                        Best Seller
                      </div>
                    )}
                    {activity.isAdded && (
                      <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded shadow-sm flex items-center gap-1">
                        <Check size={10} strokeWidth={4} />
                        Added
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{activity.title}</h3>
                        <div className="flex items-center gap-1.5">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} fill={i < Math.floor(activity.rating) ? "currentColor" : "none"} className={i < Math.floor(activity.rating) ? "" : "text-slate-300"} />
                            ))}
                          </div>
                          <span className="text-slate-900 font-bold text-sm">{activity.rating}</span>
                          <span className="text-slate-400 text-sm">({activity.reviews})</span>
                        </div>
                      </div>
                      <button className="text-slate-300 hover:text-red-500 transition-colors">
                        <Heart size={24} fill={activity.isAdded ? "currentColor" : "none"} className={activity.isAdded ? "text-red-500" : ""} />
                      </button>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {activity.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {activity.tags.map((tag, index) => {
                        if (tag === 'Best Seller') return null; // Handled in image
                        let icon = null;
                        if (tag.includes('Hour')) icon = <Clock size={12} />;

                        return (
                          <span key={index} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-100">
                            {icon}
                            {tag}
                          </span>
                        );
                      })}
                    </div>

                    <div className="mt-auto flex items-end justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">per person</div>
                        <div className="text-2xl font-black text-slate-900">${activity.price}</div>
                      </div>

                      {activity.isAdded ? (
                        <button className="flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-blue-100 text-blue-600 font-bold rounded-xl hover:bg-red-50 hover:border-red-100 hover:text-red-500 transition-all group">
                          <Minus size={18} />
                          <span className="group-hover:hidden">Added</span>
                          <span className="hidden group-hover:inline">Remove</span>
                        </button>
                      ) : (
                        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
                          <Plus size={18} strokeWidth={3} />
                          Select
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors">
              Load More Activities
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Helper Component for Icon - Lucide Calendar import conflict in main file if multiple used
const CalendarIcon = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

export default Search;
