
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Droplet, 
  Battery, 
  Thermometer, 
  Power,
  Bell,
  User,
  Info,
  ShoppingCart,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Github,
  Download,
  CheckCircle2,
  X,
  RefreshCw
} from 'lucide-react';
import { TankData, SmartInsight } from './types';
import { getSmartInsights } from './services/geminiService';

const INITIAL_TANK: TankData = {
  id: 'tank-1',
  name: 'Home Tank Alpha',
  level: 0,
  battery: 0,
  temperature: 0,
  isPumpOn: false,
  isOnline: false,
  lastSync: 'Never'
};

const App: React.FC = () => {
  const [tank, setTank] = useState<TankData>(INITIAL_TANK);
  const [insights, setInsights] = useState<SmartInsight[]>([]);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPwaBanner, setShowPwaBanner] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // REAL API FETCHING LOGIC (Simulated for hardware integration)
  const fetchTankStatus = async () => {
    setIsSyncing(true);
    try {
      // REPLACE THIS BLOCK WITH YOUR ACTUAL API CALL:
      // const response = await fetch('https://your-api.com/tank-status');
      // const data = await response.json();
      
      // Simulating a 1.5s network delay from IoT Cloud
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const realTimeData: TankData = {
        ...INITIAL_TANK,
        level: Math.floor(Math.random() * 40) + 50, // Simulated dynamic level
        battery: 88,
        temperature: 24,
        isOnline: true,
        lastSync: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      
      setTank(realTimeData);
      
      // Refresh AI Insights whenever we get new hardware data
      const aiInsights = await getSmartInsights(realTimeData);
      setInsights(aiInsights);
    } catch (error) {
      console.error("Hardware Sync Error:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    // PWA Detection
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPwaBanner(true);
    });

    // Initial system boot
    const bootSequence = async () => {
      await fetchTankStatus();
      setIsBooting(false);
    };
    bootSequence();
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPwaBanner(false);
    }
  };

  const handleTogglePump = () => {
    // In a real app, this would send a POST request to your hardware to turn the relay on/off
    setTank(prev => ({ ...prev, isPumpOn: !prev.isPumpOn }));
  };

  if (isBooting) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0a0f1e]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-cyan-500/20 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
        </div>
        <span className="mt-6 font-orbitron tracking-[0.3em] text-cyan-400 text-xs animate-pulse">CONNECTING TO IOT DEVICE...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex flex-col selection:bg-cyan-500/30">
      {/* PWA Floating Banner */}
      {showPwaBanner && (
        <div className="fixed top-4 inset-x-4 z-[100] animate-in slide-in-from-top-full duration-500">
          <div className="bg-cyan-500 text-slate-900 p-4 rounded-2xl flex items-center justify-between shadow-[0_10px_40px_rgba(34,211,238,0.5)]">
            <div className="flex items-center gap-3">
              <Download size={20} className="animate-bounce" />
              <div className="text-sm font-bold leading-tight">Install ioTank App<br/><span className="text-[10px] opacity-70 uppercase tracking-tighter">Faster & Better access</span></div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleInstallClick} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-90 transition-transform">Install</button>
              <button onClick={() => setShowPwaBanner(false)} className="p-2 hover:bg-black/10 rounded-full"><X size={18} /></button>
            </div>
          </div>
        </div>
      )}

      {/* Optimized Header */}
      <header className="px-6 py-4 flex items-center justify-between z-10 sticky top-0 bg-[#0a0f1e]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <Droplet className="text-slate-950" size={20} fill="currentColor" />
          </div>
          <span className="font-orbitron text-xl font-black text-white tracking-tighter">io<span className="text-cyan-400">Tank</span></span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-emerald-500/20">
            <div className={`w-1.5 h-1.5 rounded-full ${tank.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
            {tank.isOnline ? 'Online' : 'Offline'}
          </div>
          <button className="text-slate-500 hover:text-white transition-colors"><Bell size={22} /></button>
        </div>
      </header>

      {/* Main Content - HIGHLY COMPACT FOR ABOVE THE FOLD */}
      <main className="flex-1 flex flex-col items-center px-6 pt-4 pb-12">
        
        {/* Sync Status - Visual confirmation of "api fetching" */}
        <div className="flex items-center gap-2 mb-6 bg-slate-900/40 border border-white/5 px-3 py-1.5 rounded-full">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Last Sync: {tank.lastSync}</span>
          <button 
            onClick={fetchTankStatus} 
            disabled={isSyncing}
            className={`p-1.5 rounded-full hover:bg-white/5 transition-colors ${isSyncing ? 'animate-spin text-cyan-400' : 'text-slate-400'}`}
          >
            <RefreshCw size={12} />
          </button>
        </div>

        {/* Central Tank Visualization */}
        <section className="w-full flex flex-col items-center mb-8">
           <div className="text-center mb-6">
              <div className="text-5xl font-orbitron font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                {isSyncing ? '---' : `${tank.level}%`}
              </div>
              <h1 className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.4em] mt-2">Tank Level Capacity</h1>
           </div>

           <div className="w-44 h-64 md:w-52 md:h-72 border-[8px] border-slate-800 rounded-[3.5rem] relative p-1.5 bg-slate-950/90 shadow-[0_30px_80px_rgba(0,0,0,0