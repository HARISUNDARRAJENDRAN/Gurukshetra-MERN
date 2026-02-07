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
        <div className="text-center mb-12">
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
              <div key={f.title} className="card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center shadow-sm">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(KeyFeatures);
