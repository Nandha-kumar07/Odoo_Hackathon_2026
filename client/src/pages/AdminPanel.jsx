import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Users, Map, Globe, Activity, TrendingUp, DollarSign, Loader2, AlertCircle } from 'lucide-react';
import { adminService } from '../services/admin';

const AdminPanel = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await adminService.getStats();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch admin stats", err);
        setError("You might not have permission to view this page or the server is down.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Loader2 size={40} className="animate-spin mb-4 text-blue-600" />
        <span className="font-bold text-lg">Gathering platform analytics...</span>
      </div>
    </Layout>
  );

  if (error) return (
    <Layout>
      <div className="max-w-2xl mx-auto py-20 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-[24px] border border-red-100">
          <AlertCircle size={48} className="mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p className="font-medium">{error}</p>
        </div>
      </div>
    </Layout>
  );

  const { stats, popularDestinations, growth, activity } = data;

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers.toLocaleString(), change: '+12%', icon: <Users size={20} className="text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'Trips Created', value: stats.totalTrips.toLocaleString(), change: '+8%', icon: <Map size={20} className="text-purple-600" />, bg: 'bg-purple-50' },
    { label: 'Budget Managed', value: `$${stats.totalRevenue.toLocaleString()}`, change: '+24%', icon: <DollarSign size={20} className="text-green-600" />, bg: 'bg-green-50' },
    { label: 'Active Now', value: stats.activeNow, change: '', icon: <Activity size={20} className="text-amber-600" />, bg: 'bg-amber-50' },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 font-medium">Platform overview and real-time analytics.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, i) => (
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
              <h3 className="font-bold text-slate-900 text-lg">User Growth (Last 6 Months)</h3>
            </div>

            {/* Growth Line Chart (Visualized with bars for simplicity without a heavy library) */}
            <div className="h-64 flex items-end justify-between gap-4 px-2 mb-4">
              {growth.length > 0 ? growth.map((item, i) => (
                <div key={i} className="w-full flex flex-col items-center gap-2 group">
                  <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg relative transition-all duration-300 hover:from-blue-600 hover:to-blue-500 cursor-pointer"
                    style={{ height: `${Math.max((item.count / (stats.totalUsers || 1)) * 100, 10)}%` }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shadow-xl">
                      {item.count} new users
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.month}</span>
                </div>
              )) : (
                <div className="w-full flex items-center justify-center h-full text-slate-400 font-medium italic">No growth data available yet</div>
              )}
            </div>

            {/* Monthly Activity Bar Chart */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 mb-4">Trip Creation Activity</h4>
              <div className="space-y-4">
                {activity.length > 0 ? activity.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-600 w-20">{item.month}</span>
                    <div className="flex-1 h-8 bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                      <div className={`h-full bg-purple-500 rounded-lg transition-all duration-1000 flex items-center justify-end pr-3`}
                        style={{ width: `${Math.max((item.count / (stats.totalTrips || 1)) * 100, 5)}%` }}
                      >
                        <span className="text-white text-[10px] font-bold">{item.count} trips</span>
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-slate-400 italic">No activity data recorded.</p>
                )}
              </div>
            </div>
          </div>

          {/* Popular Destinations List */}
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-6">Popular Destinations</h3>
            <div className="space-y-6">
              {popularDestinations.length > 0 ? popularDestinations.map((city, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-bold text-slate-900 mb-1">
                    <span>{city.name}</span>
                    <span>{city.count} trips</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900 rounded-full"
                      style={{ width: `${(city.count / (stats.totalTrips || 1)) * 100}%` }}></div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-10">
                  <Globe size={40} className="mx-auto text-slate-200 mb-2" />
                  <p className="text-slate-400 text-sm font-medium">No trip data available.</p>
                </div>
              )}
            </div>

            <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2">
                <TrendingUp size={16} className="text-blue-500" />
                Insights
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Plateform activity has increased by 15% this week. Most new users are planning trips to {popularDestinations[0]?.name || 'new destinations'}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;
