import { LeaderboardResponse, MarketResponse } from '../types';

const API_BASE_URL = 'https://api-game.bloque.app/game';

export const fetchLeaderboard = async (): Promise<LeaderboardResponse> => {
  const response = await fetch(`${API_BASE_URL}/leaderboard`);
  if (!response.ok) {
    throw new Error('Failed to fetch leaderboard');
  }
  return response.json();
};

export const fetchMarket = async (): Promise<MarketResponse> => {
  const response = await fetch(`${API_BASE_URL}/market`);
  if (!response.ok) {
    throw new Error('Failed to fetch market');
  }
  return response.json();
}; 