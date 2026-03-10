import { useState, useMemo } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');`;

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

const COUNTRIES = ["All","China","Japan","South Korea","India","Australia","Brazil","UK","Spain","France","Switzerland","Netherlands","Russia","Canada"];
const SECTORS = ["All","Technology","Financials","Materials","Energy","Healthcare","Industrials","Consumer Disc."];

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
  const headers = ["Ticker","Empresa","País","Sector","MCap $B","P/E","EV/EBITDA","FCF Yield %","ROIC %","ROE %","Gross Margin %","ND/EBITDA","Rev CAGR 5y %","EPS CAGR 5y %","ROIC-WACC Spread","WACC %","PEG","Score"];
  const rows = data.map(s => [s.ticker,s.name,s.country,s.sector,s.marketCap,s.pe,s.evEbitda,s.fcfYield,s.roic,s.roe,s.grossMargin,s.netDebtEbitda,s.revGrowth5y,s.epsGrowth5y,+(s.roic-s.wacc).toFixed(1),s.wacc,s.peg,s.score]);
  const ws1 = XLSX.utils.aoa_to_sheet([headers,...rows]);
  ws1["!cols"] = [10,26,14,18,10,8,11,11,9,9,14,11,15,15,16,9,8,9].map(w=>({wch:w}));
  const ws2 = XLSX.utils.aoa_to_sheet([["UNDERVALUATION SCORE","",""],["Métrica","Peso","Umbral"],["P/E Ratio","15%","< 15x"],["EV/EBITDA","15%","< 10x"],["FCF Yield","20%","> 6%"],["ROIC","20%","> 12%"],["Deuda","10%","< 2.5x"],["Crecimiento","20%","> 5%"]]);
  const comboHeaders = ["Ticker","Empresa","ROIC>15%","FCFYield>6%","ND/EBITDA<2","RevGr>6%","EV/EBITDA<12","OK","Score"];
  const comboRows = data.filter(s=>s.roic>15&&s.fcfYield>6&&s.netDebtEbitda<2&&s.revGrowth5y>6&&s.evEbitda<12).map(s=>{const c=[s.roic>15,s.fcfYield>6,s.netDebtEbitda<2,s.revGrowth5y>6,s.evEbitda<12];return[s.ticker,s.name,...c.map(v=>v?"✓":"✗"),`${c.filter(Boolean).length}/5`,s.score];});
  const ws3 = XLSX.utils.aoa_to_sheet([comboHeaders,...comboRows]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws1,"Screener");
  XLSX.utils.book_append_sheet(wb,ws2,"Metodología");
  XLSX.utils.book_append_sheet(wb,ws3,"Combo Perfecto");
  XLSX.writeFile(wb,filename,{bookType:"xlsx",cellStyles:true});
}

function calcScore(s) {
  let score = 0;
  const peScore = s.pe<5?100:s.pe<15?((15-s.pe)/10)*100:s.pe<20?((20-s.pe)/5)*30:0;
  score += peScore*0.15;
  const evScore = s.evEbitda<4?100:s.evEbitda<10?((10-s.evEbitda)/6)*100:s.evEbitda<15?((15-s.evEbitda)/5)*30:0;
  score += evScore*0.15;
  const fcfScore = s.fcfYield>15?100:s.fcfYield>6?((s.fcfYield-6)/9)*100:s.fcfYield>3?((s.fcfYield-3)/3)*30:0;
  score += fcfScore*0.20;
  const roicScore = s.roic>30?100:s.roic>12?((s.roic-12)/18)*100:s.roic>8?((s.roic-8)/4)*30:0;
  score += roicScore*0.20;
  const debtScore = s.netDebtEbitda<0?100:s.netDebtEbitda<2.5?((2.5-s.netDebtEbitda)/2.5)*100:s.netDebtEbitda<4?((4-s.netDebtEbitda)/1.5)*20:0;
  score += debtScore*0.10;
  const growthScore = ((s.revGrowth5y+s.epsGrowth5y)/2>20)?100:((s.revGrowth5y+s.epsGrowth5y)/2>5)?(((s.revGrowth5y+s.epsGrowth5y)/2-5)/15)*100:20;
  score += growthScore*0.20;
  return Math.round(Math.min(100,Math.max(0,score)));
}

