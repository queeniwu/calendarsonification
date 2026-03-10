var PICKER = {
    main: '#5276B3',
    todo: '#EAEAEA',
    goal: '#F2E1B4',
    work: '#D4E7F7',
    busy: '#000000',
};

var events = [
    // Sunday - ambient background
    {day: 0, start: 540, end: 600, title: 'start paintings', color: PICKER.todo, note: 'C2', type: 'kick', layer: 'front'},
    {day: 0, start: 600, end: 630, title: 'eat leftovers', color: PICKER.todo, note: 'E1', type: 'kick', layer: 'front'},
    {day: 0, start: 660, end: 750, title: 'granular synthesis', color: PICKER.main, note: 'G4', type: 'synth', layer: 'front'},
    {day: 0, start: 750, end: 870, title: 'html review heads down', color: PICKER.main, note: 'A4', type: 'synth', layer: 'front'},
    {day: 0, start: 900, end: 930, title: 'return shoes', color: PICKER.main, note: 'C4', type: 'synth', layer: 'front'},
    {day: 0, start: 960, end: 1005, title: 'Solidcore', color: PICKER.goal, type: 'gong', layer: 'front'},
    {day: 0, start: 1140, end: 1290, title: 'ethan/amanda', color: PICKER.main, type: 'synth', layer: 'front', sound: {type: 'chord', name: 'major'}},
    
    // Monday
    {day: 1, start: 690, end: 1140, title: 'Work', color: PICKER.work, type: 'ambient', layer: 'back', sound: {type: 'chord', name: 'major'}},
    {day: 1, start: 570, end: 600, title: 'new school library', color: PICKER.todo, note: 'E3', type: 'kick', layer: 'front'},
    {day: 1, start: 600, end: 660, title: 'Appointment', color: PICKER.main, note: 'D5', type: 'synth', layer: 'front'},
    {day: 1, start: 720, end: 735, title: 'Meeting', color: PICKER.busy, note: 'C2', type: 'snare', layer: 'front'},

    {day: 1, start: 750, end: 780, title: 'Meeting', color: PICKER.busy, note: 'F2', type: 'snare', layer: 'front'},
    {day: 1, start: 810, end: 840, title: 'Meeting', color: PICKER.busy, note: 'C2', type: 'snare', layer: 'front'},
    {day: 1, start: 960, end: 990, title: 'Meeting', color: PICKER.busy, note: 'C2', type: 'snare', layer: 'front'},
    {day: 1, start: 1080, end: 1140, title: 'Meeting', color: PICKER.busy, note: 'C2', type: 'snare', layer: 'front'},
    {day: 1, start: 870, end: 960, title: 'Swim', color: PICKER.goal, note: 'E2', type: 'synth', layer: 'front'},
    {day: 1, start: 1140, end: 1200, title: 'hourly comic', color: PICKER.goal, note: 'F2', type: 'synth', layer: 'back'},
    {day: 1, start: 1200, end: 1230, title: 'get milk', color: PICKER.todo, note: 'E2', type: 'kick', layer: 'front'},

    
    // Tuesday
    {day: 2, start: 510, end: 540, title: 'coffee', color: PICKER.main, note: 'G5', type: 'synth', layer: 'front'},
    {day: 2, start: 660, end: 710, title: 'Therapy session', color: PICKER.main, sound: {type: 'chord', name: 'minor'}, type: 'synth', layer: 'front'},
    {day: 2, start: 570, end: 660, title: 'prototype essay', color: PICKER.main, note: 'E5', type: 'synth', layer: 'front'},

    {day: 2, start: 750, end: 1020, title: 'Work', color: PICKER.work, type: 'ambient', layer: 'back', sound: {type: 'chord', name: 'sus'}},
    {day: 2, start: 750, end: 765, title: 'Meeting', color: PICKER.busy, note: 'B5', type: 'snare', layer: 'front'},
    {day: 2, start: 780, end: 810, title: 'Meeting', color: PICKER.busy, note: 'C3', type: 'snare', layer: 'front'},
    {day: 2, start: 870, end: 930, title: 'Meeting', color: PICKER.busy, note: 'F2', type: 'snare', layer: 'front'},
    {day: 2, start: 930, end: 960, title: 'Meeting', color: PICKER.busy, note: 'E2', type: 'snare', layer: 'front'},

    {day: 2, start: 1020, end: 1050, title: 'library pickup', color: PICKER.todo, note: 'E5', type: 'synth', layer: 'front'},
    {day: 2, start: 1080, end: 1170, title: 'Thesis Small Group', color: PICKER.main, sound: {type: 'chord', name: 'sus'}, type: 'synth', layer: 'front'},
    {day: 2, start: 1200, end: 1320, title: 'make banana bread', color: PICKER.todo, note: 'A3', type: 'ambient', layer: 'front'},

    
    // Wednesday
    {day: 3, start: 480, end: 540, title: 'a morning yap', color: PICKER.main, note: 'C2', type: 'synth', layer: 'front'},
    {day: 3, start: 570, end: 750, title: 'Time', color: PICKER.work, note: 'E3', type: 'ambient', layer: 'back'},
    {day: 3, start: 750, end: 930, title: 'Work', color: PICKER.work, note: 'A3', type: 'ambient', layer: 'back'},
    {day: 3, start: 750, end: 780, title: 'Meeting', color: PICKER.busy, note: 'C2', type: 'snare', layer: 'front'},
    {day: 3, start: 810, end: 870, title: 'Meeting', color: PICKER.busy, note: 'G3', type: 'snare', layer: 'front'},
    {day: 3, start: 900, end: 960, title: 'Meeting', color: PICKER.busy, note: 'B3', type: 'snare', layer: 'front'},

    {day: 3, start: 960, end: 1020, title: 'html review heads down', color: PICKER.main, note: 'B5', type: 'synth', layer: 'front'},
    {day: 3, start: 1020, end: 1050, title: 'Queenie <> The HTML Review', color: PICKER.main, note: 'E5', type: 'synth', layer: 'front'},
    {day: 3, start: 1050, end: 1080, title: 'call pharmacy', color: PICKER.todo, note: 'D2', type: 'kick', layer: 'front'},
    {day: 3, start: 1110, end: 1230, title: 'Gym', color: PICKER.goal, note: 'D4', type: 'ambient', layer: 'front'},
    {day: 3, start: 1260, end: 1320, title: 'make salmon', color: PICKER.todo, note: 'B4', type: 'synth', layer: 'front'},


    // Thursday
    {day: 4, start: 540, end: 600, title: 'Solidcore', color: PICKER.goal, note: 'E2', type: 'synth', layer: 'front'},
    {day: 4, start: 630, end: 690, title: 'Journalling', color: PICKER.main, note: 'A2', type: 'ambient', layer: 'back'},
    {day: 4, start: 690, end: 900, title: 'Work', color: PICKER.work,sound: {type: 'chord', name: 'sus'}, type: 'ambient', layer: 'back'},

    {day: 4, start: 750, end: 810, title: 'Meeting', color: PICKER.busy, note: 'C5', type: 'snare', layer: 'front'},
    {day: 4, start: 810, end: 870, title: 'Meeting', color: PICKER.busy, note: 'C2', type: 'snare', layer: 'front'},
    {day: 4, start: 870, end: 900, title: 'Meeting', color: PICKER.busy, note: 'E2', type: 'snare', layer: 'front'},
    {day: 4, start: 900, end: 930, title: 'Meeting', color: PICKER.busy, note: 'G2', type: 'snare', layer: 'front'},
    {day: 4, start: 930, end: 1020, title: 'walk', color: PICKER.todo, note: 'A2', type: 'synth', layer: 'front'},


    {day: 4, start: 1035, end: 1155, title: 'cool maps year end summary', color: PICKER.todo, note: 'E5', type: 'synth', layer: 'front'},
    {day: 4, start: 1320, end: 1435, title: 'Singles Inferno', color: PICKER.main, note: 'C5', type: 'ambient', layer: 'front'},
    
    // Friday
    {day: 5, start: 480, end: 540, title: 'a morning yap', color: PICKER.main, note: 'E3', type: 'synth', layer: 'front'},
    {day: 5, start: 600, end: 1080, title: 'Work', color: PICKER.work, sound: {type: 'chord', name: 'seventh'}, type: 'ambient', layer: 'back'},
    {day: 3, start: 660, end: 720, title: 'IMA Autonomous time', color: PICKER.main, note: 'C5', type: 'synth', layer: 'front'},

    {day: 5, start: 600, end: 660, title: 'Meeting', color: PICKER.busy, note: 'C5', type: 'snare', layer: 'front'},
    {day: 5, start: 720, end: 780, title: 'Meeting', color: PICKER.busy, note: 'C5', type: 'snare', layer: 'front'},

    {day: 5, start: 900, end: 930, title: 'Meeting', color: PICKER.busy, note: 'C2', type: 'snare', layer: 'front'},
    {day: 5, start: 930, end: 960, title: 'Meeting', color: PICKER.busy, note: 'E2', type: 'snare', layer: 'front'},
    {day: 5, start: 990, end: 1050, title: 'Meeting', color: PICKER.busy, note: 'G2', type: 'snare', layer: 'front'},

    {day: 5, start: 1080, end: 1200, title: 'Sauna w/ Amy + Sophia', color: PICKER.goal, note: 'E4', type: 'ambient', layer: 'front'},
    {day: 5, start: 1320, end: 1435, title: 'Date night', color: PICKER.main, note: 'C5', type: 'ambient', layer: 'front'},
    {day: 5, start: 1220, end: 1290, title: 'Abraco', color: PICKER.main, note: 'C5', type: 'ambient', layer: 'front'},


    
    // Saturday
    {day: 6, start: 615, end: 675, title: 'Yoga', color: PICKER.goal, note: 'E2', type: 'synth', layer: 'front'},
    {day: 6, start: 780, end: 960, title: 'MindSwap4: Confounding Continuums', color: PICKER.main, note: 'C4', type: 'ambient', layer: 'front'},
    {day: 6, start: 960, end: 990, title: 'get sriracha', color: PICKER.todo, note: 'G3', type: 'synth', layer: 'front'},

    {day: 6, start: 1110, end: 1350, title: 'a dog grows older and wiser in brooklyn', color: PICKER.main, note: 'G4', type: 'ambient', layer: 'front'},


];

