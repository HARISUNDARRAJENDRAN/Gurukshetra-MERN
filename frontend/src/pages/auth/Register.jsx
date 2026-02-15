import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContent } from '../../content/AppContent';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AppContent);

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const data = await register(formData);
    setLoading(false);
    setMessage(data.message || 'Request completed');

    if (data.success) {
      navigate('/verify-email');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md card-strong p-6 sm:p-8 space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-700"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-700"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-700"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 py-3 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>

        {message && <p className="text-sm text-slate-700">{message}</p>}

        <p className="text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="hover:text-slate-900">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;