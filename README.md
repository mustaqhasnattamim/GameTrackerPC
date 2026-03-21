# 🎮 GameTrackerPC v2.0.0

A lightweight, native Windows desktop application built to actively track your video game backlog, monitor real-time playtime via background process scanning, and manage your completion status. 

Built with **React**, **Electron**, and **Vite**.

---

## 🚀 What's New in v2.0.0
Version 2.0 transforms GameTracker from a passive database into an active, system-level background service. It now features an OBS-style native Windows process scanner, real-time background playtime tracking, and a smart state machine that automates your game statuses.

## ✨ Key Features

* **Dual-Mode Tracking Engine:**
  * **Auto Mode (Native .exe tracking):** Scans your running Windows processes, hooks onto your selected game, and tracks your real-time hours, minutes, and launch counts automatically in the background.
  * **Manual Mode (Elapsed Days):** Playing on a PS5 or Nintendo Switch? Manually set your start and finish dates, and the app calculates the exact elapsed days.
* **Silent Background Service:** Minimizes directly to the Windows System Tray and boots silently on startup so you never forget to track your playtime.
* **Smart State Machine:** Automatically shifts games between "Unplayed", "Playing", and "Finished" states based on your Start Date, Finish Date, and `.exe` selections. 
* **Bulletproof XML Backups:** Export your entire library to a local `.xml` file and restore it at any time. The import engine includes automatic duplicate-prevention.
* **Single Instance Lock:** Prevents accidental double-launches, keeping your memory footprint incredibly low.

---

## ⚙️ The Mechanism (How it Works)

GameTrackerPC utilizes a split-architecture model:
1. **The Node.js Backend:** Uses native child processes (`exec('tasklist')`) to ping the Windows Operating System every 10 seconds. It filters out core system tasks (like `svchost.exe`) and passes a clean array of running applications to the frontend via Electron IPC bridges.
2. **The React Frontend:** Utilizes a custom Delta Time loop. Instead of simply adding 10 seconds every tick, it calculates the exact millisecond differential against the native PC clock. This bypasses Chromium's background throttling and guarantees 100% accurate playtime tracking even when the app is minimized to the system tray.

---

## 📖 How to Use

### 1. Adding a Game
Click **+ ADD NEW ENTRY**. Fill out the title, genre, release year, and estimated playtime. 
* *Pro Tip:* If you select a "Tracked EXE" during this step, the app will instantly auto-fill today's date and jump right into Auto-Tracking mode.

### 2. Tracking Your Playtime
Click **▶ START TRACKING...** on any unplayed game. You will be given two choices:
* **Start Auto-Tracking:** A dropdown will show all currently open programs on your PC. Select your game's `.exe`. The card will light up green and begin counting your time whenever that game is open.
* **Track Manually:** Skips the `.exe` scanner and simply logs the day you started playing.

### 3. Finishing a Game
Click **★ MARK AS FINISHED**. 
* If you were Auto-Tracking, the app locks in your final time and stamps today's date.
* If you were Manual-Tracking, a prompt will ask you to confirm the exact date you rolled the credits.

⚠️ Limitations & Known Issues
Windows Exclusive: Because the Auto-Tracker relies on the Windows tasklist command, background .exe tracking is currently only supported on Windows OS.

Process Names: The scanner detects the actual executable name (e.g., re8.exe), not the display name (e.g., Resident Evil Village). You must have the game currently running to select it from the tracking dropdown.

Chromium Throttling: While backgroundThrottling is disabled in the Electron backend, extreme CPU loads (e.g., benchmarking) might slightly delay UI state updates until the system resources free up. (Playtime accuracy remains unaffected due to Delta Time math).

👨‍💻 Developed By
Mustaq Hasnat Tamim Department of Environmental Science and Geography

Islamic University, Bangladesh

---
<img width="1920" height="1032" alt="Screenshot 2026-03-22 010311" src="https://github.com/user-attachments/assets/d4c5d898-77f4-4305-bc27-97ae60489447" />
<img width="1920" height="1032" alt="Screenshot 2026-03-22 010243" src="https://github.com/user-attachments/assets/8b2af0b7-7feb-4110-8f78-9de11a6f5a2d" />
<img width="1920" height="1032" alt="Screenshot 2026-03-22 010234" src="https://github.com/user-attachments/assets/ce24e68c-9001-4578-a68c-c08c73e74b3e" />

## 🛠️ Installation

**For Users:**
1. Download the latest `Game Tracker Setup.exe` from the [Releases](https://github.com/mustaqhasnattamim/GameTrackerPC/releases) tab.
2. Run the installer. The app will open and automatically add itself to your System Tray.

**For Developers:**
```bash
# Clone the repository
git clone https://github.com/mustaqhasnattamim/GameTrackerPC.git

# Navigate into the directory
cd GameTrackerPC

# Install dependencies
npm install

# Start the development server
npm run dev

# Build the final Windows executable
npm run build:win
