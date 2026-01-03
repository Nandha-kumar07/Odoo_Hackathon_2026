import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Map, Users, Calendar, User, Search, Settings } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="glass-card" style={{
            position: 'fixed',
            top: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '800px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '0.75rem 1.5rem',
            zIndex: 1000,
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '24px'
        }}>
            <NavIcon to="/home" icon={<Home size={20} />} label="Home" />
            <NavIcon to="/trips" icon={<Map size={20} />} label="My Trips" />
            <NavIcon to="/search" icon={<Search size={20} />} label="Explore" />
            <NavIcon to="/community" icon={<Users size={20} />} label="Community" />
            <NavIcon to="/calendar" icon={<Calendar size={20} />} label="Calendar" />
            <NavIcon to="/profile" icon={<User size={20} />} label="Profile" />
            <NavIcon to="/admin" icon={<Settings size={20} />} label="Admin" />
        </nav>
    );
};

const NavIcon = ({ to, icon, label }) => (
    <NavLink
        to={to}
        style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            color: isActive ? 'var(--primary)' : 'var(--text-muted)',
            transition: 'color 0.2s ease'
        })}
    >
        {icon}
        <span style={{ fontSize: '0.65rem', marginTop: '2px', fontWeight: '500' }}>{label}</span>
    </NavLink>
);

export default Navbar;
