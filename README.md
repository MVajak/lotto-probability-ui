# Lotto Probability

A lottery probability analysis platform that provides statistical insights and predictions for lottery numbers across multiple games worldwide.

## Features

- **Frequency Analysis** - Track how often each number appears in lottery draws
- **Hot/Cold Meters** - Identify trending and dormant numbers
- **Trend Charts** - Visualize number patterns over time
- **Streak Statistics** - Current streaks, longest streaks, average days between appearances
- **Advanced Analytics** (Premium) - Markov chains, Monte Carlo simulations, pair analysis, seasonal patterns

### Supported Lotteries

| Region | Lotteries |
|--------|-----------|
| Estonia | Eurojackpot, Viking Lotto, Bingo, Keno, Jokker |
| United Kingdom | UK Lotto, EuroMillions, Thunderball, Set for Life |
| United States | Powerball, Mega Millions, Cash4Life |

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Package Manager**: pnpm (monorepo)
- **Routing**: TanStack Router
- **Data Fetching**: TanStack Query
- **State Management**: Zustand
- **Styling**: Tailwind CSS 4
- **Charts**: Nivo
- **Forms**: React Hook Form + Zod
- **Internationalization**: i18next
- **Linting & Formatting**: Biome

## Prerequisites

- Node.js 18+
- pnpm 10+

```bash
npm install -g pnpm
```

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Create environment file at `apps/lotto/.env`:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3001](http://localhost:3001)

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm storybook` | Run Storybook |
| `pnpm test` | Run tests |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm lint` | Check code quality with Biome |
| `pnpm lint:fix` | Fix linting issues |
| `pnpm format` | Format code |

## Project Structure

```
├── apps/
│   └── lotto/              # Main application
│       └── src/
│           ├── domains/    # Feature modules
│           │   ├── api/    # API client
│           │   ├── auth/   # Authentication
│           │   ├── lotto/  # Lottery analysis
│           │   └── subscription/
│           ├── layouts/    # Page layouts
│           └── routes/     # File-based routing
└── packages/
    ├── storybook/          # Component documentation
    └── ui/                 # Shared UI components
```