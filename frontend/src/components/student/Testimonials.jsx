import React from 'react';
import { assets, dummyTestimonial } from '../../assets/assets';

const Testimonials = () => {
  return (
    <section className="section section-muted">
      <div className="container-base">
        <div className="text-center mb-12">
          <span className="pill">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B7FA66]" />
            Student Voice
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">Testimonials</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Real feedback from learners who shipped projects and earned outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dummyTestimonial.map((item, index) => (
            <div
              key={index}
              className={`rounded-3xl border-2 border-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] ${
                index === 1 ? 'bg-[#B7FA66]' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <img
                      key={s}
                      src={s <= Math.round(item.rating) ? assets.star : assets.star_blank}
                      alt=""
                      className="w-4 h-4"
                      width="16"
                      height="16"
                      loading="lazy"
                    />
                  ))}
                </div>
                <span className="text-3xl leading-none text-slate-900">“</span>
              </div>

              <p className="mt-4 text-slate-800 text-sm leading-relaxed">"{item.feedback}"</p>

              <div className="mt-6 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                  width="40"
                  height="40"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-700">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Testimonials);
