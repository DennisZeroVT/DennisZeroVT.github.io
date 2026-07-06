/* =========================================================
   DennisZeroVT site — consolidated app script
   One data load, one render pass per section, one nav system.
   ========================================================= */

let SONGS = {};
let ALBUMS = {};
let personData = {};
let allPosts = [];
let categories = [];

/* ===========================================================================
   SITE CONTENT — edit everything below directly. No JSON files, no fetch,
   no build step. Save the file and reload the page — that's it.
   =========================================================================== */

// ---------------------------------------------------------------------------
// SITE_SONGS — your tracks. Each needs a unique "id" (used in URLs like
// openSong('this-id') and in ALBUMS tracklists below).
// ---------------------------------------------------------------------------
const SITE_SONGS = [
  {
    id: "song-1781376702122",
    title: "Adrenaline",
    artist: "Dennis van Wijngaarden",
    year: 2026,
    coverEmoji: "",
    badges: [
      { label: "pending", color: "#6B7280" },
      { label: "Spotify", color: "#1DB954" },
      { label: "Apple Music", color: "#FA243C" },
      { label: "Tidal", color: "#000000" },
      { label: "Amazon", color: "#FF9900" },
      { label: "YouTube Music", color: "#FF0000" },
      { label: "Deezer", color: "#FEAA2D" }
    ],
    streaming: {
      spotify: "",
      apple: "",
      tidal: "",
      youtube: "",
      amazon: "",
      deezer: ""
    },
    about: "Adrenaline is the third remake of an old song I wrote 2 years ago with the same name.\nI wanted to make the final version to show that I have improved as a music producer.",
    thoughts: "The song uses a lot of FM instruments and Genesis SoundFonts for some elements. The trumpet has a harmony now, and there are a lot of key changes.",
    miscellaneous: "I brought back Kula for the drums. We actually had two drum takes — one was a draft and the last one was the final one. Again, he did a great job. I really love the energy of the descending harmony chorus.",
    behindTheScenes: "",
    cover: "https://denniszerovt.github.io/SongData/AlbumArt/1781376777984-andrenaline.png",
    audio: "https://denniszerovt.github.io/SongData/Songs/1781377044884-adrenaline-final-mix.mp3"
  },
  {
    id: "snowfall",
    title: "Snowfall",
    artist: "Dennis van Wijngaarden",
    year: "2025",
    audio: "SongData/Songs/snowfall.mp3",
    cover: "SongData/AlbumArt/snowfall.png",
    coverEmoji: "🌨️",
    badges: [
      { label: "Released", color: "#10B981" },
      { label: "Spotify", color: "#1DB954" },
      { label: "Apple Music", color: "#FA243C" },
      { label: "Tidal", color: "#000000" },
      { label: "Amazon", color: "#FF9900" },
      { label: "YouTube Music", color: "#FF0000" },
      { label: "Deezer", color: "#FEAA2D" }
    ],
    streaming: {
      spotify: "https://open.spotify.com/track/0TxrNlfNSlwuncbt0wpVH6?utm_source=generator",
      apple: "https://music.apple.com/be/album/snowfall-single/1840250772?l=nl",
      tidal: "https://tidal.com/album/460721208/track/460721209",
      youtube: "https://music.youtube.com/watch?v=9dDbeq0VEbc&si=c9Cb4I4bC4nwWi7e",
      amazon: "https://music.amazon.com/albums/B0FNKT4Z2X",
      deezer: "https://link.deezer.com/s/337CFXi1lRmRShDNd2jGO"
    },
    about: "Snowfall was written for my friend Erik, also known as eri_k416. It's built around his character Viona — a quiet, wintry figure that inspired the whole mood of the track.",
    thoughts: "This was the first time I ever wrote lyrics for a song. I didn't plan it that way — I just wanted to make something for Erik and the words came naturally. I remember sitting with the melody for a long time before anything clicked. When it finally did, it felt like the song wrote itself.",
    miscellaneous: "The track is the first song I ever released. It was released on Spotify in 2025",
    behindTheScenes: "I was using Studio One at the time. The arrangement started with just a piano line and some light percussion. The winter atmosphere came from layered pads and a lot of reverb on everything. I wanted it to feel like you were standing outside in the cold, watching snow fall slowly — calm but a little melancholic."
  },
  {
    id: "stuck_in_time",
    title: "Stuck In Time",
    artist: "Dennis van Wijngaarden",
    year: "2026",
    audio: "SongData/Songs/stuckintime.mp3",
    cover: "SongData/AlbumArt/stuckintime.png",
    coverEmoji: "🕒",
    badges: [
      { label: "Released", color: "#10B981" },
      { label: "Spotify", color: "#1DB954" },
      { label: "Apple Music", color: "#FA243C" },
      { label: "Tidal", color: "#000000" },
      { label: "Amazon", color: "#FF9900" },
      { label: "YouTube Music", color: "#FF0000" },
      { label: "Deezer", color: "#FEAA2D" }
    ],
    streaming: {
      spotify: "https://open.spotify.com/track/1UNqmaIFQVQia3Ogxtpu4x?si=994999e942f14ba4",
      apple: "https://music.apple.com/be/album/stuck-in-time-single/1893337152?l=nl",
      tidal: "http://tidal.com/album/514925638/track/514925640",
      youtube: "https://music.youtube.com/watch?v=pMVXcz9Ztpc&si=tf1PjhIUzJvQK1KT",
      amazon: "https://music.amazon.com/tracks/B0GWS3FN2G?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_tyzyaI4xxzICjl1682gmmG0om",
      deezer: "https://link.deezer.com/s/337CHhi5HVwqcozgsSI4d"
    },
    about: "Stuck In Time is about the feeling of being trapped in a cycle — staying the same while everything else moves on. It's a reflection on change, growth, and the fear of being left behind.",
    thoughts: "This song was inspired by a lot of personal experiences and conversations with friends. I wanted to capture that bittersweet feeling of nostalgia mixed with the anxiety of change. The lyrics came from a place of vulnerability, and I hope they resonate with anyone who's ever felt stuck in a moment they can't escape.",
    miscellaneous: "the harmonies in the song is sang by me its actualy one of the first time i used my own voice in my song.",
    behindTheScenes: "i went back in cubase for this one. The drums were recorded live by my friend Kula i met during an idol group project, which added a lot of energy to the track. I built the produced the song to finish and i send the mockup drums to kula and told him you can put your own spin to the drums and he killed it, like i put a half time section in it before the key change and he went insane on the half time section and his drums conbined with my guitars and the song just came alive, it was a really fun process and i hope to work with him again in the future."
  }
];

// ---------------------------------------------------------------------------
// SITE_ALBUMS — collections/EPs. "tracklist[].key" must match a SITE_SONGS id
// to make a track clickable straight into the song overlay.
// ---------------------------------------------------------------------------
const SITE_ALBUMS = [
  {
    id: "album-1780532205221",
    name: "Solo EP 💿",
    artist: "Dennis Zero VT",
    year: 2026,
    cover: "",
    status: "In Progress",
    description: "So|o ep",
    tracklist: [
      { name: "Snowfall", duration: "", status: "planned", key: "snowfall" },
      { name: "Stuck in tims", duration: "", status: "planned", key: "stuck_in_time" }
    ]
  }
];

