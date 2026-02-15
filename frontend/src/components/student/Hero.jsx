import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HalftoneDots } from '@paper-design/shaders-react';

const TITLE = 'GURUKSHETRA';
const TYPING_SPEED = 100;

const HALFTONE_ART = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1500 980' preserveAspectRatio='xMidYMid slice'>
    <rect width='1500' height='980' fill='#ece8dd'/>
    <g transform='translate(980 460)'>
      <g fill='#121212' fill-opacity='0.95'>
        <path d='M0 -78C22 -172 78 -268 40 -352C-10 -286 -48 -194 -44 -96Z'/>
        <path d='M48 -58C116 -136 206 -216 178 -312C112 -242 46 -166 16 -68Z'/>
        <path d='M76 -16C172 -58 278 -82 270 -180C194 -124 114 -70 54 -8Z'/>
        <path d='M80 32C182 30 292 50 308 -42C220 8 130 20 52 16Z'/>
        <path d='M70 78C160 110 248 154 280 74C202 74 122 66 50 56Z'/>
        <path d='M34 108C98 188 148 282 80 338C56 252 24 174 0 96Z'/>
        <path d='M-8 112C-20 210 -14 312 -92 350C-84 260 -56 174 -26 94Z'/>
        <path d='M-52 92C-126 170 -206 236 -166 326C-120 248 -72 180 -34 92Z'/>
        <path d='M-80 46C-178 80 -284 92 -310 0C-222 28 -134 36 -56 24Z'/>
        <path d='M-84 -12C-184 -30 -292 -66 -296 -162C-208 -102 -126 -48 -54 -16Z'/>
        <path d='M-66 -62C-138 -132 -200 -230 -146 -308C-108 -226 -72 -146 -40 -64Z'/>
        <path d='M-16 -74C-40 -162 -44 -266 30 -320C26 -234 8 -150 -8 -74Z'/>
      </g>
      <g fill='#121212' fill-opacity='0.8'>
        <path d='M18 -62C38 -116 70 -176 48 -226C18 -174 4 -118 6 -64Z'/>
        <path d='M54 -34C92 -68 142 -90 130 -140C90 -96 56 -58 32 -20Z'/>
        <path d='M62 12C108 8 158 20 164 -26C120 -2 78 8 40 12Z'/>
        <path d='M56 46C98 72 132 118 96 160C72 116 50 76 36 40Z'/>
        <path d='M20 74C32 126 28 182 -16 206C-14 156 -2 108 12 68Z'/>
        <path d='M-26 70C-58 112 -98 144 -88 192C-58 154 -34 112 -14 62Z'/>
        <path d='M-56 32C-102 48 -154 46 -160 2C-118 12 -78 20 -40 20Z'/>
        <path d='M-58 -14C-102 -26 -154 -50 -146 -96C-106 -66 -70 -36 -40 -14Z'/>
        <path d='M-42 -46C-74 -82 -102 -132 -74 -178C-52 -132 -36 -88 -24 -46Z'/>
      </g>
      <circle r='42' fill='#121212'/>
      <circle r='18' fill='#ece8dd' fill-opacity='0.34'/>
    </g>
    <g stroke='#121212' stroke-opacity='0.4' stroke-width='8' fill='none' stroke-linecap='round'>
      <path d='M980 146C1016 80 1086 24 1168 -8'/>
      <path d='M1128 250C1216 214 1308 212 1396 242'/>
      <path d='M1144 430C1238 436 1322 474 1388 546'/>
      <path d='M1088 640C1156 704 1194 792 1198 884'/>
      <path d='M936 698C934 790 906 884 854 962'/>
      <path d='M754 634C670 680 582 700 494 692'/>
      <path d='M686 430C596 420 510 384 444 314'/>
      <path d='M744 230C674 174 624 94 604 6'/>
      <path d='M882 158C842 84 822 0 828 -88'/>
    </g>
    <g fill='#121212' fill-opacity='0.38'>
      <circle cx='980' cy='54' r='2.8'/>
      <circle cx='1124' cy='92' r='2.4'/>
      <circle cx='1262' cy='176' r='2.8'/>
      <circle cx='1362' cy='314' r='2.4'/>
      <circle cx='1398' cy='482' r='2.8'/>
      <circle cx='1354' cy='650' r='2.4'/>
      <circle cx='1238' cy='788' r='2.8'/>
      <circle cx='1080' cy='872' r='2.4'/>
      <circle cx='912' cy='896' r='2.8'/>
      <circle cx='746' cy='850' r='2.4'/>
      <circle cx='614' cy='742' r='2.8'/>
      <circle cx='532' cy='592' r='2.4'/>
      <circle cx='512' cy='426' r='2.8'/>
      <circle cx='554' cy='262' r='2.4'/>
      <circle cx='658' cy='128' r='2.8'/>
      <circle cx='806' cy='46' r='2.4'/>
    </g>
  </svg>
