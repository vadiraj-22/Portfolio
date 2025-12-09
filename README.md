# 🚀 Vadiraj's Portfolio

A modern, interactive 3D portfolio website showcasing my projects, skills, and experience as a Full Stack Developer. Built with cutting-edge web technologies including React Three Fiber for immersive 3D experiences.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://portfolio-jk7i.onrender.com)
[![GitHub](https://img.shields.io/badge/github-vadiraj--22-blue)](https://github.com/vadiraj-22)

## ✨ Features

- **Interactive 3D Environment**: Immersive 3D scenes powered by Three.js and React Three Fiber
- **Smooth Animations**: GSAP-powered animations for seamless user experience
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Project Showcase**: Dynamic project gallery with detailed case studies
- **Contact Form**: Integrated EmailJS for direct communication
- **Modern UI/UX**: Clean, minimalist design with Tailwind CSS
- **Performance Optimized**: Fast loading times with Vite build tool

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React features and performance improvements
- **Vite** - Next-generation frontend tooling
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **GSAP** - Professional-grade animation library
- **Tailwind CSS** - Utility-first CSS framework

### Additional Libraries
- **EmailJS** - Email service integration
- **React Globe GL** - Interactive globe visualization
- **React Router DOM** - Client-side routing
- **Leva** - GUI controls for development

## 🎯 Sections

1. **Hero** - Eye-catching 3D introduction with animated elements
2. **About** - Personal introduction and tech stack
3. **Projects** - Showcase of featured projects including:
   - Quick AI - All-in-One AI Assistant
   - Clean Street - Smart Civic Issue Management
   - PassOp - Secure Password Manager
   - K72 - Modern Portfolio & Design Studio Clone
4. **Experience** - Professional work experience and internships
5. **Contact** - Get in touch form with EmailJS integration

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/vadiraj-22/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory and add your EmailJS credentials:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📦 Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── assets/          # Images and icons
│   ├── models/          # 3D models (.glb files)
│   └── textures/        # Textures and videos
├── src/
│   ├── components/      # Reusable React components
│   │   ├── HackerRoom.jsx
│   │   ├── Developer.jsx
│   │   ├── Cube.jsx
│   │   └── ...
│   ├── sections/        # Main page sections
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   └── Contact.jsx
│   ├── constants/       # Static data and configurations
│   ├── hooks/           # Custom React hooks
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── .env                 # Environment variables
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Key Components

- **HackerRoom**: 3D room environment with interactive elements
- **Developer**: Animated 3D character model
- **HeroCamera**: Dynamic camera controls for hero section
- **Cube & ReactLogo**: Animated 3D objects
- **DemoComputer**: Interactive computer model

## 🌟 Featured Projects

### Quick AI
All-in-One AI Assistant with article writing, image generation, and resume review powered by OpenAI API and Cloudinary.

### Clean Street
Smart civic issue management platform for reporting and tracking street cleanliness issues with geolocation mapping.

### PassOp
Secure password manager with local storage encryption and modern UI.

### K72
Modern portfolio clone with smooth scroll animations and immersive visual experiences.

## 📧 Contact

Feel free to reach out through the contact form on the website or connect with me on:

- **Portfolio**: [https://portfolio-jk7i.onrender.com](https://portfolio-jk7i.onrender.com)
- **GitHub**: [@vadiraj-22](https://github.com/vadiraj-22)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- 3D models and assets from various open-source resources
- Inspiration from modern portfolio designs
- React Three Fiber community for excellent documentation

---

Made with ❤️ by Vadiraj
