import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Chrome, Apple } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="flex min-h-screen bg-white font-sans overflow-hidden">
      {/* Left Section - Form */}
      <div className="w-full lg:w-[450px] xl:w-[500px] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 relative z-10">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-[#3B82F6] rounded-[12px] flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            </div>
            <span className="text-xl font-bold text-[#0F172A]">GlobeTrotter</span>
          </div>

          <h1 className="text-[40px] font-extrabold text-[#0F172A] leading-tight mb-3">Welcome back</h1>
          <p className="text-[#64748B] text-lg mb-10 leading-relaxed font-medium">Plan your next adventure with ease. Please enter your details below.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F172A] ml-1">Email</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full h-14 px-5 bg-[#F8FAFC] border-2 border-[#F1F5F9] focus:border-[#3B82F6] focus:bg-white rounded-2xl outline-none transition-all placeholder:text-[#CBD5E1] text-[#1E293B]"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-[#0F172A]">Password</label>
                <a href="#" className="text-sm font-bold text-[#3B82F6] hover:underline">Forgot Password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full h-14 px-5 bg-[#F8FAFC] border-2 border-[#F1F5F9] focus:border-[#3B82F6] focus:bg-white rounded-2xl outline-none transition-all placeholder:text-[#CBD5E1] text-[#1E293B]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-14 bg-[#3B82F6] text-white font-bold rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-600 active:scale-[0.98] transition-all"
            >
              Log In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#F1F5F9]"></div>
            </div>
            <span className="relative px-4 bg-white text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest">Or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="h-12 flex items-center justify-center gap-3 border-2 border-[#F1F5F9] rounded-2xl font-bold text-[#475569] hover:bg-[#F8FAFC] transition-all">
              <Chrome size={20} />
              <span>Google</span>
            </button>
            <button className="h-12 flex items-center justify-center gap-3 border-2 border-[#F1F5F9] rounded-2xl font-bold text-[#475569] hover:bg-[#F8FAFC] transition-all">
              <Apple size={20} />
              <span>Apple</span>
            </button>
          </div>

          <p className="mt-12 text-center text-[#64748B] font-medium">
            Don't have an account? <span onClick={() => navigate('/register')} className="text-[#3B82F6] font-bold cursor-pointer hover:underline">Sign up</span>
          </p>

          <p className="mt-24 text-[11px] font-medium text-[#94A3B8] text-center uppercase tracking-widest">
            © 2024 GlobeTrotter Inc. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden lg:block relative flex-1">
        <div className="absolute inset-0 bg-[#0F172A]/10 z-10"></div>
        <img
          src="/login-bg.png"
          alt="Login Background"
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] brightness-90"
        />

        {/* Content over image */}
        <div className="absolute bottom-24 left-16 right-16 z-20 text-white max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-xs font-bold mb-8">
            <span className="w-2 h-2 bg-[#4ADE80] rounded-full"></span>
            NEW FEATURE AVAILABLE
          </div>
          <h2 className="text-[64px] font-extrabold leading-[1.1] mb-8 tracking-tight">Discover places that feel like home.</h2>
          <p className="text-xl text-white/80 leading-relaxed font-medium">
            Join millions of travelers creating unforgettable memories around the world.
          </p>
        </div>

        {/* Floating Card */}
        <div className="absolute top-[35%] right-16 z-30">
          <div className="w-[320px] bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[32px] p-5 shadow-2xl relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-[#FACC15] flex items-center justify-center text-[#1E293B] font-extrabold text-lg">
                JD
              </div>
              <div>
                <h4 className="text-white font-bold leading-none">John Doe</h4>
                <p className="text-white/60 text-xs mt-1">Recently booked</p>
              </div>
            </div>

            <div className="relative h-40 rounded-2xl overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=686&auto=format&fit=crop"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Venice"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-white">Cinque Terre, Italy</span>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white/10 rounded-lg backdrop-blur-md">
                <span className="text-amber-400 text-xs">★</span>
                <span className="text-white text-xs font-bold">4.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
