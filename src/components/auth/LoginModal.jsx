import { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, Phone, Loader2 } from 'lucide-react';
import { signInWithEmail, signInWithGoogle } from '../../services/firebase';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { user, error: authError } = await signInWithEmail(email, password);

        if (authError) {
            setError(authError);
            setLoading(false);
        } else {
            setLoading(false);
            onClose();
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');

        const { user, error: authError } = await signInWithGoogle();

        if (authError) {
            setError(authError);
            setLoading(false);
        } else {
            setLoading(false);
            onClose();
        }
    };

    return (
        <div className="modal-overlay animate-fade-in" onClick={onClose}>
            <div
                className="modal-content animate-scale-in p-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center">
                        <span className="text-black font-bold text-2xl">HQ</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white font-display">Welcome Back</h2>
                    <p className="text-gray-400 mt-2">Sign in to access your premium courts</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleEmailLogin} className="space-y-4">
                    {/* Email Input */}
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field pl-12"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field pl-12 pr-12"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <button type="button" className="text-sm text-yellow-500 hover:text-yellow-400">
                            Forgot password?
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-gold w-full flex items-center justify-center gap-2 py-4"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-zinc-800"></div>
                    <span className="text-gray-500 text-sm">or continue with</span>
                    <div className="flex-1 h-px bg-zinc-800"></div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-1 gap-3">
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-zinc-800 text-white hover:bg-white/10 transition-colors"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>
                </div>

                {/* Switch to Signup */}
                <p className="text-center mt-8 text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <button
                        onClick={onSwitchToSignup}
                        className="text-yellow-500 hover:text-yellow-400 font-medium"
                    >
                        Create one
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;
