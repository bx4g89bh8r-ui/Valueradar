import { useState, useMemo, useEffect } from "react";

const FONT = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
`;

const MOCK_STOCKS = [
  { ticker: "BABA", name: "Alibaba Group", country: "China", sector: "Technology", marketCap: 220, pe: 10.2, evEbitda: 7.8, fcfYield: 9.2, roic: 18.5, roe: 16.2, netDebtEbitda: 0.8, revGrowth5y: 12.4, epsGrowth5y: 11.2, peg: 0.71, wacc: 9.0, grossMargin: 38, opMargin: 14, currentRatio: 2.1, interestCoverage: 8.2, evFcf: 10.8 },
  { ticker: "2318.HK", name: "Ping An Insurance", country: "China", sector: "Financials", marketCap: 85, pe: 7.1, evEbitda: 5.2, fcfYield: 11.4, roic: 14.8, roe: 17.9, netDebtEbitda: 1.1, revGrowth5y: 8.7, epsGrowth5y: 9.3, peg: 0.62, wacc: 7.5, grossMargin: 44, opMargin: 18, currentRatio: 1.8, interestCoverage: 9.1, evFcf: 8.7 },
  { ticker: "SAN", name: "Banco Santander", country: "Spain", sector: "Financials", marketCap: 72, pe: 6.8, evEbitda: 4.9, fcfYield: 12.1, roic: 13.2, roe: 14.1, netDebtEbitda: 1.4, revGrowth5y: 5.9, epsGrowth5y: 7.8, peg: 0.58, wacc: 8.0, grossMargin: 55, opMargin: 22, currentRatio: 1.6, interestCoverage: 7.4, evFcf: 8.2 },
  { ticker: "VALE3", name: "Vale SA", country: "Brazil", sector: "Materials", marketCap: 61, pe: 5.4, evEbitda: 4.1, fcfYield: 14.7, roic: 22.4, roe: 28.9, netDebtEbitda: 0.9, revGrowth5y: 6.2, epsGrowth5y: 8.4, peg: 0.44, wacc: 9.5, grossMargin: 41, opMargin: 34, currentRatio: 1.9, interestCoverage: 12.3, evFcf: 6.8 },
  { ticker: "7203.T", name: "Toyota Motor", country: "Japan", sector: "Consumer Disc.", marketCap: 290, pe: 9.1, evEbitda: 6.7, fcfYield: 7.8, roic: 13.9, roe: 12.8, netDebtEbitda: 1.8, revGrowth5y: 5.1, epsGrowth5y: 6.9, peg: 0.92, wacc: 6.8, grossMargin: 19, opMargin: 8.2, currentRatio: 1.5, interestCoverage: 6.8, evFcf: 12.8 },
  { ticker: "YNDX", name: "Yandex NV", country: "Russia", sector: "Technology", marketCap: 14, pe: 12.4, evEbitda: 8.9, fcfYield: 6.8, roic: 16.2, roe: 15.4, netDebtEbitda: 0.6, revGrowth5y: 18.9, epsGrowth5y: 14.2, peg: 0.67, wacc: 10.2, grossMargin: 52, opMargin: 11, currentRatio: 2.4, interestCoverage: 11.2, evFcf: 14.7 },
  { ticker: "BHP", name: "BHP Group", country: "Australia", sector: "Materials", marketCap: 145, pe: 8.9, evEbitda: 5.8, fcfYield: 10.2, roic: 19.8, roe: 25.3, netDebtEbitda: 0.7, revGrowth5y: 7.4, epsGrowth5y: 9.8, peg: 0.66, wacc: 8.2, grossMargin: 48, opMargin: 38, currentRatio: 1.7, interestCoverage: 14.6, evFcf: 9.8 },
  { ticker: "005930", name: "Samsung Electronics", country: "South Korea", sector: "Technology", marketCap: 330, pe: 11.8, evEbitda: 7.4, fcfYield: 8.1, roic: 17.1, roe: 13.9, netDebtEbitda: -0.4, revGrowth5y: 8.8, epsGrowth5y: 10.1, peg: 0.82, wacc: 7.8, grossMargin: 34, opMargin: 12, currentRatio: 2.8, interestCoverage: 18.4, evFcf: 12.3 },
  { ticker: "ITUB4", name: "Itaú Unibanco", country: "Brazil", sector: "Financials", marketCap: 54, pe: 7.9, evEbitda: 5.6, fcfYield: 10.8, roic: 15.6, roe: 20.4, netDebtEbitda: 1.2, revGrowth5y: 9.1, epsGrowth5y: 10.4, peg: 0.58, wacc: 11.0, grossMargin: 62, opMargin: 28, currentRatio: 1.7, interestCoverage: 8.9, evFcf: 9.2 },
  { ticker: "RIO", name: "Rio Tinto", country: "UK", sector: "Materials", marketCap: 110, pe: 7.6, evEbitda: 4.8, fcfYield: 11.9, roic: 21.3, roe: 27.6, netDebtEbitda: 0.5, revGrowth5y: 6.8, epsGrowth5y: 8.9, peg: 0.61, wacc: 7.9, grossMargin: 46, opMargin: 36, currentRatio: 1.9, interestCoverage: 16.2, evFcf: 8.4 },
  { ticker: "ASML", name: "ASML Holding", country: "Netherlands", sector: "Technology", marketCap: 310, pe: 28.4, evEbitda: 22.1, fcfYield: 3.2, roic: 31.8, roe: 52.4, netDebtEbitda: -1.2, revGrowth5y: 21.4, epsGrowth5y: 24.8, peg: 1.14, wacc: 8.1, grossMargin: 51, opMargin: 29, currentRatio: 3.1, interestCoverage: 42.1, evFcf: 31.2 },
  { ticker: "MC.PA", name: "LVMH", country: "France", sector: "Consumer Disc.", marketCap: 340, pe: 18.2, evEbitda: 11.9, fcfYield: 5.1, roic: 14.8, roe: 22.1, netDebtEbitda: 1.6, revGrowth5y: 11.2, epsGrowth5y: 13.4, peg: 1.08, wacc: 7.4, grossMargin: 68, opMargin: 21, currentRatio: 1.4, interestCoverage: 10.8, evFcf: 19.6 },
  { ticker: "SHEL", name: "Shell PLC", country: "UK", sector: "Energy", marketCap: 198, pe: 9.4, evEbitda: 6.1, fcfYield: 9.8, roic: 12.9, roe: 14.2, netDebtEbitda: 1.9, revGrowth5y: 4.2, epsGrowth5y: 5.8, peg: 1.12, wacc: 8.8, grossMargin: 22, opMargin: 9.1, currentRatio: 1.3, interestCoverage: 6.1, evFcf: 10.2 },
  { ticker: "NOVN", name: "Novartis AG", country: "Switzerland", sector: "Healthcare", marketCap: 201, pe: 14.8, evEbitda: 9.8, fcfYield: 7.2, roic: 16.4, roe: 18.9, netDebtEbitda: 1.1, revGrowth5y: 6.8, epsGrowth5y: 8.2, peg: 0.94, wacc: 7.2, grossMargin: 71, opMargin: 24, currentRatio: 1.8, interestCoverage: 14.2, evFcf: 13.9 },
  { ticker: "PTR", name: "PetroChina", country: "China", sector: "Energy", marketCap: 112, pe: 6.2, evEbitda: 3.9, fcfYield: 13.4, roic: 11.8, roe: 10.2, netDebtEbitda: 2.1, revGrowth5y: 3.8, epsGrowth5y: 4.1, peg: 0.98, wacc: 9.4, grossMargin: 18, opMargin: 7.8, currentRatio: 1.2, interestCoverage: 5.4, evFcf: 7.4 },
  { ticker: "ABB", name: "ABB Ltd", country: "Switzerland", sector: "Industrials", marketCap: 78, pe: 16.2, evEbitda: 11.4, fcfYield: 6.1, roic: 19.8, roe: 32.4, netDebtEbitda: 0.4, revGrowth5y: 7.9, epsGrowth5y: 12.1, peg: 0.89, wacc: 7.6, grossMargin: 33, opMargin: 13, currentRatio: 1.9, interestCoverage: 22.4, evFcf: 16.4 },
  { ticker: "TCS.NS", name: "Tata Consultancy", country: "India", sector: "Technology", marketCap: 162, pe: 24.1, evEbitda: 17.8, fcfYield: 4.2, roic: 28.9, roe: 44.2, netDebtEbitda: -2.1, revGrowth5y: 13.2, epsGrowth5y: 14.8, peg: 1.41, wacc: 10.8, grossMargin: 36, opMargin: 25, currentRatio: 3.4, interestCoverage: 48.2, evFcf: 23.8 },
  { ticker: "GLEN.L", name: "Glencore PLC", country: "UK", sector: "Materials", marketCap: 58, pe: 6.9, evEbitda: 4.4, fcfYield: 12.8, roic: 16.8, roe: 19.4, netDebtEbitda: 1.7, revGrowth5y: 5.4, epsGrowth5y: 7.2, peg: 0.68, wacc: 9.1, grossMargin: 8, opMargin: 5.2, currentRatio: 1.4, interestCoverage: 7.8, evFcf: 7.8 },
  { ticker: "HDB", name: "HDFC Bank", country: "India", sector: "Financials", marketCap: 148, pe: 17.4, evEbitda: 12.1, fcfYield: 5.8, roic: 17.2, roe: 16.8, netDebtEbitda: 0.9, revGrowth5y: 18.4, epsGrowth5y: 17.9, peg: 0.84, wacc: 11.2, grossMargin: 72, opMargin: 31, currentRatio: 1.6, interestCoverage: 10.4, evFcf: 17.2 },
  { ticker: "ENB", name: "Enbridge Inc.", country: "Canada", sector: "Energy", marketCap: 82, pe: 18.9, evEbitda: 13.2, fcfYield: 6.4, roic: 8.2, roe: 11.4, netDebtEbitda: 4.8, revGrowth5y: 4.1, epsGrowth5y: 5.2, peg: 2.1, wacc: 7.9, grossMargin: 28, opMargin: 18, currentRatio: 0.8, interestCoverage: 3.2, evFcf: 20.8 },
];

const COUNTRIES = ["All", "China", "Japan", "South Korea", "India", "Australia", "Brazil", "UK", "Spain", "France", "Switzerland", "Netherlands", "Russia", "Canada"];
const SECTORS = ["All", "Technology", "Financials", "Materials", "Energy", "Healthcare", "Industrials", "Consumer Disc."];

function loadXLSX() {
  return new Promise((resolve) => {
    if (window.XLSX) return resolve(window.XLSX);
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    s.onload = () => resolve(window.XLSX);
    document.head.appendChild(s);
  });
}

async function exportToXlsx(data, filename = "ValueRadar_Export.xlsx") {
  const XLSX = await loadXLSX();
  const headers = ["Ticker","Empresa","País","Sector","MCap $B","P/E","EV/EBITDA","FCF Yield %","ROIC %","ROE %","Gross Margin %","ND/EBITDA","Rev CAGR
