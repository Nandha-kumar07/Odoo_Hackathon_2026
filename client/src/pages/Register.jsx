import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mail, Phone, Moon, ArrowRight, ChevronDown } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-4 font-sans overflow-y-auto">
      <div className="bg-white w-full max-w-[700px] rounded-[40px] shadow-2xl shadow-blue-900/10 relative my-8">
        {/* Blue Header Area */}
        <div className="h-40 sm:h-48 bg-[#D9E9FF] relative flex justify-center rounded-t-[40px]">
          <div className="absolute -bottom-16">
            <div className="relative">
              <div className="w-32 h-32 sm:w-36 sm:h-36 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="w-[124px] h-[124px] sm:w-[136px] sm:h-[136px] bg-[#F1F5F9] rounded-full flex items-center justify-center text-[#94A3B8]">
                  <Camera size={40} className="sm:w-12 sm:h-12" />
                </div>
              </div>
              <div className="absolute bottom-1 right-1 w-9 h-9 bg-[#3B82F6] rounded-full border-4 border-white flex items-center justify-center text-white shadow-sm cursor-pointer hover:bg-blue-600 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 sm:px-12 pt-28 pb-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-[32px] font-extrabold text-[#0F172A] mb-1">Create Account</h1>
            <p className="text-[#64748B] text-sm">Join GlobeTrotter today</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider ml-1">First Name</label>
                <input
                  type="text"
                  placeholder="Jane"
                  className="w-full h-12 px-5 bg-[#F8FAFC] border-2 border-transparent focus:border-[#3B82F6] focus:bg-white rounded-2xl outline-none transition-all placeholder:text-[#CBD5E1] text-[#1E293B]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider ml-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full h-12 px-5 bg-[#F8FAFC] border-2 border-transparent focus:border-[#3B82F6] focus:bg-white rounded-2xl outline-none transition-all placeholder:text-[#CBD5E1] text-[#1E293B]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className="w-full h-12 pl-12 pr-5 bg-[#F8FAFC] border-2 border-transparent focus:border-[#3B82F6] focus:bg-white rounded-2xl outline-none transition-all placeholder:text-[#CBD5E1] text-[#1E293B]"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider ml-1">Phone Number</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full h-12 pl-12 pr-5 bg-[#F8FAFC] border-2 border-transparent focus:border-[#3B82F6] focus:bg-white rounded-2xl outline-none transition-all placeholder:text-[#CBD5E1] text-[#1E293B]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider ml-1">City</label>
                <input
                  type="text"
                  placeholder="New York"
                  className="w-full h-12 px-5 bg-[#F8FAFC] border-2 border-transparent focus:border-[#3B82F6] focus:bg-white rounded-2xl outline-none transition-all placeholder:text-[#CBD5E1] text-[#1E293B]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider ml-1">Country</label>
                <div className="relative">
                  <select className="w-full h-12 px-5 bg-[#F8FAFC] border-2 border-transparent focus:border-[#3B82F6] focus:bg-white rounded-2xl outline-none transition-all appearance-none text-[#1E293B]">
                    <option>United States</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider ml-1">Additional Information</label>
              <textarea
                placeholder="Tell us a bit about your travel preferences..."
                className="w-full min-h-[120px] p-5 bg-[#F8FAFC] border-2 border-transparent focus:border-[#3B82F6] focus:bg-white rounded-2xl outline-none transition-all placeholder:text-[#CBD5E1] text-[#1E293B] resize-none"
              ></textarea>
            </div>

            <div className="pt-6 flex flex-col items-center gap-6">
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#3B82F6] text-white px-12 py-4 rounded-[20px] font-bold shadow-lg shadow-blue-200 hover:bg-blue-600 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                Register User
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-sm text-[#64748B] font-medium">
                Already have an account? <span onClick={() => navigate('/')} className="text-[#3B82F6] font-bold cursor-pointer hover:underline">Log in</span>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="fixed bottom-6 right-6">
        <button className="w-12 h-12 bg-white rounded-full shadow-xl border border-[#F1F5F9] flex items-center justify-center text-[#1E293B] hover:scale-110 transition-transform active:scale-90">
          <Moon size={24} />
        </button>
      </div>
    </div>
  );
};

export default Register;