const COLS = [
  {key:"ticker",label:"Ticker",mono:true},
  {key:"name",label:"Empresa"},
  {key:"country",label:"País"},
  {key:"sector",label:"Sector"},
  {key:"marketCap",label:"MCap $B",fmt:v=>`$${v}B`},
  {key:"pe",label:"P/E",fmt:v=>v.toFixed(1),color:v=>v<10?"good":v<15?"ok":"bad"},
  {key:"evEbitda",label:"EV/EBITDA",fmt:v=>v.toFixed(1),color:v=>v<6?"good":v<10?"ok":"bad"},
  {key:"fcfYield",label:"FCF Yield",fmt:v=>`${v.toFixed(1)}%`,color:v=>v>10?"good":v>6?"ok":"bad"},
  {key:"roic",label:"ROIC",fmt:v=>`${v.toFixed(1)}%`,color:v=>v>18?"good":v>12?"ok":"bad"},
  {key:"roe",label:"ROE",fmt:v=>`${v.toFixed(1)}%`,color:v=>v>20?"good":v>15?"ok":"bad"},
  {key:"netDebtEbitda",label:"ND/EBITDA",fmt:v=>v.toFixed(1),color:v=>v<0.5?"good":v<2?"ok":"bad"},
  {key:"revGrowth5y",label:"Rev CAGR 5y",fmt:v=>`${v.toFixed(1)}%`,color:v=>v>10?"good":v>5?"ok":"bad"},
  {key:"epsGrowth5y",label:"EPS CAGR 5y",fmt:v=>`${v.toFixed(1)}%`,color:v=>v>10?"good":v>7?"ok":"bad"},
  {key:"peg",label:"PEG",fmt:v=>v.toFixed(2),color:v=>v<0.7?"good":v<1?"ok":"bad"},
];

const DEFAULT_FILTERS = {pe:15,evEbitda:10,fcfYield:6,roic:12,roe:15,grossMargin:30,opMargin:10,netDebtEbitda:2.5,interestCoverage:5,currentRatio:1.5,revGrowth5y:5,epsGrowth5y:7,marketCap:2,peg:1,country:"All",sector:"All",enableAll:false};
const SPREAD_COLOR = s=>{const sp=s.roic-s.wacc;return sp>12?"#00ff9d":sp>8?"#ffe066":sp>4?"#ff9933":"#ff4466";};