// Clear timeouts
var activeTimeouts = [];

// Set up synths
var ambientSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: {
        attack: 1.5,
        decay: 0.5,
        sustain: 0.6,
        release: 2
    },
    volume: -10
}).toDestination();

var rhythmicSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'triangle' },
    envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 0.5
    },
    volume: -8
}).toDestination();

var snare = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: {
        attack: 0.001,
        decay: 0.2,
        sustain: 0
    },
    volume: -12
}).toDestination();

var kick = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 10,
    oscillator: { type: 'sine' },
    envelope: {
        attack: 0.001,
        decay: 0.4,
        sustain: 0.01,
        release: 1.4
    },
    volume: -14 
}).toDestination();

var gong = new Tone.MetalSynth({
    frequency: 80,
    envelope: {
        attack: 0.001,
        decay: 1.4,
        release: 3
    },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5,
    volume: -6
}).toDestination();

// Day drones - subtle low buzz for each day
var dayDrone = new Tone.Synth({
    oscillator: { type: 'sine' },
    envelope: {
        attack: 3,
        decay: 0,
        sustain: 1,
        release: 3
    },
    volume: -10  // Very quiet, almost subliminal
}).toDestination();

var dayNotes = {
    0: 'C2',  // Sunday
    1: 'D2',  // Monday
    2: 'E2',  // Tuesday
    3: 'F2',  // Wednesday
    4: 'G2',  // Thursday
    5: 'A2',  // Friday
    6: 'B2'   // Saturday
};

