# StreamVault 🎬✨
### The Ultimate Netflix & Apple Glass Streaming Hub with 188+ Curated Sources

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-success?style=for-the-badge&logo=github)](https://programit1.github.io/streamvault)
[![Vanilla JS](https://img.shields.io/badge/Stack-Vanilla%20JS%20%7C%20CSS3%20%7C%20HTML5-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://github.com/Programit1/streamvault)
[![188+ Services](https://img.shields.io/badge/Streaming%20Sources-188%2B%20Verified-E50914?style=for-the-badge&logo=netflix)](https://github.com/Programit1/streamvault)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0%20(Zero)-10B981?style=for-the-badge)](https://github.com/Programit1/streamvault)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

> **StreamVault** is an ultra-modern, zero-dependency streaming web portal designed with a **Netflix Billboard + Apple Glass** aesthetic. It aggregates **188+ verified, high-speed streaming portals** across Movies, TV Series, Anime, Live TV, and Video Sharing into a single, unified, privacy-oriented media hub.

🌐 **Live Website**: [https://programit1.github.io/streamvault](https://programit1.github.io/streamvault)

---

## 📸 Design Aesthetics & Interface Highlights

StreamVault was built from the ground up to eliminate generic "AI-material" templates and replace them with a state-of-the-art cinematic interface:

- **Pure Cinema Obsidian Canvas (`#050609`)**: Deepest contrast obsidian black engineered specifically for OLED and HDR displays.
- **Apple Glass Frosted Glassmorphism**: Multi-layer specular reflections, subtle border highlights, and real-time frosted blur (`backdrop-filter: blur(28px) saturate(190%)`).
- **Bespoke Cinema Prism Brandmark**: A custom geometric prism mark in neon ruby (`#E50914`), violet (`#9333EA`), and cyan (`#06B6D4`) with a glowing center light point — no generic clip-art or AI shields.
- **Netflix Billboard Hero Spotlight**:
  - High-impact hero banner showcasing featured portals (Movy Cinema, Miruro Anime, Cinejoy, Rive, Pluto TV).
  - Dynamic ambient aura that morphs color depending on the active stream.
  - Quality & security chips (`4K ULTRA HD`, `VERIFIED SOURCE`, `EXCLUSIVE PORTAL`).
  - Auto-rotating spotlights every 10 seconds or manual 1-click tab switching.
  - Quick **Launch Stream** and **Favorite** starring action buttons.
- **Horizontal Scrolling Shelves (Netflix Carousels)**:
  - ⭐ **Your Favorites**: Dynamic carousel showing all your starred channels (stored locally).
  - 🔥 **Trending & Popular**: Top-rated streaming destinations with highest uptime.
  - 🎬 **Movies & TV Series**: Dedicated servers, P-Stream forks, and multi-source engines.
  - ⚡ **Anime & Cartoons**: Simulcasts, subbed/dubbed feeds, and animations.
  - 📺 **Live TV & Video Sharing**: Broadcasts, Twitch, Pluto TV, and video portals.
- **Apple Spotlight Search (`/`)**: Instant autocomplete search across titles, URLs, tags, and categories.
- **188-Service Master Directory Grid**:
  - Glass category switcher pills (`All`, `Movies & TV`, `Anime`, `Live TV`, `Video`, `Music`).
  - Dedicated feature filter chips for `4K UHD` and `Auto-Next`.
  - 16:10 cinematic cards with glowing ambient backlight hover effects, status badges, and 1-click launch.

---

## 🗂️ Complete 188+ Streaming Catalog Breakdown

StreamVault includes **188 hand-curated and verified streaming services** sourced from FMHY, organized into dedicated categories:

| Category | Count | Key Featured Services |
| :--- | :---: | :--- |
| 🎬 **Movies & TV Series** | **110+** | Movy, Cinejoy, Braflix, Rive, LookMovie, VidSrc, FlixWave, PrimeWire, SuperStream, FilmPlus, HydraHD, MovieWeb, etc. |
| ⚡ **Anime & Cartoons** | **45+** | Miruro, HiAnime, 9Anime, AniWatch, Zoro, GogoAnime, AnimePahe, YugenAnime, KimCartoon, WcoStream, etc. |
| 📺 **Live TV & Sports** | **18+** | Pluto TV, Tubi, Twitch, TVCatchup, DaddyLive, Stream2Watch, CricFree, DaddyHD, LiveNews, etc. |
| 🌐 **Video Sharing** | **10+** | YouTube, Rumble, Odysee, Dailymotion, Vimeo, Bitchute, Internet Archive Cinema |
| 🎵 **Music & Podcasts** | **5+** | Spotify Web, SoundCloud, AccuRadio, SomaFM, Radio Garden |

---

## ⚡ Core Features

- **Zero Dependencies**: Pure HTML5, Vanilla CSS3, and ES6+ JavaScript. No bloated frameworks, no node build steps required to run.
- **Instant Offline Catalog**: Preloaded with `js/sites-data.js` containing complete metadata (titles, icons, domains, tags, accent colors) for all 188 services.
- **Client-Side Persistence (`localStorage`)**: Star any service as a favorite; it automatically pins to your personal **⭐ Your Favorites** shelf without requiring an account or database.
- **Safe 1-Click Launch**: Launches streams in isolated, clean tabs with `rel="noopener noreferrer"` to protect against reverse-tabnabbing and rogue parent redirects.
- **Fully Responsive**: Seamlessly scales from 4K ultra-wide monitors down to tablets and mobile smartphones with smooth touch-drag carousel scrolling.

---

## 🚀 Getting Started

### Option 1: Direct File Launch
Clone or download this repository, then simply open `index.html` in any web browser:
```bash
git clone https://github.com/Programit1/streamvault.git
cd streamvault
# Double-click index.html or open with your browser
start index.html
```

### Option 2: Run with a Local Static Server
If you prefer running via a local dev server:

**Using Python**:
```bash
python -m http.server 8080
```
Then visit `http://localhost:8080`.

**Using Node / npx**:
```bash
npx serve .
```

---

## 🌐 Deploy to GitHub Pages (1-Click)

This repository is structured with `index.html` at the root directory, making it instantly deployable on **GitHub Pages**:

1. Go to your repository on GitHub: `https://github.com/Programit1/streamvault`
2. Click **Settings** → **Pages** (under Code and automation).
3. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
4. Set branch to `main` (or `master`) and folder to `/ (root)`.
5. Click **Save**. Within 60 seconds, your site will be live at:
   ```
   https://programit1.github.io/streamvault/
   ```

---

## 🛡️ Recommended Streaming Browser Setup

For the cleanest, safest, ad-free streaming experience across third-party media sources:
- **Browser**: [Brave Browser](https://brave.com/) (Shields set to Aggressive) or [Firefox](https://www.mozilla.org/firefox/).
- **Ad Blocker**: [uBlock Origin](https://github.com/gorhill/uBlock) with all default filter lists enabled.
- **Popup Interceptor**: Popups will automatically be blocked by uBlock Origin or Brave Shields.

---

## 📂 Project Architecture

```
streamvault/
├── index.html            # Main Netflix Glass Cinema application entrypoint
├── css/
│   └── styles.css        # Apple Glass frosted design system & Netflix styling
├── js/
│   ├── app.js            # Billboard hero, shelves, search & favorite logic
│   └── sites-data.js     # Synchronous catalog containing all 188 FMHY portals
├── .gitignore            # Clean git exclusion rules
└── README.md             # Complete documentation and user guide
```

---

## ⚖️ License & Disclaimer

- **License**: MIT License.
- **Disclaimer**: StreamVault is an open-source web directory and navigation interface. StreamVault does not host, upload, scrape, or stream any copyrighted media content directly. All trademarks and streaming links belong to their respective source websites.
