import React from 'react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '₹0',
      period: 'Free',
      desc: 'Explore courses and preview content.',
      features: ['Course previews', 'Community access', 'Basic tracking'],
      cta: 'Get Started',
      accent: false,
    },
    {
      name: 'Pro Learner',
      price: '₹499',
      period: 'per month',
      desc: 'Full access to all student courses.',
      features: ['Unlimited courses', 'Certificates', 'Priority support'],
      cta: 'Go Pro',
      accent: true,
    },
    {
      name: 'Educator',
      price: '₹999',
      period: 'per month',
      desc: 'Publish, manage, and grow your audience.',
      features: ['Course publishing', 'Analytics', 'Revenue insights'],
      cta: 'Start Teaching',
      accent: false,
    },
  ];

  return (
    <section className="section section-muted">
      <div className="container-base">
        <div className="text-center mb-12">
          <span className="pill">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B7FA66]" />
            Transparent
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">Pricing & Plans</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Choose a plan that fits your learning or teaching goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-3xl border-2 border-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] ${
                p.accent ? 'bg-[#B7FA66]' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
                {p.accent && (
                  <span className="text-xs font-semibold px-2 py-1 rounded-full border border-slate-900 text-slate-900">Popular</span>
                )}
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-slate-900">{p.price}</span>
                <span className="text-sm text-slate-700 ml-2">{p.period}</span>
              </div>
              <p className="mt-3 text-sm text-slate-700">{p.desc}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-6 w-full rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  p.accent
                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                    : 'border-2 border-slate-900 text-slate-900 hover:bg-[#B7FA66]'
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Pricing);