var melodies = {
    'focus': ['C4', 'E4', 'G4', 'E4', 'C4'],
    'creative': ['A3', 'C4', 'E4', 'G4', 'E4'],
    'meeting': ['D4', 'F4', 'A4', 'F4'],
    'happy': ['C4', 'D4', 'E4', 'G4', 'C5']
};

var chords = {
    'major': ['C4', 'E4', 'G4'],
    'minor': ['A3', 'C4', 'E4'],
    'seventh': ['C3', 'E3', 'G3', 'Bb3'],
    'sus': ['C4', 'F4', 'G4']
};



function playSound(evt) {
    if (!evt.sound) {
        // Default single note behavior
        if (evt.type === 'ambient') {
            ambientSynth.triggerAttackRelease(evt.note, '2n');
        } else if (evt.type === 'snare') {
            snare.triggerAttackRelease('8n');
        } else if (evt.type === 'kick') {
            kick.triggerAttackRelease(evt.note, '8n');
        } else if (evt.type === 'gong') {
            gong.triggerAttackRelease('16n');
        } else {
            rhythmicSynth.triggerAttackRelease(evt.note, '4n');
        }
        return;
    }
    
    // Handle chord
    if (evt.sound.type === 'chord') {
        var chordNotes = chords[evt.sound.name] || evt.sound.notes;
        if (evt.type === 'ambient') {
            ambientSynth.triggerAttackRelease(chordNotes, '2n');
        } else {
            rhythmicSynth.triggerAttackRelease(chordNotes, '4n');
        }
    }
    
    // Handle melody
    else if (evt.sound.type === 'melody') {
        var melodyNotes = melodies[evt.sound.name] || evt.sound.notes;
        melodyNotes.forEach(function(note, i) {
            var delay = i * 0.15;
            var timeoutId = setTimeout(function() {
                rhythmicSynth.triggerAttackRelease(note, '16n');
            }, delay * 1000);
            activeTimeouts.push(timeoutId);
        });
    }
    
    // Handle arpeggio
    else if (evt.sound.type === 'arpeggio') {
        var arpNotes = evt.sound.notes;
        arpNotes.forEach(function(note, i) {
            var delay = i * 0.1;
            var timeoutId = setTimeout(function() {
                rhythmicSynth.triggerAttackRelease(note, '32n');
            }, delay * 1000);
            activeTimeouts.push(timeoutId);
        });
    }
}

