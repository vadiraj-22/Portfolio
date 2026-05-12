import { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

import Button from '../components/Button.jsx';

const TARGET_LAT = 15.3173;
const TARGET_LNG = 75.7139;

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const globeEl = useRef();
  const sectionRef = useRef();
  const autoRotateRef = useRef(null);
  const hasSnappedRef = useRef(false);

  /* ── Scroll-triggered rotation ── */
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || !globeEl.current || hasSnappedRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Start rotating once the section is 40% scrolled into view
      if (rect.top < windowH * 0.6) {
        hasSnappedRef.current = true;

        // Start with rotation at the current zoom level
        if (globeEl.current.controls) {
          globeEl.current.controls().autoRotate = true;
          globeEl.current.controls().autoRotateSpeed = 4;
        }

        // After 1.8s of spinning, stop and snap to Karnataka, India
        autoRotateRef.current = setTimeout(() => {
          if (globeEl.current) {
            if (globeEl.current.controls) {
              globeEl.current.controls().autoRotate = false;
            }
            // Show Karnataka with marker visible, not too zoomed
            globeEl.current.pointOfView(
              { lat: TARGET_LAT, lng: TARGET_LNG, altitude: 2.2 },
              1200,
            );
          }
        }, 1800);
      }
    };

    // Set initial position - moderate zoom level to avoid cutting
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 2.2 }, 0);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (autoRotateRef.current) clearTimeout(autoRotateRef.current);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(' vadirajjoshi22504@gmail.com');
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section ref={sectionRef} className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {/* ── Row 1: Bio (1 col), Globe (1 col), Contact (1 col) - THREE EQUAL COLUMNS ── */}
        
        {/* ── Card 1: Photo + About Me (1 column - equal width) ── */}
        <div className="col-span-1">
          <div className="grid-container h-full">
            <div className="flex flex-col gap-5 items-center h-full">
              {/* ── Image on top ── */}
              <div className="w-full flex justify-center">
                <img
                  src="assets/vadiraj.jpg"
                  alt="Vadiraj Joshi"
                  className="w-64 h-64 object-cover rounded-2xl shadow-lg ring-2 ring-white/10"
                />
              </div>
              {/* ── Text below ── */}
              <div className="flex-1 flex flex-col justify-start gap-3 text-center">
                <p className="grid-headtext !text-xl xl:!text-2xl">Hi, I'm Vadiraj Joshi</p>
                <p className="grid-subtext !text-sm xl:!text-base leading-relaxed text-justify">
                  I build full-stack web applications with React, Node.js, Express, and MongoDB. My recent
                  work focuses on integrating AI services — like OpenAI and Cloudinary — into production
                  apps that solve real problems. I also bring strong fundamentals in data structures
                  &amp; algorithms <span className="text-white font-medium">(500+ LeetCode problems solved in Java)</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 2: Globe (1 column - equal width, full-width globe) ── */}
        <div className="col-span-1">
          <div className="grid-container h-full flex flex-col">
            <div className="flex-1 rounded-3xl w-full flex justify-center items-center overflow-hidden px-2">
              <Globe
                ref={globeEl}
                height={400}
                width={400}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[{ lat: TARGET_LAT, lng: TARGET_LNG, text: 'Karnataka, India', color: '#0f0f0f', size: 28 }]}
                labelDotRadius={0.6}
                labelColor={() => '#0f0f0f'}
                labelResolution={3}
              />
            </div>
            <div className="mt-3 space-y-2">
              <p className="grid-headtext !text-sm text-center">Open to remote &amp; on-site opportunities</p>
              <p className="grid-subtext !text-xs text-center">Based in Karnataka, India. Comfortable working across time zones and available for remote roles worldwide.</p>
            </div>
          </div>
        </div>

        {/* ── Card 3: Contact (1 column - interactive and engaging) ── */}
        <div className="col-span-1">
          <div className="grid-container h-full flex flex-col justify-between">
            <div className="space-y-5">
              {/* Header with icon */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="grid-headtext !text-xl">Let's Connect</p>
                <p className="grid-subtext !text-xs">Open to collaborations, opportunities, and tech discussions</p>
              </div>

              {/* Email — copy on click */}
              <div className="space-y-2">
                <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wider">Email</p>
                <div className="contact-link-row" onClick={handleCopy} role="button" tabIndex={0}>
                  <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-medium text-white truncate">
                    vadirajjoshi22504@gmail.com
                  </span>
                </div>
              </div>

              {/* Social links */}
              <div className="space-y-2">
                <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wider">Social</p>
                <div className="flex flex-col gap-2">
                  <a href="https://www.linkedin.com/in/vadiraj-joshi220504/" target="_blank" rel="noopener noreferrer" className="contact-link-row group">
                    <svg className="w-4 h-4 flex-shrink-0 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    <span className="text-xs font-medium text-white">LinkedIn</span>
                  </a>
                  <a href="https://github.com/vadiraj-22" target="_blank" rel="noopener noreferrer" className="contact-link-row group">
                    <svg className="w-4 h-4 flex-shrink-0 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    <span className="text-xs font-medium text-white">GitHub</span>
                  </a>
                  <a href="https://leetcode.com/u/Vadiraj_22/" target="_blank" rel="noopener noreferrer" className="contact-link-row group">
                    <svg className="w-4 h-4 flex-shrink-0 group-hover:text-yellow-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l.602.5c.61.504 1.507.421 2.01-.185a1.374 1.374 0 0 0-.186-2.003l-.602-.5a5.38 5.38 0 0 0-.263-.215c.263-.265.537-.516.808-.765a1.38 1.38 0 0 0 .003-1.952 1.374 1.374 0 0 0-1.951-.003 32.67 32.67 0 0 0-.676.653l-.002.002-.002-.001a5.09 5.09 0 0 0-1.088-.556 5.21 5.21 0 0 0-1.78-.354zM7.716 15.515H17.61c.763 0 1.38.621 1.38 1.387 0 .765-.617 1.386-1.38 1.386H7.716c-.764 0-1.38-.621-1.38-1.386 0-.766.616-1.387 1.38-1.387z"/></svg>
                    <span className="text-xs font-medium text-white">LeetCode</span>
                  </a>
                </div>
              </div>

              {/* Stats/Info */}
              <div className="space-y-2 pt-2">
                <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wider">Quick Stats</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-xs text-gray-400">LeetCode</span>
                    <span className="text-xs font-bold text-green-400">500+ Solved</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-xs text-gray-400">Response</span>
                    <span className="text-xs font-bold text-blue-400">Within 24h</span>
                  </div>
                </div>
              </div>

              {/* Call to action */}
              <div className="pt-2">
                <a 
                  href="#contact" 
                  className="block w-full text-center py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group"
                >
                  <span className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors">
                    Send a Message →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 2: Core Stack (Full Width - 3 columns) ── */}
        <div className="xl:col-span-3 md:col-span-2 col-span-1">
          <div className="grid-container">
            {/* Header */}
            <div className="mb-1">
              <p className="grid-headtext text-2xl">Core Stack</p>
              <p className="grid-subtext text-sm" style={{ marginTop: '0.5rem' }}>
                Technologies I use to build full-stack and AI-powered web applications
              </p>
            </div>

            {(() => {
              const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

              const categories = [
                {
                  label: 'Programming Languages',
                  desc: 'Core programming languages I work with',
                  color: '#ef4444',
                  techs: [
                    { name: 'Java', logo: `${D}/java/java-original.svg` },
                    { name: 'C', logo: `${D}/c/c-original.svg` },
                    { name: 'JavaScript', logo: `${D}/javascript/javascript-original.svg` },
                  ],
                },
                {
                  label: 'Frontend',
                  desc: 'Interfaces that are fast, responsive, and polished',
                  color: '#ffff00',
                  techs: [
                    { name: 'React', logo: `${D}/react/react-original.svg` },
                    { name: 'Tailwind CSS', logo: `${D}/tailwindcss/tailwindcss-original.svg` },
                    { name: 'HTML5', logo: `${D}/html5/html5-original.svg` },
                    { name: 'CSS3', logo: `${D}/css3/css3-original.svg` },
                  ],
                },
                {
                  label: 'Backend',
                  desc: 'APIs, auth, and server logic that scale',
                  color: '#0bd7e6ff',
                  techs: [
                    { name: 'Node.js', logo: `${D}/nodejs/nodejs-original.svg` },
                    { name: 'Express.js', logo: `${D}/express/express-original.svg`, invert: true },
                    { name: 'REST APIs', logo: `${D}/swagger/swagger-original.svg` },
                  ],
                },
                {
                  label: 'Databases',
                  desc: 'Persistent storage and data modeling',
                  color: '#a855f7',
                  techs: [
                    { name: 'MongoDB', logo: `${D}/mongodb/mongodb-original.svg` },
                    { name: 'PostgreSQL', logo: `${D}/postgresql/postgresql-original.svg` },
                    { name: 'Oracle SQL', logo: `${D}/oracle/oracle-original.svg` },
                  ],
                },
                {
                  label: 'DevOps & Deployment',
                  desc: 'Version control, CI/CD, and hosting',
                  color: '#f59e0b',
                  techs: [
                    { name: 'Git', logo: `${D}/git/git-original.svg` },
                    { name: 'GitHub', logo: `${D}/github/github-original.svg`, invert: true },
                    { name: 'Vercel', logo: `${D}/vercel/vercel-original.svg`, invert: true },
                    { name: 'Render', logo: 'https://avatars.githubusercontent.com/u/36424661?s=64&v=4' },
                  ],
                },
              ];

              const secondary = [
                { name: 'Next.js', logo: `${D}/nextjs/nextjs-original.svg`, invert: true },
                { name: 'Python', logo: `${D}/python/python-original.svg` },
                { name: 'Docker', logo: `${D}/docker/docker-original.svg` },
                { name: 'Multer', logo: `${D}/nodejs/nodejs-original.svg` },
                { name: 'Cloudinary', logo: '/assets/cloudinary.png' },
                { name: 'TypeScript', logo: `${D}/typescript/typescript-original.svg` },
                { name: 'OpenAI API', logo: '/assets/quickAI.svg' },
                { name: 'Postman', logo: `${D}/postman/postman-original.svg` },
              ];

              const TechBadge = ({ tech, size = 'normal' }) => (
                <span className={`core-stack-badge ${size === 'small' ? 'core-stack-badge--sm' : ''}`}>
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className={size === 'small' ? 'w-4 h-4' : 'w-5 h-5'}
                    style={{
                      objectFit: 'contain',
                      flexShrink: 0,
                      borderRadius: '2px',
                      ...(tech.invert ? { filter: 'invert(1) brightness(2)' } : {}),
                    }}
                    loading="lazy"
                  />
                  {tech.name}
                </span>
              );

              return (
                <div className="flex flex-col gap-5">
                  {/* 5 Category Cards */}
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                    {categories.map((cat) => (
                      <div key={cat.label} className="core-stack-card">
                        {/* Accent line */}
                        <div
                          className="core-stack-accent"
                          style={{ background: cat.color }}
                        />
                        <p className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: cat.color }}>
                          {cat.label}
                        </p>
                        <p className="text-[#9ca3af] text-xs mt-1.5 mb-3 leading-relaxed">
                          {cat.desc}
                        </p>
                        <div className="flex flex-wrap gap-2.5 mt-3">
                          {cat.techs.map((tech) => (
                            <TechBadge key={tech.name} tech={tech} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Secondary — "Also worked with" */}
                  <div className="core-stack-secondary">
                    <p className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wider mb-3">
                      Also worked with
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {secondary.map((tech) => (
                        <TechBadge key={tech.name} tech={tech} size="small" />
                      ))}
                    </div>
                  </div>

                  {/* Bottom note */}
                  <p className="text-[#6b7280] text-xs text-center italic mt-2">
                    Focused on MERN stack and AI-powered product development
                  </p>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;