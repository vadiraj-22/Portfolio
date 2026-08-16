import { useState, useEffect, useRef } from 'react';

const FuturisticLoader = ({ progress = 0, onComplete }) => {
    const [displayProgress, setDisplayProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const canvasRef = useRef(null);

    const name = 'VADIRAJ JOSHI';
    const subtitle = 'FULL-STACK DEVELOPER';

    // Smooth progress interpolation
    useEffect(() => {
        const target = Math.min(progress, 100);
        const timer = setInterval(() => {
            setDisplayProgress((prev) => {
                if (prev >= target) {
                    clearInterval(timer);
                    return target;
                }
                const diff = target - prev;
                const increment = Math.max(0.8, diff * 0.1);
                return Math.min(prev + increment, target);
            });
        }, 16);
        return () => clearInterval(timer);
    }, [progress]);

    // Handle exit animation
    useEffect(() => {
        if (displayProgress >= 100) {
            const timer = setTimeout(() => {
                setIsExiting(true);
                setTimeout(() => onComplete?.(), 600);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [displayProgress, onComplete]);

    // Minimal ambient particle background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const particles = Array.from({ length: 25 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            speedY: -(Math.random() * 0.25 + 0.1),
            opacity: Math.random() * 0.35 + 0.1,
            pulse: Math.random() * Math.PI * 2,
        }));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.y += p.speedY;
                p.pulse += 0.02;

                if (p.y < -10) {
                    p.y = canvas.height + 10;
                    p.x = Math.random() * canvas.width;
                }

                const opacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
                ctx.fillStyle = `rgba(200, 200, 210, ${opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    const radius = 64;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (displayProgress / 100) * circumference;

    return (
        <div className={`fl-root ${isExiting ? 'fl-root--exit' : ''}`}>
            {/* Minimal ambient background */}
            <canvas ref={canvasRef} className="fl-canvas" />
            <div className="fl-ambient-glow" />

            <div className="fl-container">
                {/* Sleek SVG Progress Ring */}
                <div className="fl-ring-wrapper">
                    <svg width="160" height="160" viewBox="0 0 160 160" className="fl-ring-svg">
                        <defs>
                            <linearGradient id="flRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="100%" stopColor="#6b7280" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="80"
                            cy="80"
                            r={radius}
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.06)"
                            strokeWidth="2"
                        />
                        <circle
                            cx="80"
                            cy="80"
                            r={radius}
                            fill="none"
                            stroke="url(#flRingGrad)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            transform="rotate(-90 80 80)"
                            style={{ transition: 'stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                        />
                    </svg>
                    <div className="fl-ring-text">
                        <span className="fl-percent-num">{Math.round(displayProgress)}</span>
                        <span className="fl-percent-symbol">%</span>
                    </div>
                </div>

                {/* Minimal Header */}
                <div className="fl-title-box">
                    <h1 className="fl-name">{name}</h1>
                    <p className="fl-subtitle">{subtitle}</p>
                </div>

                {/* Minimal Progress Line & Status */}
                <div className="fl-bar-box">
                    <div className="fl-bar-track">
                        <div
                            className="fl-bar-fill"
                            style={{ width: `${displayProgress}%` }}
                        />
                    </div>
                    <p className="fl-status">
                        {displayProgress < 40
                            ? 'INITIALIZING'
                            : displayProgress < 85
                            ? 'LOADING EXPERIENCES'
                            : displayProgress < 100
                            ? 'FINALIZING'
                            : 'READY'}
                        <span className="fl-cursor">_</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FuturisticLoader;
