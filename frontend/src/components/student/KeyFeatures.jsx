import React from 'react';
import { BookOpen, GraduationCap, LineChart, ShieldCheck, Users } from 'lucide-react';

const features = [
  { title: 'Role‑based access', desc: 'Students and instructors see only what they need.', icon: ShieldCheck },
  { title: 'Guided courses', desc: 'Structured modules with clear progress checkpoints.', icon: BookOpen },
  { title: 'Instructor tools', desc: 'Publish, manage, and analyze your courses easily.', icon: Users },
  { title: 'Learning analytics', desc: 'Track performance, time spent, and outcomes.', icon: LineChart },
  { title: 'Career paths', desc: 'Curated tracks aligned to real job skills.', icon: GraduationCap },
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
            return (
              <div
                key={f.title}
                className="rounded-3xl border-2 border-slate-900 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-900 text-white">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{f.desc}</p>
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
