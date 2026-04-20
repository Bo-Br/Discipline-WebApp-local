# Character Progression System (Local RPG Life Tracker)

Offline-first gamified character progression system.  
Runs locally, no backend, no cloud, no external APIs.

Everything is stored on your machine.

---

## ⚠️ Important

- The app is designed to run **locally only**
- No Gemini / external API keys (removed intentionally)
- Dev mode works (`npm run dev`)
- Production build (`npm run build`) is currently unstable or broken


## 🚀 Quick Start (Windows)

This project is designed to be used with **two batch files**:

### 1. Install Dependencies
Run this file once:

- install.bat


This will:

* Check Node.js
* Install all dependencies (`npm install`)
* Prepare the project for first launch

---

### 2. Run the App

Start the application:

```bat
start.bat
```

This will:

* Launch the local dev server (`npm run dev`)
* Open the app in the browser automatically



## 🧠 Core Concept

This is not a task manager.
It is a character simulation system.

Everything you do affects your character stats.


## ✨ Features

### 👤 Character System

* Custom name
* Level system
* Dynamic rank display



### 📊 Status Bars (Core mechanic)

* Custom attributes:

  * Name
  * Color
  * Max value (e.g. 0/1000 system)
* Each bar:

  * Fills over time / actions
  * Resets when full
  * Tracks repeat count


### ⚔️ XP System (Important rule change)

* XP cannot be added manually anymore
* XP is only gained when a **status bar becomes full**

When a bar is full:

* +20% XP of current level is awarded
* Bar resets to 0
* Repeat counter increases



### 📉 Penalties

* Negative “problem” system
* Reduces XP or affects progression
* Can cause level down if XP drops below threshold
* Level cannot go below 0


### 📌 Quest System

#### Main Quest

* Can be created or deleted only
* Cannot be completed
* No XP reward

#### Side Quests

* Create / edit / delete
* Reward configurable
* Affects selected status bar


### 🔁 Grind Tasks (Infinite)

* Repeatable tasks
* Can be claimed infinitely
* Each completion affects XP or bars


### ⚠️ Problems System

* Negative modifiers (e.g. bad sleep)
* Can be activated manually
* Applies XP loss or penalties

### 🧪 Skills System (Sidebar)

* Custom skills list
* Expandable progression system



### 🎨 Themes

* Rose (fully stable)
* Blue (partially broken)
* Red (partially broken)
* Yellow (partially broken)
* Green (partially broken)


### ⚙️ Settings

* Reset system (unstable)
* System wipe (buggy)
* Export / Import (local JSON backup)


## 💾 Data Storage

* LocalStorage / browser storage only
* No server
* No cloud sync
* No external dependencies


## 🧯 Known Issues


### UI Bugs

* Theme system incomplete (only Rose stable)
* Reset buttons inconsistent
* Some settings actions fail silently

### XP Logic

* Previous XP overflow bugs mostly fixed
* Edge cases still possible with level down logic


## 🛠 Tech Stack 

* React + Vite
* LocalStorage / IndexedDB
* CSS Bento Grid layout system



## 🚧 Roadmap

* Fix production build system
* Stabilize XP engine
* Fix theme system (all colors)
* Repair reset + wipe functions
* Improve export/import reliability
* Polish skill sidebar system
* Validate quest + grind logic consistency



## 🧠 Design Philosophy

* Offline-first
* No SaaS dependency
* No external APIs
* Fully deterministic progression system

This is a **self-contained character simulation engine**, not a productivity app.
