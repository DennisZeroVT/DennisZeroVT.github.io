// fill.js — reads from DATA (defined in data.js) and fills the page
// Loaded at end of <body> after data.js, so runs immediately — no DOMContentLoaded needed.

(function () {
  const d = (typeof DATA !== 'undefined') ? DATA : window.DATA;
  if (!d) { console.error('fill.js: DATA not found. Is data.js loaded before fill.js?'); return; }

  const fmt  = n  => (typeof n === 'number') ? n.toLocaleString('nl-NL') : (n || '');
  const set  = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  const secs = s  => { const h = Math.floor(s/3600), m = Math.floor((s%3600)/60); return h ? `${h}u ${m}m` : `${m}m`; };

  // ─── OSU! STANDARD ──────────────────────────────────────────────────────────
  if (d.osuStandard) {
    const o = d.osuStandard;
    set('osu-panel-rank',    '#' + fmt(o.rank));
    set('osu-panel-country', '#' + fmt(o.countryRank));
    set('osu-panel-pp',      fmt(o.pp) + 'pp');
    set('osu-panel-acc',     o.acc.toFixed(2) + '%');
    set('osu-panel-plays',   fmt(o.plays));
    set('osu-panel-time',    secs(o.seconds));
    set('osu-panel-ranked',  fmt(o.rankedScore));

    // Overview cards
    set('overview-std-rank', '#' + fmt(o.rank));
    set('overview-std-pp',   fmt(o.pp));
    set('overview-std-acc',  o.acc.toFixed(2) + '%');

    // Grade counts
    const og = o.grades || {};
    set('osu-panel-g-ss',  og.SS  ?? 0);
    set('osu-panel-g-ssh', og.SSH ?? 0);
    set('osu-panel-g-s',   og.S   ?? 0);
    set('osu-panel-g-sh',  og.SH  ?? 0);
    set('osu-panel-g-a',   og.A   ?? 0);

    // Grade bar
    const oBar = document.getElementById('osu-panel-grade-bar');
    if (oBar) {
      const total = (og.SS||0)+(og.SSH||0)+(og.S||0)+(og.SH||0)+(og.A||0) || 1;
      const colors = { SS:'#FF0099', SSH:'#FF0099', S:'#00BCD4', SH:'#00BCD4', A:'#8BC34A' };
      oBar.innerHTML = Object.entries(og).map(([g, n]) =>
        `<div style="width:${(n/total*100).toFixed(1)}%;background:${colors[g]||'#888'};height:100%"></div>`
      ).join('');
    }

    // Top 5
    const oTop = document.getElementById('osu-panel-top5');
    if (oTop && o.top5 && o.top5.length) {
      oTop.innerHTML = o.top5.map((t, i) => `
        <tr class="border-b border-white/5 last:border-0">
          <td class="py-2 pr-3 text-[#8a86a0] font-mono">${i+1}</td>
          <td class="py-2">
            <div class="font-semibold text-[13px] truncate max-w-[200px]">${t.title}</div>
            <div class="text-[11px] text-[#8a86a0]">${t.subtitle}</div>
          </td>
          <td class="py-2 text-right font-mono text-[#ff66aa]">${t.pp}pp</td>
          <td class="py-2 text-right font-mono text-[11px] text-[#8a86a0]">${t.acc.toFixed(2)}%</td>
          <td class="py-2 text-right pr-2">
            <span class="grade grade-${t.grade}">${t.grade}</span>
          </td>
        </tr>`).join('');
    }
  }

  // ─── OSU! MANIA ─────────────────────────────────────────────────────────────
  if (d.osuMania) {
    const m = d.osuMania;
    set('mania-panel-rank',    '#' + fmt(m.rank));
    set('mania-panel-country', '#' + fmt(m.countryRank));
    set('mania-panel-pp',      fmt(m.pp) + 'pp');
    set('mania-panel-acc',     m.acc.toFixed(2) + '%');
    set('mania-panel-plays',   fmt(m.plays));
    set('mania-panel-time',    secs(m.seconds));
    set('mania-panel-ranked',  fmt(m.rankedScore));

    // Overview cards
    set('overview-mania-rank', '#' + fmt(m.rank));
    set('overview-mania-pp',   fmt(m.pp));
    set('overview-mania-acc',  m.acc.toFixed(2) + '%');

    const mg = m.grades || {};
    set('mania-panel-g-ss',  mg.SS  ?? 0);
    set('mania-panel-g-ssh', mg.SSH ?? 0);
    set('mania-panel-g-s',   mg.S   ?? 0);
    set('mania-panel-g-sh',  mg.SH  ?? 0);
    set('mania-panel-g-a',   mg.A   ?? 0);

    const mBar = document.getElementById('mania-panel-grade-bar');
    if (mBar) {
      const total = (mg.SS||0)+(mg.SSH||0)+(mg.S||0)+(mg.SH||0)+(mg.A||0) || 1;
      const colors = { SS:'#FF0099', SSH:'#FF0099', S:'#00BCD4', SH:'#00BCD4', A:'#8BC34A' };
      mBar.innerHTML = Object.entries(mg).map(([g, n]) =>
        `<div style="width:${(n/total*100).toFixed(1)}%;background:${colors[g]||'#888'};height:100%"></div>`
      ).join('');
    }

    const mTop = document.getElementById('mania-panel-top5');
    if (mTop && m.top5 && m.top5.length) {
      mTop.innerHTML = m.top5.map((t, i) => `
        <tr class="border-b border-white/5 last:border-0">
          <td class="py-2 pr-3 text-[#8a86a0] font-mono">${i+1}</td>
          <td class="py-2">
            <div class="font-semibold text-[13px] truncate max-w-[200px]">${t.title}</div>
            <div class="text-[11px] text-[#8a86a0]">${t.subtitle}</div>
          </td>
          <td class="py-2 text-right font-mono text-[#8f7fff]">${t.pp}pp</td>
          <td class="py-2 text-right font-mono text-[11px] text-[#8a86a0]">${t.acc.toFixed(2)}%</td>
          <td class="py-2 text-right pr-2">
            <span class="grade grade-${t.grade}">${t.grade}</span>
          </td>
        </tr>`).join('');
    }
  }

  // ─── ETTERNA ────────────────────────────────────────────────────────────────
  if (d.etterna) {
    const e  = d.etterna;
    const ss = e.skillsets || {};

    set('etterna-username', e.username || '');
    set('etterna-rank',     '#' + fmt(e.rank));
    set('etterna-since',    `Speler sinds ${e.since} • tech & stamina training.`);
    set('etterna-overall',  (e.overall || 0).toFixed(2));

    // Overview cards
    set('overview-etterna-rank', '#' + fmt(e.rank));
    set('overview-etterna-overall', (e.overall || 0).toFixed(2));
    set('etterna-stream',      (ss.stream      || 0).toFixed(2));
    set('etterna-jumpstream',  (ss.jumpstream  || 0).toFixed(2));
    set('etterna-handstream',  (ss.handstream  || 0).toFixed(2));
    set('etterna-jacks',       (ss.jacks       || 0).toFixed(2));
    set('etterna-chordjacks',  (ss.chordjacks  || 0).toFixed(2));
    set('etterna-stamina',     (ss.stamina     || 0).toFixed(2));
    set('etterna-technical',   (ss.technical   || 0).toFixed(2));

    // Skill bars (MSD max = 12)
    const maxSkill = 12;
    const skillColors = {
      overall: '#8B7AB8',
      stream: '#8B7AB8',
      jumpstream: '#7A6AA5',
      handstream: '#9D6BA5',
      jacks: '#D68BCB',
      chordjacks: '#7A9BAA',
      stamina: '#8ED1B0',
      technical: '#B8D0D8'
    };
    const bar = (id, val) => {
      const el = document.getElementById('etterna-bar-' + id);
      if (el) {
        el.style.width = Math.min(100, (val / maxSkill) * 100) + '%';
        el.style.backgroundColor = skillColors[id] || '#FFD700';
      }
    };
    bar('overall',    e.overall      || 0);
    bar('stream',     ss.stream      || 0);
    bar('jumpstream', ss.jumpstream  || 0);
    bar('handstream', ss.handstream  || 0);
    bar('jacks',      ss.jacks       || 0);
    bar('chordjacks', ss.chordjacks  || 0);
    bar('stamina',    ss.stamina     || 0);
    bar('technical',  ss.technical   || 0);

    // Grades
    const g = e.grades || {};
    const gradeMap = { aaaa:'AAAA', aaa:'AAA', aa:'AA', a:'A', b:'B', c:'C', d:'D' };
    Object.entries(gradeMap).forEach(([id, key]) => {
      const el = document.getElementById('etterna-g-' + id);
      if (el) el.textContent = g[key] ?? 0;
    });

    // Grade bar
    const eBar = document.getElementById('etterna-panel-grade-bar');
    if (eBar) {
      const total = Object.values(g).reduce((a, b) => a + b, 0) || 1;
      const colors = { AAAA:'#ffffff', AAA:'#FFD700', AA:'#22C55E', A:'#ef4444', B:'#3B82F6', C:'#8F7FFF', D:'#A16207' };
      eBar.innerHTML = Object.entries(g).map(([key, n]) =>
        `<div style="width:${(n/total*100).toFixed(1)}%;background:${colors[key]||'#555'};height:100%"></div>`
      ).join('');
    }

    // Top 10
    const etb = document.getElementById('etterna-top10');
    if (etb && e.top10) {
      etb.innerHTML = e.top10.map((t, i) => `
        <tr class="border-b border-white/5 last:border-0">
          <td class="py-2 text-[#8a86a0]">${i+1}</td>
          <td class="py-2">
            <div class="font-medium truncate max-w-[140px]">${t.song}</div>
            <div class="text-[10px] text-[#8a86a0]">${t.artist}</div>
          </td>
          <td class="py-2 text-right font-mono">${t.msd.toFixed(2)}</td>
          <td class="py-2 text-right font-mono pr-2">${t.acc.toFixed(2)}%</td>
        </tr>`).join('');
    }
  }

  // ─── FFR ────────────────────────────────────────────────────────────────────
  if (d.ffr) {
    const f = d.ffr;

    set('ffr-username', f.username);
    set('ffr-rank',     '#' + fmt(f.rank));
    // fix duplicate id="ffr-rank" (overview + panel) - update all instances
    document.querySelectorAll('#ffr-rank').forEach(el => el.textContent = '#' + fmt(f.rank));
    set('ffr-avg-rank', fmt(f.avgRank));
    set('ffr-skill',    'Lv.' + f.skillRating.toFixed(2));
    set('ffr-global',   `#${fmt(f.globalRank)} global • #${f.countryRankNL} NL`);
    set('ffr-since',    `Speler sinds ${f.since || ''} • classic 4K arrow smashing.`);

    // FFR specific IDs from the overview panel
    set('ffr-skillRating', 'Lv.' + f.skillRating.toFixed(2));
    set('ffr-rating',      'Skill Rating');
    set('ffr-nl',          '#' + f.countryRankNL);

    // Overview cards (FFR uses same IDs in overview)
    set('ffr-skillRating', 'Lv.' + f.skillRating.toFixed(2));

    // Top 10
    const ftb = document.getElementById('ffr-top10');
    if (ftb && f.top10) {
      ftb.innerHTML = f.top10.map((t, i) => `
        <tr class="border-b border-white/5 last:border-0">
          <td class="py-2 text-[#8a86a0]">${i+1}</td>
          <td class="py-2">
            <div class="truncate max-w-[120px]">${t.song}</div>
            <div class="text-[10px] text-[#8a86a0]">${t.artist}</div>
          </td>
          <td class="py-2 text-right font-mono">${t.level}</td>
          <td class="py-2 text-right font-mono pr-1">${t.score.toLocaleString('nl-NL')}</td>
        </tr>`).join('');
    }

    // Remaining stats in panel-ffr via innerHTML replace (for hardcoded text nodes)
    const panel = document.getElementById('panel-ffr');
    if (panel) {
      panel.innerHTML = panel.innerHTML
        .replace(/Tier Points:\s*<\/span>\s*\d+/,  `Tier Points:</span> ${f.tierPoints}`)
        .replace(/\(#[\d,]+\)\s*(?=.*tierPoints|.*33)/g, `(#${fmt(f.tierPointsRank)})`)
        .replace(/Lv\.[\d.]+(?=.*top5)/,            `Lv.${f.top5Avg.toFixed(2)}`)
        .replace(/Lv\.[\d.]+(?=.*top100)/,          `Lv.${f.top100Avg.toFixed(2)}`)
        .replace(/Games:\s*<\/span>\s*\d+/,         `Games:</span> ${f.games}`)
        .replace(/[\d,]{7,}/,                        fmt(f.grandTotal))
        .replace(/\(#249[,\d]+\)/,                  `(#${fmt(f.grandTotalRank)})`)
        .replace(/\d{4}-\d{2}-\d{2}/,               f.lastPlayed);
    }
  }

  console.log('fill.js: done ✓');
})();