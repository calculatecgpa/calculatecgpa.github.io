# CalculateCGPA — Universal College CGPA & SGPA Calculator

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-calculatecgpa.github.io-0096c7?style=for-the-badge&logo=google-chrome&logoColor=white)](https://calculatecgpa.github.io/)
[![Built with Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![GitHub Pages CI/CD](https://img.shields.io/badge/Deploy-GitHub%20Pages-222222?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/calculatecgpa/calculatecgpa.github.io/actions)

<p align="center">
  <strong>A high-precision, zero-latency, 100% client-side GPA & CGPA calculation engine.</strong><br>
  Built with Astro 5 Islands, React 19, and Tailwind CSS for university, college, and high school students worldwide.
</p>

[**Explore Live Calculator »**](https://calculatecgpa.github.io/)

---

![CalculateCGPA Preview](https://res.cloudinary.com/dpx6w78bt/image/upload/f_auto/q_auto/v1786342039/Online_Tool_rc1ybr.png)

</div>

---

## 🌟 Key Highlights

- ⚡ **Zero-Latency Real-Time Math Engine**: Computes **SGPA** (Semester Grade Point Average) and **CGPA** (Cumulative Grade Point Average) dynamically as you type.
- 🔒 **100% Client-Side Privacy**: All mathematical computations run purely in your local browser sandbox via JavaScript. Zero server uploads, zero databases, and zero tracking.
- 🎓 **Universal Grading Scales**:
  - **Standard 4.0 Scale** (North America / International)
  - **4.3 Scale** (With A+ honors distinction)
  - **5.0 Scale** (Weighted / Specialized university frameworks)
  - **10.0 UGC Scale** (India / CBCS / AICTE grading systems)
  - **Custom Scale Editor**: Define custom letter grades and customized grade points for any institution worldwide.
- 📱 **Adaptive Cross-Device Responsiveness**: Fluid, mobile-first design with interactive touch-friendly cards on smartphones and rich tabular views on desktop/tablets.
- 🖨️ **Print & Export Ready**: 1-click **Copy Academic Summary** to clipboard and print-optimized academic report formatting.
- ✨ **Demo Data Mode**: Instant 1-click sample dataset generation for quick experimentation and verification.
- 🚀 **Modern Astro 5 Architecture**: Static Site Generation (SSG) with React client hydration islands (`client:load`) for lightning-fast First Contentful Paint (FCP) and near-zero cumulative layout shift (CLS).
- 🔍 **World-Class Technical SEO**: Complete Schema.org JSON-LD graph (`WebApplication`, `WebSite`, `Organization`, `BreadcrumbList`, and `FAQPage`), OpenGraph meta, Google image sitemap, and automated PWA manifest.

---

## 🧮 Mathematical Formulas & Logic

### 1. Semester Grade Point Average (SGPA)
SGPA measures your academic performance for a single academic term. It is calculated by dividing total quality points earned in that semester by total credit hours attempted:

$$\text{SGPA} = \frac{\sum_{i=1}^{n} (\text{Credit}_i \times \text{GradePoint}_i)}{\sum_{i=1}^{n} \text{Credit}_i}$$

> **Example:**  
> A 4-credit course with grade **A** ($4.0\text{ pts}$) = $16\text{ quality points}$.  
> A 3-credit course with grade **B** ($3.0\text{ pts}$) = $9\text{ quality points}$.  
> $$\text{SGPA} = \frac{16 + 9}{4 + 3} = \frac{25}{7} \approx 3.57$$

---

### 2. Cumulative Grade Point Average (CGPA)
CGPA represents your overall cumulative academic standing across all semesters combined:

$$\text{CGPA} = \frac{\sum_{\text{All Semesters}} \text{Quality Points}}{\sum_{\text{All Semesters}} \text{Credit Hours}} = \frac{\sum_{s=1}^{m} (\text{SGPA}_s \times \text{SemesterCredits}_s)}{\sum_{s=1}^{m} \text{SemesterCredits}_s}$$

> **Example:**  
> Semester 1: $20\text{ credits}$, $70.0\text{ quality points}$ ($\text{SGPA} = 3.50$)  
> Semester 2: $20\text{ credits}$, $80.0\text{ quality points}$ ($\text{SGPA} = 4.00$)  
> $$\text{CGPA} = \frac{70 + 80}{20 + 20} = \frac{150}{40} = 3.75$$

---

### 3. CGPA (10.0 Scale) to Percentage Conversion
For universities adhering to UGC, AICTE, or CBSE guidelines:

$$\text{Percentage } (\%) = \text{CGPA} \times 9.5$$

---

## 📊 Standard Grading Scale Reference

| Letter Grade | Standard 4.0 | 4.3 Scale | 10.0 UGC Scale | Typical % Range | Classification |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **A+** (Outstanding) | `4.0` | `4.3` | `10.0` | 90% – 100% | Distinction |
| **A** (Excellent) | `4.0` | `4.0` | `9.0` | 85% – 89% | Excellent |
| **A-** (Very Good) | `3.7` | `3.7` | `8.0` | 80% – 84% | Very Good |
| **B+** (Good) | `3.3` | `3.3` | `7.0` | 75% – 79% | Good |
| **B** (Above Average)| `3.0` | `3.0` | `6.0` | 70% – 74% | Above Average |
| **B-** | `2.7` | `2.7` | `—` | 65% – 69% | Average |
| **C+** (Average) | `2.3` | `2.3` | `5.0` | 60% – 64% | Satisfactory |
| **C** | `2.0` | `2.0` | `—` | 55% – 59% | Pass |
| **D** (Marginal Pass)| `1.0` | `1.0` | `4.0` | 50% – 54% | Marginal Pass |
| **F** (Fail) | `0.0` | `0.0` | `0.0` | < 50% | Fail |

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Core Framework** | [Astro 5](https://astro.build/) | Static Site Generation (SSG) with zero runtime overhead |
| **Component Engine** | [React 19](https://react.dev/) | React Islands architecture for interactive client-side calculator |
| **Styling & Theme** | [Tailwind CSS 3.4](https://tailwindcss.com/) | Mobile-first utility design with custom `#90e0ef` cyan brand palette |
| **Icons** | [Lucide React](https://lucide.dev/) | High-performance tree-shakeable vector icons |
| **Hosting & CI/CD** | [GitHub Pages](https://pages.github.com/) | Automated deployment via GitHub Actions (`withastro/action@v3`) |
| **Analytics** | [Google Analytics 4](https://analytics.google.com/) | Privacy-conscious, asynchronous `gtag.js` tracking |
| **Structured Data** | Schema.org JSON-LD | Comprehensive graph with 5 interconnected schema types |

---

## 📁 Repository Structure

```text
calculatecgpa.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── favicon.svg             # Application vector favicon
│   ├── robots.txt              # Search engine crawler directives
│   ├── sitemap.xml             # XML sitemap with Google image metadata
│   └── site.webmanifest        # Progressive Web App (PWA) manifest
├── src/
│   ├── components/
│   │   ├── CgpaCalculator.jsx  # Main interactive React calculator island
│   │   ├── GradeScaleModal.jsx # Grade scale selector & customization modal
│   │   └── TipModal.jsx        # Developer tip & support modal
│   ├── layouts/
│   │   └── Layout.astro        # Base HTML shell, SEO head, GA4 tag & navigation
│   └── pages/
│       └── index.astro         # Main landing page with JSON-LD schema & content
├── astro.config.mjs            # Astro configuration (static output, integrations)
├── package.json                # Project dependencies and npm scripts
├── tailwind.config.mjs         # Tailwind configuration & #90e0ef theme tokens
└── README.md                   # Project documentation
```

---

## 🚀 Quick Start & Local Development

### Prerequisites
- **Node.js**: `v18.17.0` or higher
- **npm** (or `pnpm` / `yarn`)

### 1. Clone the repository
```bash
git clone https://github.com/calculatecgpa/calculatecgpa.github.io.git
cd calculatecgpa.github.io
```

### 2. Install dependencies
```bash
npm install
```

### 3. Launch local development server
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser to inspect the application.

### 4. Build for production
```bash
npm run build
```
Generates production-ready static assets in the `dist/` directory.

### 5. Preview the production build
```bash
npm run preview
```

---

## 🚢 Continuous Deployment (CI/CD)

Deployments are fully automated via GitHub Actions:
- **Trigger**: Every push to the `main` branch.
- **Workflow File**: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
- **Engine**: Official `withastro/action@v3` + `actions/deploy-pages@v4`.
- **Live URL**: [https://calculatecgpa.github.io](https://calculatecgpa.github.io)

---

## 🤝 Contributing

Contributions, feedback, and feature suggestions are warmly welcomed!
1. **Fork** the repository.
2. **Create a branch**: `git checkout -b feature/amazing-feature`.
3. **Commit your changes**: `git commit -m "feat: add amazing feature"`.
4. **Push to branch**: `git push origin feature/amazing-feature`.
5. **Open a Pull Request**.

---

## ☕ Support the Developer

If this tool helped you manage your semesters or track your academic goals, consider supporting the continuous maintenance and hosting of the project:

[![Support on Gumroad](https://img.shields.io/badge/Support%20the%20Developer-Gumroad-ff90e8?style=for-the-badge&logo=gumroad&logoColor=black)](https://kisharadilshan.gumroad.com/coffee)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free for personal, academic, and commercial use.

<div align="center">
  <sub>Built with ❤️ for university students worldwide by <a href="https://github.com/calculatecgpa">CalculateCGPA</a></sub>
</div>
