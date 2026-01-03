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
    title: 'Quick AI - All-in-One AI Assistant',
    desc: 'Quick AI is a comprehensive AI-powered platform that brings multiple AI tools under one roof. Features include AI article writing, blog title generation, AI image generation, intelligent background removal, object removal from images, and resume review - all powered by cutting-edge OpenAI API and Cloudinary technologies.',
    subdesc:
      'Built as a full-stack application with React 19, Vite, TailwindCSS, Node.js, Express, and integrated with Clerk authentication, OpenAI API, Cloudinary for image processing, and Neon PostgreSQL database for optimal performance and scalability.',
    href: 'https://quick-ai-gray.vercel.app/',
    texture: '/textures/project/quick AI.mp4',
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
    title: 'Clean Street - Smart Civic Issue Management',
    desc: 'Clean Street is a comprehensive civic engagement platform that empowers citizens to report, track, and manage street cleanliness and infrastructure issues. Features include complaint submission with geolocation mapping, image uploads, priority-based issue tracking, volunteer assignment system, upvote/downvote mechanism, real-time status updates, admin dashboard with analytics, and community commenting - all built to streamline urban maintenance and civic participation.',
    subdesc: 'Built as a full-stack application with React 19, Vite, TailwindCSS, Node.js, Express, and integrated with JWT authentication, Cloudinary for image processing, MongoDB with geospatial indexing, Leaflet for interactive maps. Developed as part of Infosys Springboard Virtual Internship 6.0.',
    href: 'https://clean-street.vercel.app/',
    texture: '/textures/project/clean_street.mp4',
    logo: '/assets/cleanStreet.png',
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
    title: 'SafePass - Password Security Suite',
    desc: 'SafePass is a professional password management application designed to secure your digital life. Features include a cryptographic password generator, breach checker powered by Have I Been Pwned, and a secure vault for managing credentials - all protected by robust JWT authentication and MongoDB.',
    subdesc:
      'Built as a full-stack application with React 19, Vite, TailwindCSS 4, Node.js, Express, and MongoDB. Includes secure password hashing with bcrypt, JWT-based protected routes, and a modern dark-themed UI for an optimal user experience.',
    href: 'https://safepass-ewqi.onrender.com/',
    texture: '/textures/project/project5.mp4',
    logo: '/assets/safepass.png',
    logoStyle: {
      backgroundColor: '#0f172a', // Slate-900 for a security/dark theme vibe
      border: '0.2px solid #3b82f6', // Blue border
      boxShadow: '0px 0px 60px 0px rgba(59, 130, 246, 0.3)', // Blue glow
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
        path: '/assets/express.png', // Assuming asset exists or following pattern
      },
      {
        id: 5,
        name: 'MongoDB',
        path: '/assets/mongodb.png', // Assuming asset exists or following pattern
      },
    ],
},

  {
  title: 'K72 - Modern Portfolio & Design Studio Clone',
  desc: 'K72 is a cutting-edge portfolio and design studio platform showcasing creative work through immersive visual experiences. Features include smooth scroll animations with GSAP, dynamic project galleries with hover interactions, responsive grid layouts, image preloading for seamless transitions, custom typography with Lausanne font family, mobile-optimized navigation, parallax effects, and an elegant minimalist design system - all crafted to deliver a premium browsing experience that highlights creative excellence.',
  subdesc: 'Built with React 19, Vite for lightning-fast builds, GSAP with ScrollTrigger for advanced animations, TailwindCSS for utility-first styling, and optimized asset delivery. Implements modern web performance techniques including lazy loading, code splitting, and responsive image optimization for exceptional user experience across all devices.',
  href: 'https://k72-project-3ig8.onrender.com/',
  texture: '/textures/project/project4.mp4',
  logo: '/assets/K72.png',
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
    deskScale: isSmall ? 0.55 : isMobile ? 0.5 : 1.13,
    deskPosition: isMobile ? [1, -2.0, 0] : [1.5, -3.2, 0],
    cubePosition: isSmall ? [6, -5, 0] : isMobile ? [7, -5, 0] : isTablet ? [8, -5, 0] : [14, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12.5, 4, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-25, 10, 0],
    targetPosition: isSmall ? [-7, -10, -10] : isMobile ? [-11, -10, -10] : isTablet ? [-13, -7, -10] : [-22, -10, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'Infosys Springboard',
    pos: 'Full Stack Development Intern',
    duration: 'September 2025 - November 2025',
    title: "Developed CleanStreet a full-stack MERN application for real-time street cleanliness reporting with geo-tagged complaints, location-based volunteer assignment, and admin analytics. Built with React, Vite, Node.js, Express, MongoDB, Tailwind CSS, and Leaflet Maps using Agile methodology over 8 weeks.",
    icon: '/assets/infosys_springboard_logo.jpg',
    animation: 'victory',
  },
{
  id: 2,
    name: 'Edunet Foundation',
      pos: 'AI Azure intern',
        duration: 'Augest 2025 - September 2025',
          title: "Successfully completed a 4-week internship on AI Azure under a Microsoft initiative implemented by Edunet Foundation in collaboration with AICTE.",
            icon: '/assets/edunetfoundation_logo.jpg',
              animation: 'clapping',
  },

];