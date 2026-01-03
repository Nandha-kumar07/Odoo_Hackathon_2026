import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Plus, Trash2, Calendar, DollarSign, MapPin, ChevronDown } from 'lucide-react';

const BuildItinerary = () => {
  const [sections, setSections] = useState([
    { id: 1, title: 'Day 1: Arrival & Check-in', budget: '' },
    { id: 2, title: 'Day 2: City Tour', budget: '' }
  ]);

  const addSection = () => {
    setSections([...sections, { id: Date.now(), title: '', budget: '' }]);
  };

  const removeSection = (id) => {
    setSections(sections.filter(s => s.id !== id));
  };

  return (
    <Layout>
      <header className="mb-10 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-2 text-slate-400 font-bold text-xs uppercase tracking-wider">
            <span>Trip Planner</span>
            <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
            <span>Draft</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Build Your Itinerary</h1>
          <p className="text-slate-500 mt-1 font-medium">Add details for your upcoming adventure to Tokyo, Japan.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors">
            Save Draft
          </button>
          <button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors">
            Publish Trip
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Global Details Card */}
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="text-blue-500" size={20} />
            <h2 className="text-lg font-bold text-slate-900">Trip Overview</h2>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Budget</label>
              <div className="text-xl font-black text-slate-900">$4,200</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</label>
              <div className="text-xl font-black text-slate-900">7 Days</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Travelers</label>
              <div className="text-xl font-black text-slate-900">2 Adults</div>
            </div>
          </div>
        </div>

        {/* Dynamic Sections */}
        {sections.map((section, index) => (
          <div key={section.id} className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden group hover:border-blue-200 transition-all">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-sm font-extrabold border border-blue-100">{index + 1}</span>
                  Section {index + 1}
                </h3>
                <button
                  onClick={() => removeSection(section.id)}
                  className="p-2 text-slate-300 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Description</label>
                  <textarea
                    className="w-full min-h-[100px] p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-700 resize-none"
                    placeholder="Add all the necessary information about this section (hotels, activities, etc.)"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Date Range</label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="MMM DD - MMM DD"
                        className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-sm text-slate-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Budget</label>
                    <div className="relative">
                      <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="0.00"
                        className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-sm text-slate-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addSection}
          className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[24px] text-slate-400 font-bold hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group"
        >
          <div className="w-8 h-8 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center group-hover:border-blue-400 text-slate-300 group-hover:text-blue-500 transition-colors">
            <Plus size={18} strokeWidth={3} />
          </div>
          Add another Section
        </button>
      </div>
    </Layout>
  );
};

export default BuildItinerary;
