import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { User, Mail, Phone, MapPin, Globe, Edit3, Camera, Settings, X, Save, Loader2 } from 'lucide-react';
import { authService } from '../services/auth';
import { tripService } from '../services/trips';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('preplanned'); // 'preplanned' or 'previous'

  // Data State
  const [user, setUser] = useState(authService.getStoredUser());
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile_photo: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userData, tripsData] = await Promise.all([
          authService.getCurrentUser(),
          tripService.getAllTrips()
        ]);

        setUser(userData);
        setTrips(tripsData);
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          profile_photo: userData.profile_photo || ''
        });
      } catch (err) {
        console.error("Failed to load profile", err);
        // Fallback to stored user if API fails (e.g. network issue)
        const stored = authService.getStoredUser();
        if (stored) {
          setUser(stored);
          setFormData({
            name: stored.name || '',
            email: stored.email || '',
            profile_photo: stored.profile_photo || ''
          });
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updatedUser = await authService.updateProfile({
        name: formData.name,
        profile_photo: formData.profile_photo
        // Email update might require verification, skipping for now to simple update
      });
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // Filter trips
  const upcomingTrips = trips.filter(t => new Date(t.end_date) >= new Date());
  const previousTrips = trips.filter(t => new Date(t.end_date) < new Date());
  const displayTrips = activeTab === 'preplanned' ? upcomingTrips : previousTrips;

  if (loading && !user) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500">Loading profile...</div>;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">User Profile</h1>
          <p className="text-slate-500 font-medium">Manage your personal information and trip history.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: User Details */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

              <div className="relative mt-8 mb-4 inline-block">
                <img
                  src={user?.profile_photo || "https://ui-avatars.com/api/?name=" + (user?.name || "User") + "&background=0D8ABC&color=fff"}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover bg-white"
                  alt="Profile"
                />
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-blue-600 transition-colors"
                  >
                    <Edit3 size={14} />
                  </button>
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
              <p className="text-slate-500 text-sm font-medium mb-6">Explorer</p>

              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-2.5 bg-blue-50 text-blue-600 font-bold rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors text-sm flex items-center justify-center gap-2"
              >
                <Settings size={16} />
                Edit Profile
              </button>
            </div>

            {/* Details List */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">About</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">{user?.email}</span>
                </div>
                {/* Static placeholders for visual completeness */}
                <div className="flex items-center gap-3 text-slate-600">
                  <Globe size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">Joined {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Trips */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm min-h-[600px]">
              {/* Tabs */}
              <div className="flex gap-2 mb-8 border-b border-slate-100 pb-1">
                <button
                  onClick={() => setActiveTab('preplanned')}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'preplanned' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  Upcoming Trips ({upcomingTrips.length})
                </button>
                <button
                  onClick={() => setActiveTab('previous')}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'previous' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  Previous Trips ({previousTrips.length})
                </button>
              </div>

              {/* Trip Grid */}
              {displayTrips.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <div className="mb-4 bg-slate-50 p-4 rounded-full">
                    <Globe size={32} />
                  </div>
                  <p className="font-bold">No trips found here.</p>
                  {activeTab === 'preplanned' && (
                    <button onClick={() => navigate('/create-trip')} className="mt-4 text-blue-600 font-bold hover:underline">Plan a new trip</button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayTrips.map((trip) => (
                    <div key={trip.id} onClick={() => navigate(`/itinerary/${trip.id}`)} className="cursor-pointer group border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:border-blue-200">
                      <div className="h-40 bg-slate-200 relative overflow-hidden">
                        <img
                          src={trip.image_url || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"}
                          alt={trip.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className={`absolute top-3 right-3 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${activeTab === 'preplanned' ? 'bg-blue-500/90 text-white' : 'bg-slate-800/90 text-white'}`}>
                          {activeTab === 'preplanned' ? 'Upcoming' : 'Completed'}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-slate-900 mb-1">{trip.name}</h3>
                        <p className="text-xs text-slate-500 font-medium mb-4">{trip.destination}</p>
                        <div className="w-full py-2 border border-slate-200 rounded-xl text-center text-sm font-bold text-slate-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                          View Details
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Edit Profile</h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none font-medium transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Profile Photo URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.profile_photo}
                  onChange={(e) => setFormData({ ...formData, profile_photo: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none font-medium transition-all"
                />
                <p className="text-xs text-slate-400 mt-1 font-medium">Paste a generic image URL (e.g. from Unsplash)</p>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
