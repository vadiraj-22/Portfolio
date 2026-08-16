import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Developer from '../components/Developer.jsx';
import CanvasLoader from '../components/Loading.jsx';
import { workExperiences } from '../constants/index.js';
import { useInView } from '../hooks/useInView.js';

const WorkExperience = () => {
  const [containerRef, isInView] = useInView();
  const [animationName, setAnimationName] = useState('idle');

  return (
    <section className="c-space my-20" id="work">
      <div className="w-full text-white-600">
        <h2 className="head-text">My Work Experience</h2>

        <div className="work-container">
          <div ref={containerRef} className="work-canvas relative hidden lg:block">
            <Canvas frameloop={isInView ? 'always' : 'never'} dpr={[1, 1.5]}>
              <ambientLight intensity={7} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <directionalLight position={[10, 10, 10]} intensity={1} />
              <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />

              <Suspense fallback={<CanvasLoader />}>
                <Developer position-y={-3} scale={3} animationName={animationName} />
              </Suspense>
            </Canvas>
            <div className='absolute bottom-4 left-0 right-0 flex justify-center'>
              <lord-icon
                src="https://cdn.lordicon.com/evxithfv.json"
                trigger="loop"
                colors="primary:#ffffff,secondary:#08a88a"
                style={{ width: '40px', height: '40px' }}>
              </lord-icon>
            </div>
          </div>

          <div className="work-content col-span-full lg:col-span-2">
            <div className="sm:py-10 py-5 sm:px-5 px-2.5">
              {workExperiences.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setAnimationName(item.animation.toLowerCase())}
                  onPointerOver={() => setAnimationName(item.animation.toLowerCase())}
                  onPointerOut={() => setAnimationName('idle')}
                  className="work-content_container group">
                  <div className="flex flex-col h-full justify-start items-center py-2">
                    <div className="work-content_logo">
                      <img className="w-full h-full object-contain" src={item.icon} alt={`${item.name} logo`} loading="lazy" />
                    </div>

                    <div className="work-content_bar" />
                  </div>

                  <div className="sm:p-5 px-2.5 py-5">
                    <h3 className="font-bold text-white-800 text-lg">{item.name}</h3>
                    <p className="text-sm mb-5 text-gray-400">
                      <span className="font-medium text-white-600">{item.pos}</span> — <time className="italic text-gray-400">{item.duration}</time>
                    </p>
                    <p className="group-hover:text-white transition-all ease-in-out duration-500 leading-relaxed">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;                                                      