import React from 'react';
import Layout from '../components/Layout';
import {
  Share2, Download, Calendar, List, MapPin, Bike,
  Banknote, Plus, FileText, Edit3, ChevronRight, Activity, PersonStanding
} from 'lucide-react';

const ItineraryView = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto pb-12">
        {/* Header Section */}
        <div className="mb-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-4">
            <span>Dashboard</span>
            <ChevronRight size={14} />
            <span>My Trips</span>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-bold">Itinerary for a selected place</span>
          </div>

          <div className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-end">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Itinerary for a selected place</h1>
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <Calendar size={18} />
                <span>Jun 15 - Jun 17</span>
                <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                <span>2 Days</span>
                <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                <span>2 Travelers</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-white p-1 rounded-xl border border-slate-200 flex">
                <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg flex items-center gap-2 font-bold text-sm transition-all">
                  <List size={16} />
                  List
                </button>
                <button className="px-4 py-2 text-slate-500 hover:text-slate-700 rounded-lg flex items-center gap-2 font-bold text-sm transition-all">
                  <Calendar size={16} />
                  Calendar
                </button>
              </div>
              <button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2">
                <Share2 size={18} />
                Share
              </button>
              <button className="p-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all">
                <Download size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Timeline Content */}
          <div className="xl:col-span-2 space-y-10">

            {/* Day 1 */}
            <div className="relative pl-8 border-l-2 border-slate-100/50">
              {/* Day Header */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white"></div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-bold">Day 1</span>
                  <h2 className="text-xl font-bold text-slate-900">City Arrival & Exploration</h2>
                </div>
                <span className="text-slate-400 font-bold text-sm">Jun 15, Sat</span>
              </div>

              <div className="space-y-4">
                {/* Activity Card */}
                <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-6">
                      <div className="text-center min-w-[60px]">
                        <div className="text-xl font-black text-slate-900">10:00</div>
                        <div className="text-xs font-bold text-slate-400 uppercase">AM</div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Physical activity</h3>
                        <div className="flex items-center gap-2 text-slate-500 font-medium text-sm mb-3">
                          <PersonStanding size={16} />
                          City Park & Nature Trail
                        </div>
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                          Moderate Intensity
                        </span>
                      </div>
                    </div>
                    <div className="text-slate-300">
                      <PersonStanding size={24} />
                    </div>
                  </div>
                </div>

                {/* Expense Card */}
                <div className="bg-green-50/50 p-5 rounded-[20px] border border-green-100 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                      <Banknote size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Expense</h4>
                      <p className="text-xs font-bold text-slate-400">Lunch & Park Entry Fees</p>
                    </div>
                  </div>
                  <div className="text-xl font-black text-slate-900">$45.00</div>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className="relative pl-8 border-l-2 border-slate-100/50">
              {/* Day Header */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 ring-4 ring-white"></div>

              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-bold">Day 2</span>
                  <h2 className="text-xl font-bold text-slate-900">Cultural Immersion</h2>
                </div>
                <span className="text-slate-400 font-bold text-sm">Jun 16, Sun</span>
              </div>

              <div className="space-y-4">
                {/* Activity Card */}
                <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-6">
                      <div className="text-center min-w-[60px]">
                        <div className="text-xl font-black text-slate-900">09:00</div>
                        <div className="text-xs font-bold text-slate-400 uppercase">AM</div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Physical activity</h3>
                        <div className="flex items-center gap-2 text-slate-500 font-medium text-sm mb-3">
                          <Bike size={16} />
                          Historic Center Bike Tour
                        </div>
                        <span className="inline-block px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                          High Intensity
                        </span>
                      </div>
                    </div>
                    <div className="text-slate-300">
                      <Bike size={24} />
                    </div>
                  </div>
                </div>

                {/* Expense Card */}
                <div className="bg-green-50/50 p-5 rounded-[20px] border border-green-100 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                      <Banknote size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Expense</h4>
                      <p className="text-xs font-bold text-slate-400">Bike Rental & Museum Tickets</p>
                    </div>
                  </div>
                  <div className="text-xl font-black text-slate-900">$85.00</div>
                </div>
              </div>
            </div>

            {/* Add Activity Button */}
            <div className="pl-8">
              <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[24px] text-slate-500 font-bold hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                <Plus size={20} />
                Add Activity
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Map Card */}
            <div className="bg-white p-3 rounded-[24px] border border-slate-100 shadow-sm">
              <div className="h-48 rounded-xl bg-slate-200 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Map" />
                <div className="absolute inset-x-4 bottom-4 bg-white/90 backdrop-blur-md p-3 rounded-xl">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Location</div>
                  <div className="flex items-center gap-1 font-bold text-slate-900">
                    <MapPin size={16} className="text-blue-600" />
                    London, UK
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Overview */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900">Budget Overview</h3>
                <div className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded">On Track</div>
              </div>

              <div className="mb-2 flex justify-between text-sm font-medium">
                <span className="text-slate-500">Spent</span>
                <span className="text-slate-900 font-extrabold">$130 / $500</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '26%' }}></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Daily Avg.</div>
                  <div className="font-black text-slate-900">$65.00</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Remaining</div>
                  <div className="font-black text-slate-900">$370.00</div>
                </div>
              </div>
            </div>

            {/* Trip Summary */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6">Trip Summary</h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                      <Banknote size={20} />
                    </div>
                    <span className="font-medium text-slate-600">Total Budget</span>
                  </div>
                  <span className="font-extrabold text-slate-900">$500</span>
                </div>

                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <MapPin size={20} />
                    </div>
                    <span className="font-medium text-slate-600">Cities</span>
                  </div>
                  <span className="font-extrabold text-slate-900">1</span>
                </div>

                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Activity size={20} />
                    </div>
                    <span className="font-medium text-slate-600">Activities</span>
                  </div>
                  <span className="font-extrabold text-slate-900">4 Planned</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all">
                <FileText size={18} />
                PDF Export
              </button>
              <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all">
                <Edit3 size={18} />
                Edit Dates
              </button>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItineraryView;
