import React from 'react';

const Outcomes = () => {
  const stats = [
    { label: 'Avg. completion rate', value: '87%' },
    { label: 'Learners upskilled', value: '24k+' },
    { label: 'Career transitions', value: '4.1k+' },
    { label: 'Avg. rating', value: '4.8/5' },
  ];

  return (
    <section className="section bg-white relative overflow-hidden border-t border-slate-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(15,23,42,0.05)_0%,transparent_36%)]" />
      <div className="container-base">
        <div className="text-center mb-12">
          <span className="pill">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-800" />
            Impact
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">Benefits & Outcomes</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Consistent momentum drives measurable progress, not just completed videos.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, index) => (
            <div
              key={s.label}
              className="rounded-3xl border-2 border-slate-900 p-6 text-center bg-white"
            >
              <div className="text-3xl font-bold text-slate-900">{s.value}</div>
              <div className="mt-2 text-xs uppercase tracking-widest text-slate-700">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Outcomes);
