import { Lock, Eye, Database, Shield } from 'lucide-react';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-[#020617] pt-32 pb-20 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20">
                        <Shield className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
                    <p className="text-slate-400 text-lg">Your data is safe with us.</p>
                </div>

                {/* Content */}
                <div className="glass-card p-8 md:p-12 border-slate-800 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Database className="w-6 h-6 text-blue-400" />
                            Data Collection
                        </h2>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            We collect only the essential information needed to provide our services: your name, email, phone number, and booking history. We do not store sensitive payment information directly; all transactions are processed securely via Razorpay.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Eye className="w-6 h-6 text-blue-400" />
                            Data Usage
                        </h2>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            Your information is used strictly for:
                        </p>
                        <ul className="mt-4 space-y-3 text-slate-400 text-lg">
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                Managing your court bookings and memberships
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                Communicating important updates or facility news
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                Improving our service quality and facility management
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Lock className="w-6 h-6 text-blue-400" />
                            Security
                        </h2>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            We implement industry-standard security measures to protect your personal data. Your account is protected by encryption, and access is strictly limited to authorized personnel only.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Data Rights</h2>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            You have the right to request access to, correction of, or deletion of your personal data at any time. You can manage your profile settings directly through the HQ Sport app or contact support.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
