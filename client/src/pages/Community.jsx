import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Search, Plus, Heart, MessageCircle, Share2, MoreHorizontal, Bookmark, MapPin, BadgeCheck, Plane } from 'lucide-react';

const Community = () => {
  // Mock Styles for active filter
  const activeFilterStyle = "bg-slate-900 text-white";
  const inactiveFilterStyle = "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50";

  const posts = [
    {
      id: 1,
      author: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop",
      time: "2 hours ago • Italy",
      title: "Hidden Gems of the Amalfi Coast",
      content: "Spent 7 days exploring the less crowded villages of Amalfi. Found an incredible lemon grove tour in Minori that I can't recommend enough! 🍋🇮🇹",
      tags: ["#Italy", "#Summer", "#HiddenGems"],
      image: "https://images.unsplash.com/photo-1533105070520-1e8b1d436154?q=80&w=2070&auto=format&fit=crop",
      likes: 245,
      comments: 32
    },
    {
      id: 2,
      author: "Mark Thompson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop",
      time: "5 hours ago • Japan",
      title: "Backpacking Japan on a Budget 💴",
      content: "Japan doesn't have to be expensive! Here's how I managed 2 weeks including Tokyo, Kyoto, and Osaka for under $1500 including flights. 🚅🍱",
      tags: ["#Japan", "#BudgetTravel", "#Backpacking"],
      image: "https://images.unsplash.com/photo-1542051841857-5f906991dd88?q=80&w=2071&auto=format&fit=crop",
      likes: 512,
      comments: 89
    }
  ];

  const trendingDestinations = [
    { name: "Kyoto, Japan", posts: "12k posts this week", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=200&auto=format&fit=crop" },
    { name: "Santorini, Greece", posts: "8.5k posts this week", image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=200&auto=format&fit=crop" },
    { name: "Bali, Indonesia", posts: "7.2k posts this week", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=200&auto=format&fit=crop" }
  ];

  const topTravelers = [
    { name: "Alex Chen", role: "Photographer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", isFollowing: false },
    { name: "Mia Davis", role: "Backpacker", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop", isFollowing: true }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto pb-12">

        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Community</h1>
            <p className="text-slate-500 font-medium">Explore itineraries and travel tips from fellow travelers.</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
            <Plus size={20} strokeWidth={3} />
            Create Post
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search destinations, itineraries, or users..."
            className="w-full h-14 pl-14 pr-6 bg-white border border-slate-200 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-900"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeFilterStyle}`}>Trending</button>
          <button className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${inactiveFilterStyle}`}>Newest</button>
          <button className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${inactiveFilterStyle}`}>Europe</button>
          <button className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${inactiveFilterStyle}`}>Asia</button>
          <button className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${inactiveFilterStyle}`}>Budget-Friendly</button>
          <button className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${inactiveFilterStyle}`}>Adventure</button>
          <button className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${inactiveFilterStyle}`}>Solo Travel</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-8">
            {posts.map(post => (
              <div key={post.id} className="bg-white p-6 md:p-8 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                {/* Post Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div>
                      <h3 className="font-bold text-slate-900">{post.author}</h3>
                      <p className="text-xs font-bold text-slate-400">{post.time}</p>
                    </div>
                  </div>
                  <button className="text-slate-300 hover:text-slate-500 transition-colors">
                    <MoreHorizontal size={24} />
                  </button>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">{post.title}</h2>
                  <p className="text-slate-600 font-medium leading-relaxed mb-4">{post.content}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Post Image */}
                <div className="rounded-2xl overflow-hidden mb-6 h-[300px] md:h-[400px] relative">
                  <img src={post.image} alt="Post content" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 font-bold text-sm transition-colors group">
                      <Heart size={20} className="group-hover:fill-current" />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 font-bold text-sm transition-colors">
                      <MessageCircle size={20} />
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-sm transition-colors">
                      <Share2 size={20} />
                    </button>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <Bookmark size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Trending Destinations */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Trending Destinations</h3>
              <div className="space-y-6">
                {trendingDestinations.map((dest, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <img src={dest.image} alt={dest.name} className="w-14 h-14 rounded-xl object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{dest.name}</h4>
                      <p className="text-xs font-medium text-slate-400">{dest.posts}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 text-blue-600 text-sm font-bold hover:underline">View All</button>
            </div>

            {/* Top Travelers */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Top Travelers</h3>
              <div className="space-y-6">
                {topTravelers.map((traveler, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={traveler.avatar} alt={traveler.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{traveler.name}</h4>
                        <p className="text-xs font-medium text-slate-400">{traveler.role}</p>
                      </div>
                    </div>
                    <button className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${traveler.isFollowing ? 'text-slate-400 hover:text-red-500' : 'text-blue-600 hover:bg-blue-50'}`}>
                      {traveler.isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 p-8 rounded-[24px] text-white shadow-xl shadow-blue-500/30">
              {/* Decorative Circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wider mb-4">
                  <BadgeCheck size={14} />
                  Premium
                </div>
                <h3 className="text-2xl font-black mb-3 leading-tight">Get 20% off your next booking</h3>
                <p className="text-blue-100 text-sm font-medium mb-8 leading-relaxed">Join GlobeTrotter+ today and unlock exclusive deals and priority support.</p>
                <button className="w-full py-3.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg shadow-black/10">
                  Upgrade Now
                </button>
                <Plane className="absolute bottom-4 right-4 text-white/10 rotate-45" size={64} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Community;
