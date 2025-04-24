# Game Stats

A lightweight single-page web application that displays the game's leaderboard and market data. Built with React, TypeScript, and Material-UI.

## Features

- Live leaderboard with player rankings, levels, XP, and gold
- Market items display with details and costs
- Offline support via Service Worker
- Responsive design for all screen sizes
- Automatic data refresh every 30 seconds
- Dark mode UI

## Getting Started

### Prerequisites

- Node.js 14.0 or later
- npm 6.0 or later

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd game-stats
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Technical Details

- Built with Vite for fast development and optimized production builds
- Uses TypeScript for type safety
- Material-UI components for a modern, responsive UI
- Service Worker for offline support
- Optimized bundle size with code splitting
- PWA-ready with manifest.json

## API Endpoints

The application uses the following API endpoints:

- Leaderboard: `https://api-game.bloque.app/game/leaderboard`
- Market: `https://api-game.bloque.app/game/market`



## Testing

This project uses Jest and React Testing Library for testing. The test suite covers all major functionality of the application.

### Test Coverage

The test suite includes tests for:

1. **Loading State**
   - Verifies that the loading spinner is displayed during initial data fetch
   - Ensures proper loading state management

2. **Error Handling**
   - Tests error state display when API calls fail
   - Verifies error message rendering
   - Ensures proper error state management

3. **Leaderboard Data Display**
   - Tests rendering of player data
   - Verifies correct display of:
     - Player rank
     - Username
     - Level
     - XP
     - Gold

4. **Market Data Display**
   - Tests rendering of market items
   - Verifies correct display of:
     - Item name
     - Item type
     - Description
     - Cost

5. **Tab Navigation**
   - Tests switching between Leaderboard and Market tabs
   - Verifies correct data display for each tab
   - Ensures proper tab state management

6. **Data Refresh**
   - Tests automatic data refresh every 30 seconds
   - Verifies API calls are made at correct intervals
   - Ensures proper cleanup of intervals

### Running Tests

To run the tests:

```bash
npm test
```

To run tests in watch mode (useful during development):

```bash
npm run test:watch
```

### Test Structure

Tests are organized using Jest's test structure:
- `describe` blocks for grouping related tests
- `it` blocks for individual test cases
- `beforeEach` for test setup
- `async/await` for handling asynchronous operations
- `waitFor` for testing asynchronous UI updates

### Mocking

The test suite uses Jest's mocking capabilities to:
- Mock API calls
- Simulate different response scenarios
- Test error conditions
- Control timing for refresh tests 