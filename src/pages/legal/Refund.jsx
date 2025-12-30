import { RefreshCw, Clock, AlertCircle } from 'lucide-react';

const Refund = () => {
    return (
        <div className="min-h-screen bg-[#020617] pt-32 pb-20 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-green-500/20">
                        <RefreshCw className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Refund Policy</h1>
                    <p className="text-slate-400 text-lg">Fair and transparent cancellations.</p>
                </div>

                {/* Content */}
                <div className="glass-card p-8 md:p-12 border-slate-800 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Clock className="w-6 h-6 text-green-400" />
                            Cancellation Window
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div className="p-6 rounded-2xl bg-slate-900/50 border border-green-500/20">
                                <h3 className="text-lg font-bold text-white mb-2">24+ Hours Before</h3>
                                <p className="text-green-400 font-bold text-2xl mb-2">100% Refund</p>
                                <p className="text-slate-400 text-sm">Full refund credited to original payment method.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-slate-900/50 border border-red-500/20">
                                <h3 className="text-lg font-bold text-white mb-2">Within 24 Hours</h3>
                                <p className="text-red-400 font-bold text-2xl mb-2">No Refund</p>
                                <p className="text-slate-400 text-sm">Late cancellations are non-refundable.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Processing Time</h2>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            Refunds are processed automatically upon cancellation. It typically takes 5-7 business days for the amount to reflect in your bank account, depending on your bank's processing times.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <AlertCircle className="w-6 h-6 text-green-400" />
                            Weather Policy
                        </h2>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            In the event of heavy rain or severe weather conditions rendering the courts unplayable during your booked slot, we will provide a <span className="text-white font-medium">full credit</span> for a future booking or a full refund upon request. Make sure to contact the front desk immediately.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Refund;
