/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Target, 
  Sword, 
  AlertCircle, 
  X,
  Zap,
  RotateCcw,
  Book,
  Menu,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  StatusBar, 
  Quest, 
  GrindTask, 
  Problem, 
  Character, 
  Reward,
  CreationType,
  Skill 
} from './types';

// Simple UID generator
const uid = () => Math.random().toString(36).substring(2, 9);

// Auto-Rank Calculation
const getSystemRank = (level: number) => {
  if (level >= 100) return 'ALPHA';
  if (level >= 90) return 'Z-RANK';
  if (level >= 80) return 'X-RANK';
  if (level >= 70) return 'SSS-RANK';
  if (level >= 60) return 'SS-RANK';
  if (level >= 50) return 'S-RANK';
  if (level >= 40) return 'A-RANK';
  if (level >= 30) return 'B-RANK';
  if (level >= 20) return 'C-RANK';
  if (level >= 10) return 'D-RANK';
  return 'E-RANK';
};

export default function App() {
  // --- INITIAL STATE ---
  const [character, setCharacter] = useState<Character>(() => {
    try {
      const saved = localStorage.getItem('rpg_character');
      return saved ? JSON.parse(saved) : { 
        name: 'SUNG JIN-WOO', 
        level: 1, 
        exp: 0 
      };
    } catch (e) {
      return { 
        name: 'SUNG JIN-WOO', 
        level: 1, 
        exp: 0 
      };
    }
  });

  const [statusBars, setStatusBars] = useState<StatusBar[]>(() => {
    try {
      const saved = localStorage.getItem('rpg_statusBars');
      return saved ? JSON.parse(saved).map((bar: any) => ({ ...bar, repeatCount: bar.repeatCount || 0 })) : [
        { id: '1', name: 'HP', color: '#ef4444', value: 80, max: 100, repeatCount: 0 },
        { id: '2', name: 'MP', color: '#3b82f6', value: 50, max: 100, repeatCount: 0 },
        { id: '3', name: 'Fatigue', color: '#a855f7', value: 20, max: 100, repeatCount: 0 },
      ];
    } catch (e) {
      return [
        { id: '1', name: 'HP', color: '#ef4444', value: 80, max: 100, repeatCount: 0 },
        { id: '2', name: 'MP', color: '#3b82f6', value: 50, max: 100, repeatCount: 0 },
        { id: '3', name: 'Fatigue', color: '#a855f7', value: 20, max: 100, repeatCount: 0 },
      ];
    }
  });

  const [mainQuest, setMainQuest] = useState<Quest | null>(() => {
    try {
      const saved = localStorage.getItem('rpg_mainQuest');
      return saved ? JSON.parse(saved) : {
        id: 'main-1',
        title: 'Become the Strongest',
        description: 'Break your limits and ascend to the throne of shadows.',
        type: 'main',
        rewards: []
      };
    } catch (e) {
      return {
        id: 'main-1',
        title: 'Become the Strongest',
        description: 'Break your limits and ascend to the throne of shadows.',
        type: 'main',
        rewards: []
      };
    }
  });

  const [sideQuests, setSideQuests] = useState<Quest[]>(() => {
    try {
      const saved = localStorage.getItem('rpg_sideQuests');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [grindTasks, setGrindTasks] = useState<GrindTask[]>(() => {
    try {
      const saved = localStorage.getItem('rpg_grindTasks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [problems, setProblems] = useState<Problem[]>(() => {
    try {
      const saved = localStorage.getItem('rpg_problems');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    try {
      const saved = localStorage.getItem('rpg_skills');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [theme, setTheme] = useState<string>(() => localStorage.getItem('rpg_theme') || 'indigo');
  
  // Theme configuration for Tailwind classes
  const themeColors: Record<string, { primary: string; text: string; bg: string; border: string; hover: string; shadow: string; glow: string }> = {
    indigo: { 
      primary: 'indigo-500', 
      text: 'indigo-400', 
      bg: 'indigo-600', 
      border: 'indigo-500/20', 
      hover: 'indigo-500',
      shadow: 'shadow-indigo-600/20',
      glow: 'rgba(79,70,229,0.2)'
    },
    rose: { 
      primary: 'rose-500', 
      text: 'rose-400', 
      bg: 'rose-600', 
      border: 'rose-500/20', 
      hover: 'rose-500',
      shadow: 'shadow-rose-600/20',
      glow: 'rgba(244,63,94,0.2)'
    },
    amber: { 
      primary: 'amber-500', 
      text: 'amber-400', 
      bg: 'amber-600', 
      border: 'amber-500/20', 
      hover: 'amber-500', 
      shadow: 'shadow-amber-600/20',
      glow: 'rgba(245,158,11,0.2)'
    },
    emerald: { 
      primary: 'emerald-500', 
      text: 'emerald-400', 
      bg: 'emerald-600', 
      border: 'emerald-500/20', 
      hover: 'emerald-500', 
      shadow: 'shadow-emerald-600/20',
      glow: 'rgba(16,185,129,0.2)'
    }
  };

  const t = themeColors[theme] || themeColors.indigo;
  const tColor = theme === 'rose' ? 'rose' : theme === 'amber' ? 'amber' : theme === 'emerald' ? 'emerald' : 'indigo';

  // --- PERSISTENCE ---
  useEffect(() => {
    localStorage.setItem('rpg_character', JSON.stringify(character));
    localStorage.setItem('rpg_statusBars', JSON.stringify(statusBars));
    localStorage.setItem('rpg_mainQuest', JSON.stringify(mainQuest));
    localStorage.setItem('rpg_sideQuests', JSON.stringify(sideQuests));
    localStorage.setItem('rpg_grindTasks', JSON.stringify(grindTasks));
    localStorage.setItem('rpg_problems', JSON.stringify(problems));
    localStorage.setItem('rpg_skills', JSON.stringify(skills));
    localStorage.setItem('rpg_theme', theme);
  }, [character, statusBars, mainQuest, sideQuests, grindTasks, problems, skills, theme]);

  // --- ACTIONS ---

  const handleClaimReward = (rewards: Reward[]) => {
    let totalOverflow = 0;
    
    // Add floating text rewards
    const newFloats = rewards.map(r => {
      const bar = statusBars.find(b => b.id === r.statusBarId);
      return {
        id: uid(),
        amount: r.amount,
        statName: bar?.name || 'STAT',
        color: bar?.color || '#fff'
      };
    });
    setRewardFloats(prev => [...prev, ...newFloats]);
    setTimeout(() => {
      setRewardFloats(prev => prev.filter(f => !newFloats.find(nf => nf.id === f.id)));
    }, 2000);

    // Calculate new status bars and overflow count before updating state
    // to ensure XP addition is based on actual completions.
    const nextStatusBars = statusBars.map(bar => {
      const reward = rewards.find(r => r.statusBarId === bar.id);
      if (reward) {
        let newValue = bar.value + reward.amount;
        let newRepeatCount = bar.repeatCount;
        
        while (newValue >= bar.max) {
          newValue -= bar.max;
          newRepeatCount += 1;
          totalOverflow += 1;
        }
        
        return { ...bar, value: newValue, repeatCount: newRepeatCount };
      }
      return bar;
    });

    setStatusBars(nextStatusBars);
    
    if (totalOverflow > 0) {
      setCharacter(prev => {
        // Gain 20% of level XP (20% of 1000 = 200) per reset
        let newExp = prev.exp + (totalOverflow * 200);
        let newLevel = prev.level;
        
        // Level up logic (1000 XP per level)
        while (newExp >= 1000) {
          newExp -= 1000;
          newLevel += 1;
        }
        
        return { ...prev, level: newLevel, exp: newExp };
      });
    }
  };

  const [activeConfirmation, setActiveConfirmation] = useState<'reset-stats' | 'wipe-system' | null>(null);

  const [creationModal, setCreationModal] = useState<{
    isOpen: boolean;
    type: CreationType | null;
  }>({
    isOpen: false,
    type: null,
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState<number | null>(null);
  const [screenShake, setScreenShake] = useState(false);
  const [rewardFloats, setRewardFloats] = useState<{ id: string; amount: number; statName: string; color: string }[]>([]);
  const [expandedQuestId, setExpandedQuestId] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  // Derived rank
  const currentRank = getSystemRank(character.level);

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('rpg_welcome_shown');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
      sessionStorage.setItem('rpg_welcome_shown', 'true');
      setTimeout(() => setShowWelcome(false), 4500);
    }
  }, []);

  // Trigger level up animation
  useEffect(() => {
    const savedLevel = localStorage.getItem('rpg_last_level');
    const currentLevel = character.level;
    
    if (savedLevel && parseInt(savedLevel) < currentLevel) {
      setShowLevelUp(currentLevel);
      setTimeout(() => setShowLevelUp(null), 3000);
    }
    localStorage.setItem('rpg_last_level', currentLevel.toString());
  }, [character.level]);

  const handleApplyPenalty = (penalty: number) => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 500);
    setCharacter(prev => {
      const totalExp = (prev.level * 1000) + prev.exp;
      const newTotalExp = Math.max(0, totalExp - penalty);
      const newLevel = Math.floor(newTotalExp / 1000);
      const newExp = newTotalExp % 1000;
      return { ...prev, level: newLevel, exp: newExp };
    });
  };

  const handleExport = () => {
    const data = {
      character,
      statusBars,
      mainQuest,
      sideQuests,
      grindTasks,
      problems,
      skills,
      theme,
      version: '5.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system_state_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.character) setCharacter(data.character);
        if (data.statusBars) setStatusBars(data.statusBars.map((b: any) => ({ ...b, repeatCount: b.repeatCount || 0 })));
        if (data.mainQuest) setMainQuest(data.mainQuest);
        if (data.sideQuests) setSideQuests(data.sideQuests);
        if (data.grindTasks) setGrindTasks(data.grindTasks);
        if (data.problems) setProblems(data.problems);
        if (data.skills) setSkills(data.skills);
        if (data.theme) setTheme(data.theme);
        alert('System Synchronization Successful');
      } catch (err) {
        alert('Invalid System Data Map incompatible with current protocol.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  return (
    <div className={`min-h-screen bg-[#020617] text-[#f8fafc] font-sans p-4 md:p-8 selection:bg-${tColor}-500 selection:text-white overflow-x-hidden`}>
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[300] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* GRID OVERLAY */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col items-center gap-4 relative z-10"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1] }}
                transition={{ delay: 1, duration: 0.5 }}
                className={`text-[10px] uppercase font-black tracking-[0.8em] text-${tColor}-400 mb-2`}
              >
                System Initializing
              </motion.div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase text-center px-4 leading-none">
                Welcome, <br />
                <span className={`text-${tColor}-500 drop-shadow-[0_0_20px_rgba(var(--color-${tColor}-500),0.3)] px-2`}>{character.name}</span>
              </h2>
              
              <div className="w-64 sm:w-80 h-[2px] bg-slate-800 mt-8 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ delay: 1.5, duration: 2, ease: "easeInOut" }}
                  className={`absolute inset-0 bg-gradient-to-r from-transparent via-${tColor}-500 to-transparent`}
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 0.5 }}
                className="text-slate-500 text-[9px] font-black uppercase tracking-[0.4em] mt-4"
              >
                Mapping Neural Interface ... Success
              </motion.div>
            </motion.div>
            
            {/* AMBIENT SCAN LINE */}
            <motion.div 
              animate={{ y: ['-100%', '300%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className={`absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-${tColor}-500/5 to-transparent pointer-events-none`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-${tColor}-500/10 rounded-full blur-[120px]`}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        animate={screenShake ? { x: [-5, 5, -5, 5, 0], y: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto relative z-10 flex flex-col gap-8"
      >
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 bg-${tColor}-600 rounded-xl flex items-center justify-center font-black text-2xl shadow-lg shadow-${tColor}-600/20`}>
              {character.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">
                {character.name}
              </h1>
              <div className="flex items-center gap-2 sm:gap-3 mt-1.5 sm:mt-1">
                <span className={`bg-${tColor}-500/10 text-${tColor}-400 px-2 sm:px-3 py-1 sm:py-0.5 rounded-md sm:rounded text-[9px] sm:text-[10px] font-bold border border-${tColor}-500/20 uppercase tracking-widest leading-none flex items-center justify-center min-w-[50px] sm:min-w-0`}>LVL {character.level}</span>
                <span className="bg-emerald-500/10 text-emerald-400 px-2 sm:px-2.5 py-1 sm:py-0.5 rounded-md sm:rounded text-[8px] sm:text-[9px] font-black border border-emerald-500/20 uppercase tracking-tighter flex items-center justify-center min-w-[50px] sm:min-w-0">{currentRank}</span>
                <div className="w-24 sm:w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden ml-1 sm:ml-2 shrink-0">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(character.exp / 1000) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className={`h-full bg-${tColor}-500 rounded-full`}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 items-center w-full md:w-auto">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className={`p-2.5 bg-${tColor}-600/20 hover:bg-${tColor}-600/30 border border-${tColor}-500/30 rounded-full text-${tColor}-400 transition-all flex items-center gap-2 px-4 group`}
            >
              <Book size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase font-black tracking-widest hidden sm:inline">Skills</span>
            </button>
            <div className="hidden sm:flex bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 gap-4 text-xs font-semibold">
              <span className="text-slate-400">EXP: {Math.floor(character.exp)} / 1,000</span>
              <span className={`text-${tColor}-400 uppercase tracking-tighter`}>Rank: {currentRank}</span>
            </div>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50 rounded-full text-slate-400 transition-all ml-auto md:ml-0"
            >
              <Settings size={20} />
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-auto">
          {/* STATUS ATTRIBUTES - Bento Card */}
          <div className="md:col-span-12 flex flex-col">
            <section className="bento-card h-full">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status Attributes</h2>
                <button 
                  onClick={() => setIsSettingsOpen(true)}
                  className={`text-${tColor}-400 text-[10px] uppercase font-bold hover:underline`}
                >
                  + New Bar
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                {statusBars.map(bar => (
                  <div key={bar.id} className="group">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight mb-2">
                       <div className="flex items-center gap-2">
                         <span className="text-slate-300">{bar.name}</span>
                         {bar.repeatCount > 0 && <span className={`text-[9px] text-${tColor}-400 opacity-80`}>(x{bar.repeatCount})</span>}
                       </div>
                       <span style={{ color: bar.color }}>{Math.floor(bar.value)} / {bar.max}</span>
                    </div>
                    <div className="status-bar-container">
                      <motion.div 
                        className="h-full rounded-full"
                        style={{ backgroundColor: bar.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(bar.value / bar.max) * 100}%` }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    </div>
                  </div>
                ))}
                {statusBars.length === 0 && (
                  <p className="col-span-2 text-xs text-slate-500 italic opacity-50 py-4">No attributes initialized.</p>
                )}
              </div>
            </section>
          </div>

          {/* MAIN QUEST - Bento Card Full Width */}
          <div className="md:col-span-12">
            {mainQuest ? (
              <section className={`bento-card border-${tColor}-500/30 bg-${tColor}-500/5 relative overflow-hidden group`}>
                <div className={`absolute top-0 right-0 w-64 h-full bg-${tColor}-500/5 blur-3xl pointer-events-none`}></div>
                <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                  <div className="shrink-0 scale-75 md:scale-100">
                    <div className={`px-4 py-1.5 bg-${tColor}-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-${tColor}-500/20`}>
                      Main Quest
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-xl font-bold tracking-tight text-white mb-1 group-hover:text-${tColor}-300 transition-colors`}>{mainQuest.title}</h4>
                    <p className="text-slate-400 text-sm italic opacity-70">Objective: {mainQuest.description || 'Ascend beyond the final limit.'}</p>
                  </div>
                  <div className="flex items-center gap-6 text-slate-500 text-sm">
                    <button 
                      onClick={() => setMainQuest(null)}
                      className="p-2 hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </section>
            ) : (
              <button 
                onClick={() => setCreationModal({ isOpen: true, type: 'main-quest' })}
                className={`w-full bento-card border-dashed border-slate-700 bg-transparent hover:bg-${tColor}-500/5 hover:border-${tColor}-500/30 transition-all flex flex-row items-center justify-center gap-3 text-slate-500 h-[80px]`}
              >
                <Plus size={20} />
                <span className="uppercase text-xs font-bold tracking-[0.2em]">Initialize Prime Directive</span>
              </button>
            )}
          </div>

          {/* SIDE QUESTS - Bento Card */}
          <div className="md:col-span-4 row-span-3">
            <section className="bento-card h-full min-h-[400px]">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Side Quests</h2>
                <button 
                  onClick={() => setCreationModal({ isOpen: true, type: 'side-quest' })}
                  className={`w-8 h-8 rounded-full bg-slate-800 hover:bg-${tColor}-600 transition-all flex items-center justify-center text-white text-lg`}
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {sideQuests.map(quest => (
                    <motion.div 
                      key={quest.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => setExpandedQuestId(expandedQuestId === quest.id ? null : quest.id)}
                      className={`p-4 rounded-[20px] bg-slate-800/40 border border-slate-700/50 flex flex-col gap-4 group/quest transition-all cursor-pointer ${expandedQuestId === quest.id ? 'ring-1 ring-emerald-500/30 bg-slate-800' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <h5 className={`font-bold text-sm tracking-tight text-white transition-all ${expandedQuestId === quest.id ? '' : 'line-clamp-2'}`}>{quest.title}</h5>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSideQuests(sideQuests.filter(q => q.id !== quest.id));
                          }}
                          className="text-slate-500 hover:text-red-400 transition-colors text-xl font-light leading-none"
                        >
                          ×
                        </button>
                      </div>

                      <AnimatePresence>
                        {expandedQuestId === quest.id && quest.description && (
                          <motion.p 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 0.6 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-[11px] text-slate-400 leading-relaxed overflow-hidden italic"
                          >
                            {quest.description}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <div className="flex justify-between items-center mt-auto">
                        {quest.rewards.map((rew, i) => {
                          const bar = statusBars.find(b => b.id === rew.statusBarId);
                          const isExp = rew.statusBarId === 'exp';
                          return (
                            <div key={i} className="flex flex-col gap-1">
                               <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: isExp ? `var(--color-${tColor}-400)` : (bar?.color || '#94a3b8') }}>
                                 +{rew.amount} {isExp ? 'EXP' : (bar?.name || 'STAT')}
                               </span>
                            </div>
                          );
                        })}
                        <button 
                          onClick={() => {
                            handleClaimReward(quest.rewards);
                            setSideQuests(sideQuests.filter(q => q.id !== quest.id));
                          }}
                          className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black rounded-lg px-4 py-1.5 text-[10px] font-bold uppercase transition-all"
                        >
                          Claim
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {sideQuests.length === 0 && (
                  <div className="py-12 flex flex-col items-center justify-center gap-3 opacity-20 grayscale border-2 border-dashed border-slate-800 rounded-[20px]">
                    <Target size={32} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">No active side goals</span>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* INFINITE GRIND - Bento Card */}
          <div className="md:col-span-4 row-span-3">
            <section className="bento-card h-full min-h-[400px]">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Infinite Grind</h2>
                <button 
                  onClick={() => setCreationModal({ isOpen: true, type: 'grind-task' })}
                  className={`w-8 h-8 rounded-full bg-slate-800 hover:bg-${tColor}-600 transition-all flex items-center justify-center text-white text-lg`}
                >
                   <Plus size={18} />
                </button>
              </div>
              <div className="space-y-4">
                {grindTasks.map(task => (
                  <motion.div 
                    layout
                    key={task.id}
                    className="p-4 rounded-[20px] border border-dashed border-slate-700/50 flex flex-col gap-4 group/grind"
                  >
                    <div className="flex justify-between items-start">
                      <h5 className="font-bold text-sm tracking-tight text-white">{task.title}</h5>
                      <button 
                        onClick={() => setGrindTasks(grindTasks.filter(t => t.id !== task.id))}
                        className="text-slate-500 hover:text-red-400 transition-colors text-xl font-light leading-none"
                      >
                         ×
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-auto">
                      {task.rewards.map((rew, i) => {
                        const bar = statusBars.find(b => b.id === rew.statusBarId);
                        const isExp = rew.statusBarId === 'exp';
                        return (
                          <span key={i} className="text-[9px] font-black uppercase tracking-widest" style={{ color: isExp ? `var(--color-${tColor}-400)` : (bar?.color || '#94a3b8') }}>
                            +{rew.amount} {isExp ? 'EXP' : (bar?.name || 'STAT')}
                          </span>
                        );
                      })}
                      <button 
                        onClick={() => handleClaimReward(task.rewards)}
                        className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black rounded-lg px-4 py-1.5 text-[10px] font-bold uppercase transition-all flex items-center gap-2"
                      >
                         <RotateCcw size={12} /> Claim
                      </button>
                    </div>
                  </motion.div>
                ))}
                {grindTasks.length === 0 && (
                   <div className="py-12 flex flex-col items-center justify-center gap-3 opacity-20 grayscale border-2 border-dashed border-slate-800 rounded-[20px]">
                      <Sword size={32} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">No loops defined</span>
                   </div>
                )}
              </div>
            </section>
          </div>

          {/* ACTIVE PROBLEMS - Bento Card */}
          <div className="md:col-span-4 row-span-3">
            <section className="bento-card h-full min-h-[400px]">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-[10px] font-bold text-rose-500/50 uppercase tracking-widest">Active Problems</h2>
                <button 
                   onClick={() => setCreationModal({ isOpen: true, type: 'problem' })}
                   className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center text-lg shadow-lg shadow-rose-500/5"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="space-y-3">
                {problems.map(prob => (
                  <motion.div 
                    layout
                    key={prob.id}
                    className="flex items-center justify-between p-4 bg-rose-500/5 border border-rose-500/10 rounded-[20px] group/prob"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-300">{prob.title}</span>
                        {prob.xpPenalty > 0 && <span className="text-[9px] text-rose-500/60 font-bold uppercase">Penalty: -{prob.xpPenalty} XP</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleApplyPenalty(prob.xpPenalty)}
                        className="text-[10px] bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-black px-2 py-1 rounded-lg border border-rose-500/20 font-bold uppercase transition-all"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => setProblems(problems.filter(p => p.id !== prob.id))}
                        className="p-1 text-slate-500 hover:text-white transition-all"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
                {problems.length === 0 && (
                  <div className="py-12 flex flex-col items-center justify-center gap-3 opacity-20 border-2 border-dashed border-slate-800 rounded-[20px]">
                     <AlertCircle size={32} />
                     <span className="text-[10px] font-bold uppercase tracking-widest">Stability: Optimal</span>
                  </div>
                )}
              </div>
              <div className="mt-auto pt-6 border-t border-slate-800 text-[10px] text-slate-500 text-center italic leading-relaxed opacity-60">
                 Every problem is a hidden quest for systematic growth.
              </div>
            </section>
          </div>
        </main>

        <footer className="py-12 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-800 select-none">
          <div className="flex items-center gap-3 grayscale opacity-30">
            <Zap size={16} />
            <span className="text-[10px] tracking-[0.4em] font-black uppercase">Core Protocol v4.0</span>
          </div>
          <p className="text-[9px] text-slate-600 uppercase tracking-widest font-medium">Bento System Interface © 2026</p>
        </footer>
      </motion.div>

      {/* SETTINGS MODAL */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`w-full max-w-2xl bg-[#0a0a0a] border border-${tColor}-500/50 rounded-[32px] p-6 md:p-8 shadow-[0_0_50px_rgba(79,70,229,0.2)]`}
            >
              <div className={`flex justify-between items-center mb-8 pb-4 border-b border-${tColor}-500/20`}>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">System Configuration</h2>
                <button onClick={() => setIsSettingsOpen(false)} className={`p-2 hover:bg-white/5 rounded-full transition-colors text-${tColor}-500`}>
                  <X />
                </button>
              </div>

              <div className="space-y-8 overflow-y-auto max-h-[70vh] pr-2 no-scrollbar">
                {/* SYSTEM THEME */}
                <section className="space-y-6 flex flex-col items-center">
                  <label className={`text-[10px] uppercase font-bold tracking-[0.3em] text-${tColor}-400/60 block text-center`}>System Theme</label>
                  <div className="flex gap-6 justify-center flex-wrap">
                    {[
                      { id: 'indigo', color: '#6366f1', label: 'Indigo' },
                      { id: 'rose', color: '#f43f5e', label: 'Rose' },
                      { id: 'amber', color: '#f59e0b', label: 'Amber' },
                      { id: 'emerald', color: '#10b981', label: 'Emerald' }
                    ].map(tInfo => (
                      <button
                        key={tInfo.id}
                        onClick={() => setTheme(tInfo.id)}
                        className="group relative flex flex-col items-center gap-2"
                      >
                        <div 
                          className={`w-12 h-12 rounded-2xl transition-all duration-300 border-2 ${theme === tInfo.id ? `border-${tInfo.id}-400 scale-110 shadow-lg` : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105'}`}
                          style={{ 
                            backgroundColor: tInfo.color,
                            boxShadow: theme === tInfo.id ? `0 0 20px ${tInfo.color}40` : 'none'
                          }}
                        />
                        <span className={`text-[8px] font-black uppercase tracking-widest ${theme === tInfo.id ? `text-${tInfo.id}-400` : 'text-slate-600'}`}>{tInfo.label}</span>
                      </button>
                    ))}
                  </div>
                </section>
                {/* CHARACTER IDENTITY */}
                <section className="space-y-3">
                  <label className={`text-[10px] uppercase font-bold tracking-[0.3em] text-${tColor}-400/60 block`}>Owner Identity</label>
                  <input 
                    type="text" 
                    value={character.name}
                    onChange={(e) => setCharacter({ ...character, name: e.target.value.toUpperCase() })}
                    className={`w-full bg-slate-900 border border-[#334155]/50 p-4 rounded-xl text-lg font-bold focus:outline-none focus:border-${tColor}-400 transition-all text-white`}
                  />
                </section>

                <hr className={`border-${tColor}-500/10`} />

                {/* STATUS BARS MANAGEMENT */}
                <section className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className={`text-[10px] uppercase font-bold tracking-[0.3em] text-${tColor}-400/60`}>Status Parameters</label>
                    <div className="flex gap-4">
                      {activeConfirmation === 'reset-stats' ? (
                        <div className="flex items-center gap-2">
                           <span className="text-[8px] font-black uppercase text-rose-500 animate-pulse">Confirm Reset?</span>
                           <div className="flex gap-1">
                             <button 
                              onClick={() => {
                                setStatusBars([
                                  { id: '1', name: 'HP', color: '#ef4444', value: 80, max: 100, repeatCount: 0 },
                                  { id: '2', name: 'MP', color: '#3b82f6', value: 50, max: 100, repeatCount: 0 },
                                  { id: '3', name: 'Fatigue', color: '#a855f7', value: 20, max: 100, repeatCount: 0 },
                                ]);
                                setActiveConfirmation(null);
                              }}
                              className="bg-rose-500 text-black px-2 py-0.5 rounded text-[8px] font-black uppercase"
                             >
                               Yes
                             </button>
                             <button 
                              onClick={() => setActiveConfirmation(null)}
                              className="text-slate-500 text-[8px] font-black uppercase px-2 py-0.5"
                             >
                               No
                             </button>
                           </div>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setActiveConfirmation('reset-stats')}
                          className="text-[10px] uppercase font-bold text-rose-500 hover:text-rose-400 flex items-center gap-1"
                        >
                          <RotateCcw size={14} /> Reset
                        </button>
                      )}
                      <button 
                        onClick={() => setStatusBars([...statusBars, { id: uid(), name: 'NEW STAT', color: '#6366f1', value: 0, max: 100, repeatCount: 0 }])}
                        className={`text-[10px] uppercase font-bold text-${tColor}-400 hover:text-${tColor}-300 flex items-center gap-1`}
                      >
                        <Plus size={14} /> Add Parameter
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {statusBars.map(bar => (
                      <div key={bar.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-900 border border-slate-800 rounded-2xl group relative">
                        <div className="space-y-1">
                          <label className="text-[8px] uppercase opacity-50 block">Name</label>
                          <input 
                            type="text" 
                            value={bar.name}
                            onChange={(e) => setStatusBars(statusBars.map(b => b.id === bar.id ? { ...b, name: e.target.value } : b))}
                            className={`bg-transparent border-b border-${tColor}-500/30 py-1 w-full text-xs font-bold focus:outline-none focus:border-${tColor}-400`}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] uppercase opacity-50 block">Value / Max</label>
                          <div className="flex items-center gap-2">
                             <input 
                                type="number" 
                                value={bar.value}
                                onChange={(e) => setStatusBars(statusBars.map(b => b.id === bar.id ? { ...b, value: Number(e.target.value) } : b))}
                                className={`bg-transparent border-b border-${tColor}-500/30 py-1 w-full text-xs font-bold focus:outline-none`}
                              />
                              <span className="text-white/20">/</span>
                              <input 
                                type="number" 
                                value={bar.max}
                                onChange={(e) => setStatusBars(statusBars.map(b => b.id === bar.id ? { ...b, max: Number(e.target.value) } : b))}
                                className={`bg-transparent border-b border-${tColor}-500/30 py-1 w-full text-xs font-bold focus:outline-none`}
                              />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] uppercase opacity-50 block">Color</label>
                          <input 
                            type="color" 
                            value={bar.color}
                            onChange={(e) => setStatusBars(statusBars.map(b => b.id === bar.id ? { ...b, color: e.target.value } : b))}
                            className="w-full h-8 bg-transparent border-none p-0 cursor-pointer rounded overflow-hidden"
                          />
                        </div>
                        <div className="flex items-end justify-center">
                          <button 
                            onClick={() => setStatusBars(statusBars.filter(b => b.id !== bar.id))}
                            className="text-rose-500/50 hover:text-rose-500 p-2 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                
                <hr className={`border-${tColor}-500/10`} />

                {/* EMERGENCY PROTOCOLS */}
                <section className="space-y-4">
                  <label className={`text-[10px] uppercase font-bold tracking-[0.3em] text-${tColor}-400/60 block`}>Emergency Protocols</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button 
                      onClick={handleExport}
                      className={`py-3 bg-slate-900 border border-slate-800 text-slate-300 hover:border-${tColor}-500/50 hover:text-white transition-all rounded-xl uppercase text-[10px] font-black tracking-widest flex items-center justify-center gap-2`}
                    >
                      Export Map
                    </button>
                    <label className={`py-3 bg-slate-900 border border-slate-800 text-slate-300 hover:border-${tColor}-500/50 hover:text-white transition-all rounded-xl uppercase text-[10px] font-black tracking-widest flex items-center justify-center gap-2 cursor-pointer`}>
                      Import Map
                      <input type="file" className="hidden" accept=".json" onChange={handleImport} />
                    </label>
                    {activeConfirmation === 'wipe-system' ? (
                      <div className="py-3 bg-rose-500/10 border border-rose-500 rounded-xl flex items-center justify-between px-4">
                         <span className="text-[10px] font-black uppercase text-rose-500">CONFIRM PROTOCOL PURGE?</span>
                         <div className="flex gap-2">
                           <button 
                            onClick={() => {
                              localStorage.clear();
                              window.location.reload();
                            }}
                            className="px-3 py-1 bg-rose-500 text-black rounded text-[10px] font-black"
                           >
                             WIPE
                           </button>
                           <button 
                            onClick={() => setActiveConfirmation(null)}
                            className="px-3 py-1 bg-slate-800 text-white rounded text-[10px] font-black"
                           >
                             ABORT
                           </button>
                         </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setActiveConfirmation('wipe-system')}
                        className="py-3 bg-rose-500/5 border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 transition-all rounded-xl uppercase text-[10px] font-black tracking-widest flex items-center justify-center gap-2"
                      >
                        System Wipe
                      </button>
                    )}
                  </div>
                </section>
                
                <div className={`flex gap-4 pt-4 border-t border-${tColor}-500/20`}>
                  <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className={`flex-1 py-4 bg-${tColor}-600 text-white hover:bg-${tColor}-500 transition-all rounded-xl uppercase text-[10px] font-black tracking-widest shadow-lg shadow-${tColor}-600/20`}
                  >
                    Sync Complete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsSidebarOpen(false)}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`absolute left-0 top-0 h-full w-full max-w-[400px] bg-[#020617] border-r border-${tColor}-500/20 shadow-2xl pointer-events-auto flex flex-col`}
            >
              <div className={`p-8 flex justify-between items-center border-b border-${tColor}-500/10`}>
                 <div className="flex items-center gap-3">
                   <Book className={`text-${tColor}-500`} size={24} />
                   <h2 className="text-xl font-black uppercase tracking-tighter text-white italic">Skills</h2>
                 </div>
                 <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-slate-500">
                    <ChevronLeft size={24} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                <section className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] text-${tColor}-400`}>Class Skills</h3>
                    <button 
                      onClick={() => setCreationModal({ isOpen: true, type: 'skill' })}
                      className={`text-[10px] font-black uppercase bg-${tColor}-500/10 text-${tColor}-400 px-3 py-1 rounded-full border border-${tColor}-500/20 hover:bg-${tColor}-500 hover:text-black transition-all`}
                    >
                      Imprint Skill
                    </button>
                  </div>

                  <div className="space-y-4">
                    {skills.map(skill => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={skill.id} 
                        className={`p-5 rounded-2xl bg-${tColor}-500/5 border border-${tColor}-500/10 hover:bg-${tColor}-500/[0.08] transition-all group`}
                      >
                         <div className="flex justify-between items-start mb-2">
                           <h4 className="font-bold text-white tracking-tight">{skill.name}</h4>
                           <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-bold text-${tColor}-400`}>LVL {skill.level}</span>
                              <button 
                                onClick={() => setSkills(skills.filter(s => s.id !== skill.id))}
                                className="text-slate-600 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <Trash2 size={14} />
                              </button>
                           </div>
                         </div>
                         <p className="text-slate-500 text-xs leading-relaxed">{skill.description}</p>
                      </motion.div>
                    ))}
                    {skills.length === 0 && (
                      <div className="py-12 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center opacity-20 grayscale">
                        <Zap size={32} />
                        <span className="text-[10px] font-black uppercase tracking-widest mt-3">No skills imprinted</span>
                      </div>
                    )}
                  </div>
                </section>

                <section className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Mastery Intel</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed italic opacity-70">
                    As your level ascends, your skills will automatically evolve to fit your growing power. 
                    Manage your Skills to optimize pathing.
                  </p>
                </section>
              </div>

              <div className={`p-8 border-t border-${tColor}-500/10 bg-${tColor}-500/[0.02]`}>
                <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-full bg-${tColor}-500/10 flex items-center justify-center text-${tColor}-400`}>
                      <User size={20} />
                   </div>
                   <div>
                      <p className="text-xs font-bold text-white uppercase tracking-tight">{character.name}</p>
                      <p className={`text-[10px] text-${tColor}-400/60 uppercase font-black tracking-tighter`}>System {currentRank}</p>
                   </div>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {creationModal.isOpen && creationModal.type && (
          <CreationModal 
            type={creationModal.type} 
            onClose={() => setCreationModal({ isOpen: false, type: null })}
            statusBars={statusBars}
            tColor={tColor}
            onSave={(data) => {
              const id = uid();
              if (creationModal.type === 'main-quest') {
                setMainQuest({ id, title: data.title, description: data.description || '', type: 'main', rewards: data.rewards });
              } else if (creationModal.type === 'side-quest') {
                setSideQuests([{ id, title: data.title, description: data.description || '', type: 'side', rewards: data.rewards }, ...sideQuests]);
              } else if (creationModal.type === 'grind-task') {
                setGrindTasks([{ id, title: data.title, rewards: data.rewards }, ...grindTasks]);
              } else if (creationModal.type === 'problem') {
                setProblems([{ id, title: data.title, xpPenalty: data.amount }, ...problems]);
              } else if (creationModal.type === 'skill') {
                setSkills([{ id, name: data.title, description: data.description || '', level: 1 }, ...skills]);
              }
              setCreationModal({ isOpen: false, type: null });
            }}
          />
        )}
      </AnimatePresence>
      <TailwindSafelist />

      {/* FLOATING REWARDS */}
      <div className="fixed inset-0 pointer-events-none z-[110]">
        <AnimatePresence>
          {rewardFloats.map(float => (
            <motion.div
              key={float.id}
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -150, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="absolute bottom-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <div 
                className="px-6 py-3 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-2xl flex items-center gap-3"
                style={{ borderColor: `${float.color}40`, boxShadow: `0 10px 40px ${float.color}20` }}
              >
                <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: float.color }}></div>
                <span className="text-xl font-black italic uppercase tracking-tighter" style={{ color: float.color }}>
                  +{float.amount} {float.statName}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* LEVEL UP OVERLAY */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="flex flex-col items-center justify-center"
            >
              <h2 className="text-6xl md:text-8xl font-black text-emerald-400 italic tracking-tighter uppercase mb-4">
                Level Up
              </h2>
              
              <div className="flex items-center gap-6">
                <span className="text-xl text-slate-500 line-through">LVL {showLevelUp - 1}</span>
                <div className="text-4xl font-black text-white bg-emerald-500 px-6 py-2 rounded-xl">
                  LVL {showLevelUp}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CreationModal({ type, onClose, statusBars, onSave, tColor }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [currentStatusBarId, setCurrentStatusBarId] = useState(statusBars[0]?.id || '1');
  const [currentAmount, setCurrentAmount] = useState(10);

  const addReward = () => {
    if (currentAmount > 0) {
      setRewards([...rewards, { statusBarId: currentStatusBarId, amount: currentAmount }]);
    }
  };

  const removeReward = (index: number) => {
    setRewards(rewards.filter((_, i) => i !== index));
  };

  const typeLabels: any = {
    'main-quest': 'Initialize Prime Objective',
    'side-quest': 'Register Branch Quest',
    'grind-task': 'Create Loop Directive',
    'problem': 'Identify System Threat',
    'skill': 'Imprint Class Skill'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className={`w-full max-w-lg bg-[#0f172a] border border-${tColor}-500/30 rounded-[32px] p-8 shadow-2xl`}
      >
        <div className={`flex justify-between items-center mb-8 border-b border-${tColor}-500/10 pb-4`}>
          <h3 className="text-xl font-black text-white tracking-tight uppercase italic">{typeLabels[type]}</h3>
          <button onClick={onClose} className={`p-2 hover:bg-white/5 rounded-full text-${tColor}-500 transition-colors`}>
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={`text-[10px] font-bold text-${tColor}-400/60 uppercase tracking-widest pl-1`}>Identity / Name</label>
            <input 
              autoFocus
              type="text" 
              value={title} 
              onKeyDown={(e) => {
                if (e.key === 'Enter' && title) {
                  const finalRewards = (type === 'main-quest' || type === 'side-quest' || type === 'grind-task') ? rewards : [];
                  onSave({ 
                    title, 
                    description, 
                    rewards: finalRewards,
                    amount: currentAmount 
                  });
                }
              }}
              onChange={e => setTitle(e.target.value)}
              placeholder="Declare entry..."
              className={`w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white focus:border-${tColor}-500 outline-none transition-all`}
            />
          </div>

          {(type === 'main-quest' || type === 'side-quest' || type === 'skill') && (
            <div className="space-y-2">
              <label className={`text-[10px] font-bold text-${tColor}-400/60 uppercase tracking-widest pl-1`}>Objective Details</label>
              <textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                placeholder={type === 'skill' ? 'Describe the skill effect...' : 'Elaborate on the task...'}
                className={`w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white focus:border-${tColor}-500 outline-none transition-all h-28 resize-none`}
              />
            </div>
          )}

          {type === 'problem' && (
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-rose-400/60 uppercase tracking-widest pl-1">XP Penalty Amount</label>
               <input 
                type="number" 
                value={currentAmount} 
                onChange={e => setCurrentAmount(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white focus:border-rose-500 outline-none transition-all"
               />
            </div>
          )}

          {(type === 'main-quest' || type === 'side-quest' || type === 'grind-task') && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className={`text-[10px] font-bold text-${tColor}-400/60 uppercase tracking-widest pl-1`}>Target Stat</label>
                   <div className="relative">
                     <select 
                       value={currentStatusBarId} 
                       onChange={e => setCurrentStatusBarId(e.target.value)}
                       className={`w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white focus:border-${tColor}-500 outline-none transition-all appearance-none cursor-pointer text-sm`}
                     >
                       {statusBars.map((bar: any) => <option key={bar.id} value={bar.id}>{bar.name}</option>)}
                     </select>
                     <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-${tColor}-400`}>
                       <Target size={14} />
                     </div>
                   </div>
                </div>
                <div className="space-y-2">
                   <label className={`text-[10px] font-bold text-${tColor}-400/60 uppercase tracking-widest pl-1`}>Amount</label>
                   <div className="flex gap-2">
                     <input 
                      type="number" 
                      value={currentAmount} 
                      onChange={e => setCurrentAmount(Number(e.target.value))}
                      className={`w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white focus:border-${tColor}-500 outline-none transition-all text-sm`}
                     />
                     <button 
                       onClick={addReward}
                       className={`px-4 bg-${tColor}-600 rounded-xl hover:bg-${tColor}-500 transition-all text-white`}
                     >
                       <Plus size={20} />
                     </button>
                   </div>
                </div>
              </div>

              {rewards.length > 0 && (
                <div className="space-y-2">
                  <label className={`text-[10px] font-bold text-${tColor}-400/60 uppercase tracking-widest pl-1`}>Configured Rewards</label>
                  <div className="flex flex-wrap gap-2">
                    {rewards.map((rew, idx) => {
                      const bar = statusBars.find((b: any) => b.id === rew.statusBarId);
                      return (
                        <div key={idx} className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-3 py-1.5 rounded-full">
                          <span className="text-[10px] font-bold text-white">+{rew.amount} {bar?.name}</span>
                          <button onClick={() => removeReward(idx)} className="text-rose-400 hover:text-rose-300">
                            <X size={12} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          <button 
            onClick={() => {
              const finalRewards = (type === 'main-quest' || type === 'side-quest' || type === 'grind-task') ? rewards : [];
              onSave({ 
                title, 
                description, 
                rewards: finalRewards,
                amount: currentAmount // For problems which use a single value
              });
            }}
            disabled={!title || ((type === 'side-quest' || type === 'grind-task') && rewards.length === 0)}
            className={`w-full py-4 bg-${tColor}-600 hover:bg-${tColor}-500 text-white font-black uppercase text-xs tracking-widest rounded-2xl transition-all shadow-lg shadow-${tColor}-600/20 disabled:opacity-50 disabled:grayscale mt-2`}
          >
            Confirm Registration
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// THIS COMPONENT IS NEVER RENDERED
// It exists solely to ensure Tailwind's JIT compiler generates the classes 
// for all possible system themes.
function TailwindSafelist() {
  return (
    <div className="hidden
      text-indigo-400 text-rose-400 text-emerald-400 text-amber-400
      text-indigo-500 text-rose-500 text-emerald-500 text-amber-500
      bg-indigo-500 bg-rose-500 bg-emerald-500 bg-amber-500
      bg-indigo-600 bg-rose-600 bg-emerald-600 bg-amber-600
      bg-indigo-500/5 bg-rose-500/5 bg-emerald-500/5 bg-amber-500/5
      bg-indigo-500/10 bg-rose-500/10 bg-emerald-500/10 bg-amber-500/10
      bg-indigo-600/20 bg-rose-600/20 bg-emerald-600/20 bg-amber-600/20
      bg-indigo-600/30 bg-rose-600/30 bg-emerald-600/30 bg-amber-600/30
      bg-indigo-500/[0.02] bg-rose-500/[0.02] bg-emerald-500/[0.02] bg-amber-500/[0.02]
      bg-indigo-500/[0.08] bg-rose-500/[0.08] bg-emerald-500/[0.08] bg-amber-500/[0.08]
      border-indigo-500/10 border-rose-500/10 border-emerald-500/10 border-amber-500/10
      border-indigo-500/20 border-rose-500/20 border-emerald-500/20 border-amber-500/20
      border-indigo-500/30 border-rose-500/30 border-emerald-500/30 border-amber-500/30
      border-indigo-500/50 border-rose-500/50 border-emerald-500/50 border-amber-500/50
      shadow-indigo-500/10 shadow-rose-500/10 shadow-emerald-500/10 shadow-amber-500/10
      shadow-indigo-600/20 shadow-rose-600/20 shadow-emerald-600/20 shadow-amber-600/20
      hover:bg-indigo-500 hover:bg-rose-500 hover:bg-emerald-500 hover:bg-amber-500
      hover:bg-indigo-600 hover:bg-rose-600 hover:bg-emerald-600 hover:bg-amber-600
      focus:border-indigo-400 focus:border-rose-400 focus:border-emerald-400 focus:border-amber-400
      focus:border-indigo-500 focus:border-rose-500 focus:border-emerald-500 focus:border-amber-500
      hover:text-indigo-300 hover:text-rose-300 hover:text-emerald-300 hover:text-amber-300
      group-hover:text-indigo-300 group-hover:text-rose-300 group-hover:text-emerald-300 group-hover:text-amber-300
      hover:border-indigo-500/30 hover:border-rose-500/30 hover:border-emerald-500/30 hover:border-amber-500/30
      hover:border-indigo-500/50 hover:border-rose-500/50 hover:border-emerald-500/50 hover:border-amber-500/50
      selection:bg-indigo-500 selection:bg-rose-500 selection:bg-emerald-500 selection:bg-amber-500
      text-indigo-400/60 text-rose-400/60 text-emerald-400/60 text-amber-400/60
    "></div>
  );
}
