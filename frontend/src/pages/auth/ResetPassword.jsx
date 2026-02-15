import { useContext, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContent } from '../../content/AppContent';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword } = useContext(AppContent);

  const initialEmail = useMemo(() => new URLSearchParams(location.search).get('email') || '', [location.search]);

  const [formData, setFormData] = useState({ email: initialEmail, otp: '', newPassword: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await resetPassword(formData);
    setLoading(false);
    setMessage(data.message || 'Request completed');

    if (data.success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md card-strong p-6 sm:p-8 space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Reset Password</h1>

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-700"
          required
        />

        <input
          type="text"
          placeholder="OTP"
          value={formData.otp}
          onChange={(e) => setFormData((prev) => ({ ...prev, otp: e.target.value }))}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-700"
          required
        />

        <input
          type="password"
          placeholder="New password"
          value={formData.newPassword}
          onChange={(e) => setFormData((prev) => ({ ...prev, newPassword: e.target.value }))}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-700"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 py-3 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>

        {message && <p className="text-sm text-slate-700">{message}</p>}

        <p className="text-sm text-slate-600">
          Back to <Link to="/login" className="hover:text-slate-900">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;