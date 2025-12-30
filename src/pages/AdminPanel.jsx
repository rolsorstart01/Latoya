import { useState, useEffect } from 'react';
import { format, parseISO, isToday, isBefore, isAfter } from 'date-fns';
import {
    Shield, Users, Calendar, MessageSquare, Image, TrendingUp,
    ChevronRight, Send, Trash2, UserPlus, UserMinus, RefreshCw,
    AlertCircle, Check, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
    getAllUsers, getAllBookings, setUserRole, sendBroadcast,
    getBroadcasts, getGalleryImages, addGalleryImage, deleteGalleryImage
} from '../services/firebase';
import { formatCurrency } from '../services/razorpay';

const AdminPanel = () => {
    const { user, isSuperAdmin } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [broadcasts, setBroadcasts] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [broadcastMessage, setBroadcastMessage] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const [usersRes, bookingsRes, broadcastsRes, galleryRes] = await Promise.all([
            getAllUsers(),
            getAllBookings(),
            getBroadcasts(),
            getGalleryImages()
        ]);
        setUsers(usersRes.users);
        setBookings(bookingsRes.bookings);
        setBroadcasts(broadcastsRes.broadcasts);
        setGallery(galleryRes.images);
        setLoading(false);
    };

    const handleRoleChange = async (userId, newRole) => {
        await setUserRole(userId, newRole);
        fetchData();
    };

    const handleSendBroadcast = async () => {
        if (!broadcastMessage.trim()) return;
        await sendBroadcast(broadcastMessage);
        setBroadcastMessage('');
        fetchData();
    };

    const handleAddImage = async () => {
        if (!newImageUrl.trim()) return;
        await addGalleryImage({ url: newImageUrl, caption: '' });
        setNewImageUrl('');
        fetchData();
    };

    const handleDeleteImage = async (imageId) => {
        await deleteGalleryImage(imageId);
        fetchData();
    };

    // Stats
    const now = new Date();
    const todayBookings = bookings.filter(b => isToday(parseISO(b.date)));
    const upcomingBookings = bookings.filter(b => isAfter(parseISO(b.date), now));
    const completedBookings = bookings.filter(b => isBefore(parseISO(b.date), now) && !isToday(parseISO(b.date)));
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.paidAmount || 0), 0);

    const getBookingStatusColor = (booking) => {
        const bookingDate = parseISO(booking.date);
        if (isToday(bookingDate)) return 'bg-yellow-500';
        if (isBefore(bookingDate, now)) return 'bg-green-500';
        return 'bg-blue-500';
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: TrendingUp },
        { id: 'bookings', label: 'Bookings', icon: Calendar },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'broadcast', label: 'Broadcast', icon: MessageSquare },
        { id: 'gallery', label: 'Gallery', icon: Image },
    ];

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white font-display">Admin Panel</h1>
                        <p className="text-gray-400 text-sm">
                            {isSuperAdmin ? 'Super Admin Access' : 'Admin Access'}
                        </p>
                    </div>
                    <button
                        onClick={fetchData}
                        className="ml-auto p-2 rounded-lg bg-zinc-800 text-gray-400 hover:text-white transition-colors"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeTab === tab.id
                                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                    : 'bg-zinc-900 text-gray-400 hover:text-white'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-400">Loading admin data...</p>
                    </div>
                ) : (
                    <>
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8 animate-fade-in">
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="card-gold">
                                        <p className="text-gray-400 text-sm mb-1">Total Users</p>
                                        <p className="text-3xl font-bold text-white">{users.length}</p>
                                    </div>
                                    <div className="card-gold">
                                        <p className="text-gray-400 text-sm mb-1">Total Bookings</p>
                                        <p className="text-3xl font-bold text-white">{bookings.length}</p>
                                    </div>
                                    <div className="card-gold">
                                        <p className="text-gray-400 text-sm mb-1">Today's Bookings</p>
                                        <p className="text-3xl font-bold text-yellow-400">{todayBookings.length}</p>
                                    </div>
                                    <div className="card-gold">
                                        <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
                                        <p className="text-3xl font-bold text-green-400">{formatCurrency(totalRevenue)}</p>
                                    </div>
                                </div>

                                {/* Recent Bookings */}
                                <div className="card">
                                    <h3 className="text-lg font-semibold text-white mb-4">Recent Bookings</h3>
                                    <div className="space-y-3">
                                        {bookings.slice(0, 5).map((booking) => (
                                            <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-2 h-2 rounded-full ${getBookingStatusColor(booking)}`}></div>
                                                    <div>
                                                        <p className="text-white font-medium">{booking.userName || 'User'}</p>
                                                        <p className="text-gray-500 text-sm">Court {booking.courtId} • {format(parseISO(booking.date), 'MMM d')}</p>
                                                    </div>
                                                </div>
                                                <span className="text-yellow-400 font-medium">{formatCurrency(booking.paidAmount || 0)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Bookings Tab */}
                        {activeTab === 'bookings' && (
                            <div className="animate-fade-in">
                                {/* Color Legend */}
                                <div className="flex items-center gap-6 mb-6 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <span className="text-sm text-gray-400">Current (Today)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        <span className="text-sm text-gray-400">Completed</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                        <span className="text-sm text-gray-400">Upcoming</span>
                                    </div>
                                </div>

                                {/* Bookings List */}
                                <div className="card overflow-hidden">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-zinc-800">
                                                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Status</th>
                                                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">User</th>
                                                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Court</th>
                                                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Date</th>
                                                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Amount</th>
                                                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Payment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map((booking) => (
                                                <tr key={booking.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50">
                                                    <td className="py-3 px-4">
                                                        <div className={`w-3 h-3 rounded-full ${getBookingStatusColor(booking)}`}></div>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <p className="text-white">{booking.userName || 'N/A'}</p>
                                                        <p className="text-gray-500 text-xs">{booking.userEmail}</p>
                                                    </td>
                                                    <td className="py-3 px-4 text-white">Court {booking.courtId}</td>
                                                    <td className="py-3 px-4 text-gray-300">{format(parseISO(booking.date), 'MMM d, yyyy')}</td>
                                                    <td className="py-3 px-4 text-yellow-400 font-medium">{formatCurrency(booking.totalAmount || 0)}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`badge text-xs ${booking.remainingAmount > 0 ? 'badge-gold' : 'badge-success'
                                                            }`}>
                                                            {booking.remainingAmount > 0 ? 'Partial' : 'Full'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Users Tab */}
                        {activeTab === 'users' && (
                            <div className="card overflow-hidden animate-fade-in">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-zinc-800">
                                            <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">User</th>
                                            <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Email</th>
                                            <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Role</th>
                                            <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Bookings</th>
                                            {isSuperAdmin && (
                                                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Actions</th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u) => (
                                            <tr key={u.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50">
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-medium">
                                                            {u.displayName?.[0]?.toUpperCase() || '?'}
                                                        </div>
                                                        <span className="text-white">{u.displayName || 'N/A'}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-gray-400">{u.email}</td>
                                                <td className="py-3 px-4">
                                                    <span className={`badge text-xs ${u.role === 'superadmin' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                                                            u.role === 'admin' ? 'badge-gold' : 'bg-zinc-800 text-gray-400'
                                                        }`}>
                                                        {u.role || 'user'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-gray-300">{u.totalBookings || 0}</td>
                                                {isSuperAdmin && u.id !== user?.uid && (
                                                    <td className="py-3 px-4">
                                                        {u.role === 'admin' ? (
                                                            <button
                                                                onClick={() => handleRoleChange(u.id, 'user')}
                                                                className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                                                            >
                                                                <UserMinus className="w-4 h-4" />
                                                                Remove Admin
                                                            </button>
                                                        ) : u.role !== 'superadmin' && (
                                                            <button
                                                                onClick={() => handleRoleChange(u.id, 'admin')}
                                                                className="text-yellow-400 hover:text-yellow-300 text-sm flex items-center gap-1"
                                                            >
                                                                <UserPlus className="w-4 h-4" />
                                                                Make Admin
                                                            </button>
                                                        )}
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Broadcast Tab */}
                        {activeTab === 'broadcast' && (
                            <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
                                <div className="card p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">Send Broadcast Message</h3>
                                    <textarea
                                        value={broadcastMessage}
                                        onChange={(e) => setBroadcastMessage(e.target.value)}
                                        placeholder="Type your message to all users..."
                                        className="input-field w-full h-32 resize-none mb-4"
                                    />
                                    <button
                                        onClick={handleSendBroadcast}
                                        disabled={!broadcastMessage.trim()}
                                        className="btn-gold flex items-center gap-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        Send Broadcast
                                    </button>
                                </div>

                                <div className="card">
                                    <h3 className="text-lg font-semibold text-white mb-4">Previous Broadcasts</h3>
                                    {broadcasts.length === 0 ? (
                                        <p className="text-gray-500 text-center py-8">No broadcasts sent yet</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {broadcasts.map((broadcast) => (
                                                <div key={broadcast.id} className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                                                    <p className="text-white mb-2">{broadcast.message}</p>
                                                    <p className="text-gray-500 text-xs">
                                                        {broadcast.createdAt?.toDate ? format(broadcast.createdAt.toDate(), 'MMM d, yyyy h:mm a') : 'Unknown date'}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Gallery Tab */}
                        {activeTab === 'gallery' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="card p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">Add Image</h3>
                                    <div className="flex gap-3">
                                        <input
                                            type="url"
                                            value={newImageUrl}
                                            onChange={(e) => setNewImageUrl(e.target.value)}
                                            placeholder="Enter image URL..."
                                            className="input-field flex-1"
                                        />
                                        <button
                                            onClick={handleAddImage}
                                            disabled={!newImageUrl.trim()}
                                            className="btn-gold"
                                        >
                                            Add Image
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {gallery.map((image) => (
                                        <div key={image.id} className="relative group rounded-xl overflow-hidden">
                                            <img
                                                src={image.url}
                                                alt={image.caption || 'Gallery image'}
                                                className="w-full aspect-square object-cover"
                                            />
                                            <button
                                                onClick={() => handleDeleteImage(image.id)}
                                                className="absolute top-2 right-2 p-2 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
