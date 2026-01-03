import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, Compass, Wallet, Settings, Plus, Globe } from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="w-64 min-h-screen bg-white border-r border-slate-100 flex flex-col p-6 sticky top-0 z-30 shrink-0 hidden lg:flex">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-100">
                    <Globe size={24} />
                </div>
                <div>
                    <h1 className="font-bold text-slate-900 leading-none">GlobeTrotter</h1>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">Travel Planner</p>
                </div>
            </div>

            <nav className="flex-1 space-y-2">
                <SidebarItem to="/home" icon={<Home size={20} />} label="Home" />
                <SidebarItem to="/trips" icon={<Map size={20} />} label="My Trips" />
                <SidebarItem to="/search" icon={<Compass size={20} />} label="Explore" />
                <SidebarItem to="/budget" icon={<Wallet size={20} />} label="Budget" />
                <SidebarItem to="/admin" icon={<Settings size={20} />} label="Settings" />
            </nav>

            <div className="mt-auto">
                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 mb-4">
                    <Plus size={18} />
                    Plan New Trip
                </button>
            </div>
        </aside>
    );
};

const SidebarItem = ({ to, icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) => `
      flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all
      ${isActive
                ? 'bg-blue-50 text-blue-600 border border-blue-100/50'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
    `}
    >
        {icon}
        <span className="text-sm">{label}</span>
    </NavLink>
);

export default Sidebar;