export default function ValueRadar() {
  const [filters,setFilters] = useState(DEFAULT_FILTERS);
  const [sortKey,setSortKey] = useState("score");
  const [sortDir,setSortDir] = useState("desc");
  const [selectedStock,setSelectedStock] = useState(null);
  const [view,setView] = useState("screener");
  const [activeTab,setActiveTab] = useState("valuation");
  const [exporting,setExporting] = useState(false);

  const stocks = useMemo(()=>MOCK_STOCKS.map(s=>({...s,score:calcScore(s)})),[]);

  const filtered = useMemo(()=>{
    return stocks.filter(s=>{
      if(filters.country!=="All"&&s.country!==filters.country)return false;
      if(filters.sector!=="All"&&s.sector!==filters.sector)return false;
      if(filters.enableAll){return s.pe<=filters.pe&&s.evEbitda<=filters.evEbitda&&s.fcfYield>=filters.fcfYield&&s.roic>=filters.roic&&s.roe>=filters.roe&&s.grossMargin>=filters.grossMargin&&s.opMargin>=filters.opMargin&&s.netDebtEbitda<=filters.netDebtEbitda&&s.interestCoverage>=filters.interestCoverage&&s.currentRatio>=filters.currentRatio&&s.revGrowth5y>=filters.revGrowth5y&&s.epsGrowth5y>=filters.epsGrowth5y&&s.marketCap>=filters.marketCap&&s.peg<=filters.peg;}
      return true;
    }).sort((a,b)=>{
      const aVal=a[sortKey],bVal=b[sortKey];
      if(typeof aVal==="string")return sortDir==="asc"?aVal.localeCompare(bVal):bVal.localeCompare(aVal);
      return sortDir==="asc"?aVal-bVal:bVal-aVal;
    });
  },[stocks,filters,sortKey,sortDir]);

  const handleSort=key=>{if(sortKey===key)setSortDir(d=>d==="asc"?"desc":"asc");else{setSortKey(key);setSortDir("desc");}};
  const openDetail=stock=>{setSelectedStock(stock);setView("detail");setActiveTab("valuation");};
  const handleExport=async()=>{setExporting(true);try{await exportToXlsx(filtered);}finally{setExporting(false);}};

  const scoreBar=score=>{
    const color=score>=70?"#00ff9d":score>=50?"#ffe066":score>=30?"#ff9933":"#ff4466";
    return(<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:52,height:6,background:"#1a1f2e",borderRadius:3,overflow:"hidden"}}><div style={{width:`${score}%`,height:"100%",background:color,borderRadius:3}}/></div><span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color,fontWeight:500}}>{score}</span></div>);
  };

  const colorClass=(val,rule)=>{if(!rule)return"#a0aec0";const c=rule(val);return c==="good"?"#00ff9d":c==="ok"?"#ffe066":"#ff4466";};

  const Slider=({label,filterKey,min,max,step=0.5,invert=false,suffix=""})=>(
    <div style={{marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
        <span style={{fontSize:11,color:"#8892a4",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:1}}>{label}</span>
        <span style={{fontSize:12,color:"#00ff9d",fontFamily:"'JetBrains Mono',monospace"}}>{invert?">":"<"} {filters[filterKey]}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={filters[filterKey]} onChange={e=>setFilters(f=>({...f,[filterKey]:parseFloat(e.target.value)}))} style={{width:"100%",accentColor:"#00ff9d",cursor:"pointer",height:4}}/>
    </div>
  );

  const MetricCard=({label,value,color,sub})=>(
    <div style={{background:"#0d111c",border:"1px solid #1e2535",borderRadius:10,padding:"16px 20px"}}>
      <div style={{fontSize:11,color:"#606880",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{label}</div>
      <div style={{fontSize:24,fontWeight:700,color:color||"#e8ecf4",fontFamily:"'Syne',sans-serif"}}>{value}</div>
      {sub&&<div style={{fontSize:11,color:"#606880",marginTop:4}}>{sub}</div>}
    </div>
  );

  const s=selectedStock;

  return(
    <div style={{minHeight:"100vh",background:"#07090f",color:"#e8ecf4",fontFamily:"'Syne',sans-serif"}}>
      <style>{`
        ${FONT}
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-track{background:#0d111c;}
        ::-webkit-scrollbar-thumb{background:#2a3248;border-radius:2px;}
        input[type=range]{-webkit-appearance:none;appearance:none;background:#1a1f2e;height:4px;border-radius:2px;outline:none;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;background:#00ff9d;border-radius:50%;cursor:pointer;box-shadow:0 0 8px rgba(0,255,157,0.4);}
        .row-hover:hover{background:#0d1120!important;cursor:pointer;}
        .sort-btn:hover{color:#00ff9d!important;}
        .tab-btn{background:none;border:none;cursor:pointer;padding:8px 18px;border-radius:6px;font-family:'Syne',sans-serif;font-size:13px;font-weight:600;letter-spacing:0.5px;transition:all 0.2s;}
        .tab-btn.active{background:#00ff9d22;color:#00ff9d;border:1px solid #00ff9d44;}
        .tab-btn:not(.active){color:#606880;border:1px solid transparent;}
        .tab-btn:not(.active):hover{color:#a0aec0;}
        select{background:#0d111c;border:1px solid #1e2535;color:#e8ecf4;padding:7px 12px;border-radius:8px;font-family:'Syne',sans-serif;font-size:13px;outline:none;cursor:pointer;}
        .badge{display:inline-block;padding:2px 8px;border-radius:4px;font-size:10px;font-family:'JetBrains Mono',monospace;font-weight:500;letter-spacing:0.5px;}
        .combo-btn{background:none;border:1px solid #2a3248;color:#8892a4;padding:7px 14px;border-radius:8px;cursor:pointer;font-family:'Syne',sans-serif;font-size:12px;font-weight:600;transition:all 0.2s;}
        .combo-btn:hover{border-color:#00ff9d;color:#00ff9d;background:#00ff9d0a;}
        .combo-btn.active{border-color:#00ff9d;color:#00ff9d;background:#00ff9d15;}
      `}</style>

      <div style={{borderBottom:"1px solid #12172a",padding:"0 32px",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:32,height:32,background:"linear-gradient(135deg,#00ff9d,#00b8ff)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:16}}>◈</span>
          </div>
          <div>
            <div style={{fontSize:18,fontWeight:800,letterSpacing:-0.5,color:"#fff"}}>ValueRadar</div>
            <div style={{fontSize:10,color:"#00ff9d",fontFamily:"'JetBrains Mono',monospace",letterSpacing:2,textTransform:"uppercase"}}>Global Undervalued Stock Finder</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{fontSize:11,color:"#606880",fontFamily:"'JetBrains Mono',monospace"}}><span style={{color:"#00ff9d"}}>{filtered.length}</span> empresas</div>
          {view==="detail"&&<button onClick={()=>setView("screener")} style={{background:"none",border:"1px solid #2a3248",color:"#a0aec0",padding:"6px 14px",borderRadius:8,cursor:"pointer",fontSize:12,fontFamily:"'Syne',sans-serif",fontWeight:600}}>← Screener</button>}
          <button onClick={handleExport} disabled={exporting} style={{background:exporting?"#00ff9d22":"none",border:"1px solid #00ff9d44",color:exporting?"#00ff9d88":"#00ff9d",padding:"6px 16px",borderRadius:8,cursor:exporting?"wait":"pointer",fontSize:12,fontFamily:"'Syne',sans-serif",fontWeight:700,display:"flex",alignItems:"center",gap:7}}>
            {exporting?<>⏳ Exportando…</>:<>⬇ Export XLSX</>}
          </button>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:7,height:7,background:"#00ff9d",borderRadius:"50%",boxShadow:"0 0 8px #00ff9d"}}/>
            <span style={{fontSize:11,color:"#606880",fontFamily:"'JetBrains Mono',monospace"}}>LIVE</span>
          </div>
        </div>
      </div>

      {view==="screener"?(
        <div style={{display:"flex"}}>
          <div style={{width:280,minHeight:"calc(100vh - 64px)",borderRight:"1px solid #12172a",padding:"24px 20px",overflowY:"auto",flexShrink:0}}>
            <div style={{fontSize:11,color:"#606880",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:2,marginBottom:20}}>FILTROS</div>
            <div style={{marginBottom:20}}>
              <div style={{fontSize:11,color:"#8892a4",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>País</div>
              <select value={filters.country} onChange={e=>setFilters(f=>({...f,country:e.target.value}))} style={{width:"100%",marginBottom:12}}>{COUNTRIES.map(c=><option key={c}>{c}</option>)}</select>
              <div style={{fontSize:11,color:"#8892a4",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Sector</div>
              <select value={filters.sector} onChange={e=>setFilters(f=>({...f,sector:e.target.value}))} style={{width:"100%"}}>{SECTORS.map(c=><option key={c}>{c}</option>)}</select>
            </div>
            <div style={{marginBottom:24,padding:"12px 14px",background:"#0a0e1a",border:"1px solid #1e2535",borderRadius:10}}>
              <div style={{fontSize:11,color:"#606880",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Combo Perfecto</div>
              <div style={{fontSize:11,color:"#8892a4",marginBottom:10,lineHeight:1.6}}>ROIC &gt;15% · FCF Yield &gt;6% · ND/EBITDA &lt;2 · RevGrowth &gt;6% · EV/EBITDA &lt;12</div>
              <button className={`combo-btn ${filters.enableAll?"active":""}`} style={{width:"100%"}} onClick={()=>setFilters(f=>({...DEFAULT_FILTERS,country:f.country,sector:f.sector,enableAll:!f.enableAll,roic:15,fcfYield:6,netDebtEbitda:2,revGrowth5y:6,evEbitda:12}))}>
                {filters.enableAll?"✓ Activo":"Activar Filtro Combo"}
              </button>
            </div>
            <div style={{height:1,background:"#12172a",margin:"4px 0 20px"}}/>
            <div style={{fontSize:11,color:"#3a9dff",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:1,marginBottom:14}}>◆ VALORACIÓN</div>
            <Slider label="P/E" filterKey="pe" min={3} max={40} step={0.5}/>
            <Slider label="EV/EBITDA" filterKey="evEbitda" min={2} max={30} step={0.5}/>
            <Slider label="FCF Yield %" filterKey="fcfYield" min={0} max={20} step={0.5} invert suffix="%"/>
            <Slider label="PEG Ratio" filterKey="peg" min={0.1} max={3} step={0.05}/>
            <div style={{height:1,background:"#12172a",margin:"12px 0 20px"}}/>
            <div style={{fontSize:11,color:"#00ff9d",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:1,marginBottom:14}}>◆ CALIDAD</div>
            <Slider label="ROIC Min %" filterKey="roic" min={0} max={40} step={1} invert suffix="%"/>
            <Slider label="ROE Min %" filterKey="roe" min={0} max={50} step={1} invert suffix="%"/>
            <Slider label="Gross Margin Min %" filterKey="grossMargin" min={0} max={80} step={1} invert suffix="%"/>
            <Slider label="Op. Margin Min %" filterKey="opMargin" min={0} max={50} step={1} invert suffix="%"/>
            <div style={{height:1,background:"#12172a",margin:"12px 0 20px"}}/>
            <div style={{fontSize:11,color:"#ffe066",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:1,marginBottom:14}}>◆ SOLIDEZ</div>
            <Slider label="ND/EBITDA Max" filterKey="netDebtEbitda" min={-2} max={6} step={0.1}/>
            <Slider label="Interest Cov. Min" filterKey="interestCoverage" min={1} max={20} step={0.5} invert/>
            <Slider label="Current Ratio Min" filterKey="currentRatio" min={0.5} max={4} step={0.1} invert/>
            <div style={{height:1,background:"#12172a",margin:"12px 0 20px"}}/>
            <div style={{fontSize:11,color:"#ff9933",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:1,marginBottom:14}}>◆ CRECIMIENTO</div>
            <Slider label="Rev Growth 5y %" filterKey="revGrowth5y" min={0} max={30} step={0.5} invert suffix="%"/>
            <Slider label="EPS Growth 5y %" filterKey="epsGrowth5y" min={0} max={30} step={0.5} invert suffix="%"/>
            <Slider label="Market Cap Min $B" filterKey="marketCap" min={0} max={50} step={0.5} invert/>
            <div style={{height:1,background:"#12172a",margin:"16px 0 16px"}}/>
            <button onClick={()=>setFilters(DEFAULT_FILTERS)} style={{width:"100%",background:"none",border:"1px solid #2a3248",color:"#606880",padding:"8px",borderRadius:8,cursor:"pointer",fontSize:12,fontFamily:"'Syne',sans-serif",fontWeight:600}}>Reset Filtros</button>
          </div>

          <div style={{flex:1,overflowX:"auto",padding:"24px"}}>
            <div style={{display:"flex",gap:12,marginBottom:20,alignItems:"center"}}>
              <span style={{fontSize:11,color:"#606880",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:1}}>Score:</span>
              {[["70-100","#00ff9d","Alta oportunidad"],["50-69","#ffe066","Interesante"],["30-49","#ff9933","Moderada"],["0-29","#ff4466","Débil"]].map(([range,color,label])=>(
                <div key={range} style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:8,height:8,background:color,borderRadius:"50%"}}/>
                  <span style={{fontSize:11,color:"#8892a4",fontFamily:"'JetBrains Mono',monospace"}}>{range}</span>
                  <span style={{fontSize:11,color:"#4a5568"}}>{label}</span>
                </div>
              ))}
            </div>
            <div style={{overflowX:"auto",borderRadius:12,border:"1px solid #12172a"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                <thead>
                  <tr style={{background:"#0a0e1a",borderBottom:"1px solid #12172a"}}>
                    {COLS.map(col=>(
                      <th key={col.key} onClick={()=>handleSort(col.key)} className="sort-btn" style={{padding:"12px 14px",textAlign:col.key==="name"||col.key==="country"||col.key==="sector"?"left":"right",color:sortKey===col.key?"#00ff9d":"#606880",fontFamily:"'JetBrains Mono',monospace",fontSize:10,textTransform:"uppercase",letterSpacing:1,whiteSpace:"nowrap",cursor:"pointer",fontWeight:500,userSelect:"none"}}>
                        {col.label}{sortKey===col.key?(sortDir==="desc"?" ↓":" ↑"):""}
                      </th>
                    ))}
                    <th onClick={()=>handleSort("score")} className="sort-btn" style={{padding:"12px 14px",textAlign:"right",color:sortKey==="score"?"#00ff9d":"#606880",fontFamily:"'JetBrains Mono',monospace",fontSize:10,textTransform:"uppercase",letterSpacing:1,cursor:"pointer",fontWeight:500,userSelect:"none"}}>
                      SCORE{sortKey==="score"?(sortDir==="desc"?" ↓":" ↑"):""}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((stock,i)=>(
                    <tr key={stock.ticker} className="row-hover" onClick={()=>openDetail(stock)} style={{borderBottom:"1px solid #0d1020",background:i%2===0?"#08090f":"#07080e",transition:"background 0.15s"}}>
                      {COLS.map(col=>(
                        <td key={col.key} style={{padding:"11px 14px",textAlign:col.key==="name"||col.key==="country"||col.key==="sector"?"left":"right",fontFamily:col.mono||col.fmt?"'JetBrains Mono',monospace":"'Syne',sans-serif",color:col.color?colorClass(stock[col.key],col.color):col.key==="ticker"?"#3a9dff":col.key==="name"?"#e8ecf4":"#8892a4",fontSize:13,fontWeight:col.key==="ticker"?600:400,whiteSpace:"nowrap"}}>
                          {col.fmt?col.fmt(stock[col.key]):stock[col.key]}
                        </td>
                      ))}
                      <td style={{padding:"11px 14px",textAlign:"right"}}>{scoreBar(stock.score)}</td>
                    </tr>
                  ))}
                  {filtered.length===0&&<tr><td colSpan={COLS.length+1} style={{padding:48,textAlign:"center",color:"#3a4458",fontFamily:"'JetBrains Mono',monospace",fontSize:13}}>Sin resultados</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ):s?(
        <div style={{padding:"32px 40px",maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:32}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:8}}>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:28,fontWeight:700,color:"#3a9dff"}}>{s.ticker}</span>
                <span style={{fontSize:24,fontWeight:800,color:"#fff"}}>{s.name}</span>
                <span className="badge" style={{background:"#3a9dff15",color:"#3a9dff",border:"1px solid #3a9dff33"}}>{s.country}</span>
                <span className="badge" style={{background:"#a855f715",color:"#a855f7",border:"1px solid #a855f733"}}>{s.sector}</span>
              </div>
              <div style={{fontSize:13,color:"#606880",fontFamily:"'JetBrains Mono',monospace"}}>Market Cap: <span style={{color:"#e8ecf4"}}>${s.marketCap}B</span></div>
            </div>
            <div style={{textAlign:"center",background:"#0a0e1a",border:"1px solid #1e2535",borderRadius:14,padding:"16px 24px"}}>
              <div style={{fontSize:11,color:"#606880",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>SCORE</div>
              <div style={{fontSize:52,fontWeight:800,color:s.score>=70?"#00ff9d":s.score>=50?"#ffe066":"#ff9933",lineHeight:1}}>{s.score}</div>
              <div style={{fontSize:11,color:"#606880",marginTop:6}}>/100</div>
            </div>
          </div>

          <div style={{background:"#0a0e1a",border:`1px solid ${SPREAD_COLOR(s)}33`,borderRadius:12,padding:"16px 24px",marginBottom:28,display:"flex",alignItems:"center",gap:32}}>
            <div>
              <div style={{fontSize:11,color:"#606880",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>ROIC – WACC Spread</div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#8892a4"}}>ROIC <span style={{color:"#00ff9d"}}>{s.roic}%</span></span>
                <span style={{color:"#3a4458"}}>—</span>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#8892a4"}}>WACC <span style={{color:"#ff9933"}}>{s.wacc}%</span></span>
                <span style={{color:"#3a4458"}}>=</span>
                <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:22,fontWeight:700,color:SPREAD_COLOR(s)}}>+{(s.roic-s.wacc).toFixed(1)}%</span>
              </div>
            </div>
            <div style={{flex:1,height:8,background:"#1a1f2e",borderRadius:4,overflow:"hidden"}}>
              <div style={{width:`${Math.min(100,((s.roic-s.wacc)/20)*100)}%`,height:"100%",background:`linear-gradient(90deg,${SPREAD_COLOR(s)}88,${SPREAD_COLOR(s)})`,borderRadius:4}}/>
            </div>
            <div style={{fontSize:12,color:SPREAD_COLOR(s),fontWeight:600}}>
              {s.roic-s.wacc>10?"🔥 Valor excepcional":s.roic-s.wacc>6?"✓ Crea valor real":s.roic-s.wacc>3?"~ Spread modesto":"⚠ Riesgo destrucción"}
            </div>
          </div>

          <div style={{display:"flex",gap:8,marginBottom:24}}>
            {[["valuation","Valoración"],["quality","Calidad"],["financial","Solidez"],["growth","Crecimiento"]].map(([id,label])=>(
              <button key={id} className={`tab-btn ${activeTab===id?"active":""}`} onClick={()=>setActiveTab(id)}>{label}</button>
            ))}
          </div>

          {activeTab==="valuation"&&(
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
              <MetricCard label="P/E Ratio" value={s.pe.toFixed(1)} color={s.pe<10?"#00ff9d":s.pe<15?"#ffe066":"#ff4466"} sub={s.pe<15?"✓ Infravalorado":"Por encima del umbral"}/>
              <MetricCard label="EV / EBITDA" value={s.evEbitda.toFixed(1)} color={s.evEbitda<6?"#00ff9d":s.evEbitda<10?"#ffe066":"#ff4466"} sub={s.evEbitda<10?"✓ Atractivo":"Algo caro"}/>
              <MetricCard label="FCF Yield" value={`${s.fcfYield.toFixed(1)}%`} color={s.fcfYield>10?"#00ff9d":s.fcfYield>6?"#ffe066":"#ff4466"} sub={s.fcfYield>6?"✓ Generación sólida":"FCF yield bajo"}/>
              <MetricCard label="EV / FCF" value={s.evFcf.toFixed(1)} color={s.evFcf<10?"#00ff9d":s.evFcf<15?"#ffe066":"#ff4466"} sub="Múltiplo sobre flujo libre"/>
              <MetricCard label="PEG Ratio" value={s.peg.toFixed(2)} color={s.peg<0.7?"#00ff9d":s.peg<1?"#ffe066":"#ff4466"} sub={s.peg<1?"✓ Infravalorado vs crecimiento":"Caro para su crecimiento"}/>
              <MetricCard label="Gross Margin" value={`${s.grossMargin}%`} color={s.grossMargin>40?"#00ff9d":s.grossMargin>30?"#ffe066":"#ff4466"} sub="Margen bruto"/>
            </div>
          )}
          {activeTab==="quality"&&(
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
              <MetricCard label="ROIC" value={`${s.roic.toFixed(1)}%`} color={s.roic>18?"#00ff9d":s.roic>12?"#ffe066":"#ff4466"} sub={s.roic>15?"✓ Retorno superior":"Por debajo del umbral"}/>
              <MetricCard label="ROE" value={`${s.roe.toFixed(1)}%`} color={s.roe>20?"#00ff9d":s.roe>15?"#ffe066":"#ff4466"} sub="Return on Equity"/>
              <MetricCard label="WACC" value={`${s.wacc}%`} color="#8892a4" sub="Coste de capital"/>
              <MetricCard label="Gross Margin" value={`${s.grossMargin}%`} color={s.grossMargin>40?"#00ff9d":s.grossMargin>30?"#ffe066":"#ff4466"} sub="Ventaja competitiva"/>
              <MetricCard label="Operating Margin" value={`${s.opMargin}%`} color={s.opMargin>20?"#00ff9d":s.opMargin>10?"#ffe066":"#ff4466"} sub="Eficiencia operativa"/>
              <MetricCard label="ROIC–WACC" value={`+${(s.roic-s.wacc).toFixed(1)}%`} color={SPREAD_COLOR(s)} sub="Spread de creación de valor"/>
            </div>
          )}
          {activeTab==="financial"&&(
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
              <MetricCard label="Net Debt / EBITDA" value={s.netDebtEbitda.toFixed(1)} color={s.netDebtEbitda<0?"#00ff9d":s.netDebtEbitda<2?"#00ff9d":s.netDebtEbitda<3?"#ffe066":"#ff4466"} sub={s.netDebtEbitda<2.5?"✓ Apalancamiento controlado":"⚠ Deuda elevada"}/>
              <MetricCard label="Interest Coverage" value={`${s.interestCoverage.toFixed(1)}x`} color={s.interestCoverage>10?"#00ff9d":s.interestCoverage>5?"#ffe066":"#ff4466"} sub="Cobertura de intereses"/>
              <MetricCard label="Current Ratio" value={s.currentRatio.toFixed(1)} color={s.currentRatio>2?"#00ff9d":s.currentRatio>1.5?"#ffe066":"#ff4466"} sub="Liquidez a corto plazo"/>
              <MetricCard label="FCF Yield" value={`${s.fcfYield.toFixed(1)}%`} color={s.fcfYield>8?"#00ff9d":s.fcfYield>5?"#ffe066":"#ff4466"} sub="Generación de caja libre"/>
              <MetricCard label="EV / FCF" value={s.evFcf.toFixed(1)} color={s.evFcf<10?"#00ff9d":s.evFcf<15?"#ffe066":"#ff4466"} sub="Valoración vs flujo de caja"/>
              <MetricCard label="Market Cap" value={`$${s.marketCap}B`} color="#8892a4" sub="Capitalización"/>
            </div>
          )}
          {activeTab==="growth"&&(
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
              <MetricCard label="Revenue CAGR 5y" value={`${s.revGrowth5y.toFixed(1)}%`} color={s.revGrowth5y>10?"#00ff9d":s.revGrowth5y>5?"#ffe066":"#ff4466"} sub={s.revGrowth5y>5?"✓ Crecimiento sólido":"Crecimiento débil"}/>
              <MetricCard label="EPS CAGR 5y" value={`${s.epsGrowth5y.toFixed(1)}%`} color={s.epsGrowth5y>10?"#00ff9d":s.epsGrowth5y>7?"#ffe066":"#ff4466"} sub="Beneficio por acción"/>
              <MetricCard label="PEG Ratio" value={s.peg.toFixed(2)} color={s.peg<0.7?"#00ff9d":s.peg<1?"#ffe066":"#ff4466"} sub={s.peg<1?"Infravalorado vs crecimiento":"Caro para su crecimiento"}/>
              <MetricCard label="ROIC" value={`${s.roic.toFixed(1)}%`} color={s.roic>18?"#00ff9d":"#ffe066"} sub="Retorno sobre capital"/>
              <MetricCard label="FCF Yield" value={`${s.fcfYield.toFixed(1)}%`} color={s.fcfYield>8?"#00ff9d":"#ffe066"} sub="Crecimiento en caja"/>
              <div style={{background:"#0d111c",border:"1px solid #1e2535",borderRadius:10,padding:"16px 20px"}}>
                <div style={{fontSize:11,color:"#606880",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Resumen</div>
                {[["Ingresos 5y",s.revGrowth5y,20],["EPS 5y",s.epsGrowth5y,25],["FCF Yield",s.fcfYield,20]].map(([label,val,max])=>(
                  <div key={label} style={{marginBottom:8}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                      <span style={{fontSize:11,color:"#8892a4"}}>{label}</span>
                      <span style={{fontSize:11,fontFamily:"'JetBrains Mono',monospace",color:"#e8ecf4"}}>{val.toFixed(1)}%</span>
                    </div>
                    <div style={{height:4,background:"#1a1f2e",borderRadius:2,overflow:"hidden"}}>
                      <div style={{width:`${Math.min(100,(val/max)*100)}%`,height:"100%",background:"linear-gradient(90deg,#00b8ff,#00ff9d)",borderRadius:2}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{marginTop:28,background:"#0a0e1a",border:"1px solid #1e2535",borderRadius:12,padding:"20px 24px"}}>
            <div style={{fontSize:12,color:"#606880",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:1,marginBottom:14}}>Filtro Combo – Cumplimiento</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12}}>
              {[["ROIC > 15%",s.roic>15],["FCF Yield > 6%",s.fcfYield>6],["ND/EBITDA < 2",s.netDebtEbitda<2],["Rev Growth > 6%",s.revGrowth5y>6],["EV/EBITDA < 12",s.evEbitda<12]].map(([label,pass])=>(
                <div key={label} style={{background:pass?"#00ff9d0a":"#ff44660a",border:`1px solid ${pass?"#00ff9d33":"#ff446633"}`,borderRadius:8,padding:"10px 14px",textAlign:"center"}}>
                  <div style={{fontSize:18,marginBottom:4}}>{pass?"✓":"✗"}</div>
                  <div style={{fontSize:11,color:pass?"#00ff9d":"#ff4466",fontFamily:"'JetBrains Mono',monospace"}}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:12,fontSize:12,color:"#8892a4"}}>
              {[s.roic>15,s.fcfYield>6,s.netDebtEbitda<2,s.revGrowth5y>6,s.evEbitda<12].filter(Boolean).length}/5 criterios
              {[s.roic>15,s.fcfYield>6,s.netDebtEbitda<2,s.revGrowth5y>6,s.evEbitda<12].every(Boolean)&&<span style={{color:"#00ff9d",marginLeft:8,fontWeight:600}}>🔥 OPORTUNIDAD PERFECTA</span>}
            </div>
          </div>
        </div>
      ):null}

      <div style={{borderTop:"1px solid #12172a",padding:"14px 32px",display:"flex",justifyContent:"space-between",marginTop:40}}>
        <span style={{fontSize:11,color:"#3a4458",fontFamily:"'JetBrains Mono',monospace"}}>ValueRadar © 2026 · Solo ilustrativo. No es asesoramiento financiero.</span>
        <span style={{fontSize:11,color:"#3a4458",fontFamily:"'JetBrains Mono',monospace"}}>Haz clic en una empresa para ver el análisis completo</span>
      </div>
    </div>
  );
}
