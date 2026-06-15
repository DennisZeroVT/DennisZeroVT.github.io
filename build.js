const fs = require('fs');

function bake(file, startTag, endTag, content) {
  let html = fs.readFileSync(file, 'utf8');
  const re = new RegExp(`${startTag}[\s\S]*?${endTag}`, 'm');
  html = html.replace(re, `${startTag}\n${content}\n${endTag}`);
  fs.writeFileSync(file, html);
}

// --- MUSIC ---
const songs = JSON.parse(fs.readFileSync('data/songs.json','utf8'));
const musicCards = songs.map(s => {
  const badges = s.platforms.map(p => {
    const cls = p.status.toLowerCase();
    const href = p.url || '#';
    return `<a href="${href}" class="badge badge-${cls}" target="_blank" rel="noopener">${p.name} • ${p.status}</a>`;
  }).join('\n');
  return `
<div class="song-card">
  <img src="${s.cover}" alt="${s.title}" class="song-cover">
  <h3>${s.emoji ? s.emoji + ' ' : ''}${s.title} (${s.year})</h3>
  <p>${s.description}</p>
  <div class="badges">${badges}</div>
  <audio controls src="${s.audio}"></audio>
</div>`;
}).join('\n');

bake('music.html','<!-- MUSIC_START -->','<!-- MUSIC_END -->', musicCards);

// --- keep existing blog/friends/collabs if you have them ---
try {
  const posts = JSON.parse(fs.readFileSync('data/posts.json','utf8'));
  const blog = posts.map(p=>`<article><h2>${p.title}</h2><div class="meta">${p.date} • ${p.category}</div><p>${p.body}</p></article>`).join('\n');
  bake('blog.html','<!-- BLOG_START -->','<!-- BLOG_END -->', blog);
} catch(e){}

try {
  const people = JSON.parse(fs.readFileSync('data/people.json','utf8'));
  const friends = people.filter(p=>p.type==='friend').map(p=>`<div class="person"><h3>${p.name}</h3><p>${p.role}</p><p>${p.bio}</p></div>`).join('\n');
  bake('friends.html','<!-- FRIENDS_START -->','<!-- FRIENDS_END -->', friends);
} catch(e){}

console.log('Baked music + badges');
