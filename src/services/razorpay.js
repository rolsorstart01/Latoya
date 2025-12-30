// Razorpay Payment Service - Full Payment Only
// Replace RAZORPAY_KEY_ID with your actual Razorpay key

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_LsPoj0Ozs1ScMb';

export const loadRazorpay = () => {
    return new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const createPayment = async ({ amount, bookingDetails, user, onSuccess, onError }) => {
    const loaded = await loadRazorpay();

    if (!loaded) {
        onError('Failed to load payment gateway. Please try again.');
        return;
    }

    // Full payment only (no partial option)
    const amountInPaise = amount * 100; // Razorpay expects amount in paise

    const options = {
        key: RAZORPAY_KEY_ID,
        amount: amountInPaise,
        currency: 'INR',
        name: 'HQ Sport',
        description: `Premium Court Booking - ${bookingDetails.courtName}`,
        image: '/favicon.svg',
        handler: function (response) {
            onSuccess({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                amount: amount,
                paymentType: 'full',
                remainingAmount: 0
            });
        },
        prefill: {
            name: user?.displayName || '',
            email: user?.email || '',
            contact: user?.phoneNumber || ''
        },
        notes: {
            courtId: bookingDetails.courtId,
            date: bookingDetails.date,
            slots: bookingDetails.slots.join(','),
            venue: 'HQ Sport Kolkata'
        },
        theme: {
            color: '#D4AF37',
            backdrop_color: '#000000'
        },
        modal: {
            ondismiss: function () {
                onError('Payment cancelled');
            },
            confirm_close: true,
            animation: true
        }
    };

    try {
        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', function (response) {
            onError(response.error.description || 'Payment failed. Please try again.');
        });
        razorpay.open();
    } catch (error) {
        onError(error.message || 'Something went wrong. Please try again.');
    }
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};