var timeGutter = document.getElementById('timeGutter');
var daysContainer = document.getElementById('daysContainer');
var playBtn = document.getElementById('playBtn');
var stopBtn = document.getElementById('stopBtn');
var speedSlider = document.getElementById('speedSlider');
var speedVal = document.getElementById('speedVal');
var currentTime = document.getElementById('currentTime');
var playhead = document.getElementById('playhead');

var playing = false;
var currentMin = 0;
var currentDay = 0;
var speed = 20;
var animFrame = null;
var PIXELS_PER_HOUR = 48;
var HEADER_HEIGHT = 128;
var activeAmbient = {};
var triggeredEvents = {};

var draggedEvent = null;
var dragOffsetY = 0;
var dragStartDay = 0;

// Build time labels
for (var h = 0; h < 24; h++) {
    var label = document.createElement('div');
    label.className = 'time-label';
    var hour = h === 0 ? 12 : (h > 12 ? h - 12 : h);
    var ampm = h < 12 ? 'AM' : 'PM';
    label.textContent = hour + ' ' + ampm;
    timeGutter.appendChild(label);
}

// Build day columns
for (var d = 0; d < 7; d++) {
    var col = document.createElement('div');
    col.className = 'day-column';
    
    for (var h = 0; h < 24; h++) {
        var line = document.createElement('div');
        line.className = 'hour-line';
        line.style.top = (h * PIXELS_PER_HOUR) + 'px';
        col.appendChild(line);
    }
    
    daysContainer.appendChild(col);
}

events.sort(function(a, b) {
    if (a.layer === 'back' && b.layer === 'front') return -1;
    if (a.layer === 'front' && b.layer === 'back') return 1;
    return 0;
});

events.forEach(function(evt, idx) {
    var el = document.createElement('div');
    el.className = 'event';
    el.dataset.idx = idx;
    el.style.background = evt.color;
    el.style.color = evt.color === PICKER.main || evt.color === PICKER.busy ? '#ffffff' : '#000000';
    el.style.top = (evt.start / 60 * PIXELS_PER_HOUR) + 'px';  // +1px for top gap
    el.style.height = ((evt.end - evt.start) / 60 * PIXELS_PER_HOUR) + 'px';  // -2px for top+bottom gap
    
    if (evt.layer === 'back') {
           el.style.fontSize = '14px';
    }
    
    var title = document.createElement('div');
    title.className = 'event-title';
    title.textContent = evt.title;
    el.appendChild(title);
    
    var timeText = document.createElement('div');
    timeText.className = 'event-time';
    updateEventTimeText(el, evt);
    
    el.appendChild(timeText);
    
    el.onmousedown = function(e) {
        if (e.target.className === 'event' || e.target.className === 'event-title' || e.target.className === 'event-time') {
            draggedEvent = el;
            dragOffsetY = e.clientY - el.getBoundingClientRect().top;
            dragStartDay = evt.day;
            el.style.cursor = 'grabbing';
            el.style.zIndex = 1000;
            e.preventDefault();
        }
    };
    
    el.onclick = function(e) {
        if (Math.abs(e.clientY - (el.getBoundingClientRect().top + dragOffsetY)) < 5) {
            Tone.start();
            playSound(evt);
        }
    };
    
    daysContainer.children[evt.day].appendChild(el);
});

