export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '#home',
  },
  {
    id: 2,
    name: 'About',
    href: '#about',
  },
  {
    id: 3,
    name: 'Work',
    href: '#work',
  },
  {
    id: 4,
    name: 'Projects',
    href: '#projects',
  },
  {
    id: 5,
    name: 'Contact',
    href: '#contact',
  },
];

export const clientReviews = [
  {
    id: 1,
    name: 'Emily Johnson',
    position: 'Marketing Director at GreenLeaf',
    img: 'assets/review1.png',
    review:
      'Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
  },
  {
    id: 2,
    name: 'Mark Rogers',
    position: 'Founder of TechGear Shop',
    img: 'assets/review2.png',
    review:
      'Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.',
  },
  {
    id: 3,
    name: 'John Dohsas',
    position: 'Project Manager at UrbanTech ',
    img: 'assets/review3.png',
    review:
      'I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.',
  },
  {
    id: 4,
    name: 'Ether Smith',
    position: 'CEO of BrightStar Enterprises',
    img: 'assets/review4.png',
    review:
      'Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
  },
];

export const myProjects = [
  {
    title: 'CivicFix - Digitizing Municipal Services for Smart Cities',
    desc: 'Residents had no efficient way to report potholes, garbage, or broken infrastructure to their municipality. CleanStreet gives citizens a geo-tagged complaint system with image uploads, priority tracking, volunteer assignment, upvoting, real-time status updates, and an admin dashboard with analytics — turning passive complaints into actionable civic workflows.',
    subdesc: 'Built with React 19, Vite, Tailwind CSS, Node.js, Express, MongoDB with geospatial indexing, JWT authentication, Cloudinary for image uploads, and Leaflet for interactive maps. Developed during an 8-week Infosys Springboard Virtual Internship using Agile sprints.',
    href: 'https://civicfix-three.vercel.app/',
    texture: 'https://res.cloudinary.com/dchtvtkhi/video/upload/v1786899010/CivicFix_ac5txt.mp4',
    logo: '/assets/civicfix.png',
    logoStyle: {
      backgroundColor: '#0f172a',
      border: '0.2px solid #1e293b',
      boxShadow: '0px 0px 60px 0px rgba(34, 197, 94, 0.3)',
    },
    spotlight: '/assets/spotlight2.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: '/assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'Node.js',
        path: '/assets/nodejs.png',
      },
      {
        id: 4,
        name: 'MongoDB',
        path: '/assets/mongodb.png',
      },
      {
        id: 5,
        name: 'Cloudinary',
        path: '/assets/cloudinary.png',
      },
    ],
  },
  {
    title: 'LaTexume — LaTeX-Powered ATS Resume Builder',
    desc: 'Professional resume builder leveraging LaTeX to create ATS-optimized resumes using Jake\'s Resume template — the industry standard trusted by engineers at Google, Meta, Amazon, and Microsoft. Zero LaTeX knowledge required.',
    subdesc: 'Full-stack application built with React 18, Vite 5, Tailwind CSS 3, Node.js, and Express. Features instant PDF generation, clickable links, and publication-quality typography through LaTeX compilation.',
    href: 'https://latexume.vercel.app/',
    texture: 'https://res.cloudinary.com/dchtvtkhi/video/upload/v1786899007/laTexume_wvsc8t.mp4',
    logo: '/assets/latexume.svg',
    logoStyle: {
      backgroundColor: '#000000',
      border: '0.2px solid #A6FF5D',
      boxShadow: '0px 0px 60px 0px rgba(166, 255, 93, 0.3)',
    },
    spotlight: '/assets/spotlight3.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: '/assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'Node.js',
        path: '/assets/nodejs.png',
      },
      {
        id: 4,
        name: 'Express.js',
        path: '/assets/express.png',
      },
      {
        id: 5,
        name: 'LaTeX',
        path: '/assets/latex.jpg',
      },
    ],
  },
  {
    title: 'SafePass — Password Security Suite',
    desc: 'Weak and reused passwords remain one of the biggest security risks online. SafePass combines a cryptographic password generator, a breach checker powered by the Have I Been Pwned API, and a secure credential vault — giving users one place to strengthen and manage their passwords.',
    subdesc:
      'Full-stack MERN app with React 19, Vite, Tailwind CSS 4, Node.js, Express, and MongoDB. Implements bcrypt password hashing, JWT-based route protection, and a polished dark-themed UI.',
    href: 'https://safepass-ewqi.onrender.com/',
    texture: 'https://res.cloudinary.com/dchtvtkhi/video/upload/v1786899052/Safepass_brjtpk.mp4',
    logo: '/assets/safepass_favicon.png',
    logoStyle: {
      backgroundColor: '#0f172a',
      border: '0.2px solid #3b82f6',
      boxShadow: '0px 0px 60px 0px rgba(59, 130, 246, 0.3)',
    },
    spotlight: '/assets/spotlight2.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: '/assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'Node.js',
        path: '/assets/nodejs.png',
      },
      {
        id: 4,
        name: 'Express.js',
        path: '/assets/express.png',
      },
      {
        id: 5,
        name: 'MongoDB',
        path: '/assets/mongodb.png',
      },
    ],
  },
  {
    title: 'Quick AI — All-in-One AI Assistant',
    desc: 'Most AI tools live in separate apps. Quick AI consolidates six AI-powered features — article writing, blog title generation, image generation, background removal, object removal, and resume review — into a single platform so users have one login and one workflow.',
    subdesc:
      'Full-stack app built with React 19, Vite, Tailwind CSS, Node.js, and Express. Integrated OpenAI API for text generation, Cloudinary for server-side image processing, Clerk for authentication, and Neon PostgreSQL for persistent storage. Deployed on Vercel (frontend) and Render (API).',
    href: 'https://quick-ai-gray.vercel.app/',
    texture: 'https://res.cloudinary.com/dchtvtkhi/video/upload/v1786899007/Quick_AI_uftoda.mp4',
    logo: '/assets/quickAI.svg',
    logoStyle: {
      backgroundColor: '#1a1a2e',
      border: '0.2px solid #16213e',
      boxShadow: '0px 0px 60px 0px rgba(59, 130, 246, 0.3)',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: '/assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'Node.js',
        path: '/assets/nodejs.png',
      },
      {
        id: 4,
        name: 'Gemini',
        path: '/assets/gemini.jpeg',
      },
      {
        id: 5,
        name: 'Clipdrop',
        path: '/assets/clipdrop.png',
      },
    ],
  },
  {
    title: 'K72 — Design Studio Portfolio Clone',
    desc: 'A high-fidelity recreation of the K72 design studio website, focused on performance-driven animations and immersive visual storytelling. Includes scroll-triggered GSAP animations, parallax effects, dynamic project galleries with hover interactions, responsive grid layouts, and image preloading for seamless transitions.',
    subdesc: 'Built with React 19, Vite, GSAP with ScrollTrigger, and Tailwind CSS. Uses lazy loading, code splitting, responsive image optimization, and custom typography with Lausanne font family to deliver a premium browsing experience across all devices.',
    href: 'https://k72-project-3ig8.onrender.com/',
    texture: 'https://res.cloudinary.com/dchtvtkhi/video/upload/v1786899019/k72_u3gydj.mp4',
    logo: '/assets/project-logo5.png',
    logoStyle: {
      backgroundColor: '#000000',
      border: '0.2px solid #333333',
      boxShadow: '0px 0px 60px 0px rgba(255, 255, 255, 0.15)',
    },
    spotlight: '/assets/spotlight4.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'Vite',
        path: '/assets/vite.svg',
      },
      {
        id: 3,
        name: 'GSAP',
        path: '/assets/gsap.jpg',
      },
      {
        id: 4,
        name: 'TailwindCSS',
        path: '/assets/tailwindcss.png',
      },
    ],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.85 : isMobile ? 0.65 : 1.28,
    deskPosition: isMobile ? [1, -2.5, 0] : [1.5, -3.6, 0],
    cubePosition: isSmall ? [3, -5, 0] : isMobile ? [7, -5, 0] : isTablet ? [8, -5, 0] : [14, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12.5, 4, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-25, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-11, -10, -10] : isTablet ? [-13, -7, -10] : [-22, -10, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'Invicto',
    pos: 'Backend and Automation Intern',
    duration: 'May 2026 - Present',
    title: "Developing scalable web scraping and automation scripts utilizing JavaScript and Puppeteer to streamline internal processes. Building secure REST APIs using Node.js and Express to handle seamless data integration. Designing responsive front-end interfaces with HTML and CSS to clearly display extracted data and required automation results.",
    icon: '/assets/invicto.png',
    animation: 'clapping',
  },
  {
    id: 2,
    name: 'Infosys Springboard',
    pos: 'Full Stack Development Intern',
    duration: 'September 2025 - November 2025',
    title: "Built CleanStreet, a full-stack MERN application for real-time civic issue reporting. Implemented geo-tagged complaint submission, location-based volunteer assignment, priority-based tracking, and an admin analytics dashboard. Stack: React, Vite, Node.js, Express, MongoDB, Tailwind CSS, and Leaflet Maps. Followed Agile sprints over 8 weeks.",
    icon: '/assets/infosys_springboard_logo.jpg',
    animation: 'victory',
  },

];