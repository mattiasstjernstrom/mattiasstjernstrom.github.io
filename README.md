# Mattias Stjernström - Portfolio (mehow.se)

This repository contains the source code for my personal portfolio website, [mehow.se](https://mehow.se).

It showcases my work as a **Digital Architect & AI Alchemist**, featuring a premium, high-tech aesthetic with interactive elements and a focus on both aesthetics and performance.

## ✨ Features

- **Dynamic Hero Section**: 
  - Custom "Tech Grid" background animation.
  - Interactive "Portal" effect with rising particles and smoke.
  - 3D-style platform with pulse animations.
- **Theme System**: 
  - Fully supported **Dark Mode** (default) and **Light Mode**.
  - Smooth transitions between themes.
  - Persistent preference using `localStorage`.
- **Animations**:
  - Scroll-triggered reveal animations.
  - Hover effects on cards and buttons.
  - Custom cursor interactions in the hero section.
  - "The AI Receptionist" chat simulation animation.
- **Responsive Design**: 
  - Fully optimized for mobile, tablet, and desktop.
  - Adaptive layouts for project cards and grids.
- **Custom Assets**:
  - Unique "Low Poly" and abstract visuals.
  - Custom noise texture overlay for a tactile feel.

## �️ Tech Stack

- **HTML5**: Semantic structure.
- **CSS3**: 
  - CSS Variables (Custom Properties) for theming.
  - Flexbox & Grid for layouts.
  - Keyframe animations for visual effects.
  - Modern features like `backdrop-filter`, `clamp()`, and gradients.
- **JavaScript (ES6+)**: 
  - `IntersectionObserver` for scroll animations.
  - DOM manipulation for theme toggling and particle generation.
  - No external frameworks (Vanilla JS) for maximum performance.

## 🚀 Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mattiasstjernstrom/mattiasstjernstrom.github.io.git
    cd mattiasstjernstrom.github.io
    ```

2.  **Open `index.html`** in your browser directly, or serve it using a local server (recommended for optimal asset loading):
    
    *Using Python:*
    ```bash
    python -m http.server 8000
    ```
    
    *Using Node/npx:*
    ```bash
    npx serve
    ```

3.  Visit `http://localhost:8000` (or the port shown in your terminal).

## 📂 Project Structure

- `index.html`: The main landing page containing all sections.
- `404.html`: Custom "Page Not Found" page styled to match the main site.
- `style.css`: Global styles, variables, standardizing, and animations.
- `script.js`: All interactive logic (theme, particles, scroll observers).
- `assets/`: Directory for images and static media.

## 🎨 Design Philosophy

The design aims to bridge the gap between "Raw Code" and "Human Experience". It uses a mix of:
- **Glassmorphism**: Translucent cards and navigation.
- **Neon & Glow**: Using Indigo (`#6366f1`), Cyan, and Pink (`#ec4899`) accents.
- **Motion**: Subtle, constant movement (smoke, grid, particles) to keep the interface feeling "alive".

---

© 2026 Mattias Stjernström. Built with Precision & Code.
