import { ScrollText, ShieldCheck, Scale } from 'lucide-react';

const Terms = () => {
    return (
        <div className="min-h-screen bg-[#020617] pt-32 pb-20 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center text-black mb-6 shadow-lg shadow-yellow-500/20">
                        <Scale className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
                    <p className="text-slate-400 text-lg">Last updated: December 2024</p>
                </div>

                {/* Content */}
                <div className="glass-card p-8 md:p-12 border-slate-800 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-yellow-400">01.</span> Acceptance of Terms
                        </h2>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            By accessing and using HQ Sport's services, including our website and booking platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-yellow-400">02.</span> Court Bookings
                        </h2>
                        <ul className="space-y-3 text-slate-400 leading-relaxed text-lg">
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2.5 flex-shrink-0"></div>
                                <p>All bookings are subject to availability and confirmation.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2.5 flex-shrink-0"></div>
                                <p>Players must arrive 10 minutes prior to their scheduled slot.</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2.5 flex-shrink-0"></div>
                                <p>Proper sports attire and non-marking shoes are mandatory.</p>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-yellow-400">03.</span> Code of Conduct
                        </h2>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            We maintain a premium, respectful environment. Any form of harassment, abuse, or unsportsmanlike behavior towards staff or other players will result in immediate suspension of facility access without refund.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-yellow-400">04.</span> Limitation of Liability
                        </h2>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            HQ Sport is not liable for any personal injury or loss of personal property while on the premises. Players engage in activities at their own risk.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-slate-800 text-center text-slate-500">
                        <p>Questions? Contact us at legal@hqsport.in</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
