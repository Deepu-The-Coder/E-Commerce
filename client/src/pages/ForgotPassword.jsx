import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    setLoading(true);
    // Simulate API call (backend endpoint not implemented in this version)
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      toast.success('Reset instructions sent to your email!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-2xl text-gray-900">ShopSphere</span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Reset your password</h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter your email and we'll send you reset instructions
          </p>
        </div>

        <div className="card p-8">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Check your email</h3>
              <p className="text-gray-500 text-sm mb-6">
                We've sent password reset instructions to <strong>{email}</strong>
              </p>
              <Link to="/login" className="btn-primary inline-block text-sm">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  id="forgot-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="you@example.com"
                />
              </div>

              <button
                type="submit"
                id="forgot-submit"
                disabled={loading}
                className="w-full btn-primary py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Instructions'}
              </button>
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
