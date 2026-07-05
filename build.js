// build.js
//
// Two jobs, both driven by data/*.json:
//
// 1. SSR the real content directly into index.html's visible containers
//    (#songs-grid, #albums-grid, #blog-posts-container, #collabs-grid,
//    #friends-grid) so crawlers and other clients that don't run JS
//    (link-preview bots, some AI assistants, curl, etc.) see the actual
//    site content instead of empty <div>s. The in-page <script> still
//    fetches data/*.json on load and re-renders on top with full
//    interactivity — this just makes sure there's real content in the
//    raw HTML before that happens.
//
// 2. Keep the small in-page FALLBACK object (used only if the JSON
//    fetches fail) in sync with the real data.
//
// Run this any time you edit something in /data. If you change the
// *rendering* (card markup, classes, etc.) in index.html's <script>,
// mirror that change in the render*SSR() functions below too — they're
// deliberately kept simple/independent so this script has no build step
// of its own, but that means they can drift from the client renderers if
// you change one and forget the other.

const fs = require('fs');

const read = (p, fallback = []) => {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return fallback; }
};

const songs = read('data/songs.json');
const people = read('data/people.json');
const albums = read('data/albums.json');
const posts = read('data/posts.json');
const categories = read('data/categories.json');

const esc = (s) => String(s ?? '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const badgeLabel = (b) => (typeof b === 'string' ? b : (b && b.label) || '');
const badgeColor = (b) => (b && typeof b === 'object' && b.color) || null;

/* ---------- SSR: songs & albums ---------- */

function renderSongsSSR() {
  return songs.map(s => {
    const badges = (s.badges || []).slice(0, 3).map(b => {
      const label = badgeLabel(b), color = badgeColor(b);
      return color
        ? `<span class="text-[10px] px-2 py-0.5 rounded-full" style="background:${color};color:#fff">${esc(label)}</span>`
        : `<span class="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">${esc(label)}</span>`;
    }).join('');
    return `
    <div class="group relative glass rounded-2xl overflow-hidden cursor-pointer glow-hover transition-all duration-300 hover:-translate-y-1" onclick="openSong('${s.id}')">
        <div class="aspect-square relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
            ${s.cover ? `<img src="${s.cover}" alt="${esc(s.title)}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.style.display='none'">` : ''}
            <div class="absolute inset-0 flex items-center justify-center text-5xl opacity-20">${s.coverEmoji || '🎵'}</div>
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div class="w-14 h-14 rounded-full bg-[#A596DA] flex items-center justify-center shadow-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"/></svg>
                </div>
            </div>
        </div>
        <div class="p-4">
            <h3 class="font-semibold text-white truncate">${esc(s.title)}</h3>
            <p class="text-sm text-[var(--text-secondary)] mt-1">${s.year || ''} • ${esc(s.artist)}</p>
            <div class="flex gap-1.5 mt-3 flex-wrap">${badges}</div>
        </div>
    </div>`;
  }).join('\n');
}

function renderAlbumsSSR() {
  return albums.map(a => `
    <div class="group relative glass rounded-2xl overflow-hidden cursor-pointer glow-hover transition-all duration-300 hover:-translate-y-1" onclick="openAlbum('${a.id}')">
        <div class="aspect-square relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
            ${a.coverImg ? `<img src="${a.coverImg}" alt="${esc(a.name)}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.style.display='none'">` : ''}
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>
            <div class="absolute bottom-3 left-3">
                <span class="px-2 py-1 rounded-full bg-[#A596DA]/20 text-[#A596DA] text-[10px] font-medium backdrop-blur">${esc(a.status || '')}</span>
            </div>
        </div>
        <div class="p-4">
            <h3 class="font-semibold text-white truncate">${esc(a.name)}</h3>
            <p class="text-sm text-[var(--text-secondary)] mt-1">${a.year || ''} • ${(a.tracks || (a.tracklist || []).length) || 0} tracks</p>
        </div>
    </div>`).join('\n');
}

/* ---------- SSR: blog posts (default "All" view) ---------- */

function renderBlockSSR(b, color) {
  if (b.type === 'image' && b.src) {
    return `<div class="mb-5"><img src="${b.src}" class="w-full rounded-xl border border-white/10 cursor-pointer hover:opacity-95 transition" style="max-height:700px;object-fit:contain;background:#08050f" onclick="window.open('${b.src}','_blank')"></div>`;
  }
  if (b.type === 'text') {
    return `<div class="mb-6 px-1"><p class="text-[var(--text-secondary)] text-[16px] leading-relaxed whitespace-pre-wrap">${esc(b.content).replace(/\n/g, '<br>')}</p></div>`;
  }
  if (b.type === 'video' && b.url) {
    return `<div class="mb-5"><a href="${b.url}" target="_blank" class="text-[var(--accent)] inline-flex items-center gap-2">▶ Watch video</a></div>`;
  }
  if (b.type === 'divider') {
    return `<div class="my-8 w-full flex justify-center"><div class="h-[3px] w-full max-w-3xl rounded-full" style="background:${color};opacity:0.35"></div></div>`;
  }
  return '';
}

function renderPostsSSR() {
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  if (sorted.length === 0) {
    return '<div class="text-center py-12 text-[var(--text-secondary)]">No posts yet.</div>';
  }
  return sorted.map(post => {
    const cat = categories.find(c => c.name === post.category);
    const color = post.color || (cat && cat.color) || '#A596DA';
    const blocksHtml = (post.blocks || []).map(b => renderBlockSSR(b, color)).join('');
    return `<article class="glass rounded-2xl p-6 md:p-8 mb-8 glow-hover"><div class="flex gap-3 items-center mb-5 text-sm flex-wrap"><span class="px-3 py-1 rounded-full font-medium" style="background:${color}20;color:${color};border:1px solid ${color}40">${esc(post.category)}</span><span class="text-[var(--text-secondary)]">${esc(post.subcategory || '')}</span><span class="ml-auto text-[var(--text-secondary)]">${esc(post.displayDate || post.date || '')}</span></div><h3 class="text-2xl md:text-[28px] font-bold mb-6 gradient-text">${esc(post.title)}</h3>${blocksHtml}</article>`;
  }).join('\n');
}

/* ---------- SSR: friends & collaborators ---------- */

function personCardSSR(p) {
  const avatarBase = (p.avatar || `Friends/${p.id}.jpg`).replace(/\.jpg$|\.png$/i, '');
  const tryJpg = avatarBase + '.jpg';
  const tryPng = avatarBase + '.png';
  const twitter = (p.links && p.links.twitter) || '';
  const credits = p.credits || [];
  const collabChips = credits.map(cr => {
    const roleLabel = cr.role || 'Collaborator';
    const songLabel = cr.song || '';
    return `<span style="display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;background:rgba(165,150,218,.15);border:1px solid rgba(165,150,218,.3);font-size:0.75em;color:#A596DA;font-weight:600;">${esc(roleLabel)}${songLabel ? ` · <span style="opacity:.75;font-weight:400">${esc(songLabel)}</span>` : ''}</span>`;
  }).join('');

  return `<div class="person-card" style="background:#1a1a1a;border-radius:12px;overflow:hidden;border:1px solid #333;" onclick="openPersonOverlay('${p.id}')">
      <div style="height:60px;background:linear-gradient(135deg,#A596DA,#8B78CB);"></div>
      <div style="padding:0 16px 16px;margin-top:-30px;position:relative;">
        <img src="${tryJpg}" alt="${esc(p.name)}" style="width:70px;height:70px;border-radius:50%;border:3px solid #1a1a1a;object-fit:cover;background:#333;display:block;" onerror="this.onerror=null; this.src='${tryPng}';">
        <h3 style="margin:12px 0 4px;color:white;font-size:1.1em;">${esc(p.name)}</h3>
        <div style="color:#A596DA;font-size:0.85em;margin-bottom:4px;">${esc(p.handle || '')}</div>
        <div style="margin:4px 0 8px;font-size:0.8em;color:#aaa;">${esc(p.role || '')}</div>
        <p style="color:#ccc;font-size:0.85em;line-height:1.4;margin:8px 0;">${esc((p.bio || '').substring(0, 140))}</p>
        ${collabChips ? `<div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:8px;">${collabChips}</div>` : ''}
        ${twitter ? `<a href="${twitter}" target="_blank" onclick="event.stopPropagation()" style="display:inline-block;margin-top:10px;padding:8px 16px;background:#A596DA;color:#000;text-decoration:none;border-radius:20px;font-size:0.85em;font-weight:600;">Twitter</a>` : ''}
      </div>
    </div>`;
}

function renderPeopleSSR() {
  const collabs = [], friends = [];
  people.forEach(p => {
    const tags = (p.tags || []).map(t => t.toLowerCase());
    const isCollab = tags.includes('collab');
    const isFriend = tags.includes('friend') || (!isCollab && tags.length === 0);
    if (isCollab) collabs.push(p);
    if (isFriend) friends.push(p);
  });
  return {
    collabs: collabs.map(personCardSSR).join('\n'),
    friends: friends.map(personCardSSR).join('\n')
  };
}

/* ---------- Apply SSR blocks + FALLBACK block to index.html ---------- */

const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');

function replaceBetween(src, startMarker, endMarker, content) {
  const re = new RegExp(startMarker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + endMarker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!re.test(src)) {
    console.warn(`Marker pair not found: ${startMarker} ... ${endMarker} — skipping.`);
    return src;
  }
  return src.replace(re, `${startMarker}\n${content}\n${endMarker}`);
}

const { collabs: collabsHtml, friends: friendsHtml } = renderPeopleSSR();

html = replaceBetween(html, '<!-- SSR:songs -->', '<!-- /SSR:songs -->', renderSongsSSR());
html = replaceBetween(html, '<!-- SSR:albums -->', '<!-- /SSR:albums -->', renderAlbumsSSR());
html = replaceBetween(html, '<!-- SSR:posts -->', '<!-- /SSR:posts -->', renderPostsSSR());
html = replaceBetween(html, '<!-- SSR:collabs -->', '<!-- /SSR:collabs -->', collabsHtml);
html = replaceBetween(html, '<!-- SSR:friends -->', '<!-- /SSR:friends -->', friendsHtml);

// --- keep the fallback safety-net (used only if the JSON fetch fails) in sync ---
const slimSongs = songs.map(s => ({
  id: s.id, title: s.title, artist: s.artist, year: s.year,
  cover: s.cover, coverEmoji: s.coverEmoji, audio: s.audio,
  badges: s.badges, about: s.about
}));
const slimPeople = people.map(p => ({
  id: p.id, name: p.name, handle: p.handle, role: p.role,
  tags: p.tags, avatar: p.avatar, bio: p.bio
}));
const slimPosts = posts.map(p => ({
  id: p.id, title: p.title, date: p.date, category: p.category,
  subcategory: p.subcategory, blocks: p.blocks
}));
const fallback = { songs: slimSongs, people: slimPeople, albums, posts: slimPosts, categories: [] };
const fallbackBlock = `// FALLBACK_START — regenerated by build.js from data/*.json, do not hand-edit the values below\nconst FALLBACK = ${JSON.stringify(fallback, null, 2)};\n// FALLBACK_END`;
html = html.replace(/\/\/ FALLBACK_START[\s\S]*?\/\/ FALLBACK_END/, fallbackBlock);

fs.writeFileSync(file, html);
console.log(`built: SSR'd ${songs.length} songs, ${albums.length} albums, ${posts.length} posts, ${people.length} people into index.html`);
