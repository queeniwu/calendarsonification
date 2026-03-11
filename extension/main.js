(function () {
  "use strict";

  var PICKER = {
    main: "#5276B3",
    todo: "#EAEAEA",
    goal: "#F2E1B4",
    work: "#D4E7F7",
    busy: "#000000",
  };

  var NOTES_BY_TYPE = {
    synth: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "E5", "G5"],
    kick: ["C2", "D2", "E2", "F2", "G2"],
    snare: ["C2"],
    gong: ["C2"],
    ambient: ["A2", "A3", "C4", "E3", "G4"],
  };

  var PALETTE_TO_SOUND = {
    main: { type: "synth", note: "G4" },
    todo: { type: "kick", note: "E2" },
    goal: { type: "gong", note: "C2" },
    work: { type: "ambient", note: "A3" },
    busy: { type: "snare", note: "C2" },
    default: { type: "synth", note: "C4" },
  };

  function cssColorToHex(cssColor) {
    if (!cssColor || cssColor === "transparent") return "#888888";
    var m = cssColor.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (m) {
      var r = ("0" + parseInt(m[1], 10).toString(16)).slice(-2);
      var g = ("0" + parseInt(m[2], 10).toString(16)).slice(-2);
      var b = ("0" + parseInt(m[3], 10).toString(16)).slice(-2);
      return "#" + r + g + b;
    }
    if (cssColor.indexOf("#") === 0) return cssColor.slice(0, 7);
    return "#888888";
  }

  function hexToRgb(hex) {
    var m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return null;
    return {
      r: parseInt(m[1], 16),
      g: parseInt(m[2], 16),
      b: parseInt(m[3], 16),
    };
  }

  function colorDistance(hex1, hex2) {
    var a = hexToRgb(hex1);
    var b = hexToRgb(hex2);
    if (!a || !b) return 1e9;
    return Math.sqrt(
      Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2)
    );
  }

  function nearestPaletteLabel(hex) {
    var labels = Object.keys(PICKER);
    var best = "default";
    var bestD = 1e9;
    for (var i = 0; i < labels.length; i++) {
      var d = colorDistance(hex, PICKER[labels[i]]);
      if (d < bestD) {
        bestD = d;
        best = labels[i];
      }
    }
    return best;
  }

  function hashForNote(str) {
    var h = 0;
    for (var i = 0; i < (str || "").length; i++) h = (h << 5) - h + str.charCodeAt(i);
    return Math.abs(h);
  }

  function colorToSound(hex, durationMin, title) {
    var label = nearestPaletteLabel(hex);
    var def = PALETTE_TO_SOUND[label] || PALETTE_TO_SOUND.default;
    var notes = NOTES_BY_TYPE[def.type];
    if (!notes || notes.length === 0) return def;
    var idx = hashForNote(title + hex) % notes.length;
    return { type: def.type, note: notes[idx] };
  }

  function getGridLayout() {
    var main = document.querySelector("div[role='main']");
    if (!main) return null;
    var grid = main.querySelector("div[role='grid']");
    if (!grid || !grid.children || grid.children.length < 2) return null;
    var timedRegion = grid.children[1];
    var regionRect = timedRegion.getBoundingClientRect();
    var pixelsPerHour = regionRect.height / 24;
    var timeGutterWidth = 60;
    var firstRow = timedRegion.querySelector("div[role='row']");
    if (firstRow && firstRow.children && firstRow.children.length >= 8) {
      var firstCell = firstRow.children[0];
      if (firstCell) timeGutterWidth = firstCell.getBoundingClientRect().width;
    }
    var dayAreaLeft = regionRect.left + timeGutterWidth;
    var dayAreaWidth = regionRect.width - timeGutterWidth;
    var columnWidth = dayAreaWidth / 7;
    var scrollTop = timedRegion.scrollTop || 0;
    return {
      main: main,
      grid: grid,
      timedRegion: timedRegion,
      regionRect: regionRect,
      pixelsPerHour: pixelsPerHour,
      timeGutterWidth: timeGutterWidth,
      dayAreaLeft: dayAreaLeft,
      columnWidth: columnWidth,
      scrollTop: scrollTop,
    };
  }

  function getNowIndicatorPosition(layout) {
    if (!layout || !layout.timedRegion) return null;
    var regionRect = layout.timedRegion.getBoundingClientRect();
    var scrollTop = layout.timedRegion.scrollTop || 0;
    var dayAreaLeft = regionRect.left + (layout.timeGutterWidth || 60);
    var columnWidth = layout.columnWidth;
    var pixelsPerHour = layout.pixelsPerHour;
    var nowEl =
      layout.timedRegion.querySelector(".rGFpCd") ||
      layout.main.querySelector(".rGFpCd") ||
      document.querySelector(".rGFpCd");
    if (!nowEl) {
      var all = document.querySelectorAll("[class*='rGFpCd']");
      for (var i = 0; i < all.length; i++) {
        if (layout.timedRegion.contains(all[i])) {
          nowEl = all[i];
          break;
        }
      }
    }
    if (!nowEl) return null;
    var rect = nowEl.getBoundingClientRect();
    if (rect.bottom < regionRect.top || rect.top > regionRect.bottom) return null;
    var topRel = rect.top - regionRect.top + scrollTop;
    var leftRel = rect.left - dayAreaLeft;
    var min = (topRel / pixelsPerHour) * 60;
    var day = Math.floor(leftRel / columnWidth);
    day = Math.max(0, Math.min(6, day));
    min = Math.max(0, Math.min(1440, min));
    return { currentMin: min, currentDay: day };
  }

  function getEventButtons() {
    var main = document.querySelector("div[role='main']");
    if (!main) return [];
    return Array.prototype.slice.call(main.querySelectorAll("div[role='button']"));
  }

  function isAllDay(eventEl) {
    var inner = (eventEl.innerText || "").split("\n");
    return inner.length === 2;
  }

  function scrapeEvents() {
    var layout = getGridLayout();
    if (!layout) return { events: [], layout: null };
    var regionRect = layout.regionRect;
    var pixelsPerHour = layout.pixelsPerHour;
    var dayAreaLeft = layout.dayAreaLeft;
    var columnWidth = layout.columnWidth;
    var scrollTop = layout.scrollTop;
    var buttons = getEventButtons();
    var events = [];
    var dayBounds = [];
    for (var d = 0; d < 7; d++) dayBounds[d] = { left: Infinity, right: -Infinity };
    for (var i = 0; i < buttons.length; i++) {
      var el = buttons[i];
      if (isAllDay(el)) continue;
      var rect = el.getBoundingClientRect();
      if (rect.bottom < regionRect.top || rect.top > regionRect.bottom) continue;
      if (rect.right < dayAreaLeft || rect.left > regionRect.right) continue;
      var topRel = rect.top - regionRect.top + scrollTop;
      var leftRel = rect.left - dayAreaLeft;
      var startMin = Math.max(0, Math.min(1440, (topRel / pixelsPerHour) * 60));
      var durationMin = (rect.height / pixelsPerHour) * 60;
      var endMin = Math.max(0, Math.min(1440, startMin + durationMin));
      var day = Math.floor(leftRel / columnWidth);
      day = Math.max(0, Math.min(6, day));
      if (rect.left < dayBounds[day].left) dayBounds[day].left = rect.left;
      if (rect.right > dayBounds[day].right) dayBounds[day].right = rect.right;
      var title = (el.innerText || "").split("\n")[0] || "Event";
      var bg = window.getComputedStyle(el).backgroundColor;
      var hex = cssColorToHex(bg);
      var sound = colorToSound(hex, durationMin, title);
      events.push({
        day: day,
        start: Math.round(startMin),
        end: Math.round(endMin),
        title: title,
        color: hex,
        type: sound.type,
        note: sound.note,
      });
    }
    layout.dayBounds = dayBounds;
    return { events: events, layout: layout };
  }

  var activeTimeouts = [];
  var ambientSynth, rhythmicSynth, snare, kick, gong, dayDrone;
  var chords = {
    major: ["C4", "E4", "G4"],
    minor: ["A3", "C4", "E4"],
    seventh: ["C3", "E3", "G3", "Bb3"],
    sus: ["C4", "F4", "G4"],
  };
  var dayNotes = { 0: "C2", 1: "D2", 2: "E2", 3: "F2", 4: "G2", 5: "A2", 6: "B2" };

  function initSynths() {
    ambientSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 1.5, decay: 0.5, sustain: 0.6, release: 2 },
      volume: -10,
    }).toDestination();
    rhythmicSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 0.5 },
      volume: -8,
    }).toDestination();
    snare = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: 0.001, decay: 0.2, sustain: 0 },
      volume: -12,
    }).toDestination();
    kick = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 10,
      oscillator: { type: "sine" },
      envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4 },
      volume: -14,
    }).toDestination();
    gong = new Tone.MetalSynth({
      frequency: 80,
      envelope: { attack: 0.001, decay: 1.4, release: 3 },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5,
      volume: -6,
    }).toDestination();
    dayDrone = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 3, decay: 0, sustain: 1, release: 3 },
      volume: -10,
    }).toDestination();
  }

  function nextToneTime() {
    var now = Tone.now();
    if (lastToneTime === 0) lastToneTime = now;
    lastToneTime += 0.025;
    if (lastToneTime <= now) lastToneTime = now + 0.025;
    return lastToneTime;
  }

  function playSoundImmediate(evt) {
    if (evt.type === "ambient") {
      ambientSynth.triggerAttackRelease(evt.note, "2n");
    } else if (evt.type === "snare") {
      snare.triggerAttackRelease("8n");
    } else if (evt.type === "kick") {
      kick.triggerAttackRelease(evt.note, "8n");
    } else if (evt.type === "gong") {
      gong.triggerAttackRelease("16n");
    } else {
      rhythmicSynth.triggerAttackRelease(evt.note, "4n");
    }
  }

  function playSound(evt) {
    setTimeout(function () {
      if (!playing) return;
      Tone.start();
      playSoundImmediate(evt);
    }, 0);
  }

  var playing = false;
  var currentMin = 0;
  var currentDay = 0;
  var speed = 20;
  var animFrame = null;
  var activeAmbient = {};
  var triggeredEvents = {};
  var events = [];
  var layout = null;
  var playheadEl = null;
  var panelEl = null;
  var currentTimeEl = null;
  var speedValEl = null;
  var lastToneTime = 0;

  function formatHour(h, m) {
    var hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
    var ampm = h < 12 ? "AM" : "PM";
    return hour + ":" + (m < 10 ? "0" : "") + m + " " + ampm;
  }

  function updatePlayhead() {
    if (!playheadEl || !layout) return;
    layout.regionRect = layout.timedRegion.getBoundingClientRect();
    layout.scrollTop = layout.timedRegion.scrollTop || 0;
    var r = layout.regionRect;
    var pph = layout.pixelsPerHour;
    var topPx = (currentMin / 60) * pph - layout.scrollTop;
    var dayLeft = r.left + (layout.timeGutterWidth || 60);
    var colW = layout.columnWidth;
    var leftPx = dayLeft + currentDay * colW;
    var widthPx = colW;
    if (layout.dayBounds && layout.dayBounds[currentDay] && layout.dayBounds[currentDay].right > layout.dayBounds[currentDay].left) {
      leftPx = layout.dayBounds[currentDay].left;
      widthPx = layout.dayBounds[currentDay].right - layout.dayBounds[currentDay].left;
    }
    playheadEl.style.top = r.top + topPx + "px";
    playheadEl.style.left = leftPx + "px";
    playheadEl.style.width = widthPx + "px";
    playheadEl.style.height = "4px";
    if (currentTimeEl)
      currentTimeEl.textContent =
        "Day " + (currentDay + 1) + " · " + formatHour(Math.floor(currentMin / 60), Math.floor(currentMin % 60));
    if (speedValEl) speedValEl.textContent = speed + "x";
  }

  function checkEvents() {
    for (var idx = 0; idx < events.length; idx++) {
      var evt = events[idx];
      if (evt.day !== currentDay) continue;
      var isInEvent = currentMin >= evt.start && currentMin < evt.end;
      var eventKey = currentDay + "-" + idx;
      if (evt.type === "ambient") {
        if (isInEvent) {
          if (!activeAmbient[eventKey]) {
            Tone.start();
            ambientSynth.triggerAttack(evt.note, nextToneTime());
            activeAmbient[eventKey] = true;
          }
        } else {
          if (activeAmbient[eventKey]) {
            ambientSynth.triggerRelease(evt.note, nextToneTime());
            delete activeAmbient[eventKey];
          }
        }
      } else {
        if (isInEvent) {
          if (!triggeredEvents[eventKey]) {
            Tone.start();
            playSound(evt);
            triggeredEvents[eventKey] = true;
          }
        } else {
          delete triggeredEvents[eventKey];
        }
      }
    }
  }

  function animate() {
    if (!playing) return;
    currentMin += speed / 3600;
    if (currentMin >= 1440) {
      Object.keys(activeAmbient).forEach(function (key) {
        if (key.startsWith(currentDay + "-")) {
          var idx = parseInt(key.split("-")[1], 10);
          var evt = events[idx];
          if (evt) ambientSynth.triggerRelease(evt.note, nextToneTime());
          delete activeAmbient[key];
        }
      });
      Object.keys(triggeredEvents).forEach(function (key) {
        if (key.startsWith(currentDay + "-")) delete triggeredEvents[key];
      });
      dayDrone.triggerRelease(nextToneTime());
      currentMin = 0;
      currentDay++;
      if (currentDay >= 7) {
        stop();
        return;
      }
      dayDrone.triggerAttack(dayNotes[currentDay], nextToneTime());
    }
    updatePlayhead();
    checkEvents();
    animFrame = requestAnimationFrame(animate);
  }

  function stop() {
    playing = false;
    lastToneTime = 0;
    if (panelEl) {
      var btn = panelEl.querySelector(".cs-play-btn");
      if (btn) btn.textContent = "Play";
    }
    if (animFrame) cancelAnimationFrame(animFrame);
    activeTimeouts.forEach(function (id) {
      clearTimeout(id);
    });
    activeTimeouts = [];
    if (dayDrone) dayDrone.triggerRelease(nextToneTime());
    if (ambientSynth) {
      Object.keys(activeAmbient).forEach(function (key) {
        var idx = parseInt(key.split("-")[1], 10);
        var evt = events[idx];
        if (evt) ambientSynth.triggerRelease(evt.note, nextToneTime());
      });
    }
    activeAmbient = {};
    triggeredEvents = {};
  }

  function scanAndBuild() {
    var result = scrapeEvents();
    events = result.events;
    layout = result.layout;
    if (!layout) {
      setStatus("Switch to Week view and try again.");
      return false;
    }
    setStatus(events.length + " events this week");
    return true;
  }

  function setStatus(text) {
    if (panelEl) {
      var status = panelEl.querySelector(".cs-status");
      if (status) status.textContent = text;
    }
  }

  function createPanel() {
    if (document.getElementById("calendar-sonification-panel")) return;
    var panel = document.createElement("div");
    panel.id = "calendar-sonification-panel";
    panel.className = "cs-panel";

    var status = document.createElement("div");
    status.className = "cs-status";
    status.textContent = "Loading audio…";
    panel.appendChild(status);

    var controls = document.createElement("div");
    controls.className = "cs-controls";
    var playBtn = document.createElement("button");
    playBtn.className = "cs-btn cs-play-btn";
    playBtn.textContent = "Play";
    var stopBtn = document.createElement("button");
    stopBtn.className = "cs-btn cs-stop-btn";
    stopBtn.textContent = "Stop";
    var scanBtn = document.createElement("button");
    scanBtn.className = "cs-btn cs-scan-btn";
    scanBtn.textContent = "Scan week";
    controls.appendChild(playBtn);
    controls.appendChild(stopBtn);
    controls.appendChild(scanBtn);
    panel.appendChild(controls);

    var speedLabel = document.createElement("label");
    speedLabel.className = "cs-speed";
    speedLabel.textContent = "Speed: ";
    var speedSlider = document.createElement("input");
    speedSlider.type = "range";
    speedSlider.className = "cs-speed-slider";
    speedSlider.min = "1";
    speedSlider.max = "10000";
    speedSlider.value = "20";
    var speedVal = document.createElement("span");
    speedVal.className = "cs-speed-val";
    speedVal.textContent = "20x";
    speedLabel.appendChild(speedSlider);
    speedLabel.appendChild(speedVal);
    panel.appendChild(speedLabel);

    var timeEl = document.createElement("span");
    timeEl.className = "cs-time cs-current-time";
    panel.appendChild(timeEl);

    document.body.appendChild(panel);
    panelEl = panel;
    currentTimeEl = panel.querySelector(".cs-current-time");
    speedValEl = panel.querySelector(".cs-speed-val");

    scanBtn.onclick = function () {
      scanAndBuild();
    };
    playBtn.onclick = function () {
      if (typeof Tone === "undefined") {
        setStatus("Audio failed to load. Reload the page and try again.");
        return;
      }
      if (!layout && !scanAndBuild()) return;
      if (events.length === 0) {
        setStatus("No events found. Switch to Week view and click Scan week.");
        return;
      }
      if (!playing) {
        var nowPos = getNowIndicatorPosition(layout);
        if (nowPos) {
          currentMin = nowPos.currentMin;
          currentDay = nowPos.currentDay;
        }
        Tone.start();
        lastToneTime = 0;
        playing = true;
        this.textContent = "Pause";
        if (playheadEl) playheadEl.style.display = "block";
        dayDrone.triggerAttack(dayNotes[currentDay], nextToneTime());
        animate();
      } else {
        playing = false;
        this.textContent = "Play";
        if (animFrame) cancelAnimationFrame(animFrame);
        dayDrone.triggerRelease(nextToneTime());
        Object.keys(activeAmbient).forEach(function (key) {
          var idx = parseInt(key.split("-")[1], 10);
          var evt = events[idx];
          if (evt) ambientSynth.triggerRelease(evt.note, nextToneTime());
        });
        activeAmbient = {};
      }
    };
    stopBtn.onclick = function () {
      stop();
      currentMin = 0;
      currentDay = 0;
      updatePlayhead();
      if (playheadEl) playheadEl.style.display = "none";
    };
    speedSlider.oninput = function () {
      speed = parseInt(this.value, 10);
      if (speedValEl) speedValEl.textContent = speed + "x";
    };
  }

  function createPlayhead() {
    if (document.getElementById("calendar-sonification-playhead")) return;
    var el = document.createElement("div");
    el.id = "calendar-sonification-playhead";
    el.className = "cs-playhead";
    el.style.display = "none";
    document.body.appendChild(el);
    playheadEl = el;
  }

  function teardown() {
    stop();
    if (playheadEl && playheadEl.parentNode) playheadEl.parentNode.removeChild(playheadEl);
    if (panelEl && panelEl.parentNode) panelEl.parentNode.removeChild(panelEl);
    playheadEl = null;
    panelEl = null;
    currentTimeEl = null;
    speedValEl = null;
    events = [];
    layout = null;
  }

  function onToneReady() {
    if (typeof Tone === "undefined") {
      setStatus("Audio failed to load. Reload the page and try again.");
      return;
    }
    initSynths();
    setStatus("Click Scan week, then Play");
    scanAndBuild();
    updatePlayhead();
  }

  function bootstrap() {
    try {
      createPanel();
      createPlayhead();
      chrome.runtime.onMessage.addListener(function (request) {
        if (request.action === "stopSonification") teardown();
      });
      onToneReady();
    } catch (e) {
      var errPanel = document.createElement("div");
      errPanel.id = "calendar-sonification-panel";
      errPanel.className = "cs-panel";
      var errStatus = document.createElement("div");
      errStatus.className = "cs-status";
      errStatus.textContent = "Error: " + (e && e.message ? e.message : "check console");
      errPanel.appendChild(errStatus);
      document.body.appendChild(errPanel);
    }
  }

  bootstrap();
})();
