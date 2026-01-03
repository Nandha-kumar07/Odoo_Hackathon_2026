import React, { useState } from 'react';
import Layout from '../components/Layout';
import { User, Mail, Phone, MapPin, Globe, Edit3, Camera, Settings } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('preplanned'); // 'preplanned' or 'previous'

  return (
    <Layout>
      <div className="max-w-7xl mx-auto pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">User Profile</h1>
          <p className="text-slate-500 font-medium">Manage your personal information and trip history.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: User Details */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

              <div className="relative mt-8 mb-4 inline-block">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                  alt="Profile"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-blue-600 transition-colors">
                  <Camera size={14} />
                </button>
              </div>

              <h2 className="text-xl font-bold text-slate-900">Sarah Jenkins</h2>
              <p className="text-slate-500 text-sm font-medium mb-6">Travel Enthusiast & Photographer</p>

              <button className="w-full py-2.5 bg-blue-50 text-blue-600 font-bold rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors text-sm flex items-center justify-center gap-2">
                <Edit3 size={16} />
                Edit Profile
              </button>
            </div>

            {/* Details List */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">About</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">sarah.j@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Globe size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">English, Spanish</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Trips */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm min-h-[600px]">
              {/* Tabs */}
              <div className="flex gap-2 mb-8 border-b border-slate-100 pb-1">
                <button
                  onClick={() => setActiveTab('preplanned')}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'preplanned' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  Preplanned Trips
                </button>
                <button
                  onClick={() => setActiveTab('previous')}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'previous' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  Previous Trips
                </button>
              </div>

              {/* Trip Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mock Data Repeater */}
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="group border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:border-blue-200">
                    <div className="h-40 bg-slate-200 relative overflow-hidden">
                      <img
                        src={`https://source.unsplash.com/random/800x600?travel,${activeTab === 'preplanned' ? 'future' : 'historic'},${item}`}
                        alt="Trip"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-800">
                        {activeTab === 'preplanned' ? 'Upcoming' : 'Completed'}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-slate-900 mb-1">Euro Trip 202{item + 3}</h3>
                      <p className="text-xs text-slate-500 font-medium mb-4">3 Cities • 12 Days</p>
                      <button className="w-full py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