// ---------------------------------------------------------------------------
// SITE_PEOPLE — friends & collaborators. "tags" controls where they show up:
// include "friend" to appear on the Friends page, "collab" for Collaborators
// (a person can have both). "credits[].songId" must match a SITE_SONGS id to
// make it clickable into that song.
// ---------------------------------------------------------------------------
const SITE_PEOPLE = [
  {
    id: "erik",
    name: "Erik",
    handle: "eri_k416",
    role: "Friend // eri_k416",
    avatar: "Friends/erik.jpg",
    bio: "Erik was the subject and inspiration for my debut release, Snowfall. His character Viona shaped the entire mood of the track — the wintry atmosphere, the lyrics, the melancholy. He was the reason I wrote vocals for the very first time.",
    tags: ["friend", "collab"],
    links: {
      twitter: "https://x.com/eri_k416?s=20",
      spotify: "https://open.spotify.com/track/0TxrNlfNSlwuncbt0wpVH6"
    },
    credits: [
      { song: "Snowfall", songId: "snowfall", role: "Inspiration", note: "His character Viona shaped the entire mood of the track" }
    ],
    color: "from-blue-500/30 to-blue-600/10",
    icon: "fas fa-snowflake"
  },
  {
    id: "kula",
    name: "Kula",
    handle: "@mee_yawwwwww",
    role: "Friend, Drummer // @mee_yawwwwww",
    avatar: "Friends/kula.jpg",
    bio: "Kula is a musician and drummer I met during an idol group project. Even though the project eventually fell apart, we connected through music and he turned out to be a really chill guy. He mentioned wanting to be part of something, so I invited him to play drums on my single Stuck In Time. We worked well together, and I will likely ask him to handle the drums again in future projects.",
    tags: ["friend", "collab"],
    links: {
      twitter: "https://x.com/mee_yawwwwww?s=20",
      spotify: "",
      instagram: "",
      website: ""
    },
    credits: [
      { song: "Stuck In Time", songId: "stuck_in_time", role: "Drums", note: "" },
      { song: "Adrenaline", songId: "song-1781376702122", role: "Drums", note: "" }
    ],
    color: "from-[#A596DA]/30 to-[#8B78CB]/10",
    icon: "fas fa-drum"
  },
  {
    id: "vivid",
    name: "Vivid",
    handle: "@vivid_exile",
    role: "best Friend, // @vivid_exile",
    avatar: "Friends/vivid.jpg",
    bio: "An ex-military veteran I met in my very first Discord server. Despite a troubled past he showed incredible strength and kindness. we became friends and helped each other through a lot. as he became my first friend when i came out of my shell, He was the person who got me back into streaming and introduced me to a whole new circle of people — including Erik",
    tags: ["friend"],
    links: { twitter: "https://x.com/vivid_exile?s=20" },
    credits: [],
    color: "from-pink-500/30 to-pink-600/10",
    icon: "fas fa-guitar"
  },
  {
    id: "skylar",
    name: "Skylar",
    handle: "@skylar_corgi",
    role: "Friend, // @skylar_corgi",
    avatar: "Friends/skylar.jpg",
    bio: "Skylar is a best friend i met trough vivid on vivid first stream she and vivid are great support",
    tags: ["friend"],
    links: { twitter: "https://x.com/skylar_corgi?s=20" },
    credits: [],
    color: "from-purple-500/30 to-purple-600/10",
    icon: "fas fa-guitar"
  },
  {
    id: "nox",
    name: "Nox",
    handle: "@Nox_Daemon",
    role: "Friend, // @Nox_Daemon",
    avatar: "Friends/nox.jpg",
    bio: "Nox is a friend i met trough vivid again lol, i saw vivid inetracting with nox a lot and weeks later she became on of my friends aswell,",
    tags: ["friend"],
    links: { twitter: "https://x.com/Nox_Daemon?s=20" },
    credits: [],
    color: "from-blue-500/30 to-blue-600/10",
    icon: "fas fa-guitar"
  }
];

// ---------------------------------------------------------------------------
// SITE_CATEGORIES — blog category filter pills + their color + subcategories.
// "name" here must match "category" on posts in SITE_POSTS below.
// ---------------------------------------------------------------------------
const SITE_CATEGORIES = [
  { id: "gaming", name: "Gaming", color: "#A596DA", subs: ["Osu", "speedrunning"] },
  { id: "game-dev", name: "Game Dev", color: "#A596DA", subs: ["Ohter projects"] },
  { id: "music-production", name: "Music Production", color: "#ec4899", subs: ["Snowfall", "Originals", "Remixes", "Soundtracks", "Behind the Beat"] }
];

// ---------------------------------------------------------------------------
// SITE_POSTS — blog posts. "blocks" render top-to-bottom: {type:'text'},
// {type:'image', src}, {type:'video', url} (YouTube links auto-embed),
// {type:'divider'}.
// ---------------------------------------------------------------------------
const SITE_POSTS = [
  {
    id: "post-1781469379216",
    title: "my second 200pp play",
    category: "Gaming",
    subcategory: "Osu",
    date: "2026-06-14",
    color: "#a596da",
    blocks: [
      { type: "text", content: "GG i got my second best play on osu 206 pp - my second 200 pp lets go\n\nthe bg gave me powers - bless mika" },
      { type: "video", src: "", url: "https://youtu.be/PfoJg2idmF8", caption: "" }
    ]
  }
];

/* =========================== END OF SITE CONTENT =========================== */

