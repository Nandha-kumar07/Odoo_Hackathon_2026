import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mail, Phone, ChevronDown, User, MapPin, ArrowRight } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-[800px] rounded-[32px] shadow-2xl shadow-slate-200 overflow-hidden flex flex-col md:flex-row">

        {/* Left Side (Visual) - Hidden on mobile */}
        <div className="hidden md:block w-72 bg-blue-600 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop"
            alt="Paris"
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
          <div className="absolute bottom-10 left-6 right-6 text-white">
            <h2 className="text-2xl font-extrabold mb-4 leading-tight">Start your journey today.</h2>
            <p className="text-blue-100 text-sm leading-relaxed">Create an account to unlock exclusive travel tools and join our community.</p>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="flex-1 p-8 sm:p-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-500 font-medium text-sm">Join GlobeTrotter for free</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">First Name</label>
                <input
                  type="text"
                  placeholder="Jane"
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all placeholder:text-slate-400 text-slate-900 text-sm font-medium"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all placeholder:text-slate-400 text-slate-900 text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="jane@example.com"
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all placeholder:text-slate-400 text-slate-900 text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Phone Number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all placeholder:text-slate-400 text-slate-900 text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">City</label>
                <input
                  type="text"
                  placeholder="New York"
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all placeholder:text-slate-400 text-slate-900 text-sm font-medium"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Country</label>
                <div className="relative">
                  <select className="w-full h-11 px-4 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all appearance-none text-slate-900 text-sm font-medium cursor-pointer">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>India</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
            >
              Create Account
              <ArrowRight size={18} />
            </button>

            <p className="text-center text-slate-500 font-medium text-sm mt-6">
              Already have an account? <span onClick={() => navigate('/')} className="text-blue-600 font-bold cursor-pointer hover:underline">Log in</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
