(function () {
  const R = window.ROADMAP;
  const KEY = "ai-roadmap-progress-v1";
  const DAY = 24 * 60 * 60 * 1000;
  const TRACK_KEYS = ["dsa", "sd", "build", "talk"];

  let state = load();
  const openWeeks = new Set();

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && typeof s === "object" && s.done) {
        return { done: s.done || {}, activity: s.activity || {}, reviews: s.reviews || {}, log: s.log || {} };
      }
    } catch (e) { /* fall through to a fresh state */ }
    return { done: {}, activity: {}, reviews: {}, log: {} };
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

  function parseDate(iso) { const [y, m, d] = iso.split("-").map(Number); return new Date(y, m - 1, d); }
  function today() { const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); }
  function isoOf(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function fmt(d) { return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }); }
  function weekRange(w) { const s = parseDate(w.start); return fmt(s) + " to " + fmt(new Date(s.getTime() + 6 * DAY)); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function rich(s) { return esc(s).replace(/`([^`]+)`/g, "<code>$1</code>"); }

  function nightId(w, i, k) { return "w" + w.n + "-n" + i + "-" + k; }
  function satId(w, j) { return "w" + w.n + "-sat" + j; }
  function sunId(w) { return "w" + w.n + "-sun"; }

  function weekTaskIds(w) {
    const ids = [];
    w.nights.forEach((night, i) => TRACK_KEYS.forEach(k => ids.push(nightId(w, i, k))));
    w.sat.forEach((_, j) => ids.push(satId(w, j)));
    ids.push(sunId(w));
    return ids;
  }
  function allTaskIds() { return R.weeks.flatMap(weekTaskIds); }
  function pct(ids) { return ids.length ? Math.round(100 * ids.filter(id => state.done[id]).length / ids.length) : 0; }

  function currentWeek() {
    const t = today();
    for (const w of R.weeks) {
      const s = parseDate(w.start);
      if (t >= s && t < new Date(s.getTime() + 7 * DAY)) return w;
    }
    return t < parseDate(R.weeks[0].start) ? R.weeks[0] : R.weeks[R.weeks.length - 1];
  }

  function checkbox(id, text, tagKey) {
    const done = !!state.done[id];
    const tag = tagKey ? '<span class="tag" style="color:' + R.tracks[tagKey].color + '">' +
      esc(R.tracks[tagKey].label) + " · " + R.tracks[tagKey].minutes + " min</span>" : "";
    return tag + '<label class="task' + (done ? " done" : "") + '"><input type="checkbox" data-id="' + id + '"' +
      (done ? " checked" : "") + "><span>" + rich(text) + "</span></label>";
  }

  function renderHeader() {
    document.getElementById("title").textContent = R.title;
    document.getElementById("subtitle").textContent = R.subtitle;
    const overall = pct(allTaskIds());
    document.getElementById("stat-overall").textContent = overall + "%";
    document.getElementById("bar-overall").style.width = overall + "%";
    const w = currentWeek();
    document.getElementById("stat-week").textContent = "Week " + w.n;
    const days = Math.max(0, Math.ceil((parseDate(R.readyDate) - today()) / DAY));
    document.getElementById("stat-days").textContent = days;

    const dots = [];
    let active = 0;
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today().getTime() - i * DAY);
      const on = (state.activity[isoOf(d)] || 0) > 0;
      if (on) active++;
      dots.push('<span class="dot' + (on ? " on" : "") + (i === 0 ? " today" : "") + '" title="' + fmt(d) + '"></span>');
    }
    document.getElementById("activity").innerHTML = dots.join("");
    document.getElementById("stat-active").textContent = active;
  }

  function renderTonight() {
    const w = currentWeek();
    const dow = today().getDay();
    const nightIdx = w.nights.findIndex((night, i) => TRACK_KEYS.some(k => !state.done[nightId(w, i, k)]));
    const behind = R.weeks.filter(x => x.n < w.n && weekTaskIds(x).some(id => !state.done[id]));

    let html = "<h2>Week " + w.n + ": " + esc(w.title) + "</h2>";
    html += '<p class="muted">' + weekRange(w) + (w.checkpoint ? ' · <span class="pill cp">' + esc(w.checkpoint) + "</span>" : "") + "</p>";

    if (behind.length) {
      html += '<div class="callout warn">Open tasks in earlier weeks: ' +
        behind.map(x => "Week " + x.n).join(", ") +
        ". Use Saturday's catch-up block for them. Never miss twice; it's fine to slide.</div>";
    }
    if (dow === 5) html += '<div class="callout good">Friday is off. Only catch up if you are behind, for 1 hour at most.</div>';

    if (dow === 6 || dow === 0 || nightIdx === -1) {
      html += "<h3>Weekend</h3>";
      html += '<div class="cols2"><div class="card"><strong>Saturday, 10:00 to 12:00</strong>' +
        w.sat.map((t, j) => checkbox(satId(w, j), t)).join("") + "</div>";
      html += '<div class="card"><strong>Sunday, 45 minutes</strong>' +
        checkbox(sunId(w), "Weekly review: tick the week, write 3 lines, choose one tweak (fill it in under All weeks)") + "</div></div>";
    }

    if (nightIdx !== -1) {
      const night = w.nights[nightIdx];
      html += "<h3>Night " + (nightIdx + 1) + " of 4</h3>";
      html += '<div class="callout">Too tired tonight? Do the <strong>minimum day</strong>: Block 1 and the shut-down note. That still counts.</div>';
      const todayIso = isoOf(today());
      const prevDate = Object.keys(state.log).filter(d => d < todayIso && state.log[d].next).sort().pop();
      const todayLog = state.log[todayIso] || {};
      html += '<ul class="timeline">' + R.evening.map((b, i) => {
        let what = esc(b.text);
        if (i === 0) {
          what += prevDate
            ? '<div class="callout good"><strong>Your next step from ' + fmt(parseDate(prevDate)) + ":</strong> " + esc(state.log[prevDate].next) + "</div>"
            : '<div class="callout small">No note yet. Tonight, write one at 9:50 in the shut-down box below.</div>';
        }
        if (TRACK_KEYS.includes(b.kind)) what += checkbox(nightId(w, nightIdx, b.kind), night[b.kind]);
        if (b.kind === "ritual" && b.time.startsWith("9:50")) {
          what += '<div class="review" style="margin-top:8px">' +
            '<div><label>3 lines: what I did, what was hard, what I learned</label><textarea data-log="' + todayIso + '" data-field="lines">' + esc(todayLog.lines || "") + "</textarea></div>" +
            '<div><label>Tomorrow\'s first step (be specific)</label><textarea data-log="' + todayIso + '" data-field="next">' + esc(todayLog.next || "") + "</textarea></div></div>";
        }
        return '<li class="' + b.kind + '"><span class="t">' + esc(b.time) + '</span><div class="what">' + what + "</div></li>";
      }).join("") + "</ul>";
    } else {
      html += '<div class="callout good">All 4 study nights for this week are done.</div>';
    }

    html += '<div class="callout"><strong>At work this week (office hours, not study time):</strong> ' + esc(w.work) + "</div>";
    document.getElementById("tonight").innerHTML = html;
  }

  function renderWeeks() {
    const cw = currentWeek();
    if (openWeeks.size === 0) openWeeks.add(cw.n);
    const html = R.weeks.map(w => {
      const p = pct(weekTaskIds(w));
      const firstOpen = w.nights.findIndex((night, i) => TRACK_KEYS.some(k => !state.done[nightId(w, i, k)]));
      const nights = w.nights.map((night, i) =>
        '<div class="card night' + (w.n === cw.n && i === firstOpen ? " current" : "") + '"><h4>Night ' + (i + 1) + "</h4>" +
        TRACK_KEYS.map(k => checkbox(nightId(w, i, k), night[k], k)).join("") + "</div>").join("");
      const rv = state.reviews["w" + w.n] || {};
      const field = (key, label) => '<div><label>' + label + '</label><textarea data-review="w' + w.n + '" data-field="' + key + '">' +
        esc(rv[key] || "") + "</textarea></div>";
      return '<details class="week" data-week="' + w.n + '"' + (openWeeks.has(w.n) ? " open" : "") + ">" +
        "<summary><div><div class=\"wk-title\">Week " + w.n + ": " + esc(w.title) +
        (w.n === cw.n ? ' <span class="pill">now</span>' : "") + (w.checkpoint ? ' <span class="pill cp">checkpoint</span>' : "") +
        '</div><div class="wk-meta">' + weekRange(w) + '</div></div><div class="wk-prog">' + p + '% done<div class="bar"><div class="fill" style="width:' + p + '%"></div></div></div></summary>' +
        '<div class="body">' + (w.checkpoint ? '<div class="callout warn">' + esc(w.checkpoint) + "</div>" : "") +
        '<div class="nights">' + nights + "</div>" +
        '<div class="cols2"><div class="card"><strong>Saturday, 10:00 to 12:00</strong>' + w.sat.map((t, j) => checkbox(satId(w, j), t)).join("") + "</div>" +
        '<div class="card"><strong>Sunday, 45 minutes</strong>' + checkbox(sunId(w), "Weekly review done") +
        '<div class="review">' + field("worked", "What worked") + field("didnt", "What didn't") + field("next", "What's next") + field("tweak", "One tweak to the routine") + "</div></div></div>" +
        '<div class="callout small"><strong>At work:</strong> ' + esc(w.work) + "</div></div></details>";
    }).join("");
    document.getElementById("weeks").innerHTML = "<h2>All weeks</h2><p class=\"muted\">Night tasks slide. If you miss a night, do it on the next one.</p>" + html;
  }

  function renderTracks() {
    const rows = TRACK_KEYS.map(k => {
      const ids = R.weeks.flatMap(w => w.nights.map((n, i) => nightId(w, i, k)));
      const p = pct(ids);
      const done = ids.filter(id => state.done[id]).length;
      return '<div class="trackrow"><strong style="color:' + R.tracks[k].color + '">' + esc(R.tracks[k].label) + "</strong>" +
        '<div class="bar"><div class="fill" style="width:' + p + "%;background:" + R.tracks[k].color + '"></div></div><span class="muted">' + done + " / " + ids.length + "</span></div>";
    });
    const weekend = R.weeks.flatMap(w => w.sat.map((_, j) => satId(w, j)).concat([sunId(w)]));
    const wp = pct(weekend);
    rows.push('<div class="trackrow"><strong>Weekend</strong><div class="bar"><div class="fill" style="width:' + wp + '%"></div></div><span class="muted">' +
      weekend.filter(id => state.done[id]).length + " / " + weekend.length + "</span></div>");

    const nightMin = TRACK_KEYS.reduce((a, k) => a + R.tracks[k].minutes, 0);
    const html = "<h2>Tracks</h2>" + '<div class="card">' + rows.join("") + "</div>" +
      "<h3>Hours per week</h3>" +
      '<div class="card"><p>Each study night has <strong>' + Math.floor(nightMin / 60) + " h " + (nightMin % 60) + " min</strong> of focused blocks, plus 20 minutes of start and shut-down rituals.</p>" +
      "<ul><li>4 nights: about 15 hours</li><li>Saturday: 2 hours</li><li>Sunday review: 45 minutes</li></ul>" +
      '<p class="muted small">Per week: DSA 2 h, system design 4 h 40 min, AI project 5 h, say it out loud 2 h, plus Saturday SQL or a mock.</p></div>';
    document.getElementById("tracks").innerHTML = html;
  }

  function renderRoutine() {
    const html = "<h2>Routine and rules</h2>" +
      "<h3>A study night, 5:00 to 10:00</h3>" +
      '<div class="card"><ul class="timeline">' + R.evening.map(b =>
        '<li class="' + b.kind + '"><span class="t">' + esc(b.time) + '</span><div class="what">' + esc(b.text) + "</div></li>").join("") + "</ul></div>" +
      "<h3>The week</h3>" +
      '<div class="card"><ul class="timeline">' + R.weekShape.map(d =>
        '<li><span class="t">' + esc(d.day) + '</span><div class="what">' + esc(d.text) + "</div></li>").join("") + "</ul></div>" +
      "<h3>Kaizen rules</h3>" +
      '<div class="card"><ol class="rules">' + R.rules.map(r => "<li><strong>" + esc(r[0]) + "</strong> " + esc(r[1]) + "</li>").join("") + "</ol></div>";
    document.getElementById("routine").innerHTML = html;
  }

  function renderAll() { renderHeader(); renderTonight(); renderWeeks(); renderTracks(); renderRoutine(); }

  document.addEventListener("change", e => {
    const id = e.target.dataset && e.target.dataset.id;
    if (!id) return;
    if (e.target.checked) {
      state.done[id] = true;
      const t = isoOf(today());
      state.activity[t] = (state.activity[t] || 0) + 1;
    } else {
      delete state.done[id];
    }
    save();
    renderAll();
  });

  document.addEventListener("input", e => {
    const ds = e.target.dataset || {};
    if (ds.review) {
      state.reviews[ds.review] = state.reviews[ds.review] || {};
      state.reviews[ds.review][ds.field] = e.target.value;
    } else if (ds.log) {
      state.log[ds.log] = state.log[ds.log] || {};
      state.log[ds.log][ds.field] = e.target.value;
      if (e.target.value.trim()) state.activity[ds.log] = Math.max(1, state.activity[ds.log] || 0);
    } else {
      return;
    }
    save();
  });

  document.addEventListener("toggle", e => {
    const n = e.target.dataset && e.target.dataset.week;
    if (!n) return;
    if (e.target.open) openWeeks.add(Number(n)); else openWeeks.delete(Number(n));
  }, true);

  function showTab(name) {
    document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.tab === name));
    document.querySelectorAll(".panel").forEach(p => p.classList.toggle("active", p.id === name));
  }
  document.querySelectorAll(".tab").forEach(btn => btn.addEventListener("click", () => {
    showTab(btn.dataset.tab);
    history.replaceState(null, "", "#" + btn.dataset.tab);
  }));
  const startTab = location.hash.slice(1);
  if (document.getElementById(startTab) && document.querySelector('.tab[data-tab="' + startTab + '"]')) showTab(startTab);

  document.getElementById("btn-export").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "roadmap-progress-" + isoOf(today()) + ".json";
    a.click();
    URL.revokeObjectURL(a.href);
  });

  document.getElementById("file-import").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    file.text().then(txt => {
      const s = JSON.parse(txt);
      if (!s || typeof s.done !== "object") throw new Error("Not a progress file");
      state = { done: s.done, activity: s.activity || {}, reviews: s.reviews || {}, log: s.log || {} };
      save();
      renderAll();
    }).catch(err => alert("Import failed: " + err.message));
    e.target.value = "";
  });

  document.getElementById("btn-reset").addEventListener("click", () => {
    if (!confirm("Delete all progress in this browser?")) return;
    state = { done: {}, activity: {}, reviews: {}, log: {} };
    save();
    renderAll();
  });

  renderAll();
})();
