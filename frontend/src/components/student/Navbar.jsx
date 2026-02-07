import React from 'react';
import { Home, BookOpen, GraduationCap, LogIn, UserPlus } from 'lucide-react';
import { NavBar } from '../ui/tubelight-navbar';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Courses', url: '/offered-course', icon: BookOpen },
    { name: 'My Learning', url: '/my-enrollments', icon: GraduationCap },
  ];

  const actions = (
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

  return <NavBar items={navItems} actions={actions} />;
};

export default React.memo(Navbar);
