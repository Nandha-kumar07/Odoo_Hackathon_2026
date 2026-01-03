import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, Compass, Wallet, Settings, Plus, Globe, LogOut, Users } from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="w-72 h-screen sticky top-0 z-30 flex flex-col p-6 hidden lg:flex border-r border-slate-200/60 bg-white/80 backdrop-blur-xl">
            {/* Logo */}
            <div className="flex items-center gap-4 mb-10 px-2">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <Globe size={24} />
                </div>
                <div>
                    <h1 className="font-bold text-slate-900 text-lg leading-none tracking-tight">GlobeTrotter</h1>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Travel Planner</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                <SidebarItem to="/home" icon={<Home size={20} />} label="Dashboard" />
                <SidebarItem to="/trips" icon={<Map size={20} />} label="Trips" />
                <SidebarItem to="/community" icon={<Users size={20} />} label="Community" />
                <SidebarItem to="/search" icon={<Compass size={20} />} label="Explore" />
                <SidebarItem to="/budget" icon={<Wallet size={20} />} label="Budget" />
                <SidebarItem to="/admin" icon={<Settings size={20} />} label="Settings" />
            </nav>

            {/* Actions */}
            <div className="mt-auto pt-6 border-t border-slate-100">
                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/25 mb-6 group">
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    <span>Plan New Trip</span>
                </button>

                {/* Mini Profile */}
                <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                    <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop"
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">Alex Rivera</p>
                        <p className="text-xs text-slate-400 truncate">Premium Member</p>
                    </div>
                    <LogOut size={18} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                </div>
            </div>
        </aside>
    );
};

const SidebarItem = ({ to, icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) => `
      flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 group relative overflow-hidden
      ${isActive
                ? 'text-blue-600 bg-blue-50 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 hover:bg-white'}
    `}
    >
        {({ isActive }) => (
            <>
                <span className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {icon}
                </span>
                <span className="relative z-10 text-sm tracking-wide">{label}</span>
                {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full"></div>
                )}
            </>
        )}
    </NavLink>
);

export default Sidebar;
