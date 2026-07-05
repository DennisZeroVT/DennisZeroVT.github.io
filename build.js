// build.js
// Invisible marker method - injects content into hidden containers for crawlers
// Markers: <!-- POSTS_START --> etc inside display:none divs

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

function replaceBetween(src, startMarker, endMarker, content) {
  const re = new RegExp(startMarker.replace(/[.*+?^${}()|[\]\]/g, '\$&') + '[\s\S]*?' + endMarker.replace(/[.*+?^${}()|[\]\]/g, '\$&'));
  if (!re.test(src)) {
    console.warn(`Marker pair not found: ${startMarker} ... ${endMarker} — skipping.`);
    return src;
  }
  return src.replace(re, `${startMarker}
${content}
${endMarker}`);
}

// Build songs HTML for invisible container
function renderSongsInvisible() {
  return songs.map(s => {
    const badges = (s.badges || []).map(b => {
      const label = typeof b === 'string' ? b : b.label;
      const color = b && typeof b === 'object' && b.color ? b.color : '#6B7280';
      return `<span class="px-2 py-1 rounded text-white font-medium" style="background-color:${color}">${esc(label)}</span>`;
    }).join('');
    return `<div class="glass p-6 rounded-xl">
    <img src="${s.cover}" class="w-full rounded-lg mb-4" alt="${esc(s.title)}">
    <h3 class="text-xl font-semibold">${esc(s.title)} (${s.year})</h3>
    <p class="text-sm my-2">${esc(s.about || '')}</p>
    <div class="flex flex-wrap gap-2 text-xs mb-3">${badges}</div>
    <audio controls src="${s.audio}" class="w-full"></audio>
  </div>`;
  }).join('
');
}

function renderPostsInvisible() {
  return posts.map(p => `<div><h3>${esc(p.title)}</h3><p>${esc(p.date)}</p></div>`).join('
');
}

function renderFriendsInvisible() {
  return people.filter(p => (p.tags||[]).includes('friend')).map(p => `<div>${esc(p.name)}</div>`).join('
');
}

function renderCollabsInvisible() {
  return people.filter(p => (p.tags||[]).includes('collab')).map(p => `<div>${esc(p.name)}</div>`).join('
');
}

const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');

html = replaceBetween(html, '<!-- POSTS_START -->', '<!-- POSTS_END -->', renderPostsInvisible());
html = replaceBetween(html, '<!-- SONGS_START -->', '<!-- SONGS_END -->', renderSongsInvisible());
html = replaceBetween(html, '<!-- FRIENDS_START -->', '<!-- FRIENDS_END -->', renderFriendsInvisible());
html = replaceBetween(html, '<!-- COLLABS_START -->', '<!-- COLLABS_END -->', renderCollabsInvisible());

fs.writeFileSync(file, html);
console.log(`built: injected ${songs.length} songs, ${posts.length} posts into invisible markers`);
