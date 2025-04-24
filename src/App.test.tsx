import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { fetchLeaderboard, fetchMarket } from './services/api';

// Mock the API services
jest.mock('./services/api', () => ({
  fetchLeaderboard: jest.fn(),
  fetchMarket: jest.fn(),
}));

const mockLeaderboardData = {
  players: [
    { username: 'player1', rank: 1, level: 10, xp: 1000, gold: 500 },
    { username: 'player2', rank: 2, level: 9, xp: 900, gold: 450 },
  ],
};

const mockMarketData = {
  items: [
    { id: 1, name: 'Sword', type: 'Weapon', description: 'A sharp sword', cost: 100 },
    { id: 2, name: 'Shield', type: 'Armor', description: 'A sturdy shield', cost: 80 },
  ],
};

describe('App Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<App />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state when API calls fail', async () => {
    (fetchLeaderboard as jest.Mock).mockRejectedValue(new Error('API Error'));
    (fetchMarket as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Failed to fetch data. Please try again later.')).toBeInTheDocument();
    });
  });

  it('renders leaderboard data correctly', async () => {
    (fetchLeaderboard as jest.Mock).mockResolvedValue(mockLeaderboardData);
    (fetchMarket as jest.Mock).mockResolvedValue(mockMarketData);

    render(<App />);

    await waitFor(() => {
      // Check if leaderboard data is rendered
      expect(screen.getByText('player1')).toBeInTheDocument();
      expect(screen.getByText('player2')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('1000')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
    });
  });

  it('renders market data correctly', async () => {
    (fetchLeaderboard as jest.Mock).mockResolvedValue(mockLeaderboardData);
    (fetchMarket as jest.Mock).mockResolvedValue(mockMarketData);

    render(<App />);

    // Wait for initial data to load
    await waitFor(() => {
      expect(screen.getByText('player1')).toBeInTheDocument();
    });

    // Switch to Market tab
    fireEvent.click(screen.getByText('Market'));

    await waitFor(() => {
      // Check if market data is rendered
      expect(screen.getByText('Sword')).toBeInTheDocument();
      expect(screen.getByText('Shield')).toBeInTheDocument();
      expect(screen.getByText('Weapon')).toBeInTheDocument();
      expect(screen.getByText('Armor')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('80')).toBeInTheDocument();
    });
  });

  it('handles tab switching correctly', async () => {
    (fetchLeaderboard as jest.Mock).mockResolvedValue(mockLeaderboardData);
    (fetchMarket as jest.Mock).mockResolvedValue(mockMarketData);

    render(<App />);

    // Wait for initial data to load
    await waitFor(() => {
      expect(screen.getByText('player1')).toBeInTheDocument();
    });

    // Switch to Market tab
    fireEvent.click(screen.getByText('Market'));
    await waitFor(() => {
      expect(screen.getByText('Sword')).toBeInTheDocument();
    });

    // Switch back to Leaderboard tab
    fireEvent.click(screen.getByText('Leaderboard'));
    await waitFor(() => {
      expect(screen.getByText('player1')).toBeInTheDocument();
    });
  });

  it('refreshes data every 30 seconds', async () => {
    jest.useFakeTimers();
    (fetchLeaderboard as jest.Mock).mockResolvedValue(mockLeaderboardData);
    (fetchMarket as jest.Mock).mockResolvedValue(mockMarketData);

    render(<App />);

    await waitFor(() => {
      expect(fetchLeaderboard).toHaveBeenCalledTimes(1);
      expect(fetchMarket).toHaveBeenCalledTimes(1);
    });

    // Advance timers by 30 seconds
    jest.advanceTimersByTime(30000);

    await waitFor(() => {
      expect(fetchLeaderboard).toHaveBeenCalledTimes(2);
      expect(fetchMarket).toHaveBeenCalledTimes(2);
    });

    jest.useRealTimers();
  });
}); 