`)}`;

const quickStats = [
  { label: 'Completion', value: '87%' },
  { label: 'Learners', value: '24k+' },
  { label: 'Avg. Rating', value: '4.8/5' },
];

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [shaderSize, setShaderSize] = useState({ width: 1100, height: 840 });
  const [shaderParams, setShaderParams] = useState({
    size: 0.39,
    radius: 1.48,
    contrast: 0.68,
    grainMixer: 0.66,
    grainOverlay: 0.52,
  });

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
      index += 1;
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
    if (typeof window === 'undefined') return undefined;

    const updateSize = () => {
      setShaderSize({
        width: Math.max(Math.ceil(window.innerWidth * 0.7), 860),
        height: Math.max(Math.ceil(window.innerHeight * 1.05), 700),
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const t = Date.now() * 0.001;
      setShaderParams({
        size: 0.39 + Math.sin(t * 1.18) * 0.02,
        radius: 1.48 + Math.sin(t * 0.92 + 0.8) * 0.12,
        contrast: 0.68 + Math.sin(t * 1.04 + 1.2) * 0.04,
        grainMixer: 0.66 + Math.sin(t * 1.34 + 2.1) * 0.06,
        grainOverlay: 0.52 + Math.sin(t * 1.22 + 2.6) * 0.05,
      });
    }, 52);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden pt-24 bg-[#ece8dd]">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(120deg,#f4f1e7_0%,#ebe7dc_43%,#e3dfd2_100%)]" />
      <div className="hero-paper-noise absolute inset-0 z-0 opacity-50 mix-blend-multiply pointer-events-none" />
      <div className="hero-dither-primary absolute inset-0 z-0 opacity-[0.13] mix-blend-multiply pointer-events-none" />
      <div className="hero-dither-secondary absolute inset-0 z-0 opacity-[0.1] mix-blend-multiply pointer-events-none" />
      <div className="hero-dither-micro absolute inset-0 z-0 opacity-[0.12] mix-blend-multiply pointer-events-none" />
      <div className="hero-orbit-pattern absolute inset-0 z-0 opacity-[0.08] mix-blend-multiply pointer-events-none" />
      <div className="hero-speckle-field absolute inset-0 z-0 opacity-[0.07] mix-blend-multiply pointer-events-none" />
      <div className="hero-thread-pattern absolute inset-0 z-0 opacity-[0.08] pointer-events-none" />
      <div className="hero-grid-pattern absolute inset-0 z-0 opacity-[0.05] mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-y-0 left-1/2 hidden lg:block w-px z-0 bg-black/12" />

      <div
        className="absolute inset-y-0 right-0 w-[88%] sm:w-[74%] md:w-[66%] lg:w-[54%] xl:w-[48%] z-[1] pointer-events-none overflow-hidden opacity-72 sm:opacity-88 lg:opacity-100"
        style={{ maskImage: 'linear-gradient(to left, #000 82%, transparent 100%)' }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.15)_100%)]" />

        <div
          className="absolute -right-[30%] sm:-right-[20%] md:-right-[14%] lg:-right-[8%] top-1/2"
          style={{ transform: 'translate3d(0, -50%, 0) scale(1.02)' }}
        >
          <HalftoneDots
            width={shaderSize.width}
            height={shaderSize.height}
            image={HALFTONE_ART}
            colorBack="#e7e3d7"
            colorFront="#16171c"
            originalColors={false}
            type="gooey"
            grid="hex"
            inverted={false}
            size={shaderParams.size}
            radius={shaderParams.radius}
            contrast={shaderParams.contrast}
            grainMixer={shaderParams.grainMixer}
            grainOverlay={shaderParams.grainOverlay}
            grainSize={0.24}
            fit="cover"
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_44%,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.06)_44%,rgba(0,0,0,0)_72%)]" />
        <div className="absolute inset-y-0 left-0 w-[58%] sm:w-[52%] bg-gradient-to-r from-[#f4f1e7] via-[#f4f1e7]/88 to-transparent" />
      </div>

      <div className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(244,241,231,0.99)_0%,rgba(244,241,231,0.94)_42%,rgba(244,241,231,0.56)_60%,rgba(244,241,231,0.16)_78%,rgba(244,241,231,0)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 z-[2] bg-gradient-to-b from-[#f4f1e7] via-[#f4f1e7]/72 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 z-[2] bg-gradient-to-t from-[#ebe6db]/70 to-transparent" />

      <div className="relative z-10 container-base flex flex-col items-center justify-center lg:items-start pb-16 text-center lg:text-left">
        <span className="pill bg-white/55 border-black/12 text-slate-700 backdrop-blur-[2px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1f2026]" />
          Halftone Learning OS
        </span>

        <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-slate-900">
          <span className="text-[#1a1b24]">{displayedText}</span>
          <span className={`${typingDone ? 'hidden' : 'inline-block'} animate-blink text-[#1a1b24] ml-0.5`}>|</span>
          <span className="block mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-800">
            Build skills faster with focused, guided roadmaps.
          </span>
        </h1>

        <p
          className={`mt-6 text-lg text-slate-700 max-w-2xl transition-all duration-500 ease-out ${
            showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          A calm, distraction-free LMS that turns courses into outcomes: clear paths, consistent momentum, and{' '}
          <span className="rounded-md bg-white/70 px-2 py-0.5 text-slate-900">proof-of-skill projects</span>.
        </p>

        <div
          className={`mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-500 ease-out ${
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
            className="px-8 py-3 text-base font-semibold text-slate-700 border border-slate-300 bg-white/65 hover:border-[#1A1B24] hover:text-[#1A1B24] rounded-full transition-all duration-200"
          >
            Start Teaching
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs uppercase tracking-widest text-slate-500">
          {quickStats.map((stat, index) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-900">{stat.value}</span>
              <span>{stat.label}</span>
              {index < quickStats.length - 1 && <span className="hidden sm:inline-flex h-1.5 w-1.5 rounded-full bg-[#2b2b2b]" />}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-paper-noise {
          background-image:
            radial-gradient(circle at 14% 18%, rgba(0, 0, 0, 0.08) 0.7px, transparent 0.7px),
            radial-gradient(circle at 76% 32%, rgba(0, 0, 0, 0.06) 0.8px, transparent 0.8px),
            radial-gradient(circle at 56% 68%, rgba(0, 0, 0, 0.04) 0.8px, transparent 0.8px),
            radial-gradient(circle at 28% 80%, rgba(0, 0, 0, 0.05) 0.6px, transparent 0.6px);
          background-size: 180px 180px, 220px 220px, 260px 260px, 140px 140px;
        }

        .hero-dither-primary {
          background-image:
            radial-gradient(circle, rgba(0, 0, 0, 0.08) 0.64px, transparent 0.74px),
            radial-gradient(circle, rgba(0, 0, 0, 0.05) 0.48px, transparent 0.58px);
          background-size: 12px 12px, 22px 22px;
          background-position: 0 0, 8px 6px;
          animation: heroDitherDriftA 8.2s linear infinite;
        }

        .hero-dither-secondary {
          background-image:
            radial-gradient(circle, rgba(0, 0, 0, 0.07) 0.52px, transparent 0.62px),
            radial-gradient(circle, rgba(0, 0, 0, 0.045) 0.42px, transparent 0.52px);
          background-size: 18px 18px, 28px 28px;
          background-position: 4px 5px, 13px 9px;
          animation: heroDitherDriftB 6.4s ease-in-out infinite;
        }

        .hero-dither-micro {
          background-image: radial-gradient(circle, rgba(17, 17, 17, 0.14) 0.32px, transparent 0.42px);
          background-size: 6px 6px;
          background-position: 0 0;
          animation: heroMicroGrainDrift 4s linear infinite;
        }

        .hero-orbit-pattern {
          background-image:
            radial-gradient(130% 110% at 86% 12%, transparent 0 53%, rgba(17, 17, 17, 0.2) 53.4% 53.9%, transparent 54.2%),
            radial-gradient(125% 115% at 18% 82%, transparent 0 58%, rgba(17, 17, 17, 0.16) 58.2% 58.7%, transparent 59%);
          background-repeat: no-repeat;
          animation: heroOrbitDrift 12s ease-in-out infinite;
          mask-image: linear-gradient(130deg, rgba(0, 0, 0, 0.45) 0%, #000 40%, rgba(0, 0, 0, 0.6) 100%);
        }

        .hero-speckle-field {
          background-image:
            radial-gradient(circle at 18% 22%, rgba(17, 17, 17, 0.22) 0.55px, transparent 0.74px),
            radial-gradient(circle at 70% 38%, rgba(17, 17, 17, 0.18) 0.48px, transparent 0.67px),
            radial-gradient(circle at 44% 70%, rgba(17, 17, 17, 0.17) 0.56px, transparent 0.75px);
          background-size: 120px 120px, 160px 160px, 140px 140px;
          animation: heroSpeckleDrift 9.8s linear infinite;
          mask-image: radial-gradient(circle at 58% 44%, #000 0%, rgba(0, 0, 0, 0.75) 58%, rgba(0, 0, 0, 0.3) 100%);
        }

        .hero-thread-pattern {
          background-image:
            radial-gradient(120% 120% at 90% 22%, transparent 0 44%, rgba(17, 17, 17, 0.22) 44.4% 44.8%, transparent 45.2%),
            radial-gradient(105% 105% at 8% 78%, transparent 0 46%, rgba(17, 17, 17, 0.16) 46.3% 46.7%, transparent 47.1%);
          background-repeat: no-repeat;
        }

        .hero-grid-pattern {
          background-image:
            repeating-linear-gradient(90deg, rgba(17, 17, 17, 0.08) 0 1px, transparent 1px 88px),
            repeating-linear-gradient(0deg, rgba(17, 17, 17, 0.06) 0 1px, transparent 1px 88px);
          background-size: 100% 100%;
          mask-image: linear-gradient(120deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 58%, rgba(0, 0, 0, 0.2) 100%);
        }

        @keyframes heroDitherDriftA {
          0% { background-position: 0 0, 8px 6px; }
          100% { background-position: 20px -16px, 28px -8px; }
        }

        @keyframes heroDitherDriftB {
          0% { background-position: 4px 5px, 13px 9px; }
          50% { background-position: -8px 14px, 4px 18px; }
          100% { background-position: 4px 5px, 13px 9px; }
        }

        @keyframes heroMicroGrainDrift {
          0% { background-position: 0 0; }
          50% { background-position: 4px -3px; }
          100% { background-position: 0 0; }
        }

        @keyframes heroOrbitDrift {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -8px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes heroSpeckleDrift {
          0% { background-position: 0 0, 0 0, 0 0; }
          100% { background-position: 18px -12px, -14px 16px, 12px 10px; }
        }
      `}</style>
    </section>
  );
};

export default React.memo(Hero);