function updateEventTimeText(el, evt) {
    var timeText = el.querySelector('.event-time');
    if (!timeText) {
        timeText = document.createElement('div');
        timeText.className = 'event-time';
        el.appendChild(timeText);
    }
    var sh = Math.floor(evt.start / 60);
    var sm = evt.start % 60;
    var eh = Math.floor(evt.end / 60);
    var em = evt.end % 60;
    timeText.textContent = formatHour(sh, sm) + ' - ' + formatHour(eh, em);
}

document.addEventListener('mousemove', function(e) {
    if (!draggedEvent) return;
    
    var idx = parseInt(draggedEvent.dataset.idx);
    var evt = events[idx];
    
    var containerRect = daysContainer.getBoundingClientRect();
    var colWidth = containerRect.width / 7;
    var newDay = Math.floor((e.clientX - containerRect.left) / colWidth);
    newDay = Math.max(0, Math.min(6, newDay));
    
    if (newDay !== evt.day) {
        draggedEvent.remove();
        evt.day = newDay;
        daysContainer.children[newDay].appendChild(draggedEvent);
    }
    
    var colRect = daysContainer.children[newDay].getBoundingClientRect();
    var newTop = e.clientY - colRect.top - dragOffsetY;
    newTop = Math.max(0, Math.min(1440 - ((evt.end - evt.start) / 60 * PIXELS_PER_HOUR), newTop));
    
    draggedEvent.style.top = newTop + 'px';  // Add the 1px gap
    
    var newStart = Math.round(newTop / PIXELS_PER_HOUR * 60);
    var duration = evt.end - evt.start;
    evt.start = newStart;
    evt.end = newStart + duration;
    
    updateEventTimeText(draggedEvent, evt);
});

document.addEventListener('mouseup', function() {
    if (draggedEvent) {
        draggedEvent.style.cursor = 'pointer';
        draggedEvent.style.zIndex = '';
        draggedEvent = null;
    }
});

function formatHour(h, m) {
    var hour = h === 0 ? 12 : (h > 12 ? h - 12 : h);
    var ampm = h < 12 ? 'AM' : 'PM';
    return hour + ':' + (m < 10 ? '0' : '') + m + ' ' + ampm;
}

function updatePlayhead() {
    var pixelPos = (currentMin / 60 * PIXELS_PER_HOUR) + HEADER_HEIGHT;
    playhead.style.top = pixelPos + 'px';
    
    var h = Math.floor(currentMin / 60);
    var m = Math.floor(currentMin % 60);
    currentTime.textContent = formatHour(h, m);
    
    var colWidth = daysContainer.offsetWidth / 7;
    playhead.style.left = 48 + (currentDay * colWidth) + 'px';
    playhead.style.width = colWidth + 'px';
}

function checkEvents() {
    events.forEach(function(evt, idx) {
        if (evt.day !== currentDay) return;
        
        var el = daysContainer.children[evt.day].querySelector('[data-idx="' + idx + '"]');
        if (!el) return;
        
        var isInEvent = currentMin >= evt.start && currentMin < evt.end;
        var eventKey = currentDay + '-' + idx;
        
        if (evt.type === 'ambient') {
            if (isInEvent) {
                if (!activeAmbient[eventKey]) {
                    Tone.start();
                    
                    // Handle chord or single note for ambient
                    if (evt.sound && evt.sound.type === 'chord') {
                        var chordNotes = chords[evt.sound.name] || evt.sound.notes;
                        ambientSynth.triggerAttack(chordNotes);
                    } else {
                        ambientSynth.triggerAttack(evt.note);
                    }
                    
                    activeAmbient[eventKey] = true;
                    el.classList.add('playing');
                }
            } else {
                if (activeAmbient[eventKey]) {
                    // Handle chord or single note release
                    if (evt.sound && evt.sound.type === 'chord') {
                        var chordNotes = chords[evt.sound.name] || evt.sound.notes;
                        ambientSynth.triggerRelease(chordNotes);
                    } else {
                        ambientSynth.triggerRelease(evt.note);
                    }
                    
                    delete activeAmbient[eventKey];
                    el.classList.remove('playing');
                }
            }
        } else {
            if (isInEvent) {
                if (!triggeredEvents[eventKey]) {
                    Tone.start();
                    playSound(evt);
                    triggeredEvents[eventKey] = true;
                    el.classList.add('playing');
                }
            } else {
                delete triggeredEvents[eventKey];
                el.classList.remove('playing');
            }
        }
    });
}

