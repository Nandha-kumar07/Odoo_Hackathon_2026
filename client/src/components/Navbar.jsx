import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, Users, Calendar, User, Search, Settings } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full z-50 flex justify-between items-center px-6 py-4 lg:hidden">
            <NavIcon to="/home" icon={<Home size={22} />} />
            <NavIcon to="/trips" icon={<Map size={22} />} />
            <NavIcon to="/community" icon={<Users size={22} />} />
            <NavIcon to="/search" icon={<Search size={22} />} />
            <NavIcon to="/profile" icon={<User size={22} />} />
        </nav>
    );
};

const NavIcon = ({ to, icon }) => (
    <NavLink
        to={to}
        className={({ isActive }) => `
            flex flex-col items-center justify-center w-10 h-10 rounded-full transition-all duration-300
            ${isActive
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}
        `}
    >
        {icon}
    </NavLink>
);

export default Navbar;
