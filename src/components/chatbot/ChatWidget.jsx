import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, MessageCircle, ChevronDown } from 'lucide-react';
import { getChatbotResponse, chatbotQuickReplies } from '../../services/chatbot';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: "Welcome to HQ Sport. I am your concierge. How may I assist you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = async (text = input) => {
        if (!text.trim()) return;

        // User Message
        setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: text.trim() }]);
        setInput('');
        setIsTyping(true);

        // Simulate thinking delay for "realism"
        await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));

        // Bot Response
        const response = getChatbotResponse(text);
        setIsTyping(false);
        setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: response }]);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">

            {/* Chat Window */}
            <div className={`
                transition-all duration-500 ease-out origin-bottom-right
                ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}
                w-[380px] max-w-[calc(100vw-2.5rem)] h-[600px] max-h-[80vh]
                rounded-[2rem] overflow-hidden
                backdrop-blur-xl bg-[#0f172a]/95 border border-white/10 shadow-2xl shadow-black/50
                flex flex-col
            `}>

                {/* Header */}
                <div className="p-5 border-b border-white/5 bg-gradient-to-r from-yellow-500/10 to-transparent flex items-center justify-between backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-900/20">
                                <Sparkles className="w-5 h-5 text-black fill-black/20" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#0f172a] rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-base tracking-tight">HQ Concierge</h3>
                            <p className="text-xs text-yellow-400/80 font-medium tracking-wide uppercase">AI Assistant</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                    >
                        <ChevronDown className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-5 scroll-smooth">
                    <div className="space-y-6">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                            >
                                <div className={`
                                    max-w-[85%] p-4 text-sm leading-relaxed shadow-lg
                                    ${msg.type === 'user'
                                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-black rounded-2xl rounded-tr-sm font-medium pr-5'
                                        : 'bg-white/5 border border-white/5 text-slate-200 rounded-2xl rounded-tl-sm backdrop-blur-md'
                                    }
                                `}>
                                    {msg.text.split('\n').map((line, i) => (
                                        <p key={i} className={line.trim() === '' ? 'h-2' : ''}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start animate-fade-in">
                                <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5 backdrop-blur-md">
                                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Quick Replies */}
                {!isTyping && messages[messages.length - 1]?.type === 'bot' && (
                    <div className="px-5 pb-3 flex gap-2 overflow-x-auto no-scrollbar mask-gradient-right">
                        {chatbotQuickReplies.map((reply, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(reply)}
                                className="flex-shrink-0 text-xs font-medium px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-yellow-400 hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all whitespace-nowrap"
                            >
                                {reply}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t border-white/5 bg-[#020617]/50 backdrop-blur-md">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="relative flex items-center gap-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-all font-medium text-sm"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="absolute right-2 p-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 disabled:opacity-0 disabled:scale-75 transition-all duration-300 shadow-lg shadow-yellow-500/20"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-2xl shadow-yellow-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-20"></div>
                    <Sparkles className="w-8 h-8 text-black group-hover:rotate-12 transition-transform duration-300" />

                    {/* Tooltip */}
                    <div className="absolute right-full mr-4 px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none shadow-xl">
                        Chat with Concierge
                        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900 border-t border-r border-slate-700 rotate-45"></div>
                    </div>
                </button>
            )}
        </div>
    );
};

export default ChatWidget;
