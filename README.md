# 🎮 Game Tracker PC

Stop losing track of your gaming marathon. **Game Tracker** is a sleek, offline-first Windows desktop application designed to help you organize, track, and conquer your video game backlog. 

Built with a focus on premium desktop UI, it features a spacious dark-mode grid, glass-morphism effects, and native Windows performance.

## ✨ Key Features

* **Premium Dark UI:** A gorgeous, spacious grid layout tailored for desktop monitors, complete with a modern sticky glass header and hover animations.
* **Smart Status Tracking:** Easily transition games from *Unplayed* ▶ *Playing* ▶ *Finished*. The engine automatically calculates the total days spent to beat a game.
* **XML Data Engine:** Never lose your library. Export your entire database to a secure local `.xml` file and restore it across devices instantly.
* **Built-in Safety:** Includes a 5-second safety-locked "Wipe Data" sequence to prevent accidental deletion of your library.
* **100% Offline & Private:** No forced accounts, no internet connection required. Your data is stored locally and securely on your own hard drive.

## 🛠️ Tech Stack

* **Frontend UI:** React.js (Hooks, Functional Components)
* **Desktop Shell:** Electron.js (IPC Main/Renderer architecture)
* **Styling:** Pure CSS3 (Responsive CSS Grid, Backdrop Filters)
* **Storage:** LocalStorage API & Node.js `fs` module for XML parsing

## 🚀 Installation & Usage

### For Gamers (Easy Install)
1. Go to the [Releases](../../releases) tab on the right side of this page.
2. Download the latest **`Game Tracker Setup.exe`**.
3. Double-click to install it on your Windows PC. 

### For Developers (Build from Source)
If you want to clone the code, modify the CSS, or build the executable yourself:

```bash
# Clone this repository
git clone https://github.com/mustaqhasnattamim/GameTrackerPC.git

# Go into the repository
cd GameTrackerPC

# Install dependencies
npm install

# Run the app in live development mode
npm run dev

# Compile the final Windows .exe installer
npm run build:win
