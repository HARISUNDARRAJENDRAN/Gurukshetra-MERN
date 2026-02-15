import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContent } from '../../content/AppContent';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { sendVerifyOtp, verifyEmail, isAuthenticated } = useContext(AppContent);

  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSendOtp = async () => {
    setLoading(true);
    const data = await sendVerifyOtp();
    setLoading(false);
    setMessage(data.message || 'Request completed');
  };

  const onVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await verifyEmail(otp);
    setLoading(false);
    setMessage(data.message || 'Request completed');

    if (data.success) {
      navigate('/');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="card-strong p-6 sm:p-8 text-center max-w-md w-full">
          <p className="text-slate-700 mb-3">Please login first to verify your email.</p>
          <Link to="/login" className="text-slate-900 font-semibold">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <form onSubmit={onVerify} className="w-full max-w-md card-strong p-6 sm:p-8 space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Verify Email</h1>
        <p className="text-sm text-slate-600">Send OTP to your email and enter it below.</p>

        <button
          type="button"
          onClick={onSendOtp}
          disabled={loading}
          className="w-full rounded-xl border border-slate-300 py-3 font-semibold text-slate-800 hover:border-slate-900 disabled:opacity-60"
        >
          Send OTP
        </button>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-700"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 py-3 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
        >
          Verify Email
        </button>

        {message && <p className="text-sm text-slate-700">{message}</p>}
      </form>
    </div>
  );
};

export default VerifyEmail;