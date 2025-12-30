import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserData } from '../services/firebase';
import { User, Mail, Clock, MapPin, Shield } from 'lucide-react';
import { format } from 'date-fns';

const Profile = () => {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                const { data } = await getUserData(user.uid);
                setProfileData(data);
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] pt-40 pb-20 px-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
                <p className="text-slate-400 mb-10">Manage your account settings and preferences</p>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column: User Card */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="glass-card p-8 md:p-10 text-center border-yellow-500/20">
                            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-4xl font-bold text-black mb-6 shadow-lg shadow-yellow-500/20">
                                {user?.displayName?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-1 truncate">{user?.displayName || 'User'}</h2>
                            <p className="text-slate-400 text-sm mb-6 truncate">{user?.email}</p>

                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-semibold uppercase tracking-wider">
                                {profileData?.role === 'admin' || profileData?.role === 'superadmin' ? 'Administrator' : 'Member'}
                            </div>
                        </div>

                        <div className="glass-card p-6 border-slate-800">
                            <h3 className="text-lg font-semibold text-white mb-4">Account Stats</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400 text-sm">Join Date</span>
                                    <span className="text-white text-sm font-medium">
                                        {user?.metadata?.creationTime ? format(new Date(user.metadata.creationTime), 'MMM yyyy') : 'N/A'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400 text-sm">Total Bookings</span>
                                    <span className="text-white text-sm font-medium">{profileData?.totalBookings || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="glass-card p-8 md:p-10 border-slate-800">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <User className="w-5 h-5 text-yellow-400" />
                                Personal Information
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-slate-500 text-sm mb-2">Full Name</label>
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-white">
                                        <User className="w-5 h-5 text-slate-500" />
                                        <span>{user?.displayName || 'Not Set'}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-slate-500 text-sm mb-2">Email Address</label>
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-white">
                                        <Mail className="w-5 h-5 text-slate-500" />
                                        <span>{user?.email}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-slate-500 text-sm mb-2">Location</label>
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-white">
                                        <MapPin className="w-5 h-5 text-slate-500" />
                                        <span>Kolkata, India</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-8 border-slate-800">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <Shield className="w-5 h-5 text-yellow-400" />
                                Security
                            </h3>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                                <div>
                                    <p className="text-white font-medium">Password</p>
                                    <p className="text-slate-500 text-sm">Last updated recently</p>
                                </div>
                                <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
                                    Change
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
