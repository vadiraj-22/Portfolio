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
  texture: '/textures/project/project1.mp4',
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
  title: 'PassOp - Secure Password Manager',
  desc: 'PassOp is a modern and secure password management application that simplifies the way you store and manage your credentials. Built with security and user experience in mind, it provides a seamless interface for storing website URLs, usernames, and passwords with local storage encryption.',
  subdesc:
    'With PassOp, users can securely manage all their passwords in one place, featuring instant copy-to-clipboard functionality, password visibility toggles, and a beautiful modern UI. Built with React and TailwindCSS for optimal performance and responsiveness.',
  href: 'https://passop-1x5a.onrender.com',
  texture: '/textures/project/project2.mp4', 
  logo: '/assets/key.png', 
  logoStyle: {
    backgroundColor: '#052e16',
    border: '0.2px solid #166534',
    boxShadow: '0px 0px 60px 0px #22c55e4D',
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

  ],
},
  {
    title: 'CarePulse - Health Management System',
    desc: 'An innovative healthcare platform designed to streamline essential medical processes. It simplifies patient registration, appointment scheduling, and medical record management, providing a seamless experience for both healthcare providers and patients.',
    subdesc:
      'With a focus on efficiency, CarePulse integrantes complex forms and SMS notifications, by using Next.js, Appwrite, Twillio and Sentry that enhance operational workflows.',
    href: 'https://www.youtube.com/watch?v=lEflo_sc82g',
    texture: '/textures/project/project3.mp4',
    logo: '/assets/project-logo3.png',
    logoStyle: {
      backgroundColor: '#60f5a1',
      background:
        'linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)',
      border: '0.2px solid rgba(208, 213, 221, 1)',
      boxShadow: '0px 0px 60px 0px rgba(35, 131, 96, 0.3)',
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
        name: 'TypeScript',
        path: '/assets/typescript.png',
      },
      {
        id: 4,
        name: 'Framer Motion',
        path: '/assets/framer.png',
      },
    ],
  },
  {
    title: 'Horizon - Online Banking Platform',
    desc: 'Horizon is a comprehensive online banking platform that offers users a centralized finance management dashboard. It allows users to connect multiple bank accounts, monitor real-time transactions, and seamlessly transfer money to other users.',
    subdesc:
      'Built with Next.js 14 Appwrite, Dwolla and Plaid, Horizon ensures a smooth and secure banking experience, tailored to meet the needs of modern consumers.',
    href: 'https://www.youtube.com/watch?v=PuOVqP_cjkE',
    texture: '/textures/project/project4.mp4',
    logo: '/assets/project-logo4.png',
    logoStyle: {
      backgroundColor: '#0E1F38',
      border: '0.2px solid #0E2D58',
      boxShadow: '0px 0px 60px 0px #2F67B64D',
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
        name: 'TailwindCSS',
        path: '/assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/assets/typescript.png',
      },
      {
        id: 4,
        name: 'Framer Motion',
        path: '/assets/framer.png',
      },
    ],
  },
  {
    title: 'Imaginify - AI Photo Manipulation App',
    desc: 'Imaginify is a groundbreaking Software-as-a-Service application that empowers users to create stunning photo manipulations using AI technology. With features like AI-driven image editing, a payments system, and a credits-based model.',
    subdesc:
      'Built with Next.js 14, Cloudinary AI, Clerk, and Stripe, Imaginify combines cutting-edge technology with a user-centric approach. It can be turned into a side income or even a full-fledged business.',
    href: 'https://www.youtube.com/watch?v=Ahwoks_dawU',
    texture: '/textures/project/project5.mp4',
    logo: '/assets/project-logo5.png',
    logoStyle: {
      backgroundColor: '#1C1A43',
      border: '0.2px solid #252262',
      boxShadow: '0px 0px 60px 0px #635BFF4D',
    },
    spotlight: '/assets/spotlight5.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/assets/typescript.png',
      },
      {
        id: 4,
        name: 'Framer Motion',
        path: '/assets/framer.png',
      },
    ],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -10, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'React',
    pos: 'Lead Web Developer',
    duration: '2025 - Present',
    title: "React is my primary framework for building dynamic and interactive user interfaces. I leverage its component-based architecture and hooks to create scalable, maintainable applications with seamless user experiences.",
    icon: '/assets/react.svg',
    animation: 'victory',
  },
  {
    id: 2,
    name: 'Express',
    pos: 'Backend Developer',
    duration: '2025 - Present',
    title: "Express serves as my go-to Node.js framework for building robust RESTful APIs and server-side applications. I use it to handle routing, middleware, and database integration efficiently for full-stack projects.",
    icon: '/assets/express.png',
    animation: 'clapping',
  },
  {
    id: 3,
    name: 'Tailwind CSS',
    pos: 'Frontend Developer',
    duration: '2025 - Present',
    title: "Tailwind CSS is my preferred utility-first CSS framework. I use it to rapidly build modern, responsive designs with consistent styling, enabling me to create beautiful interfaces without writing custom CSS.",
    icon: '/assets/tailwindcss.png',
    animation: 'salute',
  },
];