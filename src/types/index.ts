export interface Player {
  rank: number;
  username: string;
  level: number;
  xp: number;
  gold: number;
}

export interface Item {
  id: string;
  name: string;
  type: string;
  description: string;
  cost: number;
}

export interface LeaderboardResponse {
  players: Player[];
}

export interface MarketResponse {
  items: Item[];
} 