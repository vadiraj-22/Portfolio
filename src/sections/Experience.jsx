import React, { useRef } from 'react';
import { workExperiences } from '../constants/index.js';
import IDCardLanyard from '@/components/ui/id-card-lanyard';

const WorkExperience = () => {
  const sectionRef = useRef(null);
  const leftCardRef = useRef(null);

  return (
    <section ref={sectionRef} className="c-space my-20 overflow-visible relative" id="work">
      <div className="w-full text-white-600">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Career Journey</p>
          <h2 className="head-text">Work Experience</h2>
        </div>

        {/* ── Responsive Grid: Equal Height Left & Right Columns (items-stretch) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-stretch relative">
          {/* ── Left Column: Anchor Pedestal for the Fourth-Wall Breaking ID Card (Matched Height) ── */}
          <div
            ref={leftCardRef}
            className="col-span-1 lg:col-span-5 xl:col-span-4 rounded-2xl bg-black-200/80 border border-white/[0.08] backdrop-blur-xl relative overflow-visible h-full min-h-[560px] flex flex-col justify-between p-6 group"
          >
            {/* Ambient background glow */}
            <div className="absolute -top-20 -left-20 w-52 h-52 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-52 h-52 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Header Tag - Wide central gap so the metallic clip & ribbon hang cleanly without overlapping */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Pass
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Drag &amp; Flip
              </span>
            </div>

            {/* Subtle Pedestal Guideline (Visible behind the hanging card) */}
            <div className="relative z-0 flex-1 flex flex-col items-center justify-end pb-4 text-center pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity">
              <div className="w-36 h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent rounded-full mb-1.5" />
              <span className="text-[9.5px] font-mono text-amber-400/80 tracking-widest uppercase">
                ✦ Grab &amp; Drag Outside
              </span>
            </div>
          </div>

          {/* ── Right Column: Work Experience Timeline (Matched Height) ── */}
          <div className="col-span-1 lg:col-span-7 xl:col-span-8 rounded-2xl bg-black-200/80 border border-white/[0.08] backdrop-blur-xl flex flex-col justify-center h-full">
            <div className="sm:py-8 py-5 sm:px-6 px-3">
              {workExperiences.map((item, index) => (
                <div
                  key={index}
                  className="work-content_container group">
                  <div className="flex flex-col h-full justify-start items-center py-2">
                    <div className="work-content_logo group-hover:border-amber-500/40 transition-colors">
                      <img className="w-full h-full object-contain" src={item.icon} alt={`${item.name} logo`} loading="lazy" />
                    </div>

                    <div className="work-content_bar" />
                  </div>

                  <div className="sm:p-5 px-2.5 py-5 min-w-0 flex-1">
                    <h3 className="font-bold text-white-800 text-lg group-hover:text-amber-400 transition-colors">{item.name}</h3>
                    <p className="text-sm mb-4 text-gray-400">
                      <span className="font-medium text-amber-400/90">{item.pos}</span> — <time className="italic text-gray-400">{item.duration}</time>
                    </p>
                    <p className="group-hover:text-white transition-all ease-in-out duration-500 leading-relaxed text-sm sm:text-base">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Scoped Fourth-Wall Breaking ID Card: Anchored to left card, swings across entire section, 100% smooth scroll ── */}
        <IDCardLanyard
          sectionRef={sectionRef}
          anchorElementRef={leftCardRef}
          ropeLength={65}
          name="Vadiraj Joshi"
          role="Full-Stack & AI Developer"
          brand="VADIRAJ"
          brandTagline="Full-Stack Engineer"
          pillars={["Build", "Solve", "Ship"]}
          location="Bengaluru, IN"
          validThru="12/2030"
          photoUrl="/assets/vadiraj.jpg"
          site="vadiraj-22.github.io"
          githubUrl="https://github.com/vadiraj-22"
          linkedinUrl="https://linkedin.com/in/vadiraj-joshi220504"
          leetcodeUrl="https://leetcode.com/u/Vadiraj_22/"
          anchorY={6}
          showHint={true}
        />
      </div>
    </section>
  );
};

export default WorkExperience;
