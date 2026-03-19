import { useState, useEffect, useRef } from 'react'

function App() {
  const defaultGames = [
    { id: '1', title: 'Resident Evil HD Remaster', focus: 'The mansion incident that starts it all', year: '2015', time: '11', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '2', title: 'Prince of Persia: The Sands of Time', focus: 'The classic acrobatic puzzle platformer', year: '2003', time: '9', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '3', title: "Assassin's Creed", focus: 'The foundation of the Brotherhood', year: '2007', time: '15', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '4', title: 'Devil May Cry 3: Special Edition', focus: 'Fast, stylish hack-and-slash prequel', year: '2005', time: '12', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '5', title: 'Devil May Cry', focus: "Continuing Dante's awakening", year: '2001', time: '9', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '6', title: 'Resident Evil 2 Remake', focus: 'A tight, atmospheric survival horror shift', year: '2019', time: '9', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '7', title: 'Batman: Arkham Asylum', focus: 'Laying the superhero brawler foundation', year: '2009', time: '12', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '8', title: "Assassin's Creed II", focus: 'Starting the stealthy historical Ezio trilogy', year: '2009', time: '19', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '9', title: 'Prince of Persia: Warrior Within', focus: 'The dark, heavy-metal sequel', year: '2004', time: '12', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '10', title: 'Far Cry 3', focus: 'A chaotic FPS island getaway', year: '2012', time: '15', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '11', title: 'Resident Evil 3 Remake', focus: 'Short, explosive horror action', year: '2020', time: '6', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '12', title: 'Batman: Arkham City', focus: 'The superhero epic expands', year: '2011', time: '14', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '13', title: "Assassin's Creed: Brotherhood", focus: "Directly continuing Ezio's story", year: '2010', time: '15', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '14', title: 'Prince of Persia: The Two Thrones', focus: 'The grand finale of the time trilogy', year: '2005', time: '10', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '15', title: 'Devil May Cry 4: Special Edition', focus: 'Introducing a new DMC protagonist', year: '2015', time: '12', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '16', title: 'Far Cry 5', focus: 'A massive, modern open-world detour', year: '2018', time: '18', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '17', title: 'Resident Evil 4 Remake', focus: 'The ultimate action-horror masterpiece', year: '2023', time: '16', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '18', title: "Assassin's Creed: Revelations", focus: 'The emotional finale of the Ezio trilogy', year: '2011', time: '12', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '19', title: "Assassin's Creed III Remastered", focus: 'Wrapping up the modern-day story', year: '2019', time: '16', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '20', title: 'Batman: Arkham Knight', focus: 'The dark, vehicle-heavy Batman finale', year: '2015', time: '17', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '21', title: 'Resident Evil 7: Biohazard', focus: 'A terrifying first-person horror shift', year: '2017', time: '9', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '22', title: "Assassin's Creed IV: Black Flag", focus: 'A standalone pirate adventure', year: '2013', time: '23', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '23', title: 'Devil May Cry 5', focus: 'The jaw-dropping hack-and-slash finale', year: '2019', time: '11', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '24', title: 'Resident Evil Village', focus: 'The wild, snowy conclusion to RE7', year: '2021', time: '10', status: 'unplayed', startDate: '', finishDate: '' },
    { id: '25', title: 'Far Cry 6', focus: 'A giant sandbox to wrap up the marathon', year: '2021', time: '23', status: 'unplayed', startDate: '', finishDate: '' }
  ];

  const [games, setGames] = useState(defaultGames);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('pc_game_tracker_data');
    if (savedData !== null) { setGames(JSON.parse(savedData)); }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) { localStorage.setItem('pc_game_tracker_data', JSON.stringify(games)); }
  }, [games, isReady]);

  // Modals & UI States
  const [modalVisible, setModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [errorConfig, setErrorConfig] = useState({ visible: false, title: '', message: '' });
  const [creditModalVisible, setCreditModalVisible] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  
  // Clear All Data States
  const [clearModalVisible, setClearModalVisible] = useState(false);
  const [clearCountdown, setClearCountdown] = useState(5);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [duplicateToastMsg, setDuplicateToastMsg] = useState('');
  
  const [editingId, setEditingId] = useState(null);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [formData, setFormData] = useState({ title: '', focus: '', year: '', time: '', startDate: '', finishDate: '' });
  const [dateInput, setDateInput] = useState('');
  const [pendingStatus, setPendingStatus] = useState('');

  // --- 5 SECOND TIMER FOR CLEAR ALL ---
  useEffect(() => {
    if (clearModalVisible && clearCountdown > 0) {
      const timer = setTimeout(() => setClearCountdown(clearCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [clearModalVisible, clearCountdown]);

  const openClearAll = () => {
    setClearCountdown(5);
    setClearModalVisible(true);
    setDropdownOpen(false);
  };

  const executeClearAll = () => {
    setGames([]);
    localStorage.removeItem('pc_game_tracker_data');
    setClearModalVisible(false);
    showToast("SYSTEM REBOOT: All data erased.");
  };

  // --- CLICK OUTSIDE MENU LISTENER ---
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  // --- XML BACKUP & RESTORE ENGINE ---
  const escapeXML = (str) => str.replace(/[<>&'"]/g, c => ({'<': '&lt;', '>': '&gt;', '&': '&amp;', '\'': '&apos;', '"': '&quot;'}[c]));

  const exportToXML = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<games>\n';
    games.forEach(game => {
      xml += `  <game>\n    <id>${game.id}</id>\n    <title>${escapeXML(game.title)}</title>\n    <focus>${escapeXML(game.focus)}</focus>\n    <year>${game.year}</year>\n    <time>${game.time}</time>\n    <status>${game.status}</status>\n    <startDate>${game.startDate || ''}</startDate>\n    <finishDate>${game.finishDate || ''}</finishDate>\n  </game>\n`;
    });
    xml += '</games>';
    const blob = new Blob([xml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'GameTracker_Backup.xml'; a.click();
    URL.revokeObjectURL(url);
    setDropdownOpen(false); showToast("Backup Saved to Downloads!");
  };

  const importFromXML = (event) => {
    const file = event.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result; const parser = new DOMParser(); const xmlDoc = parser.parseFromString(text, "text/xml");
        const gameNodes = xmlDoc.getElementsByTagName("game");
        const restoredGames = []; let duplicateCount = 0;
        for (let i = 0; i < gameNodes.length; i++) {
          const node = gameNodes[i]; const getVal = (tag) => node.getElementsByTagName(tag)[0]?.textContent || '';
          const title = getVal('title');
          if (games.some(current => current.title.toLowerCase().trim() === title.toLowerCase().trim())) { duplicateCount++; continue; }
          restoredGames.push({ id: getVal('id') || Date.now().toString() + i, title, focus: getVal('focus'), year: getVal('year'), time: getVal('time'), status: getVal('status'), startDate: getVal('startDate'), finishDate: getVal('finishDate') });
        }
        if (restoredGames.length > 0) { setGames([...games, ...restoredGames]); showToast(`Restored ${restoredGames.length} games. Skipped ${duplicateCount} duplicates.`); }
        else if (duplicateCount > 0) { showToast("No new games added. All games in file already exist."); }
      } catch (err) { showError("CORRUPT FILE", "The selected XML file is corrupt or invalid."); }
    };
    reader.readAsText(file); setDropdownOpen(false); event.target.value = '';
  };

  const handleNativeExit = () => { window.electron.ipcRenderer.send('exit-app'); };

  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const showError = (title, message) => { setErrorConfig({ visible: true, title, message }); };
  const showDuplicatePopup = (message) => { setDuplicateToastMsg(message); setTimeout(() => { setDuplicateToastMsg(''); }, 2000); };
  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => { setToastMsg(''); }, 2500); };

  const isValidDate = (dateString) => {
    if (dateString.length !== 10) return false;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;
    const [year, month, day] = dateString.split('-').map(Number);
    if (month < 1 || month > 12 || day < 1 || day > 31) return false;
    const daysInMonth = new Date(year, month, 0).getDate();
    return day <= daysInMonth;
  };

  const calculateDays = (start, end) => {
    if (!start || !end || !isValidDate(start) || !isValidDate(end)) return null;
    const diffDays = Math.ceil(Math.abs(new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 1 : diffDays; 
  };

  // Fixed Smart Date Formatter
  const formatSmartDate = (text) => {
    const cleaned = text.replace(/\D+/g, '');
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(6, 8)}`;
  };

  // List Management (Up/Down)
  const moveUp = (index) => {
    if (index === 0) return;
    const newGames = [...games];
    [newGames[index - 1], newGames[index]] = [newGames[index], newGames[index - 1]];
    setGames(newGames);
  };
  
  const moveDown = (index) => {
    if (index === games.length - 1) return;
    const newGames = [...games];
    [newGames[index + 1], newGames[index]] = [newGames[index], newGames[index + 1]];
    setGames(newGames);
  };

  const holdTimer = useRef(null);
  const handleMouseDown = (id) => { holdTimer.current = setTimeout(() => revertFinish(id), 800); };
  const handleMouseUp = () => { if (holdTimer.current) clearTimeout(holdTimer.current); };
  const handleMouseLeave = () => { if (holdTimer.current) clearTimeout(holdTimer.current); };

  const saveGame = () => {
    if (!formData.title.trim() || !formData.focus.trim() || !formData.year || !formData.time) return showError("SYSTEM HALT", "Title, Category, Year, and Time are mandatory.");
    if (games.some(game => game.title.toLowerCase().trim() === formData.title.toLowerCase().trim() && game.id !== editingId)) { showDuplicatePopup("SYSTEM: Game Title already exists!"); return; }

    const yearNum = parseInt(formData.year, 10);
    if (yearNum < 1950 || yearNum > 2100) return showError("CHRONOLOGY ERROR", "Release year must be between 1950 and 2100.");
    if (parseInt(formData.time, 10) > 1000) return showError("CAPACITY EXCEEDED", "Maximum playtime cannot exceed 1000 hours.");

    if (formData.startDate && formData.startDate.length > 0) {
      if (!isValidDate(formData.startDate)) return showError("FORMAT ERROR", "Start date is invalid.");
      if (parseInt(formData.startDate.substring(0, 4), 10) < yearNum) return showError("TIMELINE ERROR", "Start date cannot occur before Release Year.");
    }
    if (formData.finishDate && formData.finishDate.length > 0) {
      if (!isValidDate(formData.finishDate)) return showError("FORMAT ERROR", "Finish date is invalid.");
      if (parseInt(formData.finishDate.substring(0, 4), 10) < yearNum) return showError("TIMELINE ERROR", "Finish date cannot occur before Release Year.");
    }
    if (formData.startDate && formData.finishDate && isValidDate(formData.startDate) && isValidDate(formData.finishDate)) {
      if (new Date(formData.finishDate) < new Date(formData.startDate)) return showError("PARADOX DETECTED", "Finish date cannot be before Start date.");
    }
    
    let derivedStatus = 'unplayed';
    if (formData.startDate && isValidDate(formData.startDate)) derivedStatus = 'playing';
    if (formData.startDate && formData.finishDate && isValidDate(formData.startDate) && isValidDate(formData.finishDate)) derivedStatus = 'finished';

    if (editingId) { setGames(games.map(game => (game.id === editingId ? { ...game, ...formData, status: derivedStatus } : game))); } 
    else { setGames([...games, { ...formData, id: Date.now().toString(), status: derivedStatus }]); }
    setModalVisible(false);
  };

  const confirmStatus = () => {
    if (!isValidDate(dateInput)) return showError("FORMAT ERROR", "The entered date does not exist.");
    const gameToUpdate = games.find(g => g.id === editingId);
    if (parseInt(dateInput.substring(0, 4), 10) < parseInt(gameToUpdate.year, 10)) return showError("TIMELINE ERROR", "Logged date cannot be before Release Year.");
    if (pendingStatus === 'finished' && gameToUpdate.startDate && new Date(dateInput) < new Date(gameToUpdate.startDate)) return showError("PARADOX DETECTED", "Finish date cannot occur before Start date.");

    setGames(games.map(game => { if (game.id === editingId) return { ...game, status: pendingStatus, [pendingStatus === 'playing' ? 'startDate' : 'finishDate']: dateInput }; return game; }));
    setStatusModalVisible(false);
  };

  const revertFinish = (id) => { setGames(games.map(game => game.id === id ? { ...game, status: 'playing', finishDate: '' } : game)); showToast("Progress Reset: Completion Undone!"); };
  const executeDelete = () => { setGames(games.filter(game => game.id !== gameToDelete.id)); setDeleteModalVisible(false); };

  if (!isReady) return null;

  return (
    <>
      <div className="header-container">
        <div className="header-title">GAME <span className="header-highlight">TRACKER</span></div>
        <div className="menu-container" ref={menuRef}>
          <button className="menu-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>⋮</button>
          {dropdownOpen && (
            <div className="dropdown">
              <button className="dropdown-item" onClick={exportToXML}>📥 Export Backup (.xml)</button>
              <label className="dropdown-item" style={{cursor: 'pointer'}}>
                📤 Restore Backup
                <input type="file" accept=".xml" style={{ display: 'none' }} onChange={importFromXML} />
              </label>
              <button className="dropdown-item" onClick={() => {setCreditModalVisible(true); setDropdownOpen(false);}}>👤 Contact Me</button>
              <button className="dropdown-item" style={{ color: '#FF1744', borderTop: '1px solid #2A2E45' }} onClick={openClearAll}>⚠️ Clear All Data</button>
              <button className="dropdown-item btn-exit" onClick={() => { setExitModalVisible(true); setDropdownOpen(false); }}>⏻ Exit Application</button>
            </div>
          )}
        </div>
      </div>

      <div className="main-content">
        <div className="games-grid">
          {games.map((item, index) => {
            const days = calculateDays(item.startDate, item.finishDate);
            let borderCol = '#2A2E45'; if (item.status === 'playing') borderCol = '#00E5FF'; if (item.status === 'finished') borderCol = '#B000FF';
            
            return (
              <div key={item.id} className="game-card" style={{ borderLeftColor: borderCol }}>
                <div className="card-header">
                  <div className="game-title">{index + 1}. {item.title}</div>
                  <div className="action-group">
                    <button onClick={() => moveUp(index)} className="icon-btn btn-move">▲</button>
                    <button onClick={() => moveDown(index)} className="icon-btn btn-move">▼</button>
                    <button onClick={() => { setEditingId(item.id); setFormData(item); setModalVisible(true); }} className="icon-btn btn-edit">EDIT</button>
                    <button onClick={() => { setGameToDelete(item); setDeleteModalVisible(true); }} className="icon-btn btn-del">DEL</button>
                  </div>
                </div>
                
                <div className="meta-row">
                  {item.focus && <span className="tag">{item.focus}</span>}
                  {item.year && <span className="tag">📅 {item.year}</span>}
                  {item.time && <span className="tag">⏱ {item.time} HR</span>}
                </div>

                {(item.startDate || item.finishDate) && (
                  <div className="date-box">
                    <div className="date-col"><span className="date-label">STARTED</span><span className="date-value">{item.startDate || '--'}</span></div>
                    <div className="date-col"><span className="date-label">FINISHED</span><span className="date-value">{item.finishDate || '--'}</span></div>
                    {days !== null && (<div className="date-col" style={{ alignItems: 'flex-end' }}><span className="date-label days-label">TOTAL</span><span className="days-value">{days} D</span></div>)}
                  </div>
                )}

                {item.status === 'unplayed' && <button onClick={() => { setEditingId(item.id); setPendingStatus('playing'); setDateInput(getTodayDate()); setStatusModalVisible(true); }} className="status-btn btn-start">▶ START GAME</button>}
                {item.status === 'playing' && <button onClick={() => { setEditingId(item.id); setPendingStatus('finished'); setDateInput(getTodayDate()); setStatusModalVisible(true); }} className="status-btn btn-finish">★ MARK FINISHED</button>}
                {item.status === 'finished' && (<button onMouseDown={() => handleMouseDown(item.id)} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave} onClick={() => showToast("PC: Hold mouse click to undo")} className="status-btn btn-completed">🏆 FINISHED</button>)}
              </div>
            );
          })}
        </div>

        <button className="main-add-btn" onClick={() => { setEditingId(null); setFormData({ title: '', focus: '', year: '', time: '', startDate: '', finishDate: '' }); setModalVisible(true); }}>
          + ADD NEW ENTRY
        </button>

        <div className="minimal-credit" style={{ lineHeight: '1.6' }}>
          DEVELOPED BY Mustaq Hasnat Tamim<br/>
          Department of Environmental Science and Geography<br/>
          Islamic University, Bangladesh<br/>
          mustaqhasnattamim13@gmail.com
        </div>
      </div>

      <div className="toast-container">
        {toastMsg && <div className="toast">{toastMsg}</div>}
        {duplicateToastMsg && <div className="toast duplicate-toast">{duplicateToastMsg}</div>}
      </div>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">{editingId ? 'EDIT DETAILS' : 'CREATE NEW ENTRY'}</div>
            <div className="input-group"><label>GAME TITLE *</label><input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
            <div className="input-group"><label>STORY CATEGORY *</label><input value={formData.focus} onChange={e => setFormData({...formData, focus: e.target.value})} /></div>
            <div className="row-inputs">
              <div className="input-group"><label>RELEASE YEAR *</label><input value={formData.year} onChange={e => setFormData({...formData, year: e.target.value.replace(/[^0-9]/g, '').substring(0, 4)})} /></div>
              <div className="input-group"><label>PLAYTIME (HR) *</label><input value={formData.time} onChange={e => setFormData({...formData, time: e.target.value.replace(/[^0-9]/g, '')})} /></div>
            </div>
            <div className="input-group"><label>START DATE (OPTIONAL)</label><input placeholder="YYYY-MM-DD" maxLength={10} value={formData.startDate} onChange={e => setFormData({...formData, startDate: formatSmartDate(e.target.value)})} /></div>
            <div className="input-group"><label>FINISH DATE (OPTIONAL)</label><input placeholder="YYYY-MM-DD" maxLength={10} value={formData.finishDate} onChange={e => setFormData({...formData, finishDate: formatSmartDate(e.target.value)})} /></div>
            <div className="modal-actions"><button className="modal-btn btn-cancel" onClick={() => setModalVisible(false)}>CANCEL</button><button className="modal-btn btn-save" onClick={saveGame}>SAVE</button></div>
          </div>
        </div>
      )}

      {statusModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth: 400}}>
            <div className="modal-header">{pendingStatus === 'playing' ? 'CONFIRM START' : 'CONFIRM FINISH'}</div>
            <div className="input-group"><label>DATE (YYYY-MM-DD)</label><input value={dateInput} maxLength={10} onChange={e => setDateInput(formatSmartDate(e.target.value))} /></div>
            <div className="modal-actions"><button className="modal-btn btn-cancel" onClick={() => setStatusModalVisible(false)}>CANCEL</button><button className="modal-btn btn-save" onClick={confirmStatus}>CONFIRM</button></div>
          </div>
        </div>
      )}

      {deleteModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth: 400, borderColor: '#FF1744'}}>
            <div className="modal-header" style={{color: '#FF1744'}}>WARNING</div>
            <div style={{color: '#C0CAF5', fontSize: 13, textAlign: 'center', marginBottom: 20}}>Are you sure you want to permanently delete "{gameToDelete?.title}"?</div>
            <div className="modal-actions"><button className="modal-btn btn-cancel" onClick={() => setDeleteModalVisible(false)}>CANCEL</button><button className="modal-btn btn-save" style={{backgroundColor: '#FF1744'}} onClick={executeDelete}>DELETE</button></div>
          </div>
        </div>
      )}

      {clearModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth: 400, borderColor: '#FF1744'}}>
            <div className="modal-header" style={{color: '#FF1744'}}>CRITICAL WARNING</div>
            <div style={{color: '#C0CAF5', fontSize: 13, textAlign: 'center', marginBottom: 20, lineHeight: 1.6}}>
              You are about to permanently delete <b>ALL</b> your saved games and progress.<br/><br/>
              This action cannot be undone unless you have an XML backup.
            </div>
            <div className="modal-actions">
              <button className="modal-btn btn-cancel" onClick={() => setClearModalVisible(false)}>CANCEL</button>
              <button 
                className="modal-btn btn-save" 
                style={{
                  backgroundColor: clearCountdown > 0 ? '#2A2E45' : '#FF1744', 
                  color: clearCountdown > 0 ? '#828BB8' : '#FFFFFF', 
                  cursor: clearCountdown > 0 ? 'not-allowed' : 'pointer'
                }} 
                disabled={clearCountdown > 0} 
                onClick={executeClearAll}
              >
                {clearCountdown > 0 ? `LOCKED (${clearCountdown}s)` : 'WIPE ALL DATA'}
              </button>
            </div>
          </div>
        </div>
      )}

      {exitModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth: 400}}>
            <div className="modal-header">EXIT APPLICATION</div>
            <div style={{color: '#C0CAF5', fontSize: 13, textAlign: 'center', marginBottom: 20}}>
              Are you sure you want to close the Game Tracker?
            </div>
            <div className="modal-actions">
              <button className="modal-btn btn-cancel" onClick={() => setExitModalVisible(false)}>CANCEL</button>
              <button className="modal-btn btn-danger" onClick={handleNativeExit}>EXIT APP</button>
            </div>
          </div>
        </div>
      )}

      {errorConfig.visible && (
        <div className="modal-overlay" style={{zIndex: 20000}}>
          <div className="modal-content error-terminal">
            <div className="error-title">{errorConfig.title}</div>
            <div className="error-msg">{errorConfig.message}</div>
            <button className="modal-btn btn-danger" onClick={() => setErrorConfig({...errorConfig, visible: false})}>ACKNOWLEDGE</button>
          </div>
        </div>
      )}

      {creditModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth: 450}}>
            <div className="contact-header">DEVELOPED BY</div>
            <div className="contact-name">M. H. TAMIM</div>
            <div className="contact-detail">
              Department of Environmental Science and Geography<br/>
              Islamic University, Bangladesh<br/><br/>
              Mail: mustaqhasnattamim13@gmail.com
            </div>
            <div className="contact-links">
              <a href="https://linkedin.com/in/mustaqhasnattamim" target="_blank" rel="noreferrer" className="contact-link-item">LinkedIn</a>
              <a href="https://github.com/mustaqhasnattamim" target="_blank" rel="noreferrer" className="contact-link-item">GitHub</a>
              <a href="https://instagram.com/mustaq_hasnat_tamim" target="_blank" rel="noreferrer" className="contact-link-item">Instagram</a>
              <a href="https://facebook.com/mustaqhasnattamim13" target="_blank" rel="noreferrer" className="contact-link-item">Facebook</a>
            </div>
            <button className="modal-btn btn-cancel" style={{marginTop: 25, width: '100%'}} onClick={() => setCreditModalVisible(false)}>CLOSE MENU</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App