import React from 'react';
import { BookOpen, GraduationCap, LineChart, ShieldCheck, Users } from 'lucide-react';

const features = [
  { title: 'Role‑based access', desc: 'Students and instructors see only what they need.', icon: ShieldCheck, tone: 'light' },
  { title: 'Guided courses', desc: 'Structured modules with clear progress checkpoints.', icon: BookOpen, tone: 'accent' },
  { title: 'Instructor tools', desc: 'Publish, manage, and analyze your courses easily.', icon: Users, tone: 'dark' },
  { title: 'Learning analytics', desc: 'Track performance, time spent, and outcomes.', icon: LineChart, tone: 'light' },
  { title: 'Career paths', desc: 'Curated tracks aligned to real job skills.', icon: GraduationCap, tone: 'accent' },
];

const KeyFeatures = () => {
  return (
    <section className="section section-muted">
      <div className="container-base">
        <div className="mb-12 text-center">
          <span className="pill">Platform</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">Key Features</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            A focused toolkit for learners and educators to ship real outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            const toneClasses = {
              light: 'bg-white text-slate-900 border-slate-900',
              dark: 'bg-slate-900 text-white border-slate-900',
              accent: 'bg-[#B7FA66] text-slate-900 border-slate-900',
            };
            const iconClasses = {
              light: 'bg-slate-900 text-white',
              dark: 'bg-white text-slate-900',
              accent: 'bg-slate-900 text-white',
            };
            return (
              <div
                key={f.title}
                className={`rounded-3xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${toneClasses[f.tone]}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconClasses[f.tone]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm opacity-80">{f.desc}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
                  Learn more <span aria-hidden>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(KeyFeatures);
