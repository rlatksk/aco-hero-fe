# ACO Hero Optimizer

A modern web application that optimizes Dota 2 team compositions using Ant Colony Optimization (ACO) metaheuristic algorithm. Find the best hero combinations to counter enemy teams and maximize your winning potential.

![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat-square&logo=tailwind-css)

## 🎮 Features

- **Smart Hero Selection**: Recommendations based on team synergy and counter picks
- **Ant Colony Optimization**: Solves team composition as a 0/1 Knapsack Problem using metaheuristic algorithms
- **Real-time Analysis**: Get detailed breakdowns of hero contributions and synergies
- **Flexible Configuration**: Customize ACO parameters (ants, iterations, alpha, beta, evaporation rate)
- **Ban Phase Support**: Account for banned heroes in your draft strategy
- **Enemy Team Tracking**: Input enemy picks for optimal counter-picking
- **Role-based Selection**: Organize heroes by positions (Safelane, Midlane, Offlane, Supports)
- **Performance Metrics**: View execution time, solutions explored, and search space statistics
- **Minimalistic UI**: Clean, modern interface inspired by Stratz with dark mode

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rlatksk/aco-hero-fe.git
cd aco-hero-fe
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety

### State Management
- **Zustand** - Lightweight state management
- **TanStack Query** - Server state management and caching

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Headless component primitives
- **Lucide React** - Icon library
- **class-variance-authority** - Component variants
- **tw-animate-css** - Tailwind animations

### UI Components
- **cmdk** - Command menu/combobox
- **Custom Components** - Built with Radix UI primitives

## 📁 Project Structure

```
aco-hero-fe/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   └── about/             # About page
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── banned-list.tsx    # Banned heroes section
│   │   ├── team-sections.tsx  # Your team configuration
│   │   ├── enemy-heroes-section.tsx
│   │   ├── optimize-button.tsx
│   │   ├── solution-section.tsx
│   │   ├── configuration-panel.tsx
│   │   ├── floating-config-panel.tsx
│   │   └── navbar.tsx
│   ├── store/
│   │   └── app-store.ts       # Zustand store
│   ├── hooks/
│   │   └── use-heroes.ts      # React Query hooks
│   ├── lib/
│   │   ├── api.ts             # API client
│   │   └── utils.ts           # Utility functions
│   ├── types/
│   │   └── heroes.ts          # TypeScript types
│   └── data/
│       └── heroes.ts          # Hero data
├── public/                    # Static assets
└── package.json
```

## 🎯 How It Works

### Ant Colony Optimization Algorithm

The app treats team composition as a **0/1 Knapsack Problem**:
- **Items**: Available heroes
- **Weight**: Hero pick constraints (5 heroes max)
- **Value**: Hero synergy, counter-pick value, and win rates

**ACO Process**:
1. Virtual "ants" explore different hero combinations
2. Ants deposit pheromones on successful solutions
3. Stronger pheromones guide future ants to better combinations
4. Algorithm balances exploration (trying new combos) vs exploitation (refining good ones)

### Key Parameters

- **Alpha (α)**: Pheromone importance (higher = follow successful paths more)
- **Beta (β)**: Heuristic importance (higher = prioritize immediate value)
- **Evaporation Rate**: How quickly old solutions fade
- **Number of Ants**: Parallel solutions explored
- **Iterations**: How many generations of optimization

## 📊 Features in Detail

### Hero Selection
- Search and select heroes with portraits
- Filter by availability (excludes banned/picked heroes)
- Assign heroes to specific roles
- Visual badges for selected heroes

### Team Optimization
1. **Input Phase**: Add your team, enemy team, and banned heroes
2. **Configuration**: Adjust ACO parameters (optional)
3. **Optimization**: Click "Optimize Team" to run the algorithm
4. **Results**: View recommended picks with detailed analysis

### Analysis Breakdown
- Position win rates
- Team synergy scores
- Internal synergy values
- Counter-pick effectiveness
- Total contribution scores

### Performance Tracking
- Execution time
- Solutions explored
- Search space size
- Optimization mode

## 🎨 Design Philosophy

The UI follows a **minimalistic, monochrome design** inspired by Stratz:
- Clean dark theme (`#0d1117` background)
- Subtle borders and hover states
- Flat design (no glass effects)
- Blue accent color (`#58a6ff`) for primary actions
- Consistent spacing and typography

## 🔧 Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🌐 Deployment

The app is deployed at: [https://aco.rlatksk.site](https://aco.rlatksk.site)

### Build for Production
```bash
npm run build
npm start
```

The app can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- AWS (EC2, ECS, Amplify)
- Docker containers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is created for educational and research purposes.

## 👤 Author

**rlatksk**

- Website: [rlatksk.site](https://rlatksk.site)
- GitHub: [@rlatksk](https://github.com/rlatksk)

## 🙏 Acknowledgments

- Dota 2 hero data and portraits from Valve Corporation
- Ant Colony Optimization algorithm research
- Open source community for amazing tools and libraries

## 📚 Additional Resources

- [Ant Colony Optimization](https://en.wikipedia.org/wiki/Ant_colony_optimization_algorithms)
- [0/1 Knapsack Problem](https://en.wikipedia.org/wiki/Knapsack_problem)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand State Management](https://zustand-demo.pmnd.rs/)

---