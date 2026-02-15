import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContent } from '../../content/AppContent';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { sendResetOtp } = useContext(AppContent);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await sendResetOtp(email);
    setLoading(false);
    setMessage(data.message || 'Request completed');

    if (data.success) {
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md card-strong p-6 sm:p-8 space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Forgot Password</h1>
        <p className="text-sm text-slate-600">Enter your account email to receive reset OTP.</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-700"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 py-3 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? 'Sending...' : 'Send Reset OTP'}
        </button>

        {message && <p className="text-sm text-slate-700">{message}</p>}

        <p className="text-sm text-slate-600">
          Back to <Link to="/login" className="hover:text-slate-900">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;