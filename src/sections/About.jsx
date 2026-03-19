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

        // First give it a quick spin (auto-rotate), then snap to India
        if (globeEl.current.controls) {
          globeEl.current.controls().autoRotate = true;
          globeEl.current.controls().autoRotateSpeed = 4;
        }

        // After 1.8 s of spinning, stop exactly on Karnataka, India
        autoRotateRef.current = setTimeout(() => {
          if (globeEl.current) {
            if (globeEl.current.controls) {
              globeEl.current.controls().autoRotate = false;
            }
            globeEl.current.pointOfView(
              { lat: TARGET_LAT, lng: TARGET_LNG, altitude: 2.0 },
              1200,
            );
          }
        }, 1800);
      }
    };

    // Set initial position (hidden / before snap)
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 0);
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
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        {/* ── Card 1: Photo + About Me (side by side) ── */}
        <div className="xl:col-span-2 xl:row-span-3 col-span-1">
          <div className="grid-container">
            <div className="flex flex-col xl:flex-row gap-6 items-center h-full">
              {/* ── Image: full-width on mobile, 2/5 on xl ── */}
              <div className="w-full xl:flex-[2] xl:flex-shrink-0">
                <img
                  src="assets/vadiraj.jpg"
                  alt="Vadiraj Joshi"
                  className="w-full max-w-xs mx-auto xl:max-w-none aspect-square object-cover rounded-xl"
                />
              </div>
              {/* ── Text: full-width on mobile, 3/5 on xl ── */}
              <div className="w-full xl:flex-[3] flex flex-col justify-start gap-3 min-w-0 text-center xl:text-left">
                <p className="grid-headtext !text-3xl">Hi, I'm Vadiraj Joshi</p>
                <p className="grid-subtext text-4xl leading-relaxed">
                  Full Stack Developer experienced in building scalable web and AI-powered applications
                  using the MERN stack and modern cloud technologies. Strong foundation in React, Node.js,
                  MongoDB, Express.js and PostgreSQL with solid problem-solving skills and Data Structures
                  &amp; Algorithms <span className="text-white font-semibold">(450+ LeetCode in Java)</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 3: Globe ── */}
        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                ref={globeEl}
                height={426}
                width={426}
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
            <div>
              <p className="grid-headtext">I'm very flexible with time zone communications &amp; locations</p>
              <p className="grid-subtext">I&apos;m based in Karnataka, India and open to remote work worldwide.</p>
              <a href="#contact" className='w-fit'>
                <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
              </a>
            </div>
          </div>
        </div>


        {/* ── Wide Card: Tech Stack Marquee (replaces "My Passion for Coding") ── */}
        <div className="xl:col-span-2 xl:row-span-4">
          <div className="grid-container">
            <div>
              <p className="grid-headtext">Tech Stack</p>
            </div>
            {(() => {
              const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
              /* ── Row 1: Programming Languages ── */
              const row1 = [
                { label: 'Java', logo: `${D}/java/java-original.svg` },
                { label: 'JavaScript', logo: `${D}/javascript/javascript-original.svg` },
                { label: 'TypeScript', logo: `${D}/typescript/typescript-original.svg` },
                { label: 'C', logo: `${D}/c/c-original.svg` },
                { label: 'Python', logo: `${D}/python/python-original.svg` },
              ];
              /* ── Row 2: Frontend ── */
              const row2 = [
                { label: 'React', logo: `${D}/react/react-original.svg` },
                { label: 'Next.js', logo: `${D}/nextjs/nextjs-original.svg`, invert: true },
                { label: 'HTML5', logo: `${D}/html5/html5-original.svg` },
                { label: 'CSS3', logo: `${D}/css3/css3-original.svg` },
                { label: 'Tailwind', logo: `${D}/tailwindcss/tailwindcss-original.svg` },
                { label: 'Bootstrap', logo: `${D}/bootstrap/bootstrap-original.svg` },
              ];
              /* ── Row 3: Backend ── */
              const row3 = [
                { label: 'Node.js', logo: `${D}/nodejs/nodejs-original.svg` },
                { label: 'Express.js', logo: `${D}/express/express-original.svg`, invert: true },
                { label: 'REST APIs', logo: `${D}/swagger/swagger-original.svg` },
                { label: 'Python', logo: `${D}/python/python-original.svg` },
                { label: 'Node.js', logo: `${D}/nodejs/nodejs-original.svg` },
                { label: 'Express.js', logo: `${D}/express/express-original.svg`, invert: true },
              ];
              /* ── Row 4: Databases & Tools ── */
              const row4 = [
                { label: 'MongoDB', logo: `${D}/mongodb/mongodb-original.svg` },
                { label: 'PostgreSQL', logo: `${D}/postgresql/postgresql-original.svg` },
                { label: 'MySQL/SQL', logo: `${D}/mysql/mysql-original.svg` },
                { label: 'Docker', logo: `${D}/docker/docker-original.svg` },
                { label: 'Git', logo: `${D}/git/git-original.svg` },
                { label: 'GitHub', logo: `${D}/github/github-original.svg`, invert: true },
                { label: 'Vercel', logo: `${D}/vercel/vercel-original.svg`, invert: true },
                { label: 'Render', logo: 'https://avatars.githubusercontent.com/u/36424661?s=64&v=4' },
                { label: 'Postman', logo: `${D}/postman/postman-original.svg` },
              ];
              const loop = (arr) => [...arr, ...arr, ...arr]; // triple for short rows so marquee stays filled
              const Pill = ({ skill }) => (
                <span className="marquee-pill">
                  <img
                    src={skill.logo}
                    alt={skill.label}
                    className="w-5 h-5 object-contain flex-shrink-0 rounded-sm"
                    style={skill.invert ? { filter: 'invert(1) brightness(2)' } : {}}
                    loading="lazy"
                  />
                  {skill.label}
                </span>
              );
              return (
                <div className="w-full h-fit flex flex-col justify-center gap-2.5 py-2">
                  {/* Row 1 — Languages (slowest) */}
                  <div className="marquee-wrapper">
                    <div className="marquee-track marquee-track--slow">
                      {loop(row1).map((skill, i) => <Pill key={i} skill={skill} />)}
                    </div>
                  </div>
                  {/* Row 2 — Frontend */}
                  <div className="marquee-wrapper">
                    <div className="marquee-track marquee-track--mid">
                      {loop(row2).map((skill, i) => <Pill key={i} skill={skill} />)}
                    </div>
                  </div>
                  {/* Row 3 — Backend */}
                  <div className="marquee-wrapper">
                    <div className="marquee-track marquee-track--fast">
                      {loop(row3).map((skill, i) => <Pill key={i} skill={skill} />)}
                    </div>
                  </div>
                  {/* Row 4 — Databases & Tools (fastest) */}
                  <div className="marquee-wrapper">
                    <div className="marquee-track marquee-track--xfast">
                      {loop(row4).map((skill, i) => <Pill key={i} skill={skill} />)}
                    </div>
                  </div>
                </div>
              );
            })()}
            <div>
              <p className="grid-subtext">
                Proficient in <span className="text-white font-medium">Java, JavaScript, TypeScript, C &amp; Python</span> for problem-solving and application development.
                On the frontend I build with <span className="text-white font-medium">React, Next.js, HTML5, CSS3, Tailwind CSS &amp; Bootstrap</span>.
                Server-side I use <span className="text-white font-medium">Node.js &amp; Express.js</span>, backed by databases like <span className="text-white font-medium">MongoDB, PostgreSQL &amp; MySQL</span>,
                and deploy using <span className="text-white font-medium">Docker, Git, GitHub, Vercel, Render &amp; Postman</span>.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <div className="copy-container" onClick={handleCopy}>
                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" className="flex-shrink-0" />
                <p className="text-sm sm:text-base lg:text-lg font-medium text-gray_gradient text-white whitespace-nowrap overflow-hidden text-ellipsis">
                  vadirajjoshi22504@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;