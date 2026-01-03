import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mail, Phone, ChevronDown, User, MapPin, ArrowRight, Lock, Eye, EyeOff } from 'lucide-react';
import { authService } from '../services/auth';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
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

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full h-12 pl-11 pr-4 bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all placeholder:text-slate-400 text-slate-900 font-bold"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full h-12 pl-11 pr-4 bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all placeholder:text-slate-400 text-slate-900 font-bold"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full h-12 pl-11 pr-10 bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all placeholder:text-slate-400 text-slate-900 font-bold"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Confirm</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full h-12 pl-11 pr-4 bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all placeholder:text-slate-400 text-slate-900 font-bold"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? 'Creating Account...' : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <p className="text-center text-slate-500 font-medium text-sm mt-6">
              Already have an account? <span onClick={() => navigate('/login')} className="text-blue-600 font-bold cursor-pointer hover:underline">Log in</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
