// pages/payment-failed.js
import Link from 'next/link';

export default function PaymentFailed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 sm:p-10 text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Payment Failed
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-base leading-relaxed mb-8">
          We're sorry, but your payment could not be processed. Please check
          your payment details and try again.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Link
            href="/"
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Go Home
          </Link>
        </div>

        {/* Support */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <a
              href="mailto:support@example.com"
              className="text-blue-500 hover:text-blue-600 font-medium hover:underline"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
