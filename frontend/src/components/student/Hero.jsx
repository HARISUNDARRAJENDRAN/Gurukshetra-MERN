import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GLSLHills } from '../ui/glsl-hills';

const TITLE = 'GURUKSHETRA';
const TYPING_SPEED = 100;

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(true);

  const roadmap = [
    { title: 'Foundations', progress: 80 },
    { title: 'Projects', progress: 55 },
    { title: 'Interview Prep', progress: 35 },
  ];

  const quickStats = [
    { label: 'Completion', value: '87%' },
    { label: 'Learners', value: '24k+' },
    { label: 'Avg. Rating', value: '4.8/5' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setDisplayedText(TITLE);
      setTypingDone(true);
      setShowSubtitle(true);
      setShowButtons(true);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(TITLE.slice(0, index));
      if (index >= TITLE.length) {
        clearInterval(interval);
        setTypingDone(true);
        setTimeout(() => setShowSubtitle(true), 300);
        setTimeout(() => setShowButtons(true), 600);
      }
    }, TYPING_SPEED);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotionEnabled(!media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }
    media.addListener?.(update);
    return () => media.removeListener?.(update);
  }, []);

  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-24">
      <div className="absolute inset-0 bg-grid opacity-35" />
      <div className="absolute -top-40 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-slate-200/50 via-white/10 to-slate-300/40 blur-3xl" />
      <div className="absolute -bottom-32 left-[-10%] h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-slate-100/50 via-white/10 to-slate-300/40 blur-3xl" />
      {motionEnabled && (
        <div className="absolute inset-0 z-0 opacity-60 mix-blend-multiply pointer-events-none">
          <GLSLHills width="100%" height="100%" cameraZ={120} speed={0.45} />
        </div>
      )}

      <div className="relative z-10 container-base grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] pb-16">
        <div className="text-center lg:text-left">
          <span className="pill">New · Personal Learning OS</span>

          <h1 className="mt-5 text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-slate-900">
            <span className="gradient-text">{displayedText}</span>
            <span className={`${typingDone ? 'hidden' : 'inline-block'} animate-blink text-slate-900 ml-0.5`}>|</span>
            <span className="block mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-800">
              Build skills faster with focused, guided roadmaps.
            </span>
          </h1>

          <p
            className={`mt-6 text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 transition-all duration-500 ease-out ${
              showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            A calm, distraction‑free LMS that turns courses into outcomes: clear paths, consistent momentum, and proof‑of‑skill projects.
          </p>

          <div
            className={`mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 transition-all duration-500 ease-out ${
              showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Link
              to="/offered-course"
              className="px-8 py-3 text-base font-semibold text-white bg-[#1A1B24] hover:bg-[#11121a] rounded-full transition-all duration-200 shadow-[var(--shadow-soft)] hover:shadow-lg"
            >
              Explore Courses
            </Link>
            <Link
              to="/prof"
              className="px-8 py-3 text-base font-semibold text-slate-700 border border-slate-200 bg-white/70 hover:border-[#1A1B24] hover:text-[#1A1B24] rounded-full transition-all duration-200"
            >
              Start Teaching
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
            {quickStats.map((stat) => (
              <div key={stat.label} className="card px-4 py-3">
                <div className="text-lg font-semibold text-slate-900">{stat.value}</div>
                <div className="text-xs uppercase tracking-wide text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-slate-200/40 via-white/10 to-slate-300/40 blur-2xl" />
          <div className="relative card-strong p-6 md:p-7">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Weekly Sprint</div>
              <div className="pill bg-white/80">Week 2 / 6</div>
            </div>

            <div className="mt-6 space-y-4">
              {roadmap.map((item) => (
                <div key={item.title}>
                  <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                    <span>{item.title}</span>
                    <span className="text-slate-500">{item.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {['Daily Focus', 'Practice Labs', 'Mentor Notes'].map((label) => (
                <div key={label} className="rounded-2xl border border-slate-100 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-600">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              3 live cohorts starting this month
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
