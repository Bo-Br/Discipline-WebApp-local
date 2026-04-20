export interface StatusBar {
  id: string;
  name: string;
  color: string;
  value: number;
  max: number;
  repeatCount: number;
}

export type QuestType = 'main' | 'side';

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  rewards: Reward[];
}

export interface Reward {
  statusBarId: string;
  amount: number;
}

export interface GrindTask {
  id: string;
  title: string;
  rewards: Reward[];
}

export interface Problem {
  id: string;
  title: string;
  xpPenalty: number;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  description: string;
}

export interface Character {
  name: string;
  title: string;
  rank: string;
  level: number;
  exp: number;
}

export type CreationType = 'side-quest' | 'grind-task' | 'problem' | 'main-quest' | 'skill';
