import { FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Assuming Link is from react-router-dom
import { MessageCircle } from 'lucide-react'; // Assuming MessageCircle is from lucide-react

const FloatingButtons = () => {
    return (
        <>
            {/* Community Chat - Bottom Right */}
            <Link
                to="/community"
                className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30 hover:scale-110 transition-transform hover:bg-green-600"
                title="Community Chat"
            >
                <MessageCircle className="w-7 h-7" />
            </Link>

            {/* Instagram - Bottom Left */}
            <a
                href="https://instagram.com/hq.sportslab"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 left-6 z-40 group"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <FaInstagram className="w-7 h-7 text-white" />
                    </div>
                </div>
            </a>
        </>
    );
};

export default FloatingButtons;
