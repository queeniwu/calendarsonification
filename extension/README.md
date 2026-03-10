# Calendar Sonification Chrome Extension

Play your Google Calendar week like a song.

## How to install (unpacked)

1. Open Chrome and go to `chrome://extensions`.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked**.
4. Select the `extension` folder (the one that contains `manifest.json`).

The extension will appear in your toolbar. It only activates on Google Calendar.

## How to use

1. Go to [calendar.google.com](https://calendar.google.com) and sign in.
2. Switch to **Week** view (required for the extension to find events).
3. Click the **Calendar Sonification** extension icon in the toolbar. The badge will show **ON** and a control panel will appear in the top-right of the page.
4. Click **Scan week** to read the visible week’s events from the page (do this after changing the week or if the panel says to try again).
5. Click **Play** to start playback. A blue playhead will move across the week; each event triggers a sound when the playhead reaches it.
6. Use **Speed** (1–50x) to make the playhead move faster or slower. **Stop** resets to the start of the week; **Play** again continues from the beginning.
7. Click the extension icon again to turn sonification **OFF**. The panel and playhead are removed and playback stops.

## Color → sound mapping

Events are mapped to instruments by their calendar color (nearest match to the prototype palette):

- **Blue (main)** → synth
- **Light gray (todo)** → kick
- **Yellow/cream (goal)** → gong
- **Light blue (work)** → ambient
- **Dark/busy** → snare

Pitch varies by event title so the same color doesn’t always sound identical.

## Troubleshooting

- **“Switch to Week view and try again”**  
  The extension only works in **Week** view. Use the week view control in Google Calendar, then click **Scan week** again.

- **No or wrong events**  
  Google’s DOM can change. If events are missing or wrong, try refreshing the page and scanning again. If it still fails, the extension may need updated selectors (see plan/code comments).

- **No sound**  
  Allow the page to play audio (browser or site settings). The first sound starts after you click **Play** (user gesture required for audio).

- **Panel or playhead in the way**  
  Turn the extension off with the icon when you’re done. You can move the calendar view; the playhead stays aligned with the grid.

## Development

- **Files:** `manifest.json`, `background.js`, `messenger.js`, `main.js`, `style.css`.
- **Flow:** Clicking the icon injects `main.js` into the page (MAIN world) and injects `style.css`. `main.js` loads Tone.js from a CDN, then scrapes the week view DOM, builds an event list, maps colors to sounds, and runs the same playback logic as the prototype. The content script `messenger.js` relays “stop” from the background to the page so the panel can be removed when you turn the extension off.
- **Reload:** After changing code, go to `chrome://extensions` and click the reload icon on the Calendar Sonification card, then refresh the calendar tab and click the extension icon again.
