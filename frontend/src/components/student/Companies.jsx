import React from 'react';
import { assets } from '../../assets/assets';

const logos = [
  { src: assets.microsoft_logo, alt: 'Microsoft' },
  { src: assets.walmart_logo, alt: 'Walmart' },
  { src: assets.accenture_logo, alt: 'Accenture' },
  { src: assets.adobe_logo, alt: 'Adobe' },
  { src: assets.paypal_logo, alt: 'PayPal' },
];

const Companies = () => {
  return (
    <section className="section section-muted">
      <div className="container-base">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
          Trusted by learners from
        </p>
        <div className="overflow-hidden relative">
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee w-max items-center gap-16">
            {/* Duplicated for seamless loop */}
            {[...logos, ...logos].map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.alt}
                className="h-7 sm:h-9 w-auto opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                width="120"
                height="36"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Companies);
