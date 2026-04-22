# Character Progression System (Local RPG Life Tracker)


A local-first gamified productivity / RPG-style character system.  
You define a character, track progress through status bars, quests, grind tasks, and penalties.

No backend. No cloud. Everything runs locally in the browser.

---

## ⚠️ Important Note

- To run the app :
- - Run install.bat
  - After installation run start.bat




## 🧠 Core Concept

You are not "tracking tasks". (or you can, It's up to you)
You are leveling up a character.

Everything you do affects:
- XP
- Level
- Status bars (attributes)
- Skills (formerly “Grimoire”)



## ✨ Features

### 👤 Character System
- Set character name
- View level, rank, XP
- Rank text updates dynamically (fix pending if still static)


### 📊 Status Bars (Core System)
- Create custom bars:
  - Name
  - Color
  - Max value (e.g. 0/1000 system, not percentages)
- Bars affect XP progression
- Each bar tracks:
  - Current value
  - Repeat count


### ⚔️ Progress Rules (IMPORTANT LOGIC)

- XP is **NOT manually addable anymore**
- XP only increases when a **status bar is completely filled**

When a bar is full:
- +20% of current level XP is awarded
- Bar resets to 0
- Repeat count increases by 1


### 📉 Penalty System
- Problems can reduce XP
- XP can go below current level threshold
- If XP drops below 0:
  - Level decreases
  - Minimum level is 0 (cannot go negative)

### 📌 Quest System

#### Main Quest
- Can only be created or deleted
- Cannot be completed manually
- Does NOT directly give XP

#### Side Quests
- Create / edit / delete
- Claim reward manually
- Choose affected status bar
- Configurable XP reward per quest

### Grind Tasks (Infinite Tasks)
- Repeatable tasks
- Create / delete
- Each completion grants XP or affects status bar
- Fully configurable reward system


### ⚠️ Problems System
- Create “negative events” (e.g. sleep badly)
- Each problem can:
  - Reduce XP
  - Be activated manually
- Used for dynamic penalties

### Skills (formerly “Grimoire”)
- Sidebar system
- Add custom skills
- Planned for progression expansion

### UI / Themes

Bento Grid layout system applied.

Available themes:
- Rose (currently most stable)
- Blue
- Yellow
- Green

### ⚙️ Settings Menu

Includes:
- Reset system 
- System wipe 
- Export / Import (JSON-based local backup)


## 💾 Data Storage

- Fully local (json storage)
- No backend
- No cloud sync
- No external APIs

## 🧯 Known Issues

### XP System Bugs (partially fixed)
- Some XP calculations previously incorrect (e.g. +10 EXP → +1000 XP bug)
- XP sometimes not syncing with level properly

### UI Bugs
- FIXED Theme system incomplete (only Rose fully working) 
- FIXED Sidebar skill system incomplete in some states

### Feature Bugs
- Main quest not awarding XP (by design, but confusing behavior)


## 🚧 Roadmap / Fix Priority

1. FIXED Fix `npm run build`
2. FIXED Stabilize XP calculation engine
3. FIXED Fix theme system (all colors working)
4. FIXED Repair reset / system wipe
5. FIXED Stabilize export/import
6. FIXED Finalize skill system sidebar
7. FIXED Clean quest logic consistency

## 🛠 Tech Stack 

- React / Vite 
- LocalStorage / IndexedDB
- Tailwind or custom CSS (Bento layout)
- json simple backend


