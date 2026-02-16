import React, { useContext } from 'react';
import { Home, BookOpen, GraduationCap, LogIn, UserPlus, LogOut, BadgeCheck, BriefcaseBusiness } from 'lucide-react';
import { NavBar } from '../ui/tubelight-navbar';
import { Link } from 'react-router-dom';
import { AppContent } from '../../content/AppContent';

const Navbar = () => {
  const { isAuthenticated, user, isEducator, logout, becomeEducator } = useContext(AppContent);

  const onLogout = async () => {
    await logout();
  };

  const handleBecomeEducator = async () => {
    const data = await becomeEducator();

    if (data.success) {
      window.alert(data.message || 'You are now an educator');
      return;
    }

    window.alert(data.message || 'Unable to become educator');
  };

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Courses', url: '/offered-course', icon: BookOpen },
    { name: 'My Learning', url: '/my-enrollments', icon: GraduationCap },
  ];

  const guestActions = (
    <>
      <Link
        to="/login"
        className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
      >
        <LogIn size={14} />
        Login
      </Link>
      <Link
        to="/register"
        className="hidden sm:inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-slate-800"
      >
        <UserPlus size={14} />
        Register
      </Link>
      <Link
        to="/login"
        className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
        aria-label="Login"
      >
        <LogIn size={16} />
      </Link>
      <Link
        to="/register"
        className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800"
        aria-label="Register"
      >
        <UserPlus size={16} />
      </Link>
    </>
  );

  const userActions = (
    <>
      {!user?.isAccountVerified && (
        <Link
          to="/verify-email"
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
        >
          <BadgeCheck size={14} />
          Verify
        </Link>
      )}

      {isEducator ? (
        <>
          <Link
            to="/prof"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
          >
            <BriefcaseBusiness size={14} />
            Prof Dashboard
          </Link>
          <Link
            to="/prof"
            className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            aria-label="Prof Dashboard"
          >
            <BriefcaseBusiness size={16} />
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={handleBecomeEducator}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
          >
            <BriefcaseBusiness size={14} />
            Become Prof
          </button>
          <button
            onClick={handleBecomeEducator}
            className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            aria-label="Become Prof"
          >
            <BriefcaseBusiness size={16} />
          </button>
        </>
      )}

      <button
        onClick={onLogout}
        className="hidden sm:inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-slate-800"
      >
        <LogOut size={14} />
        Logout
      </button>

      <button
        onClick={onLogout}
        className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800"
        aria-label="Logout"
      >
        <LogOut size={16} />
      </button>
    </>
  );

  return <NavBar items={navItems} actions={isAuthenticated ? userActions : guestActions} />;
};

export default React.memo(Navbar);
