import { useState, useEffect, useRef } from 'react'

function App() {
  const defaultGames = [
    { id: '1', title: 'Resident Evil HD Remaster', focus: 'The mansion incident that starts it all', year: '2015', time: '11', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '2', title: 'Prince of Persia: The Sands of Time', focus: 'The classic acrobatic puzzle platformer', year: '2003', time: '9', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '3', title: "Assassin's Creed", focus: 'The foundation of the Brotherhood', year: '2007', time: '15', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '4', title: 'Devil May Cry 3: Special Edition', focus: 'Fast, stylish hack-and-slash prequel', year: '2005', time: '12', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '5', title: 'Devil May Cry', focus: "Continuing Dante's awakening", year: '2001', time: '9', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '6', title: 'Resident Evil 2 Remake', focus: 'A tight, atmospheric survival horror shift', year: '2019', time: '9', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '7', title: 'Batman: Arkham Asylum', focus: 'Laying the superhero brawler foundation', year: '2009', time: '12', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '8', title: "Assassin's Creed II", focus: 'Starting the stealthy historical Ezio trilogy', year: '2009', time: '19', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '9', title: 'Prince of Persia: Warrior Within', focus: 'The dark, heavy-metal sequel', year: '2004', time: '12', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '10', title: 'Far Cry 3', focus: 'A chaotic FPS island getaway', year: '2012', time: '15', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '11', title: 'Resident Evil 3 Remake', focus: 'Short, explosive horror action', year: '2020', time: '6', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '12', title: 'Batman: Arkham City', focus: 'The superhero epic expands', year: '2011', time: '14', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '13', title: "Assassin's Creed: Brotherhood", focus: "Directly continuing Ezio's story", year: '2010', time: '15', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '14', title: 'Prince of Persia: The Two Thrones', focus: 'The grand finale of the time trilogy', year: '2005', time: '10', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '15', title: 'Devil May Cry 4: Special Edition', focus: 'Introducing a new DMC protagonist', year: '2015', time: '12', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '16', title: 'Far Cry 5', focus: 'A massive, modern open-world detour', year: '2018', time: '18', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '17', title: 'Resident Evil 4 Remake', focus: 'The ultimate action-horror masterpiece', year: '2023', time: '16', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '18', title: "Assassin's Creed: Revelations", focus: 'The emotional finale of the Ezio trilogy', year: '2011', time: '12', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '19', title: "Assassin's Creed III Remastered", focus: 'Wrapping up the modern-day story', year: '2019', time: '16', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '20', title: 'Batman: Arkham Knight', focus: 'The dark, vehicle-heavy Batman finale', year: '2015', time: '17', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '21', title: 'Resident Evil 7: Biohazard', focus: 'A terrifying first-person horror shift', year: '2017', time: '9', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '22', title: "Assassin's Creed IV: Black Flag", focus: 'A standalone pirate adventure', year: '2013', time: '23', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '23', title: 'Devil May Cry 5', focus: 'The jaw-dropping hack-and-slash finale', year: '2019', time: '11', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '24', title: 'Resident Evil Village', focus: 'The wild, snowy conclusion to RE7', year: '2021', time: '10', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' },
    { id: '25', title: 'Far Cry 6', focus: 'A giant sandbox to wrap up the marathon', year: '2021', time: '23', status: 'unplayed', startDate: '', finishDate: '', trackedSeconds: 0, launchCount: 0, trackedExe: '' }
  ];

  const [games, setGames] = useState(defaultGames);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('pc_game_tracker_v3');
    if (savedData !== null) setGames(JSON.parse(savedData));
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) localStorage.setItem('pc_game_tracker_v3', JSON.stringify(games));
  }, [games, isReady]);

  // --- THE REAL-TIME BACKGROUND ENGINE ---
  useEffect(() => {
    if (!isReady) return;
    let lastTick = Date.now();
    const trackerInterval = setInterval(async () => {
      const activeExeList = await window.electron.ipcRenderer.invoke('scan-processes');
      const now = Date.now();
      const elapsedSeconds = Math.round((now - lastTick) / 1000);
      lastTick = now;

      setGames(prevGames => {
        let hasChanges = false;
        const updatedGames = prevGames.map(game => {
          if (game.status === 'playing' && game.trackedExe) {
            const isCurrentlyRunning = activeExeList.includes(game.trackedExe);
            if (isCurrentlyRunning) {
              hasChanges = true;
              const newLaunchCount = game.isRunningNow ? (game.launchCount || 0) : (game.launchCount || 0) + 1;
              return { ...game, trackedSeconds: (game.trackedSeconds || 0) + elapsedSeconds, isRunningNow: true, launchCount: newLaunchCount };
            } else if (game.isRunningNow) {
              hasChanges = true;
              return { ...game, isRunningNow: false };
            }
          }
          return game;
        });
        return hasChanges ? updatedGames : prevGames;
      });
    }, 10000); 
    return () => clearInterval(trackerInterval);
  }, [isReady]);

  // --- UI STATES ---
  const [modalVisible, setModalVisible] = useState(false);
  const [obsModalVisible, setObsModalVisible] = useState(false);
  const [creditModalVisible, setCreditModalVisible] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [clearModalVisible, setClearModalVisible] = useState(false);
  
  const [manualFinishModalVisible, setManualFinishModalVisible] = useState(false);
  const [finishingId, setFinishingId] = useState(null);
  const [manualFinishDate, setManualFinishDate] = useState('');

  const [clearCountdown, setClearCountdown] = useState(5);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', focus: '', year: '', time: '', startDate: '', finishDate: '', trackedExe: '' });
  const [scannedProcesses, setScannedProcesses] = useState([]);
  const [selectedExe, setSelectedExe] = useState('');

  useEffect(() => {
    if (clearModalVisible && clearCountdown > 0) {
      const timer = setTimeout(() => setClearCountdown(clearCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [clearModalVisible, clearCountdown]);

  const openClearAll = () => { setClearCountdown(5); setClearModalVisible(true); setDropdownOpen(false); };
  const executeClearAll = () => { setGames([]); localStorage.removeItem('pc_game_tracker_v3'); setClearModalVisible(false); showToast("Data Erased."); };

  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => { 
      if (dropdownOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setDropdownOpen(false); 
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // --- LOGIC HELPERS & VALIDATION ---
  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 4000); };
  
  const getTodayDate = () => {
    const d = new Date();
    const tzOffset = d.getTimezoneOffset() * 60000;
    return new Date(d - tzOffset).toISOString().split('T')[0];
  };

  const formatTime = (totalSec) => {
    if (!totalSec) return "0h 0m";
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const getDaysDiff = (start, end) => {
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = Math.abs(e - s);
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const isValidDate = (d) => {
    if (!d) return true; 
    if (d.length !== 10) return false;
    const [y, m, day] = d.split('-').map(Number);
    if (m < 1 || m > 12 || day < 1 || day > 31) return false;
    if (y < 1970 || y > 2100) return false;
    return day <= new Date(y, m, 0).getDate();
  };

  const filterNumbers = (text, maxLength) => text.replace(/\D/g, '').slice(0, maxLength);
  const formatSmartDate = (text) => {
    const cleaned = text.replace(/\D+/g, '');
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(6, 8)}`;
  };

  const openExternalLink = (url) => { window.open(url, '_blank'); };
  const moveUp = (i) => { if (i === 0) return; const n = [...games]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; setGames(n); };
  const moveDown = (i) => { if (i === games.length - 1) return; const n = [...games]; [n[i + 1], n[i]] = [n[i], n[i + 1]]; setGames(n); };
  const deleteGame = (id) => setGames(games.filter(g => g.id !== id));

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setFormData(item);
    setModalVisible(true);
    window.electron.ipcRenderer.invoke('scan-processes').then(processes => setScannedProcesses(processes));
  };

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ title: '', focus: '', year: '', time: '', startDate: '', finishDate: '', trackedExe: '' });
    setModalVisible(true);
    window.electron.ipcRenderer.invoke('scan-processes').then(processes => setScannedProcesses(processes));
  };

  const saveGame = () => {
    if (!formData.title?.trim() || !formData.year?.toString().trim() || !formData.time?.toString().trim()) {
      return showToast("⚠️ Title, Year, and Est. Time are REQUIRED!");
    }
    const numYear = parseInt(formData.year);
    if (numYear < 1970 || numYear > 2050) return showToast("⚠️ Please enter a realistic release year (1970-2050).");
    
    if (!isValidDate(formData.startDate)) return showToast("⚠️ Invalid Start Date.");
    if (!isValidDate(formData.finishDate)) return showToast("⚠️ Invalid Finish Date.");
    
    if (formData.startDate) {
      const startYear = parseInt(formData.startDate.split('-')[0]);
      if (startYear < numYear) return showToast("⚠️ Start Date cannot be before the Release Year.");
    }
    
    if (formData.startDate && formData.finishDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.finishDate);
      if (end < start) return showToast("⚠️ Finish Date cannot be before Start Date.");
    }

    if (games.some(g => g.title.toLowerCase().trim() === formData.title.toLowerCase().trim() && g.id !== editingId)) {
      return showToast("⚠️ A game with this title already exists!");
    }

    let finalData = { ...formData };

    if (!finalData.startDate) {
       finalData.status = 'unplayed';
       finalData.finishDate = ''; 
       if (editingId) {
         finalData.trackedSeconds = 0;
         finalData.launchCount = 0;
         finalData.isRunningNow = false;
       }
    } else if (finalData.startDate && finalData.finishDate) {
       finalData.status = 'finished';
       finalData.isRunningNow = false;
    } else if (finalData.startDate && !finalData.finishDate) {
       finalData.status = 'playing';
    }

    if (editingId) {
      setGames(games.map(g => g.id === editingId ? finalData : g));
    } else {
      setGames([...games, { ...finalData, id: Date.now().toString(), trackedSeconds: 0, launchCount: 0 }]);
    }
    setModalVisible(false);
  };

  // --- XML ENGINE ---
  const escapeXML = (str) => str ? str.toString().replace(/[<>&'"]/g, c => ({'<': '&lt;', '>': '&gt;', '&': '&amp;', '\'': '&apos;', '"': '&quot;'}[c])) : '';
  const exportToXML = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<games>\n';
    games.forEach(game => {
      xml += `  <game>\n    <id>${game.id}</id>\n    <title>${escapeXML(game.title)}</title>\n    <focus>${escapeXML(game.focus)}</focus>\n    <year>${game.year}</year>\n    <time>${game.time}</time>\n    <status>${game.status}</status>\n    <startDate>${game.startDate || ''}</startDate>\n    <finishDate>${game.finishDate || ''}</finishDate>\n    <trackedSeconds>${game.trackedSeconds || 0}</trackedSeconds>\n    <launchCount>${game.launchCount || 0}</launchCount>\n    <trackedExe>${escapeXML(game.trackedExe || '')}</trackedExe>\n  </game>\n`;
    });
    xml += '</games>';
    const blob = new Blob([xml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'GameTracker_Backup.xml'; a.click();
    URL.revokeObjectURL(url);
    setDropdownOpen(false); showToast("Backup Saved!");
  };

  const importFromXML = (event) => {
    const file = event.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result; const parser = new DOMParser(); const xmlDoc = parser.parseFromString(text, "text/xml");
        const gameNodes = xmlDoc.getElementsByTagName("game");
        const restoredGames = [];
        let duplicateCount = 0;

        for (let i = 0; i < gameNodes.length; i++) {
          const node = gameNodes[i]; const getVal = (tag) => node.getElementsByTagName(tag)[0]?.textContent || '';
          const importedTitle = getVal('title');
          const isDuplicate = games.some(g => g.title.toLowerCase().trim() === importedTitle.toLowerCase().trim()) || restoredGames.some(g => g.title.toLowerCase().trim() === importedTitle.toLowerCase().trim());
          
          if (isDuplicate) { duplicateCount++; continue; }

          restoredGames.push({ 
            id: getVal('id') || Date.now().toString() + i, title: importedTitle, focus: getVal('focus'), year: getVal('year'), time: getVal('time'), 
            status: getVal('status'), startDate: getVal('startDate'), finishDate: getVal('finishDate'),
            trackedSeconds: parseInt(getVal('trackedSeconds')) || 0, launchCount: parseInt(getVal('launchCount')) || 0, trackedExe: getVal('trackedExe') || ''
          });
        }
        
        if (restoredGames.length > 0) { setGames([...games, ...restoredGames]); showToast(`Restored ${restoredGames.length} games. Skipped ${duplicateCount} duplicates.`); } 
        else if (duplicateCount > 0) { showToast(`Skipped ${duplicateCount} duplicates. No new games added.`); }
      } catch (err) { showToast("⚠️ Invalid XML File."); }
    };
    reader.readAsText(file); setDropdownOpen(false); event.target.value = '';
  };

  // --- DUAL TRACKING FUNCTIONS ---
  const handleStartTrackingClick = (item) => {
    if (item.trackedExe) {
      setGames(games.map(g => g.id === item.id ? { 
        ...g, status: 'playing', startDate: g.startDate || getTodayDate() 
      } : g));
      showToast("Auto-Tracking Started!");
    } else {
      setEditingId(item.id);
      setObsModalVisible(true);
      window.electron.ipcRenderer.invoke('scan-processes').then(processes => {
        setScannedProcesses(processes);
        setSelectedExe(processes[0] || '');
      });
    }
  };

  const confirmTracking = () => {
    setGames(games.map(g => g.id === editingId ? { 
      ...g, status: 'playing', trackedExe: selectedExe, startDate: g.startDate || getTodayDate()
    } : g));
    setObsModalVisible(false);
  };

  const startManualTracking = () => {
    setGames(games.map(g => g.id === editingId ? { 
      ...g, status: 'playing', trackedExe: '', startDate: g.startDate || getTodayDate()
    } : g));
    setObsModalVisible(false);
    showToast("Started Manual Tracking!");
  };

  const handleFinishClick = (id) => {
    const game = games.find(g => g.id === id);
    if (game.trackedExe) {
      setGames(games.map(g => g.id === id ? { ...g, status: 'finished', finishDate: getTodayDate(), isRunningNow: false } : g));
    } else {
      setFinishingId(id);
      setManualFinishDate(getTodayDate());
      setManualFinishModalVisible(true);
    }
  };

  const confirmManualFinish = () => {
    if (!isValidDate(manualFinishDate)) return showToast("⚠️ Invalid Date format.");
    const game = games.find(g => g.id === finishingId);
    const start = new Date(game.startDate);
    const end = new Date(manualFinishDate);
    if (end < start) return showToast("⚠️ Finish Date cannot be before Start Date.");

    setGames(games.map(g => g.id === finishingId ? { ...g, status: 'finished', finishDate: manualFinishDate, isRunningNow: false } : g));
    setManualFinishModalVisible(false);
  };

  const holdTimer = useRef(null);
  const handleMouseDown = (id) => { holdTimer.current = setTimeout(() => { setGames(games.map(g => g.id === id ? { ...g, status: 'playing', finishDate: '' } : g)); showToast("Reverted to Playing!"); }, 800); };
  const handleMouseUp = () => clearTimeout(holdTimer.current);

  if (!isReady) return null;

  return (
    <>
      <div className="header-container">
        <div className="header-title">GAME <span className="header-highlight">TRACKER</span></div>
        <div className="menu-container" ref={menuRef}>
          <button className="menu-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>⋮</button>
          {dropdownOpen && (
            <div className="dropdown">
              <button className="dropdown-item" onClick={exportToXML}>📥 Export XML</button>
              <label className="dropdown-item">📤 Restore XML<input type="file" accept=".xml" style={{ display: 'none' }} onChange={importFromXML} /></label>
              <button className="dropdown-item" onClick={() => { setCreditModalVisible(true); setDropdownOpen(false); }}>👤 Contact Me</button>
              <button className="dropdown-item" style={{ color: '#FF1744' }} onClick={openClearAll}>⚠️ Clear All</button>
              <button className="dropdown-item" onClick={() => setExitModalVisible(true)}>⏻ Exit App</button>
            </div>
          )}
        </div>
      </div>

      <div className="main-content">
        <div className="games-grid">
          {games.map((item, index) => (
            <div key={item.id} className="game-card" style={{ borderLeftColor: item.isRunningNow ? '#00FF66' : item.status === 'playing' ? '#00E5FF' : item.status === 'finished' ? '#B000FF' : '#2A2E45' }}>
              <div className="card-header">
                <div className="game-title">{index + 1}. {item.title}</div>
                <div className="action-group">
                  <button onClick={() => moveUp(index)} className="icon-btn btn-move">▲</button>
                  <button onClick={() => moveDown(index)} className="icon-btn btn-move">▼</button>
                  <button onClick={() => handleEditClick(item)} className="icon-btn btn-edit">EDIT</button>
                  <button onClick={() => deleteGame(item.id)} className="icon-btn btn-del">DEL</button>
                </div>
              </div>
              
              <div className="meta-row">
                <span className="tag">{item.focus}</span>
                <span className="tag">📅 {item.year}</span>
                <span className="tag">EST: {item.time} HR</span>
                {item.status !== 'unplayed' && (
                  <span className="tag" style={{ color: item.trackedExe ? '#00E5FF' : '#FFD700' }}>
                    {item.trackedExe ? '⚙ AUTO MODE' : '✍ MANUAL MODE'}
                  </span>
                )}
              </div>

              {(item.status !== 'unplayed' || item.startDate) && (
                <div className="date-box" style={{ backgroundColor: item.isRunningNow ? '#00FF6620' : '#0D0E15' }}>
                  <div className="date-col">
                    <span className="date-label">STARTED</span>
                    <span className="date-value">{item.startDate || '--'}</span>
                  </div>
                  
                  <div className="date-col">
                    <span className="date-label">PLAYTIME</span>
                    <span className="date-value" style={{ color: item.isRunningNow ? '#00FF66' : '#C0CAF5', fontSize: item.isRunningNow ? '14px' : '12px' }}>
                      {item.trackedExe 
                        ? (item.isRunningNow ? '▶ RUNNING (' + formatTime(item.trackedSeconds) + ')' : formatTime(item.trackedSeconds))
                        : (item.status === 'playing' ? getDaysDiff(item.startDate, getTodayDate()) + ' Days' : getDaysDiff(item.startDate, item.finishDate) + ' Days')}
                    </span>
                  </div>

                  <div className="date-col" style={{ alignItems: 'flex-end' }}>
                    <span className="date-label">LAUNCHES</span>
                    <span className="days-value" style={{ color: item.trackedExe ? '#00E5FF' : '#828BB8', fontSize: '14px' }}>
                      {item.trackedExe ? `${item.launchCount || 0}x` : '--'}
                    </span>
                  </div>
                </div>
              )}

              {item.status === 'unplayed' && <button onClick={() => handleStartTrackingClick(item)} className="status-btn btn-start">▶ START TRACKING...</button>}
              
              {item.status === 'playing' && (
                <button onClick={() => handleFinishClick(item.id)} className="status-btn btn-finish" style={{ backgroundColor: item.trackedExe ? '#00E5FF' : '#FFD700', color: '#090A0F' }}>
                  ★ {item.trackedExe ? 'MARK AS FINISHED' : 'FINISH GAME (SET DATE)'}
                </button>
              )}
              
              {item.status === 'finished' && (
                <button onMouseDown={() => handleMouseDown(item.id)} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} className="status-btn btn-completed" style={{ cursor: 'help' }}>
                  🏆 COMPLETED ({item.trackedExe ? formatTime(item.trackedSeconds) : getDaysDiff(item.startDate, item.finishDate) + ' Days'})
                </button>
              )}
            </div>
          ))}
        </div>
        <button className="main-add-btn" onClick={handleAddClick}>+ ADD NEW ENTRY</button>
        <div className="minimal-credit">DEVELOPED BY Mustaq Hasnat Tamim<br/>Department of Environmental Science and Geography<br/>Islamic University, Bangladesh</div>
      </div>

      {toastMsg && <div className="toast-container"><div className="toast" style={{ backgroundColor: toastMsg.includes('⚠️') ? 'rgba(255, 23, 68, 0.9)' : 'rgba(255, 255, 255, 0.15)' }}>{toastMsg}</div></div>}

      {/* MODALS */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">{editingId ? 'EDIT DETAILS' : 'ADD GAME'}</div>
            <div className="input-group"><label>GAME TITLE *</label><input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Required" /></div>
            <div className="input-group"><label>STORY CATEGORY</label><input value={formData.focus} onChange={e => setFormData({...formData, focus: e.target.value})} /></div>
            
            <div className="row-inputs">
              <div className="input-group"><label>YEAR *</label><input value={formData.year} onChange={e => setFormData({...formData, year: filterNumbers(e.target.value, 4)})} placeholder="YYYY" /></div>
              <div className="input-group"><label>EST. TIME (HR) *</label><input value={formData.time} onChange={e => setFormData({...formData, time: filterNumbers(e.target.value, 4)})} placeholder="Hours" /></div>
            </div>
            
            <div className="row-inputs">
              <div className="input-group"><label>START DATE</label><input value={formData.startDate} onChange={e => setFormData({...formData, startDate: formatSmartDate(e.target.value)})} placeholder="YYYY-MM-DD" /></div>
              <div className="input-group"><label>FINISH DATE</label><input value={formData.finishDate} onChange={e => setFormData({...formData, finishDate: formatSmartDate(e.target.value)})} placeholder="YYYY-MM-DD" /></div>
            </div>

            <div className="input-group">
              <label>TRACKED EXE (For Auto-Tracker)</label>
              <input 
                list="exe-options" 
                value={formData.trackedExe || ''} 
                onChange={e => {
                  const val = e.target.value;
                  setFormData(prev => ({ ...prev, trackedExe: val, startDate: (!prev.startDate && val) ? getTodayDate() : prev.startDate }));
                }} 
                placeholder="Click to select from running processes..." 
                autoComplete="off"
              />
              <datalist id="exe-options">
                {scannedProcesses.map(proc => <option key={proc} value={proc} />)}
              </datalist>
            </div>

            <div className="modal-actions"><button className="modal-btn btn-cancel" onClick={() => setModalVisible(false)}>CANCEL</button><button className="modal-btn btn-save" onClick={saveGame}>SAVE</button></div>
          </div>
        </div>
      )}

      {obsModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header" style={{ color: '#00E5FF' }}>CHOOSE TRACKING METHOD</div>
            <p style={{ color: '#828BB8', fontSize: '12px', marginBottom: '20px', textAlign: 'center' }}>
              Select a running .exe to track real-time hours natively, or skip it to track elapsed days manually.
            </p>
            <div className="input-group">
              <label>RUNNING WINDOWS PROCESSES</label>
              <select value={selectedExe} onChange={e => setSelectedExe(e.target.value)} style={{ background: '#0D0E15', color: '#FFF', padding: '14px', borderRadius: '10px', border: '1px solid #2A2E45', outline: 'none', marginBottom: '10px' }}>
                {scannedProcesses.map(proc => <option key={proc} value={proc}>{proc}</option>)}
              </select>
            </div>
            <div className="modal-actions" style={{ flexDirection: 'column', gap: '10px' }}>
              <button className="modal-btn btn-save" style={{ width: '100%' }} onClick={confirmTracking}>▶ START AUTO-TRACKING</button>
              <button className="modal-btn" style={{ width: '100%', backgroundColor: '#FFD700', color: '#090A0F' }} onClick={startManualTracking}>📅 TRACK MANUALLY (NO EXE)</button>
              <button className="modal-btn btn-cancel" style={{ width: '100%' }} onClick={() => setObsModalVisible(false)}>CANCEL</button>
            </div>
          </div>
        </div>
      )}

      {manualFinishModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: 350 }}>
            <div className="modal-header" style={{ color: '#FFD700' }}>GAME FINISHED</div>
            <p style={{ color: '#828BB8', fontSize: '12px', textAlign: 'center', marginBottom: '20px' }}>You are finishing a manually tracked game. What date did you beat it?</p>
            <div className="input-group">
              <label>FINISH DATE (YYYY-MM-DD)</label>
              <input value={manualFinishDate} onChange={e => setManualFinishDate(formatSmartDate(e.target.value))} />
            </div>
            <div className="modal-actions">
              <button className="modal-btn btn-cancel" onClick={() => setManualFinishModalVisible(false)}>CANCEL</button>
              <button className="modal-btn btn-save" style={{ backgroundColor: '#FFD700', color: '#000' }} onClick={confirmManualFinish}>SAVE</button>
            </div>
          </div>
        </div>
      )}

      {clearModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: 400, borderColor: '#FF1744' }}>
            <div className="modal-header" style={{ color: '#FF1744' }}>WIPE DATA?</div>
            <div className="modal-actions">
              <button className="modal-btn btn-cancel" onClick={() => setClearModalVisible(false)}>CANCEL</button>
              <button className="modal-btn btn-save" style={{ backgroundColor: clearCountdown > 0 ? '#2A2E45' : '#FF1744' }} disabled={clearCountdown > 0} onClick={executeClearAll}>{clearCountdown > 0 ? `LOCKED (${clearCountdown}s)` : 'WIPE DATA'}</button>
            </div>
          </div>
        </div>
      )}

      {exitModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: 400 }}>
            <div className="modal-header">EXIT OR MINIMIZE?</div>
            <p style={{ color: '#828BB8', fontSize: '12px', textAlign: 'center', marginBottom: '20px' }}>Exiting completely will stop background tracking. To keep tracking, just click the X at the top of the window to minimize to the System Tray.</p>
            <div className="modal-actions">
              <button className="modal-btn btn-cancel" onClick={() => setExitModalVisible(false)}>CANCEL</button>
              <button className="modal-btn btn-danger" onClick={() => window.electron.ipcRenderer.send('exit-app')}>QUIT APP</button>
            </div>
          </div>
        </div>
      )}

      {creditModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: 450 }}>
            <div className="contact-header">DEVELOPER</div>
            <div className="contact-name">Mustaq Hasnat Tamim</div>
            <div className="contact-detail">Department of Environmental Science and Geography<br/>Islamic University, Bangladesh</div>
            <div className="contact-links">
              <button className="contact-link-item" style={{ border: 'none', cursor: 'pointer', background: 'none', color: '#828BB8', padding: '5px' }} onClick={() => openExternalLink('https://linkedin.com/in/mustaqhasnattamim')}>LinkedIn</button>
              <button className="contact-link-item" style={{ border: 'none', cursor: 'pointer', background: 'none', color: '#828BB8', padding: '5px' }} onClick={() => openExternalLink('https://github.com/mustaqhasnattamim')}>GitHub</button>
              <button className="contact-link-item" style={{ border: 'none', cursor: 'pointer', background: 'none', color: '#828BB8', padding: '5px' }} onClick={() => openExternalLink('https://instagram.com/mustaq_hasnat_tamim')}>Instagram</button>
              <button className="contact-link-item" style={{ border: 'none', cursor: 'pointer', background: 'none', color: '#828BB8', padding: '5px' }} onClick={() => openExternalLink('https://facebook.com/mustaqhasnattamim13')}>Facebook</button>
            </div>
            <button className="modal-btn btn-cancel" style={{ marginTop: 25, width: '100%' }} onClick={() => setCreditModalVisible(false)}>CLOSE</button>
          </div>
        </div>
      )}
    </>
  )
}
export default App