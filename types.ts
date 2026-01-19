
export interface CurrencyData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  history: { date: string; value: number }[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'economy' | 'politics';
  timestamp: string;
  source: string;
  imageUrl: string;
}

export interface InvestmentData {
  id: string;
  name: string;
  type: string;
  returnYTD: number;
  risk: 'Baixo' | 'Médio' | 'Alto';
  minInvestment: number;
}

export interface BotConfig {
  name: string;
  riskProfile: 'Conservative' | 'Moderate' | 'Aggressive';
  targetBanks: string[];
  autoTrade: boolean;
  maxDrawdown: number;
  pairPrimary: string;
}