function animate() {
    if (!playing) return;
    
    currentMin += speed / 10;
    
    if (currentMin >= 1440) {
        Object.keys(activeAmbient).forEach(function(key) {
            if (key.startsWith(currentDay + '-')) {
                var idx = parseInt(key.split('-')[1]);
                var evt = events[idx];
                if (evt.sound && evt.sound.type === 'chord') {
                    var chordNotes = chords[evt.sound.name] || evt.sound.notes;
                    ambientSynth.triggerRelease(chordNotes);
                } else {
                    ambientSynth.triggerRelease(evt.note);
                }
                delete activeAmbient[key];
            }
        });
        
        Object.keys(triggeredEvents).forEach(function(key) {
            if (key.startsWith(currentDay + '-')) {
                delete triggeredEvents[key];
            }
        });
        
        // Release old day drone
        dayDrone.triggerRelease();
        
        currentMin = 0;
        currentDay++;
        
        if (currentDay >= 7) {
            stop();
            return;
        }
        
        // Trigger new day drone
        dayDrone.triggerAttack(dayNotes[currentDay]);
    }
    
    updatePlayhead();
    checkEvents();
    animFrame = requestAnimationFrame(animate);
}

function detectOverlaps() {
    for (var d = 0; d < 7; d++) {
        var dayCol = daysContainer.children[d];
        var dayEvents = events.filter(function(e) { return e.day === d; });
        
        dayEvents.forEach(function(evt1, i) {
            var hasOverlap = false;
            dayEvents.forEach(function(evt2, j) {
                if (i !== j && evt1.layer === 'front' && evt2.layer === 'back') {
                    if (evt1.start < evt2.end && evt1.end > evt2.start) {
                        hasOverlap = true;
                    }
                }
            });
            var el = dayCol.querySelector('[data-idx="' + events.indexOf(evt1) + '"]');
            if (el && hasOverlap) {
                el.setAttribute('data-has-overlap', 'true');
            }
        });
    }
}

// Call this after all events are added
detectOverlaps();

function stop() {
    playing = false;
    playBtn.textContent = 'Play';
    if (animFrame) cancelAnimationFrame(animFrame);
    
    // Clear all active timeouts (melodies/arpeggios)
    activeTimeouts.forEach(function(timeoutId) {
        clearTimeout(timeoutId);
    });
    activeTimeouts = [];
    // Release day drone
    dayDrone.triggerRelease();
    
    Object.keys(activeAmbient).forEach(function(key) {
        var idx = parseInt(key.split('-')[1]);
        var evt = events[idx];
        if (evt.sound && evt.sound.type === 'chord') {
            var chordNotes = chords[evt.sound.name] || evt.sound.notes;
            ambientSynth.triggerRelease(chordNotes);
        } else {
            ambientSynth.triggerRelease(evt.note);
        }
    });
    activeAmbient = {};
    triggeredEvents = {};
    
    document.querySelectorAll('.event').forEach(function(el) {
        el.classList.remove('playing');
    });
}

playBtn.onclick = function() {
    if (!playing) {
        Tone.start();
        playing = true;
        playBtn.textContent = 'Pause';
        playhead.style.display = 'block';

        // Trigger day drone for current day
        dayDrone.triggerAttack(dayNotes[currentDay]);

        animate();
    } else {
        playing = false;
        playBtn.textContent = 'Play';
        if (animFrame) cancelAnimationFrame(animFrame);
        
        // Clear all active timeouts
        activeTimeouts.forEach(function(timeoutId) {
            clearTimeout(timeoutId);
        });
        activeTimeouts = [];

        // Release day drone on pause
        dayDrone.triggerRelease();
        
        Object.keys(activeAmbient).forEach(function(key) {
            var idx = parseInt(key.split('-')[1]);
            var evt = events[idx];
            if (evt.sound && evt.sound.type === 'chord') {
                var chordNotes = chords[evt.sound.name] || evt.sound.notes;
                ambientSynth.triggerRelease(chordNotes);
            } else {
                ambientSynth.triggerRelease(evt.note);
            }
        });
        activeAmbient = {};
    }
};

stopBtn.onclick = function() {
    stop();
    currentMin = 0;
    currentDay = 0;
    updatePlayhead();
    playhead.style.display = 'none';
};

speedSlider.oninput = function() {
    speed = parseInt(this.value);
    speedVal.textContent = speed + 'x';
};

updatePlayhead();
playhead.style.display = 'none';