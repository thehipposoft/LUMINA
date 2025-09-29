# 🌟 LUMINA - React + Next.js + GSAP Website

A modern, animated website built with React 19, Next.js 15, and GSAP (GreenSock Animation Platform).

## ✨ Features

- **React 19** with the latest hooks and concurrent features
- **Next.js 15** with Turbopack for blazing-fast development
- **GSAP Animations** including:
  - Scroll-triggered animations
  - Morphing SVG shapes
  - Typewriter effects
  - Magnetic hover effects
  - Staggered text animations
  - Floating particle systems
  - Parallax effects
- **Tailwind CSS 4** for modern styling
- **TypeScript** for type safety
- **Responsive Design** that works on all devices

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal) with your browser to see the result.

## 📁 Project Structure

```
LUMINA/
├── app/
│   ├── animations/          # Animation showcase page
│   │   └── page.tsx
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── AnimatedText.tsx    # Character-by-character text animation
│   └── MorphingShape.tsx   # SVG morphing animation
└── public/                 # Static assets
```

## 🎨 Animation Components

### AnimatedText
Animates text character by character with staggered timing:
```tsx
<AnimatedText
  text="Your animated text here"
  className="text-2xl"
  delay={0.5}
/>
```

### MorphingShape
Creates morphing SVG shapes with smooth transitions:
```tsx
<MorphingShape
  size={250}
  color="#A855F7"
  className="my-shape"
/>
```

## 🛠 Technologies Used

- **Frontend Framework**: Next.js 15
- **UI Library**: React 19
- **Animation Library**: GSAP
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Build Tool**: Turbopack

## 📄 Pages

- **Home (`/`)**: Landing page with hero section, features, and smooth animations
- **Animations (`/animations`)**: Showcase of various GSAP animation techniques

## 🎯 GSAP Features Demonstrated

1. **Timeline Animations**: Coordinated sequences of animations
2. **ScrollTrigger**: Animations triggered by scroll position
3. **Morphing**: SVG path morphing animations
4. **Magnetic Effects**: Mouse-following interactive elements
5. **Typewriter Effect**: Character-by-character text appearance
6. **Stagger Animations**: Sequential animations with delays
7. **Particle Systems**: Floating animated elements
8. **Parallax**: Depth-based scroll animations

## 🔧 Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🚀 Deploy

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

Built with ❤️ using React, Next.js, and GSAP
