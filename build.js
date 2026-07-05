const fs = require('fs');
const read = (p,f=[])=>{try{return JSON.parse(fs.readFileSync(p,'utf8'))}catch{return f}};
const songs=read('data/songs.json'), people=read('data/people.json'), posts=read('data/posts.json');
const esc=s=>String(s??'').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function replaceBetween(src,start,end,content){
  const i=src.indexOf(start), j=src.indexOf(end,i);
  if(i===-1||j===-1){console.warn('marker missing',start);return src}
  return src.slice(0,i+start.length)+'\n'+content+'\n'+src.slice(j);
}

function renderSongs(){
  return songs.map(s=>{
    const badges=(s.badges||[]).map(b=>{
      const l=typeof b==='string'?b:b.label, c=b.color||'#6B7280';
      return `<span style="background:${c}">${esc(l)}</span>`;
    }).join('');
    return `<div><img src="${s.cover}"><h3>${esc(s.title)} (${s.year})</h3><p>${esc(s.about||'')}</p>${badges}<audio controls src="${s.audio}"></audio></div>`;
  }).join('\n');
}

let html=fs.readFileSync('index.html','utf8');
html=replaceBetween(html,'<!-- SONGS_START -->','<!-- SONGS_END -->',renderSongs());
html=replaceBetween(html,'<!-- POSTS_START -->','<!-- POSTS_END -->',posts.map(p=>`<div>${esc(p.title)}</div>`).join(''));
html=replaceBetween(html,'<!-- FRIENDS_START -->','<!-- FRIENDS_END -->','');
html=replaceBetween(html,'<!-- COLLABS_START -->','<!-- COLLABS_END -->','');
fs.writeFileSync('index.html',html);
console.log('baked');
