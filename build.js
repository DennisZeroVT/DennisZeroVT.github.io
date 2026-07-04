const fs = require('fs');
const path = require('path');

const safeRead = (p, fallback = []) => {
  try {
    if (!fs.existsSync(p)) { console.warn(`Missing ${p}, using fallback`); return fallback; }
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    console.error(`Failed to read ${p}: ${e.message}`);
    return fallback;
  }
};

const esc = (s = '') => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

const posts = safeRead('data/posts.json');
const people = safeRead('data/people.json');
const songs = safeRead('data/songs.json');
const albums = safeRead('data/albums.json');
const categories = safeRead('data/categories.json');

const renderPosts = () => posts.map(p => {
  const blocks = (p.blocks||[]).map(b => {
    if (b.type === 'text') return `<p class="mb-3 leading-relaxed">${esc(b.content).replace(/\n/g,'<br>')}</p>`;
    if (b.type === 'video') return `<a href="${esc(b.url)}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-[#A596DA] hover:underline">Watch video</a>`;
    if (b.type === 'image') return `<img src="${esc(b.url)}" alt="" class="rounded-xl w-full my-3">`;
    return '';
  }).join('');
  return `<article class="glass p-6 rounded-2xl glow-hover"><h2 class="text-2xl font-semibold mb-2">${esc(p.title)}</h2><div class="text-sm text-[var(--text-secondary)] mb-3">${esc(p.date)} • ${esc(p.category)}${p.subcategory?' / '+esc(p.subcategory):''}</div><p class="text-sm text-[var(--text-secondary)] mb-4">${esc(p.excerpt||'')}</p>${blocks}</article>`;
}).join('\n');

const renderSongs = () => songs.map(s => {
  const badges = (s.badges||[]).map(b=>{const label=typeof b==='string'?b:b.label;const color=typeof b==='object'&&b.color?b.color:null;return color?`<span class="px-2 py-1 rounded-full text-xs font-medium text-white" style="background:${esc(color)}">${esc(label)}</span>`:`<span class="px-2 py-1 rounded-full text-xs bg-[rgba(165,150,218,0.15)] border border-[rgba(165,150,218,0.25)] text-[#C4B5FD]">${esc(label)}</span>`;}).join('');
  return `<div class="glass p-5 rounded-2xl glow-hover group">${s.cover ? `<img src="${esc(s.cover)}" alt="" class="w-full aspect-square object-cover rounded-xl mb-4">` : `<div class="w-full aspect-square rounded-xl mb-4 bg-gradient-to-br from-[#A596DA]/20 to-[#C4B5FD]/10 flex items-center justify-center text-4xl">${esc(s.coverEmoji||'🎵')}</div>`}<h3 class="font-semibold text-lg">${esc(s.coverEmoji||'')} ${esc(s.title)} <span class="opacity-60 text-sm">(${esc(s.year||'')})</span></h3><p class="text-sm text-[var(--text-secondary)] mb-2">${esc(s.artist||'DennisZeroVT')}</p><p class="text-sm mb-3">${esc(s.about||'')}</p><div class="flex flex-wrap gap-2 mb-3">${badges}</div>${s.audio ? `<audio controls src="${esc(s.audio)}" class="w-full mt-2"></audio>` : ''}</div>`;
}).join('\n');

const renderAlbums = () => albums.map(a => `<div class="glass p-5 rounded-2xl">${a.cover ? `<img src="${esc(a.cover)}" class="w-full rounded-xl mb-3">` : ''}<h3 class="font-semibold">${esc(a.title)}</h3><p class="text-sm text-[var(--text-secondary)]">${esc(a.year||'')} • ${(a.songs||[]).length} tracks</p></div>`).join('\n');

const renderPeople = (filter) => {
  const list = people.filter(p => { if (filter === 'friends') return (p.tags||[]).includes('friend') || p.type === 'friend' || !p.type; if (filter === 'collabs') return (p.tags||[]).includes('collab') || p.type === 'collab'; return true; });
  return list.map(f => `<div class="glass p-6 rounded-2xl glow-hover"><div class="flex gap-4 items-start"><img src="${esc(f.avatar||'/icons/pfp.png')}" alt="${esc(f.name)}" class="w-16 h-16 rounded-full object-cover border border-white/10"><div class="flex-1 min-w-0"><h3 class="font-semibold">${esc(f.name)} <span class="text-sm opacity-60">${esc(f.handle||'')}</span></h3><p class="text-xs text-[#A596DA] uppercase tracking-widest mt-1">${esc(f.role||'')}</p><p class="text-sm mt-2 text-[var(--text-secondary)]">${esc(f.bio||'')}</p></div></div></div>`).join('\n') || `<p class="glass p-6 rounded-xl text-sm">No ${filter} yet.</p>`;
};

const replaceSection = (file, start, end, html) => {
  let src = fs.readFileSync(file,'utf8');
  if (!src.includes(start) || !src.includes(end)) return false;
  const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const re = new RegExp(`${escRe(start)}[\\s\\S]*?${escRe(end)}`, 'm');
  const next = `${start}\n${html}\n${end}`;
  src = src.replace(re, next);
  fs.writeFileSync(file, src, 'utf8');
  return true;
};

const candidates = ['index.html','blog.html','music.html','friends.html','collabs.html','rhythm.html',...fs.readdirSync('.').filter(f=>f.startsWith('DennisZeroVT_optimized') && f.endsWith('.html'))].filter(f=>fs.existsSync(f));
if (candidates.length === 0) { console.error('No HTML files found'); process.exit(1); }
let baked = 0;
for (const file of candidates) {
  console.log(`Baking ${file}...`);
  const did = [replaceSection(file, '<!-- POSTS_START -->','<!-- POSTS_END -->',renderPosts()),replaceSection(file,'<!-- SONGS_START -->','<!-- SONGS_END -->',renderSongs()),replaceSection(file,'<!-- ALBUMS_START -->','<!-- ALBUMS_END -->',renderAlbums()),replaceSection(file,'<!-- FRIENDS_START -->','<!-- FRIENDS_END -->',renderPeople('friends')),replaceSection(file,'<!-- COLLABS_START -->','<!-- COLLABS_END -->',renderPeople('collabs')),replaceSection(file,'<!-- CATEGORIES_START -->','<!-- CATEGORIES_END -->',categories.map(c=>`<button class="px-3 py-1 rounded-full bg-white/5 text-sm">${esc(c)}</button>`).join('\n'))].filter(Boolean).length;
  console.log(` -> baked ${did} sections`); baked+=did;
}
console.log(`Done. Baked ${baked} sections across ${candidates.length} files.`);
