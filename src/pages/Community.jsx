import { useState, useEffect, useRef } from 'react';
import { Search, Users, MessageCircle, Send, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAllUsers, sendChatMessage, subscribeToChatRoom } from '../services/firebase';

const Community = ({ onLoginRequired }) => {
    const { user, userData, isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState('chat');
    const [players, setPlayers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const messagesEndRef = useRef(null);
    const roomId = 'general';

    useEffect(() => {
        const fetchPlayers = async () => {
            const { users } = await getAllUsers();
            if (users) {
                setPlayers(users.filter(u => u.id !== user?.uid));
            }
            setLoading(false);
        };
        fetchPlayers();
    }, [user]);

    useEffect(() => {
        if (activeTab === 'chat') {
            const unsubscribe = subscribeToChatRoom(roomId, (msgs) => {
                setMessages(msgs || []);
                setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
            });
            return () => unsubscribe();
        }
    }, [activeTab]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !isAuthenticated) return;

        await sendChatMessage(roomId, {
            text: newMessage,
            userId: user.uid,
            userName: userData?.displayName || user.email.split('@')[0],
            userAvatar: userData?.displayName?.[0] || user.email[0].toUpperCase()
        });

        setNewMessage('');
    };

    const filteredPlayers = players.filter(player =>
        !searchQuery || player.displayName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen pt-40 pb-20 bg-[#020617] overflow-x-hidden w-full">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 text-sm font-medium">Connect & Play</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Community <span className="text-yellow-gradient">Hub</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Find players, join discussions, and be part of the HQ Sport family.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button
                        onClick={() => setActiveTab('chat')}
                        className={`flex items-center gap-3 px-8 py-4 rounded-xl font-medium transition-all duration-300 ${activeTab === 'chat'
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-500/20 scale-105'
                            : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700'
                            }`}
                    >
                        <MessageCircle className="w-5 h-5" />
                        Chat Room
                    </button>
                    <button
                        onClick={() => setActiveTab('players')}
                        className={`flex items-center gap-3 px-8 py-4 rounded-xl font-medium transition-all duration-300 ${activeTab === 'players'
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-500/20 scale-105'
                            : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700'
                            }`}
                    >
                        <Users className="w-5 h-5" />
                        Find Players
                    </button>
                </div>

                {/* Chat Tab */}
                {activeTab === 'chat' && (
                    <div className="max-w-4xl mx-auto animate-fade-in-up">
                        <div className="glass-card overflow-hidden h-[700px] flex flex-col border border-slate-700 shadow-2xl rounded-3xl">
                            {/* Chat Header */}
                            <div className="p-6 border-b border-slate-800/80 flex items-center justify-between bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/10">
                                        <MessageCircle className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">General Chat</h3>
                                        <p className="text-sm text-slate-500">Live community discussion</p>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="text-xs font-medium text-green-400">Online</span>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-[#020617]/50">
                                {!isAuthenticated ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                                            <MessageCircle className="w-10 h-10 text-slate-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Join the Conversation</h3>
                                        <p className="text-slate-400 mb-8 max-w-sm">Sign in to chat with other players, find partners, and discuss strategies.</p>
                                        <button onClick={onLoginRequired} className="btn-primary px-8 py-3">
                                            Sign In to Chat
                                        </button>
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                                        <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                                            <MessageCircle className="w-8 h-8 text-slate-600" />
                                        </div>
                                        <p className="text-slate-500 text-lg">No messages yet. Start the conversation!</p>
                                    </div>
                                ) : (
                                    messages.map((msg, index) => {
                                        const isOwn = msg.userId === user?.uid;
                                        return (
                                            <div key={msg.id || index} className={`flex gap-4 ${isOwn ? 'flex-row-reverse' : ''} group animate-fade-in`}>
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-lg ${isOwn ? 'bg-yellow-400 text-black' : 'bg-slate-700 text-white border border-slate-600'
                                                    }`}>
                                                    {msg.userAvatar}
                                                </div>
                                                <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                                                    <div className={`flex items-baseline gap-2 mb-1 ${isOwn ? 'flex-row-reverse' : ''}`}>
                                                        <span className="text-xs font-medium text-slate-400">{msg.userName}</span>
                                                        <span className="text-[10px] text-slate-600">{
                                                            // Placeholder for timestamp if needed
                                                        }</span>
                                                    </div>
                                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm break-words ${isOwn
                                                        ? 'bg-yellow-500/10 text-yellow-100 rounded-tr-sm border border-yellow-500/20'
                                                        : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700'
                                                        }`}>
                                                        {msg.text}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            {isAuthenticated && (
                                <form onSubmit={handleSendMessage} className="p-4 md:p-6 border-t border-slate-800 bg-[#0f172a]/80 backdrop-blur-md">
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Type a message..."
                                            className="flex-1 bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/20 transition-all shadow-inner"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!newMessage.trim()}
                                            className="p-4 rounded-2xl bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/20 flex-shrink-0"
                                        >
                                            <Send className="w-6 h-6" />
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                )}

                {/* Players Tab */}
                {activeTab === 'players' && (
                    <div className="max-w-5xl mx-auto animate-fade-in-up">
                        <div className="flex gap-4 mb-10">
                            <div className="relative flex-1">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Search players by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl pl-14 pr-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400/50 transition-colors shadow-lg"
                                />
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-20">
                                <Loader2 className="w-10 h-10 text-yellow-400 animate-spin mx-auto" />
                            </div>
                        ) : filteredPlayers.length === 0 ? (
                            <div className="text-center py-20 glass-card">
                                <Users className="w-16 h-16 text-slate-700 mx-auto mb-6" />
                                <h3 className="text-xl font-bold text-white mb-2">No players found</h3>
                                <p className="text-slate-500">Try adjusting your search criteria</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPlayers.map((player) => (
                                    <div key={player.id} className="glass-card p-8 md:p-10 flex items-center gap-6 hover:border-yellow-500/30 transition-all hover:-translate-y-1 group">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold text-2xl flex-shrink-0 shadow-lg shadow-yellow-900/20">
                                            {player.displayName?.[0]?.toUpperCase() || '?'}
                                        </div>
                                        <div className="min-w-0 flex-1 space-y-1">
                                            <h3 className="font-bold text-white truncate text-xl group-hover:text-yellow-400 transition-colors">{player.displayName || 'Anonymous'}</h3>
                                            <p className="text-sm text-slate-500 truncate">Member since {new Date().getFullYear()}</p>
                                        </div>
                                        <button className="flex-shrink-0 w-12 h-12 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-all">
                                            <ArrowRight className="w-6 h-6" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Community;
