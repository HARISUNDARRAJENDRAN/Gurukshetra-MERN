import React from 'react';

const Outcomes = () => {
  const stats = [
    { label: 'Avg. completion rate', value: '87%' },
    { label: 'Learners upskilled', value: '24k+' },
    { label: 'Career transitions', value: '4.1k+' },
    { label: 'Avg. rating', value: '4.8/5' },
  ];

  return (
    <section className="section bg-white relative overflow-hidden">
      <div className="absolute -bottom-32 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#B7FA66]/50 blur-3xl" />
      <div className="container-base">
        <div className="text-center mb-12">
          <span className="pill">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B7FA66]" />
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
              className={`rounded-3xl border-2 border-slate-900 p-6 text-center ${
                index === 0 ? 'bg-[#B7FA66]' : 'bg-white'
              }`}
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
