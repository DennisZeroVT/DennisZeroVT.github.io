const fs = require('fs');
const read = p => JSON.parse(fs.readFileSync(p,'utf8'));
const posts = read('data/posts.json');
const people = read('data/people.json');
const songs = read('data/songs.json');

const replace = (file, start, end, html) => {
  let src = fs.readFileSync(file,'utf8');
  src = src.replace(new RegExp(`${start}[\s\S]*?${end}`,'m'), `${start}\n${html}\n${end}`);
  fs.writeFileSync(file, src);
};

replace('blog.html','<!-- POSTS_START -->','<!-- POSTS_END -->',
  posts.map(p => `<article class="glass p-6 rounded-xl">
    <h2 class="text-2xl font-semibold mb-2">${p.title}</h2>
    <div class="text-sm text-[var(--text-secondary)] mb-3">${p.date} • ${p.category}${p.subcategory?' / '+p.subcategory:''}</div>
    ${p.blocks.map(b => b.type==='text'?`<p class="mb-3">${b.content.replace(/\n/g,'<br>')}</p>`: `<a href="${b.url}" target="_blank" class="text-[var(--accent)]">▶ Watch video</a>`).join('')}
  </article>`).join('\n')
);

replace('friends.html','<!-- FRIENDS_START -->','<!-- FRIENDS_END -->',
  people.map(f => `<div class="glass p-6 rounded-xl">
    <div class="flex gap-4">
      <img src="${f.avatar}" class="w-20 h-20 rounded-full object-cover">
      <div>
        <h3 class="text-xl font-semibold">${f.name} <span class="text-sm opacity-70">${f.handle}</span></h3>
        <p class="text-[var(--text-secondary)] text-sm mb-2">${f.role}</p>
        <p class="text-sm">${f.bio}</p>
      </div>
    </div>
  </div>`).join('\n')
);

replace('music.html','<!-- SONGS_START -->','<!-- SONGS_END -->',
  songs.map(s => `<div class="glass p-6 rounded-xl">
    <img src="${s.cover}" class="w-full rounded-lg mb-4">
    <h3 class="text-xl font-semibold">${s.coverEmoji||''} ${s.title} (${s.year})</h3>
    <p class="text-sm my-2">${s.about}</p>
    <div class="flex flex-wrap gap-2 text-xs mb-3">${s.badges.map(b=>`<span class="px-2 py-1 rounded font-medium" style="background:${b.bg};color:${b.fg}">${b.label}</span>`).join('')}</div>
    <audio controls src="${s.audio}" class="w-full"></audio>
  </div>`).join('\n')
);

replace('collabs.html','<!-- COLLABS_START -->','<!-- COLLABS_END -->','<p class="glass p-6 rounded-xl">Collabs coming soon.</p>');
console.log('built');
