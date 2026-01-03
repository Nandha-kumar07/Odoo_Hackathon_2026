import React from 'react';
import Layout from '../components/Layout';
import { Users, Map, Globe, Activity, TrendingUp, DollarSign } from 'lucide-react';

const AdminPanel = () => {
  const stats = [
    { label: 'Total Users', value: '12,450', change: '+12%', icon: <Users size={20} className="text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'Trips Created', value: '8,320', change: '+8%', icon: <Map size={20} className="text-purple-600" />, bg: 'bg-purple-50' },
    { label: 'Revenue', value: '$45,200', change: '+24%', icon: <DollarSign size={20} className="text-green-600" />, bg: 'bg-green-50' },
    { label: 'Active Now', value: '450', change: '', icon: <Activity size={20} className="text-amber-600" />, bg: 'bg-amber-50' },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 font-medium">Platform overview and analytics.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-2xl font-black text-slate-900 mb-1">{stat.value}</div>
                {stat.change && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">{stat.change}</span>}
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-slate-900 text-lg">User Growth & Trips</h3>
              <select className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg px-3 py-1.5 outline-none">
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>

            {/* CSS-only Mock Chart */}
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                <div key={i} className="w-full bg-blue-50 rounded-t-lg relative group">
                  <div
                    className="absolute bottom-0 inset-x-0 bg-blue-500 rounded-t-lg transition-all duration-1000 group-hover:bg-blue-600"
                    style={{ height: `${h}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            </div>
          </div>

          {/* Popular Destinations List */}
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-6">Popular Destinations</h3>
            <div className="space-y-6">
              {[
                { name: 'Kyoto, Japan', count: 2430, percent: 85 },
                { name: 'Paris, France', count: 1850, percent: 65 },
                { name: 'Bali, Indonesia', count: 1240, percent: 45 },
                { name: 'Rome, Italy', count: 980, percent: 35 },
              ].map((city, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-bold text-slate-900 mb-1">
                    <span>{city.name}</span>
                    <span>{city.count}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900 rounded-full" style={{ width: `${city.percent}%` }}></div>
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

export default AdminPanel;