function initSiteData() {
  SONGS = Object.fromEntries(SITE_SONGS.map(s => [s.id, {
    name: s.title,
    artist: s.artist,
    year: s.year,
    src: s.audio,
    cover: s.coverEmoji || '🎵',
    coverImg: s.cover,
    badges: s.badges || [],
    streaming: s.streaming || {},
    about: s.about || '',
    thoughts: s.thoughts || '',
    Miscellaneous: s.miscellaneous || '',
    behindTheScenes: s.behindTheScenes || ''
  }]));

  personData = Object.fromEntries(SITE_PEOPLE.map(p => [p.id, {
    name: p.name,
    role: p.role,
    color: p.color || 'from-purple-500/30 to-purple-600/10',
    icon: p.icon || 'fas fa-user',
    bio: p.bio,
    credits: p.credits || [],
    links: Object.entries(p.links || {}).filter(([,v]) => v).map(([k,v]) => ({
      name: k.charAt(0).toUpperCase() + k.slice(1),
      icon: `fab fa-${k}`,
      url: v
    })),
    projects: p.projects || []
  }]));

  ALBUMS = Object.fromEntries(SITE_ALBUMS.map(a => [a.id, a]));
  allPosts = [...SITE_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
  categories = SITE_CATEGORIES;

  renderCategories();
  renderSubs();
  renderPosts();
  renderSongsGrid();
  renderAlbumsGrid();
  renderPeople(SITE_PEOPLE);
}

document.addEventListener('DOMContentLoaded', initSiteData);


const platformIcons = {
  spotify: '<i class="fab fa-spotify"></i>',
  apple: '<i class="fab fa-apple"></i>',
  tidal: '<i class="fas fa-music"></i>',
  youtube: '<i class="fab fa-youtube"></i>',
  amazon: '<i class="fab fa-amazon"></i>',
  deezer: '<i class="fas fa-record-vinyl"></i>'
};

function badgeLabel(b){ return typeof b === 'string' ? b : ((b && b.label) || ''); }
function badgeColor(b){ return (b && typeof b === 'object' && b.color) || null; }

function getBadgeStyle(name) {
  const map = {
    'Spotify': {bg: '#1DB954', color: '#fff'},
    'Apple Music': {bg: '#FA243C', color: '#fff'},
    'Apple': {bg: '#FA243C', color: '#fff'},
    'Deezer': {bg: '#00C7F2', color: '#000'},
    'Tidal': {bg: '#000000', color: '#fff'},
    'Amazon': {bg: '#FF9900', color: '#000'},
    'YouTube Music': {bg: '#FF0000', color: '#fff'},
    'YouTube': {bg: '#FF0000', color: '#fff'},
    'Released': {bg: '#A596DA', color: '#000'},
    'Available': {bg: '#A596DA', color: '#000'}
  };
  return map[name] || {bg: 'var(--bg-card-hover)', color: 'var(--text-secondary)'};
}

/* ---------- Music: songs & albums grids ---------- */

function renderSongsGrid() {
  const grid = document.getElementById('songs-grid');
  if (!grid) return;
  grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
  grid.innerHTML = Object.keys(SONGS).map(key => {
    const song = SONGS[key];
    const badges = (song.badges || []).slice(0,3).map(b => {
      const label = badgeLabel(b), color = badgeColor(b);
      return color
        ? `<span class="text-[10px] px-2 py-0.5 rounded-full" style="background:${color};color:#fff">${label}</span>`
        : `<span class="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">${label}</span>`;
    }).join('');
    return `
    <div class="group relative glass rounded-2xl overflow-hidden cursor-pointer glow-hover transition-all duration-300 hover:-translate-y-1" onclick="openSong('${key}')">
        <div class="aspect-square relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
            ${song.coverImg ? `<img src="${song.coverImg}" alt="${song.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.style.display='none'">` : ''}
            <div class="absolute inset-0 flex items-center justify-center text-5xl opacity-20">${song.cover || '🎵'}</div>
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div class="w-14 h-14 rounded-full bg-[#A596DA] flex items-center justify-center shadow-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"/></svg>
                </div>
            </div>
        </div>
        <div class="p-4">
            <h3 class="font-semibold text-white truncate">${song.name}</h3>
            <p class="text-sm text-[var(--text-secondary)] mt-1">${song.year || ''} • ${song.artist}</p>
            <div class="flex gap-1.5 mt-3 flex-wrap">${badges}</div>
            ${song.about ? `<p class="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">${song.about.split('\n')[0]}</p>` : ''}
        </div>
    </div>`;
  }).join('');
}

function renderAlbumsGrid() {
  const grid = document.getElementById('albums-grid');
  if (!grid) return;
  grid.innerHTML = Object.keys(ALBUMS).map(key => {
    const album = ALBUMS[key];
    return `
    <div class="group relative glass rounded-2xl overflow-hidden cursor-pointer glow-hover transition-all duration-300 hover:-translate-y-1" onclick="openAlbum('${key}')">
        <div class="aspect-square relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
            ${album.coverImg ? `<img src="${album.coverImg}" alt="${album.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.style.display='none'">` : ''}
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>
            <div class="absolute bottom-3 left-3">
                <span class="px-2 py-1 rounded-full bg-[#A596DA]/20 text-[#A596DA] text-[10px] font-medium backdrop-blur">${album.status || ''}</span>
            </div>
        </div>
        <div class="p-4">
            <h3 class="font-semibold text-white truncate">${album.name}</h3>
            <p class="text-sm text-[var(--text-secondary)] mt-1">${album.year || ''} • ${(album.tracks || (album.tracklist||[]).length) || 0} tracks</p>
        </div>
    </div>`;
  }).join('');
}

/* ---------- Friends & Collaborators ---------- */

function renderPeople(peopleList) {
  const collabsGrid = document.getElementById('collabs-grid');
  const friendsGrid = document.getElementById('friends-grid');
  if (!collabsGrid && !friendsGrid) return;

  function cardFor(p) {
    const avatarBase = (p.avatar || `Friends/${p.id}.jpg`).replace(/\.jpg$|\.png$/i, '');
    const tryJpg = avatarBase + '.jpg';
    const tryPng = avatarBase + '.png';
    const twitter = (p.links && p.links.twitter) || '';
    const credits = p.credits || [];
    const collabChips = credits.map(cr => {
      const roleLabel = cr.role || 'Collaborator';
      const songLabel = cr.song || '';
      return `<span style="display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;background:rgba(165,150,218,.15);border:1px solid rgba(165,150,218,.3);font-size:0.75em;color:#A596DA;font-weight:600;">${roleLabel}${songLabel ? ` · <span style="opacity:.75;font-weight:400">${songLabel}</span>` : ''}</span>`;
    }).join('');

    const card = document.createElement('div');
    card.className = 'person-card';
    card.style.cssText = 'background:#1a1a1a;border-radius:12px;overflow:hidden;border:1px solid #333;';
    card.onclick = () => openPersonOverlay(p.id);
    card.innerHTML = `
      <div style="height:60px;background:linear-gradient(135deg,#A596DA,#8B78CB);"></div>
      <div style="padding:0 16px 16px;margin-top:-30px;position:relative;">
        <img src="${tryJpg}" alt="${p.name}" style="width:70px;height:70px;border-radius:50%;border:3px solid #1a1a1a;object-fit:cover;background:#333;display:block;" onerror="this.onerror=null; this.src='${tryPng}';">
        <h3 style="margin:12px 0 4px;color:white;font-size:1.1em;">${p.name}</h3>
        <div style="color:#A596DA;font-size:0.85em;margin-bottom:4px;">${p.handle || ''}</div>
        <div style="margin:4px 0 8px;font-size:0.8em;color:#aaa;">${p.role || ''}</div>
        <p style="color:#ccc;font-size:0.85em;line-height:1.4;margin:8px 0;">${(p.bio || '').substring(0,140)}</p>
        ${collabChips ? `<div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:8px;">${collabChips}</div>` : ''}
        ${twitter ? `<a href="${twitter}" target="_blank" onclick="event.stopPropagation()" style="display:inline-block;margin-top:10px;padding:8px 16px;background:#A596DA;color:#000;text-decoration:none;border-radius:20px;font-size:0.85em;font-weight:600;">Twitter</a>` : ''}
      </div>`;
    return card;
  }

  if (collabsGrid) {
    collabsGrid.innerHTML = '';
    peopleList
      .filter(p => (p.tags || []).map(t => t.toLowerCase()).includes('collab'))
      .forEach(p => collabsGrid.appendChild(cardFor(p)));
  }
  if (friendsGrid) {
    friendsGrid.innerHTML = '';
    peopleList
      .filter(p => {
        const tags = (p.tags || []).map(t => t.toLowerCase());
        return tags.includes('friend') || (!tags.includes('collab') && tags.length === 0);
      })
      .forEach(p => friendsGrid.appendChild(cardFor(p)));
  }
}

window.openPersonOverlay = function(personId) {
  const person = personData[personId];
  if (!person) return;

  const overlay = document.getElementById('person-overlay');
  const header = document.getElementById('overlay-header');
  const body = document.getElementById('overlay-body');

  header.innerHTML = `
      <div class="w-16 h-16 rounded-full bg-gradient-to-br ${person.color} flex items-center justify-center">
          <i class="${person.icon} text-2xl"></i>
      </div>
      <div>
          <h2 class="text-2xl font-bold">${person.name}</h2>
          <p class="text-[var(--accent)]">${person.role || ''}</p>
      </div>
  `;

  const rawCredits = person.credits || [];
  const rawProjects = person.projects || [];
  let projectsHTML = '';

  if (rawCredits.length > 0) {
    const creditButtons = rawCredits.map(cr => {
      const roleLabel = cr.role || 'Collaborator';
      const songLabel = cr.song || '';
      const noteLabel = cr.note || '';
      const songEntry = Object.entries(SONGS).find(([key, s]) =>
        (cr.songId && key === cr.songId) || (s.name && s.name.toLowerCase() === songLabel.toLowerCase())
      );
      const noteHTML = noteLabel ? `<span style="display:block;font-size:0.75em;opacity:0.6;margin-top:2px;">${noteLabel}</span>` : '';

      if (songEntry) {
        const songKey = songEntry[0];
        return `<button
          onclick="document.getElementById('person-overlay').classList.remove('active'); setTimeout(function(){ openSong('${songKey}') }, 250)"
          style="display:flex;align-items:flex-start;gap:12px;padding:10px 14px;border-radius:12px;background:rgba(165,150,218,.1);border:1px solid rgba(165,150,218,.3);cursor:pointer;text-align:left;width:100%;color:inherit;transition:.15s;"
          onmouseover="this.style.background='rgba(165,150,218,.18)'" onmouseout="this.style.background='rgba(165,150,218,.1)'"
        >
          <div style="flex:1;min-width:0;">
            <div style="font-weight:700;font-size:0.9em;color:#A596DA;">${roleLabel}</div>
            <div style="font-size:0.85em;opacity:.8;">${songLabel}</div>
            ${noteHTML}
          </div>
          <span style="opacity:.4;font-size:.8em;padding-top:2px;">→</span>
        </button>`;
      }
      return `<div style="display:flex;align-items:flex-start;gap:12px;padding:10px 14px;border-radius:12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);">
        <div style="flex:1;min-width:0;">
          <div style="font-weight:700;font-size:0.9em;">${roleLabel}</div>
          <div style="font-size:0.85em;opacity:.7;">${songLabel || '—'}</div>
          ${noteHTML}
        </div>
      </div>`;
    }).join('');
    projectsHTML = `<div class="mb-6"><h3 class="font-bold mb-3 text-lg">Collaborated On:</h3><div style="display:grid;gap:8px;">${creditButtons}</div></div>`;
  } else if (rawProjects.length > 0) {
    const legacy = rawProjects.map(p => `<span class="px-3 py-1 rounded-full glass text-sm">${p}</span>`).join('');
    projectsHTML = `<div class="mb-6"><h3 class="font-bold mb-3 text-lg">Collaborated On:</h3><div class="flex flex-wrap gap-2">${legacy}</div></div>`;
  }

  const links = person.links || [];
  let linksHTML = '';
  if (links.length > 0) {
    linksHTML = `
    <div class="flex gap-4">
        ${links.map(l => `
            <a href="${l.url}" target="_blank" class="w-12 h-12 rounded-lg glass flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors" onclick="event.stopPropagation()">
                <i class="${l.icon} text-xl"></i>
            </a>
        `).join('')}
    </div>`;
  }

  body.innerHTML = `
      ${projectsHTML}
      <div class="mb-6">
          <h3 class="font-bold mb-3 text-lg">About</h3>
          <p class="text-[var(--text-secondary)] leading-relaxed">${person.bio || ''}</p>
      </div>
      ${linksHTML}
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closePersonOverlay = function(event) {
  if (event && event.target !== event.currentTarget) return;
  document.getElementById('person-overlay').classList.remove('active');
  document.body.style.overflow = '';
};

/* ---------- Blog: categories, filters, posts ---------- */

let currentCat = 'All';
let currentSub = 'All';

function renderCategories(){
  const wrap = document.getElementById('category-filters');
  if(!wrap) return;
  wrap.innerHTML = '';

  const makeBtn = (name, isActive, color) => {
    const btn = document.createElement('button');
    btn.dataset.cat = name;
    btn.className = 'cat-btn px-4 py-2 rounded-full glass text-sm font-medium border transition';
    if(isActive){
      btn.classList.add('bg-[#A596DA]/20','border-[#A596DA]','text-[#d6ccf7]');
      btn.style.borderColor = color || '#A596DA';
      btn.style.backgroundColor = (color ? color+'33' : 'rgba(165,150,218,0.2)');
    } else {
      btn.classList.add('border-white/10','hover:border-[#A596DA]/50','text-[var(--text-secondary)]');
    }
    btn.textContent = name;
    btn.onclick = () => selectCat(name);
    return btn;
  };

  wrap.appendChild(makeBtn('All', currentCat === 'All', '#A596DA'));
  categories.forEach(c => wrap.appendChild(makeBtn(c.name, currentCat === c.name, c.color)));
}

function selectCat(name){
  currentCat = name;
  currentSub = 'All';
  renderCategories();
  renderSubs();
  renderPosts();
}

function renderSubs(){
  const sub = document.getElementById('subcategory-filters');
  if(!sub) return;
  const cat = categories.find(c => c.name === currentCat);
  if(!cat || currentCat === 'All'){ sub.classList.add('hidden'); sub.innerHTML = ''; return; }
  sub.classList.remove('hidden');
  sub.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.className = 'subcat-btn px-3 py-1 rounded-full text-xs glass border ' + (currentSub === 'All' ? 'bg-[#A596DA]/20 border-[#A596DA]/30' : 'border-white/10');
  allBtn.textContent = `All ${currentCat}`;
  allBtn.onclick = () => { currentSub = 'All'; renderSubs(); renderPosts(); };
  sub.appendChild(allBtn);
  (cat.subs || []).forEach(s => {
    const b = document.createElement('button');
    b.className = 'subcat-btn px-3 py-1 rounded-full text-xs glass border ' + (currentSub === s ? 'bg-[#A596DA]/20 border-[#A596DA]/30' : 'border-white/10 hover:border-[#A596DA]/30');
    b.textContent = s;
    b.onclick = () => { currentSub = s; renderSubs(); renderPosts(); };
    sub.appendChild(b);
  });
}

function toYouTubeEmbed(url){
  try {
    const u = new URL(url);
    let id = null;
    if (u.hostname.includes('youtu.be')) {
      id = u.pathname.slice(1);
    } else if (u.hostname.includes('youtube.com')) {
      if (u.pathname === '/watch') id = u.searchParams.get('v');
      else if (u.pathname.startsWith('/embed/')) id = u.pathname.split('/embed/')[1];
      else if (u.pathname.startsWith('/shorts/')) id = u.pathname.split('/shorts/')[1];
    }
    if (!id) return null;
    id = id.split('?')[0].split('&')[0];
    return `https://www.youtube.com/embed/${id}`;
  } catch { return null; }
}

function renderPosts(){
  const c = document.getElementById('blog-posts-container');
  if(!c) return;
  let p = [...allPosts];
  if(currentCat !== 'All') p = p.filter(x => x.category === currentCat);
  if(currentSub !== 'All') p = p.filter(x => x.subcategory === currentSub);
  if(p.length === 0){
    c.innerHTML = '<div class="text-center py-12 text-[var(--text-secondary)]">No posts yet in this category.</div>';
    return;
  }
  c.innerHTML = p.map(post => {
    const cat = categories.find(x => x.name === post.category);
    const col = post.color || (cat && cat.color) || '#A596DA';

    const renderBlocks = () => {
      if(!post.blocks || !Array.isArray(post.blocks) || post.blocks.length === 0) return null;
      return post.blocks.map(b => {
        if(b.type === 'image' && b.src){
          return `<div class="mb-5"><img src="${b.src}" class="w-full rounded-xl border border-white/10 cursor-pointer hover:opacity-95 transition" style="max-height:700px;object-fit:contain;background:#08050f" onclick="window.open('${b.src}','_blank')"></div>`;
        }
        if(b.type === 'text'){
          const txt = (b.content||'').replace(/</g,'&lt;').replace(/>/g,'&gt;');
          return `<div class="mb-6 px-1"><p class="text-[var(--text-secondary)] text-[16px] leading-relaxed whitespace-pre-wrap">${txt}</p></div>`;
        }
        if(b.type === 'video' && b.url){
          const embedUrl = toYouTubeEmbed(b.url);
          if (embedUrl) {
            return `<div class="mb-5"><div class="relative w-full rounded-xl overflow-hidden border border-white/10" style="aspect-ratio:16/9"><iframe src="${embedUrl}" title="Embedded video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" class="absolute inset-0 w-full h-full"></iframe></div><a href="${b.url}" target="_blank" class="text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] mt-2 inline-block">Open on YouTube ↗</a></div>`;
          }
          return `<div class="mb-5"><a href="${b.url}" target="_blank" class="text-[var(--accent)] inline-flex items-center gap-2">▶ Watch video</a></div>`;
        }
        if(b.type === 'divider'){
          return `<div class="my-8 w-full flex justify-center"><div class="h-[3px] w-full max-w-3xl rounded-full" style="background:${col};opacity:0.35"></div></div>`;
        }
        return '';
      }).join('');
    };

    const blocksHtml = renderBlocks();
    const imgs = post.images || [];
    const imgHtml = imgs.length === 1
      ? `<div class="mb-6"><img src="${imgs[0]}" class="max-w-full rounded-xl border border-white/10 mx-auto cursor-pointer" style="max-height:500px" onclick="window.open('${imgs[0]}')"></div>`
      : imgs.length > 1
        ? `<div class="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">${imgs.map(i=>`<img src="${i}" class="w-full h-48 object-cover rounded-lg border border-white/10 cursor-pointer" onclick="window.open('${i}')">`).join('')}</div>`
        : '';
    const legacyHtml = `<p class="text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap mb-4">${(post.body||'').replace(/</g,'&lt;')}</p>${imgHtml}`;

    return `<article class="glass rounded-2xl p-6 md:p-8 mb-8 glow-hover"><div class="flex gap-3 items-center mb-5 text-sm flex-wrap"><span class="px-3 py-1 rounded-full font-medium" style="background:${col}20;color:${col};border:1px solid ${col}40">${post.category}</span><span class="text-[var(--text-secondary)]">${post.subcategory||''}</span><span class="ml-auto text-[var(--text-secondary)]">${post.displayDate||post.date||''}</span></div><h3 class="text-2xl md:text-[28px] font-bold mb-6 gradient-text">${post.title}</h3>${blocksHtml || legacyHtml}</article>`;
  }).join('');
}

/* ---------- Navigation (one page — nav links are #anchors, not separate URLs) ---------- */

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
  });
}

