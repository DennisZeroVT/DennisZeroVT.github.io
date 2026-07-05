const fs = require('fs');

const read = (p, f=[]) => { try { return JSON.parse(fs.readFileSync(p,'utf8')); } catch { return f; } };
const songs = read('data/songs.json');
const people = read('data/people.json');
const albums = read('data/albums.json');
const posts = read('data/posts.json');
const categories = read('data/categories.json');

const esc = s => String(s ?? '').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function replaceBetween(src, start, end, content){
  const i = src.indexOf(start), j = src.indexOf(end, i);
  if(i===-1 || j===-1){ console.warn('Marker not found:', start); return src; }
  return src.slice(0, i+start.length) + '\n' + content + '\n' + src.slice(j);
}

// --- SONGS ---
function renderSongs(){
  return songs.map(s=>{
    const badges = (s.badges||[]).map(b=>{
      const label = typeof b==='string'?b:b.label;
      const color = b && b.color || '#6B7280';
      return `<span class="px-2 py-1 rounded text-white font-medium" style="background-color:${color}">${esc(label)}</span>`;
    }).join('');
    return `<div class="glass p-6 rounded-xl">
    <img src="${s.cover}" class="w-full rounded-lg mb-4" alt="${esc(s.title)}">
    <h3 class="text-xl font-semibold">${esc(s.title)} (${s.year||''})</h3>
    <p class="text-sm my-2">${esc(s.about||'')}</p>
    <div class="flex flex-wrap gap-2 text-xs mb-3">${badges}</div>
    <audio controls src="${s.audio}" class="w-full"></audio>
  </div>`;
  }).join('\n');
}

// --- POSTS (detailed) ---
function renderBlock(b, color){
  if(b.type==='image' && b.src) return `<div><img src="${b.src}" alt=""></div>`;
  if(b.type==='text') return `<p>${esc(b.content)}</p>`;
  if(b.type==='video' && b.url) return `<p><a href="${b.url}">Video</a></p>`;
  if(b.type==='divider') return `<hr>`;
  return '';
}
function renderPosts(){
  const sorted = [...posts].sort((a,b)=> new Date(b.date)-new Date(a.date));
  return sorted.map(p=>{
    const cat = categories.find(c=>c.name===p.category);
    const color = p.color || (cat && cat.color) || '#A596DA';
    const blocks = (p.blocks||[]).map(b=>renderBlock(b,color)).join('');
    return `<article>
      <h3>${esc(p.title)}</h3>
      <div>${esc(p.category)} • ${esc(p.displayDate||p.date)}</div>
      ${blocks}
    </article>`;
  }).join('\n');
}

// --- PEOPLE ---
function personCard(p){
  const avatar = (p.avatar || `Friends/${p.id}.jpg`);
  const links = p.links||{};
  return `<div>
    <img src="${avatar}" alt="${esc(p.name)}" width="70" height="70">
    <h4>${esc(p.name)}</h4>
    <div>${esc(p.handle||'')}</div>
    <div>${esc(p.role||'')}</div>
    <p>${esc((p.bio||'').substring(0,140))}</p>
    ${links.twitter?`<a href="${links.twitter}">Twitter</a>`:''}
  </div>`;
}
function renderFriends(){
  return people.filter(p=> (p.tags||[]).map(t=>t.toLowerCase()).includes('friend'))
    .map(personCard).join('\n');
}
function renderCollabs(){
  return people.filter(p=> (p.tags||[]).map(t=>t.toLowerCase()).includes('collab'))
    .map(personCard).join('\n');
}

let html = fs.readFileSync('index.html','utf8');
html = replaceBetween(html, '<!-- POSTS_START -->', '<!-- POSTS_END -->', renderPosts());
html = replaceBetween(html, '<!-- SONGS_START -->', '<!-- SONGS_END -->', renderSongs());
html = replaceBetween(html, '<!-- FRIENDS_START -->', '<!-- FRIENDS_END -->', renderFriends());
html = replaceBetween(html, '<!-- COLLABS_START -->', '<!-- COLLABS_END -->', renderCollabs());

fs.writeFileSync('index.html', html);
console.log(`baked: ${songs.length} songs, ${posts.length} posts, ${people.length} people`);
