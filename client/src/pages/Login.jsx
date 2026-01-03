import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Globe, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Left Section - Form */}
      <div className="w-full lg:w-[480px] xl:w-[560px] flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12 bg-white relative z-10 shadow-2xl shadow-slate-200">
        <div className="max-w-md mx-auto w-full">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Globe size={24} />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">GlobeTrotter</span>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Welcome back</h1>
            <p className="text-slate-500 text-lg font-medium">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full h-14 px-5 bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Forgot Password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full h-14 px-5 bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-14 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              Sign in
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative px-4 bg-white text-[11px] font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="h-14 flex items-center justify-center gap-3 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all hover:border-slate-300">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
              <span>Google</span>
            </button>
            <button className="h-14 flex items-center justify-center gap-3 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all hover:border-slate-300">
              <img src="https://www.svgrepo.com/show/448234/apple.svg" className="w-6 h-6" alt="Apple" />
              <span>Apple</span>
            </button>
          </div>

          <p className="mt-10 text-center text-slate-500 font-medium">
            Don't have an account? <span onClick={() => navigate('/register')} className="text-blue-600 font-bold cursor-pointer hover:underline">Create account</span>
          </p>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden lg:block relative flex-1 bg-slate-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop"
          alt="Login Feature"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

        <div className="absolute bottom-20 left-20 right-20 text-white">
          <h2 className="text-5xl font-extrabold leading-tight mb-6">Plan your journey,<br />share the story.</h2>
          <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
            Join a global community of travelers. Build detailed itineraries, track budgets, and discover hidden gems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
