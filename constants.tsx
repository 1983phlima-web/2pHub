
import { CurrencyData, InvestmentData } from "./types";

export const INITIAL_CURRENCIES: CurrencyData[] = [
  {
    id: '1',
    name: 'Dólar Americano',
    symbol: 'USD/BRL',
    price: 5.48,
    change: 0.15,
    trend: 'up',
    history: [
      { date: 'Jan 24', value: 4.85 }, { date: 'Fev 24', value: 4.92 }, { date: 'Mar 24', value: 4.98 },
      { date: 'Abr 24', value: 5.05 }, { date: 'Mai 24', value: 5.12 }, { date: 'Jun 24', value: 5.18 },
      { date: 'Jul 24', value: 5.25 }, { date: 'Ago 24', value: 5.30 }, { date: 'Set 24', value: 5.22 },
      { date: 'Out 24', value: 5.15 }, { date: 'Nov 24', value: 5.08 }, { date: 'Dez 24', value: 4.95 },
      { date: 'Jan 25', value: 5.02 }, { date: 'Fev 25', value: 5.10 }, { date: 'Mar 25', value: 5.15 },
      { date: 'Abr 25', value: 5.25 }, { date: 'Mai 25', value: 5.32 }, { date: 'Jun 25', value: 5.40 },
      { date: 'Jul 25', value: 5.45 }, { date: 'Ago 25', value: 5.52 }, { date: 'Set 25', value: 5.48 },
      { date: 'Out 25', value: 5.42 }, { date: 'Nov 25', value: 5.35 }, { date: 'Dez 25', value: 5.48 },
    ]
  },
  {
    id: '2',
    name: 'Euro',
    symbol: 'EUR/BRL',
    price: 5.92,
    change: -0.05,
    trend: 'down',
    history: [
      { date: 'Jan 24', value: 5.30 }, { date: 'Fev 24', value: 5.45 }, { date: 'Mar 24', value: 5.55 },
      { date: 'Abr 24', value: 5.50 }, { date: 'Mai 24', value: 5.62 }, { date: 'Jun 24', value: 5.68 },
      { date: 'Jul 24', value: 5.75 }, { date: 'Ago 24', value: 5.82 }, { date: 'Set 24', value: 5.90 },
      { date: 'Out 24', value: 5.95 }, { date: 'Nov 24', value: 6.05 }, { date: 'Dez 24', value: 6.15 },
      { date: 'Jan 25', value: 6.10 }, { date: 'Fev 25', value: 6.05 }, { date: 'Mar 25', value: 6.12 },
      { date: 'Abr 25', value: 6.08 }, { date: 'Mai 25', value: 6.02 }, { date: 'Jun 25', value: 5.98 },
      { date: 'Jul 25', value: 5.95 }, { date: 'Ago 25', value: 5.92 }, { date: 'Set 25', value: 5.88 },
      { date: 'Out 25', value: 5.90 }, { date: 'Nov 25', value: 5.94 }, { date: 'Dez 25', value: 5.92 },
    ]
  },
  {
    id: '3',
    name: 'Bitcoin',
    symbol: 'BTC/USD',
    price: 64200,
    change: 2.4,
    trend: 'up',
    history: [
      { date: 'Jan 24', value: 28000 }, { date: 'Fev 24', value: 24000 }, { date: 'Mar 24', value: 26000 },
      { date: 'Abr 24', value: 30000 }, { date: 'Mai 24', value: 35000 }, { date: 'Jun 24', value: 32000 },
      { date: 'Jul 24', value: 38000 }, { date: 'Ago 24', value: 42000 }, { date: 'Set 24', value: 45000 },
      { date: 'Out 24', value: 48000 }, { date: 'Nov 24', value: 52000 }, { date: 'Dez 24', value: 44000 },
      { date: 'Jan 25', value: 42000 }, { date: 'Fev 25', value: 51000 }, { date: 'Mar 25', value: 68000 },
      { date: 'Abr 25', value: 62000 }, { date: 'Mai 25', value: 59000 }, { date: 'Jun 25', value: 64000 },
      { date: 'Jul 25', value: 66000 }, { date: 'Ago 25', value: 62000 }, { date: 'Set 25', value: 58000 },
      { date: 'Out 25', value: 61000 }, { date: 'Nov 25', value: 63000 }, { date: 'Dez 25', value: 64200 },
    ]
  }
];

export const INVESTMENTS: InvestmentData[] = [
  { id: 'i1', name: 'Tesouro Selic 2029', type: 'Renda Fixa', returnYTD: 10.75, risk: 'Baixo', minInvestment: 140 },
  { id: 'i2', name: 'CDB Banco Inter', type: 'Renda Fixa', returnYTD: 11.2, risk: 'Baixo', minInvestment: 100 },
  { id: 'i3', name: 'S&P 500 ETF (IVVB11)', type: 'Renda Variável', returnYTD: 18.4, risk: 'Médio', minInvestment: 280 },
  { id: 'i4', name: 'Fundo Imobiliário KNRI11', type: 'FII', returnYTD: 8.9, risk: 'Médio', minInvestment: 160 },
  { id: 'i5', name: 'Ações Apple (AAPL)', type: 'Ações EUA', returnYTD: 22.1, risk: 'Alto', minInvestment: 500 },
];
