import React, { useMemo, useState } from 'react';
import { Activity, ArrowDown, ArrowUp, Bell, ChevronDown, Clock3, History, LayoutDashboard, Menu, Settings, ShieldCheck, Wallet } from 'lucide-react';

const pairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'BTC/USD'];
const initial = Array.from({length:34}, (_,i) => 1.082 + Math.sin(i/2.7)*0.003 + i*0.00008);
export default function App(){
  const [pair,setPair]=useState('EUR/USD'), [balance,setBalance]=useState(10000), [amount,setAmount]=useState(100), [duration,setDuration]=useState('1 min'), [side,setSide]=useState(''), [history,setHistory]=useState([]);
  const prices=useMemo(()=>initial.map((v,i)=>v+(pair==='BTC/USD'?i*.0007:0)),[pair]);
  const current=prices[prices.length-1];
  function trade(direction){
    if(amount<=0 || amount>balance) return;
    const win=Math.random()>.48, payout=amount*.82, result=win?'WIN':'LOSS';
    const pnl=win?payout:-amount;
    setBalance(b=>b+pnl);
    setHistory(h=>[{id:Date.now(),pair,direction,amount,result,pnl,time:new Date().toLocaleTimeString()},...h].slice(0,8));
    setSide(direction);
  }
  return <div className="app">
    <header><div className="brand"><span className="brandmark">T</span><b>TRADEDESK</b><small>DEMO</small></div><button className="iconbtn"><Menu/></button><div className="topright"><span className="status"><i/> Demo account</span><div className="balance"><Wallet size={16}/> ${balance.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div><button className="profile">JD</button></div></header>
    <div className="layout">
      <aside><div className="navitem active"><LayoutDashboard/>Trading</div><div className="navitem"><History/>Trade history</div><div className="navitem"><Wallet/>Wallet</div><div className="navitem"><Settings/>Settings</div><div className="sidebottom"><ShieldCheck/><span>Simulation mode<br/><small>No real funds</small></span></div></aside>
      <main>
        <div className="toolbar"><div className="pairselect"><span className="pairicon">€</span><div><b>{pair}</b><small>OTC · Demo feed</small></div><select value={pair} onChange={e=>setPair(e.target.value)} aria-label="Trading pair">{pairs.map(p=><option key={p}>{p}</option>)}</select><ChevronDown size={16}/></div><div className="marketmeta"><span><small>Market status</small><b className="green">● Simulated</b></span><span><small>Current price</small><b>{current.toFixed(pair==='USD/JPY'?3:5)}</b></span></div></div>
        <section className="chartcard"><div className="charthead"><div><b>Price chart</b><small>Illustrative simulated prices — not live market data</small></div><div className="timebuttons"><button>1m</button><button>5m</button><button>15m</button><button className="selected">1H</button></div></div>
          <div className="chart"><div className="gridlines"><span>1.08600</span><span>1.08400</span><span>1.08200</span><span>1.08000</span><span>1.07800</span></div><svg viewBox="0 0 900 340" preserveAspectRatio="none" role="img" aria-label="Illustrative price line chart"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#25c995" stopOpacity=".22"/><stop offset="1" stopColor="#25c995" stopOpacity="0"/></linearGradient></defs><path d={'M '+prices.map((v,i)=>`${i*27},${245-(v-1.075)*30000}`).join(' L ')} fill="none" stroke="#28c99a" strokeWidth="3" vectorEffect="non-scaling-stroke"/><path d={'M '+prices.map((v,i)=>`${i*27},${245-(v-1.075)*30000}`).join(' L ')+' L 900,340 L 0,340 Z'} fill="url(#area)"/></svg><div className="charttag"> {current.toFixed(5)} </div></div><div className="chartfoot"><span>09:00</span><span>10:00</span><span>11:00</span><span>12:00</span><span>13:00</span><span>14:00</span></div></section>
        <div className="lower"><section className="historycard"><div className="sectiontitle"><b>Recent demo trades</b><span>Latest activity</span></div>{history.length===0?<div className="empty"><Activity size={25}/><b>No trades yet</b><small>Your simulated trades will appear here.</small></div>:history.map(t=><div className="trade" key={t.id}><div className={'tradeicon '+(t.direction==='UP'?'up':'down')}>{t.direction==='UP'?<ArrowUp/>:<ArrowDown/>}</div><div className="tradeinfo"><b>{t.pair} · {t.direction}</b><small>{t.time} · {t.amount} stake</small></div><div className={t.pnl>=0?'green':'red'}>{t.pnl>=0?'+':''}${t.pnl.toFixed(2)}<small>{t.result}</small></div></div>)}</section>
          <section className="ordercard"><div className="sectiontitle"><b>Place demo trade</b><span className="demo-pill">DEMO ONLY</span></div><label>Investment amount</label><div className="amountbox"><span>$</span><input type="number" min="1" max={balance} value={amount} onChange={e=>setAmount(Number(e.target.value))}/></div><div className="quick"><button onClick={()=>setAmount(50)}>$50</button><button onClick={()=>setAmount(100)}>$100</button><button onClick={()=>setAmount(500)}>$500</button></div><label>Trade duration</label><select className="duration" value={duration} onChange={e=>setDuration(e.target.value)}><option>30 sec</option><option>1 min</option><option>5 min</option><option>15 min</option></select><div className="payout"><span>Potential return</span><b>+82%</b></div><div className="actions"><button className="upbtn" onClick={()=>trade('UP')}><ArrowUp/> Higher</button><button className="downbtn" onClick={()=>trade('DOWN')}><ArrowDown/> Lower</button></div><small className="disclaimer">Outcomes are randomly simulated for interface testing. This is not a real trading service.</small></section></div>
      </main>
    </div>
    <footer><span>TradeDesk Demo</span><span><Clock3 size={13}/> Interface prototype · No deposits or withdrawals</span></footer>
  </div>
}