// Close the mobile menu once a link is tapped (anchor jump doesn't reload the page).
document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.add('hidden');
  });
});

// Highlight whichever section is currently in view as you scroll.
const sectionIds = ['home', 'music', 'blog', 'rhythm', 'collabs', 'friends'];
const navSections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
if (navSections.length && 'IntersectionObserver' in window) {
  const setActiveNav = (id) => {
    document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
      const isActive = link.getAttribute('data-page') === id;
      link.classList.toggle('active', isActive);
      link.classList.toggle('text-white', isActive);
      link.classList.toggle('text-[var(--text-secondary)]', !isActive);
    });
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveNav(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  navSections.forEach(section => observer.observe(section));
}

document.addEventListener('click', function(e) {
  if (e.target.matches('.rhythm-tab')) {
    document.querySelectorAll('.rhythm-tab').forEach(btn => {
      btn.classList.remove('active', 'bg-[#A596DA]/20', 'text-[#A596DA]');
      btn.classList.add('bg-white/5');
    });
    e.target.classList.add('active', 'bg-[#A596DA]/20', 'text-[#A596DA]');
    e.target.classList.remove('bg-white/5');

    // All rhythm panels stay visible (real content, not hidden) — the tabs
    // are just a quick-jump shortcut down the page, same idea as the main nav.
    const target = e.target.dataset.rhythm;
    const panel = document.getElementById('rhythm-' + target);
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

window.addEventListener('load', () => {
  updateHardwareTablet();
  fillRhythmData();
});

/* ---------- Song overlay / persistent bottom player ---------- */

const songAudio = document.getElementById('songAudio');
let currentSongKey = null;

function openSong(key) {
  const song = SONGS[key];
  if (!song) return;
  currentSongKey = key;

  if (songAudio.src !== new URL(song.src, location.href).href) {
    songAudio.src = song.src;
    songAudio.load();
  }
  songAudio.play().catch(()=>{});

  document.getElementById('ovTitle').textContent = song.name;
  document.getElementById('ovArtist').textContent = song.artist;

  const img = document.getElementById('ovCoverImg');
  const emoji = document.getElementById('ovCoverEmoji');
  if (song.coverImg) {
    img.src = song.coverImg;
    img.classList.remove('hidden');
    emoji.classList.add('hidden');
  } else {
    img.classList.add('hidden');
    emoji.classList.remove('hidden');
    emoji.textContent = song.cover || '🎵';
  }

  document.getElementById('bpTitle').textContent = song.name;
  document.getElementById('bpArtist').textContent = song.artist;
  const bpImg = document.getElementById('bpCover');
  const bpEmoji = document.getElementById('bpEmoji');
  if (song.coverImg) {
    bpImg.src = song.coverImg;
    bpImg.classList.remove('hidden');
    bpEmoji.classList.add('hidden');
  } else {
    bpImg.classList.add('hidden');
    bpEmoji.classList.remove('hidden');
    bpEmoji.textContent = song.cover || '🎵';
  }
  showBottomPlayer();
  showSongTab('about');

  const streamWrap = document.getElementById('ovStreaming');
  streamWrap.innerHTML = '';
  if (song.streaming) {
    Object.entries(song.streaming).forEach(([platform, url]) => {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.className = 'px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs capitalize transition';
      a.textContent = platform;
      streamWrap.appendChild(a);
    });
  }

  document.getElementById('songOverlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  document.getElementById('songOverlay').classList.add('hidden');
  document.body.style.overflow = '';
  // intentionally does not pause playback
}

function reopenOverlay() {
  if (currentSongKey) {
    document.getElementById('songOverlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function showBottomPlayer() { document.getElementById('bottomPlayer').classList.remove('translate-y-full'); }
function hideBottomPlayer() { document.getElementById('bottomPlayer').classList.add('translate-y-full'); }

function stopPlayback() {
  songAudio.pause();
  songAudio.currentTime = 0;
  hideBottomPlayer();
  closeOverlay();
}

function toggleSongPlay() {
  if (songAudio.paused) songAudio.play();
  else songAudio.pause();
}

function seekAudio(sec) {
  songAudio.currentTime = Math.max(0, Math.min(songAudio.duration || 0, songAudio.currentTime + sec));
}

function fmt(t) {
  if (!isFinite(t)) return '0:00';
  const m = Math.floor(t/60), s = Math.floor(t%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

songAudio.addEventListener('timeupdate', () => {
  const pct = songAudio.duration ? (songAudio.currentTime / songAudio.duration * 100) : 0;
  document.getElementById('ovProgress').style.width = pct + '%';
  document.getElementById('ovHandle').style.left = pct + '%';
  document.getElementById('ovCurrent').textContent = fmt(songAudio.currentTime);
  document.getElementById('bpProgress').style.width = pct + '%';
  document.getElementById('bpTime').textContent = fmt(songAudio.currentTime);
});
songAudio.addEventListener('loadedmetadata', () => {
  document.getElementById('ovDuration').textContent = fmt(songAudio.duration);
});
songAudio.addEventListener('play', () => {
  document.getElementById('ovPlayIcon').innerHTML = '<path d="M6 6h4v12H6zm8 0h4v12h-4z"/>';
  document.getElementById('bpPlayIcon').innerHTML = '<path d="M6 6h4v12H6zm8 0h4v12h-4z"/>';
  showBottomPlayer();
});
songAudio.addEventListener('pause', () => {
  document.getElementById('ovPlayIcon').innerHTML = '<path d="M8 5v14l11-7z"/>';
  document.getElementById('bpPlayIcon').innerHTML = '<path d="M8 5v14l11-7z"/>';
});
songAudio.addEventListener('ended', () => { hideBottomPlayer(); });

document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.getElementById('ovProgressWrap');
  if (wrap) wrap.addEventListener('click', (e) => {
    const rect = wrap.getBoundingClientRect();
    songAudio.currentTime = ((e.clientX - rect.left) / rect.width) * (songAudio.duration || 0);
  });
  const bpWrap = document.getElementById('bpProgressWrap');
  if (bpWrap) bpWrap.addEventListener('click', (e) => {
    const rect = bpWrap.getBoundingClientRect();
    songAudio.currentTime = ((e.clientX - rect.left) / rect.width) * (songAudio.duration || 0);
  });
  const vol = document.getElementById('ovVolume');
  const bpVol = document.getElementById('bpVolume');
  if (vol) {
    songAudio.volume = vol.value;
    vol.addEventListener('input', e => { songAudio.volume = e.target.value; if (bpVol) bpVol.value = e.target.value; });
  }
  if (bpVol) {
    bpVol.value = songAudio.volume;
    bpVol.addEventListener('input', e => { songAudio.volume = e.target.value; if (vol) vol.value = e.target.value; });
  }
  document.querySelectorAll('.song-tab').forEach(btn => btn.addEventListener('click', () => showSongTab(btn.dataset.tab)));
});

function showSongTab(tab) {
  document.querySelectorAll('.song-tab').forEach(b => {
    const active = b.dataset.tab === tab;
    b.classList.toggle('border-[#A596DA]', active);
    b.classList.toggle('text-white', active);
    b.classList.toggle('border-transparent', !active);
    b.classList.toggle('text-[var(--text-secondary)]', !active);
  });

  const song = SONGS[currentSongKey];
  const content = document.getElementById('ovTabContent');
  if (!song) return;

  let html = '';
  if (tab === 'about') html = `<p>${song.about || 'No description.'}</p>`;
  else if (tab === 'thoughts') html = `<p>${song.thoughts || 'No thoughts shared yet.'}</p>`;
  else if (tab === 'behind') html = `<p>${song.behindTheScenes || song.Miscellaneous || 'Behind the scenes coming soon.'}</p>`;
  content.innerHTML = html;
}

function openAlbum(key) {
  const album = ALBUMS[key];
  if (!album) return;
  document.getElementById('alCover').src = album.coverImg || '';
  document.getElementById('alTitle').textContent = album.name;
  document.getElementById('alArtist').textContent = album.artist + ' • ' + album.year;
  document.getElementById('alStatus').textContent = album.status;
  const wrap = document.getElementById('alTracks');
  wrap.innerHTML = '';
  (album.tracklist || []).forEach((t,i)=>{
    const d = document.createElement('div');
    d.className = 'flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition cursor-pointer';
    if (t.key && SONGS[t.key]) d.onclick = () => { closeAlbum(); openSong(t.key); };
    d.innerHTML = `<div class="w-6 text-sm text-[var(--text-secondary)]">${i+1}</div><div class="flex-1">${t.name}</div><div class="text-xs font-mono text-[var(--text-secondary)]">${t.duration}</div>`;
    wrap.appendChild(d);
  });
  document.getElementById('albumOverlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeAlbum(){ document.getElementById('albumOverlay').classList.add('hidden'); document.body.style.overflow=''; }

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closePersonOverlay(); closeOverlay(); closeAlbum(); }
});

/* ---------- Rhythm game stats (from the hardcoded RHYTHM_GAME_STATS above) ---------- */

function fmtNum(n){ return (n || 0).toLocaleString(); }
function fmtHours(sec){
  const h = (sec || 0) / 3600;
  return (h >= 100 ? Math.round(h) : h.toFixed(1)) + 'h';
}
function setText(id, val){ const el = document.getElementById(id); if (el) el.textContent = val; }

function gradeBg(grade){
  return { SS:'#Fdd700', SSH:'#C0C0C0', S:'#Fdd700', SH:'#C0C0C0', A:'#8BC34A' }[grade] || '#A596DA';
}
function gradeFg(grade){
  return (grade === 'SSH' || grade === 'SH' || grade === 'A') ? '#000' : '#000';
}

function playRow(p, i){
  return `<tr class="border-b border-white/5 last:border-0">
    <td class="py-3 pr-3 text-[var(--text-secondary)] w-6">${i+1}</td>
    <td class="py-3 pr-3">
      <div class="font-medium">${p.title}</div>
      <div class="text-xs text-[var(--text-secondary)]">${p.subtitle || ''}</div>
    </td>
    <td class="py-3 pr-3 text-right font-mono text-[#A596DA]">${p.pp}pp</td>
    <td class="py-3 pr-3 text-right font-mono">${p.acc}%</td>
    <td class="py-3 text-right"><span class="grade-pill" style="background:${gradeBg(p.grade)};color:${gradeFg(p.grade)}">${p.grade}</span></td>
  </tr>`;
}
function fillTop5(id, arr){
  const tb = document.getElementById(id);
  if (!tb || !arr) return;
  tb.innerHTML = arr.map(playRow).join('');
}

function etternaRow(s, i){
  return `<tr class="border-b border-white/5 last:border-0">
    <td class="py-2 text-[var(--text-secondary)]">${i+1}</td>
    <td class="py-2">${s.song}${s.artist ? ` <span class="text-xs text-[var(--text-secondary)]">— ${s.artist}</span>` : ''}</td>
    <td class="py-2 text-right font-mono text-[#A596DA]">${s.msd.toFixed(2)}</td>
    <td class="py-2 text-right font-mono">${s.acc}%</td>
  </tr>`;
}
function ffrRow(s, i){
  return `<tr class="border-b border-white/5 last:border-0">
    <td class="py-2 text-[var(--text-secondary)]">${i+1}</td>
    <td class="py-2">${s.song}</td>
    <td class="py-2 text-right font-mono">${s.level}</td>
    <td class="py-2 text-right font-mono text-[#A596DA]">${s.score}</td>
  </tr>`;
}

/* ===========================================================================
   RHYTHM_GAME_STATS — your osu! / osu!mania / Etterna / FFR stats for the
   Rhythm page. Edit these numbers directly whenever you want to update them
   — no external file, no fetch.
   =========================================================================== */
const RHYTHM_GAME_STATS = {
  osuStandard: {
    rank: 176993,
    countryRank: 1812,
    pp: 4056,
    acc: 98.77,
    plays: 101213,
    seconds: 3920880,
    rankedScore: 5323953652,
    totalScore: 45289903811,
    totalHits: 13057980,
    hitsPerPlay: 129,
    maxCombo: 1998,
    replaysWatched: 8,
    medals: 118,
    grades: { SS: 94, SSH: 50, S: 123, SH: 509, A: 1961 },
    top5: [
      { pp: 214, acc: 98.88, grade: 'S', title: 'Dakara, Hitori ja Nai (TV Size)', subtitle: 'Little Glee Monster — [Happiness]' },
      { pp: 210, acc: 99.58, grade: 'S', title: 'feeling good (nightcore & cut ver.)', subtitle: "kumocho's extra" },
      { pp: 206, acc: 100.00, grade: 'SS', title: 'feeling good (nightcore & cut ver.)', subtitle: "mita's extra" },
      { pp: 206, acc: 99.76, grade: 'S', title: 'Die A Million Times (Nightcore & Cut Ver.)', subtitle: "Kumocho's Extra" },
      { pp: 194, acc: 99.70, grade: 'S', title: 'WEREWOLF (NIGHTCORE & CUT VER.)', subtitle: "MIMARI'S EXTRA" }
    ]
  },
  osuMania: {
    rank: 121103,
    countryRank: 756,
    pp: 2332,
    acc: 95.31,
    plays: 6554,
    seconds: 349500,
    rankedScore: 636097699,
    totalScore: 2193694978,
    totalHits: 2130538,
    hitsPerPlay: 325,
    maxCombo: 2886,
    replaysWatched: 3,
    medals: 116,
    grades: { SS: 0, SSH: 28, S: 0, SH: 424, A: 193 },
    top5: [
      { pp: 128, acc: 97.05, grade: 'S', title: 'Ascalon', subtitle: 'Crispy Joybox — [4K] Another' },
      { pp: 125, acc: 94.67, grade: 'A', title: 'Triumph & Regret', subtitle: 'typeMARS — [4K] Triumph' },
      { pp: 120, acc: 93.54, grade: 'A', title: 'Triumph & Regret', subtitle: 'typeMARS — [4K] Regret' },
      { pp: 118, acc: 97.29, grade: 'S', title: 'anomone', subtitle: 'S-C-U feat. Crispy Joybox — [4K] Another' },
      { pp: 118, acc: 94.88, grade: 'A', title: 'Databata Animation [feat. t+pazolite]', subtitle: 'Kobaryo — [4K] Insane' }
    ]
  },
  etterna: {
    username: 'DennisZeroVT',
    rank: 8701,
    since: '2020',
    overall: 9.38,
    skillsets: {
      stream: 9.75,
      jumpstream: 6.67,
      handstream: 5.13,
      jacks: 8.07,
      chordjacks: 6.91,
      stamina: 10.02,
      technical: 11.27
    },
    grades: { AAAA: 0, AAA: 10, AA: 0, A: 2, B: 2, C: 0, D: 0 },
    top10: [
      { song: 'Boku ni Invitation', artist: 'JP', msd: 12.37, acc: 97.86 },
      { song: 'Brave Shine', artist: 'Aimer', msd: 12.36, acc: 99.35 },
      { song: 'Perfect-Area Complete!', artist: 'Natsuko Aso', msd: 12.20, acc: 98.22 },
      { song: 'Brave Shine', artist: 'Aimer', msd: 11.56, acc: 99.48 },
      { song: 'Battle! Gym Leader', artist: 'Junichi Masuda, Go Ichinose, Morikazu Aok', msd: 11.37, acc: 99.48 },
      { song: 'ILY', artist: 'Panda Eyes', msd: 11.35, acc: 99.50 },
      { song: 'Kimi ni Mune Kyun', artist: 'Yuu Kobayashi', msd: 11.29, acc: 96.84 },
      { song: 'Friend Shitai', artist: 'Gakuen Seikatsubu', msd: 11.27, acc: 95.32 },
      { song: 'Sore Ga Ai Deshou', artist: 'Mikuni Shimokawa', msd: 11.16, acc: 99.38 },
      { song: 'Connect', artist: 'ClariS', msd: 11.16, acc: 96.49 }
    ]
  },
  ffr: {
    username: 'DennisZeroVT',
    rank: 17078,
    avgRank: 0,
    skillRating: 16.07,
    globalRank: 17078,
    countryRankNL: 86,
    tierPoints: 1,
    tierPointsRank: 33906,
    top5Avg: 34.83,
    top100Avg: 4.82,
    games: 21,
    grandTotal: 24001755,
    grandTotalRank: 249207,
    lastPlayed: '2026-05-20',
    top10: [
      { song: 'Bits and Bytes (Original Mix)', artist: '', level: 60, score: 36.87 },
      { song: 'Fear Me (NGADm Entry)', artist: '', level: 60, score: 35.90 },
      { song: 'COUNTING CARDS', artist: '', level: 60, score: 34.56 },
      { song: '-Slapstick-', artist: '', level: 60, score: 33.79 },
      { song: 'burned down the ghost house and...', artist: '', level: 60, score: 33.03 },
      { song: 'Carissa', artist: '', level: 34, score: 32.30 },
      { song: 'AM-3P (House Party Dub)', artist: '', level: 34, score: 29.57 },
      { song: 'Debut', artist: '', level: 60, score: 27.28 },
      { song: 'GIN TONIC FLAVOR', artist: '', level: 60, score: 24.88 },
      { song: 'Gacha Gacha Cute Figu atto Matte', artist: '', level: 60, score: 24.40 }
    ]
  }
};
/* ========================= END OF RHYTHM_GAME_STATS ========================= */

function fillRhythmData(){
  const std = RHYTHM_GAME_STATS.osuStandard, man = RHYTHM_GAME_STATS.osuMania, ett = RHYTHM_GAME_STATS.etterna, ffr = RHYTHM_GAME_STATS.ffr;

  // Overview tab

  setText('overview-std-rank', '#' + fmtNum(std.rank));
  setText('overview-std-pp', std.pp);
  setText('overview-std-acc', std.acc + '%');
  setText('overview-mania-rank', '#' + fmtNum(man.rank));
  setText('overview-mania-pp', man.pp);
  setText('overview-mania-acc', man.acc + '%');
  setText('overview-etterna-rank', '#' + fmtNum(ett.rank));
  setText('overview-etterna-overall', ett.overall);
  setText('overview-ffr-skill', ffr.skillRating);
  setText('overview-ffr-rank', '#' + fmtNum(ffr.rank));
  setText('overview-ffr-nl', '#' + fmtNum(ffr.countryRankNL));

  // osu! standard tab
  setText('osu-panel-rank', '#' + fmtNum(std.rank));
  setText('osu-panel-country', '#' + fmtNum(std.countryRank));
  setText('osu-panel-pp', std.pp + 'pp');
  setText('osu-panel-acc', std.acc + '%');
  setText('osu-panel-plays', fmtNum(std.plays));
  setText('osu-panel-time', fmtHours(std.seconds));
  setText('osu-panel-ranked', fmtNum(std.rankedScore));
  setText('osu-panel-g-ss', std.grades.SS);
  setText('osu-panel-g-ssh', std.grades.SSH);
  setText('osu-panel-g-s', std.grades.S);
  setText('osu-panel-g-sh', std.grades.SH);
  setText('osu-panel-g-a', std.grades.A);
  fillTop5('osu-panel-top5', std.top5);

  // osu!mania tab
  setText('mania-panel-rank', '#' + fmtNum(man.rank));
  setText('mania-panel-country', '#' + fmtNum(man.countryRank));
  setText('mania-panel-pp', man.pp + 'pp');
  setText('mania-panel-acc', man.acc + '%');
  setText('mania-panel-plays', fmtNum(man.plays));
  setText('mania-panel-time', fmtHours(man.seconds));
  setText('mania-panel-g-ss', man.grades.SS);
  setText('mania-panel-g-ssh', man.grades.SSH);
  setText('mania-panel-g-s', man.grades.S);
  setText('mania-panel-g-sh', man.grades.SH);
  setText('mania-panel-g-a', man.grades.A);
  fillTop5('mania-panel-top5', man.top5);

  // Etterna tab
  setText('etterna-rank', '#' + fmtNum(ett.rank));
  setText('etterna-since', 'Since ' + ett.since);
  setText('etterna-overall', ett.overall);
  Object.entries(ett.skillsets).forEach(([k, v]) => {
    setText('etterna-' + k, v);
    const bar = document.getElementById('etterna-bar-' + k);
    if (bar) { bar.style.width = Math.min(100, (v/12)*100) + '%'; bar.style.background = '#A596DA'; }
  });
  const etTb = document.getElementById('etterna-top10');
  if (etTb) etTb.innerHTML = ett.top10.map(etternaRow).join('');

  // FFR tab
  setText('ffr-rank', '#' + fmtNum(ffr.rank));
  setText('ffr-avg-rank', ffr.avgRank ? fmtNum(ffr.avgRank) : '-');
  setText('ffr-skill', ffr.skillRating);
  const ffrTb = document.getElementById('ffr-top10');
  if (ffrTb) ffrTb.innerHTML = ffr.top10.map(ffrRow).join('');
}

/* ---------- Hardware tablet-area visualizer (rhythm page) ---------- */

const TABLET_AREA = { width: 95, height: 65, x: 47.5, y: 32.5, rotation: 0, unit: 'mm' };
const TABLET_BOUNDS = { xMin: 47.5, xMax: 104.5, yMin: 32.5, yMax: 62.5 };

function updateHardwareTablet() {
  const viz = document.getElementById('tablet-viz');
  const active = document.getElementById('tablet-active');
  if (!viz || !active) return;

  const x = Math.max(TABLET_BOUNDS.xMin, Math.min(TABLET_BOUNDS.xMax, TABLET_AREA.x));
  const y = Math.max(TABLET_BOUNDS.yMin, Math.min(TABLET_BOUNDS.yMax, TABLET_AREA.y));
  const FULL_W = 152, FULL_H = 95;
  const wPercent = (TABLET_AREA.width / FULL_W) * 100;
  const hPercent = (TABLET_AREA.height / FULL_H) * 100;
  const xPercent = ((x - TABLET_AREA.width/2) / FULL_W) * 100;
  const yPercent = ((y - TABLET_AREA.height/2) / FULL_H) * 100;

  active.style.width = wPercent + '%';
  active.style.height = hPercent + '%';
  active.style.left = xPercent + '%';
  active.style.top = yPercent + '%';
  active.style.bottom = 'auto';
  active.style.transform = `rotate(${TABLET_AREA.rotation}deg)`;
  active.style.transformOrigin = 'center';

  const labelW = document.getElementById('tablet-label-w');
  const labelH = document.getElementById('tablet-label-h');
  if (labelW) labelW.textContent = TABLET_AREA.width + 'mm';
  if (labelH) labelH.textContent = TABLET_AREA.height + 'mm';

  const specs = document.getElementById('tablet-specs');
  if (specs) {
    const ratio = (TABLET_AREA.width / TABLET_AREA.height).toFixed(4);
    specs.textContent = `Full: ${FULL_W}×${FULL_H}mm • Active: ${TABLET_AREA.width}×${TABLET_AREA.height}mm (${ratio}) • X:${x.toFixed(1)} Y:${y.toFixed(1)}`;
  }
}

/* ---------- HQ / performance toggle ---------- */

document.addEventListener('DOMContentLoaded', function() {
  const hqBtn = document.getElementById('hq-toggle');
  let isOptimized = localStorage.getItem('mobileOptimized') === 'true';

  function applyMode() {
    if (isOptimized) {
      document.body.classList.add('optimized');
      document.body.classList.remove('hq-mode');
      if (hqBtn) { hqBtn.textContent = 'LQ'; hqBtn.classList.add('active'); hqBtn.title = 'Tap for HQ (high quality)'; }
      document.querySelectorAll('video').forEach(v => { try { v.pause(); } catch(e){} });
    } else {
      document.body.classList.remove('optimized');
      document.body.classList.add('hq-mode');
      if (hqBtn) { hqBtn.textContent = 'HQ'; hqBtn.classList.remove('active'); hqBtn.title = 'Tap for LQ (save battery)'; }
      document.querySelectorAll('video[autoplay]').forEach(v => { try { v.play().catch(()=>{}); } catch(e){} });
    }
  }

  applyMode();

  if (hqBtn) {
    hqBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      isOptimized = !isOptimized;
      localStorage.setItem('mobileOptimized', isOptimized);
      applyMode();
      if (navigator.vibrate) navigator.vibrate(10);
    });
  }
});
