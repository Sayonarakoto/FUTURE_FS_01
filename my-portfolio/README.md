# A B Najeeb Rahman - Portfolio

A modern, editorial-style personal portfolio built with React 19, Vite, and GSAP. This project showcases a clean, paper-textured aesthetic with subtle ink-reveal animations and a focus on professional detail.

## 🚀 Key Features

- **Editorial Design:** A "Digital Stationery" aesthetic using custom SVG noise textures and premium grid overlays.
- **Fluid Motion:** 
  - **GSAP:** Precise "Ink-Stroke" reveal animations for the hero section.
  - **Framer Motion:** Smooth scroll-triggered entry animations for all sections.
  - **Lenis:** Integrated smooth scrolling for a refined user experience.
- **Custom Typography:** 
  - Local `@font-face` integration for the unique `MyBrush` title font.
  - Paired with Google Fonts (Shippori Mincho, Noto Sans JP).
- **Responsive & Accessible:** Fully responsive layout with horizontal-first typography and motion-reduction support.
- **Modern Stack:** Built on React 19 and Vite 8 for blazing-fast development and optimized production builds.

## 🛠️ Tech Stack

- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS 4, Vanilla CSS
- **Animation:** GSAP, Framer Motion
- **Icons:** Lucide React
- **Smooth Scroll:** Lenis

## 📦 Project Structure

```text
src/
├── assets/          # Static assets (Images, Fonts, PDF)
│   └── fonts/       # Local MyBrush font files
├── components/      # UI Components
│   ├── sections/    # Page sections (Hero, About, Projects, Contact)
│   ├── Navbar.jsx   # Interactive navigation
│   └── ...
├── constants/       # Configuration & Data (Navigation links)
├── index.css        # Global styles & Tailwind configuration
└── App.jsx          # Root application component
```

## ⚙️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm or yarn

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd my-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 🏗️ Deployment

### Production Build
To create an optimized production build:
```bash
npm run build
```
The output will be generated in the `dist/` directory.

### Deploying to Vercel/Netlify
1. Connect your repository to Vercel or Netlify.
2. Set the **Build Command** to `npm run build`.
3. Set the **Output Directory** to `dist`.
4. Deploy!

### Deploying to GitHub Pages
1. Install the `gh-pages` package: `npm install -D gh-pages`.
2. Update `vite.config.js` with your repository base path: `base: '/your-repo-name/'`.
3. Add deployment scripts to `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
4. Run `npm run deploy`.

---
Built by **A B Najeeb Rahman**
