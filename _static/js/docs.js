(() => {
  const LANGS = { python: 'Python', java: 'Java', cpp: 'C++', c: 'C', json: 'JSON', bash: 'Shell', shell: 'Shell', console: 'Shell', text: 'Text', yaml: 'YAML', xml: 'XML', toml: 'TOML', 'pycon': 'Python', default: 'Code' };
  const copy = async (text, btn) => {
    try { await navigator.clipboard.writeText(text); btn.textContent = 'Copied'; }
    catch { const r = document.createRange(); r.selectNodeContents(btn.closest('.lumyn-code').querySelector('pre')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = 'Selected'; }
    btn.dataset.done = '1'; setTimeout(() => { btn.textContent = 'Copy'; delete btn.dataset.done; }, 1600);
  };
  // 1. Code blocks: language label + copy
  document.querySelectorAll('article div[class*="highlight-"]').forEach((box) => {
    const m = box.className.match(/highlight-(\S+)/); const key = m ? m[1].toLowerCase() : 'default';
    const bar = document.createElement('div'); bar.className = 'lumyn-code__bar';
    const lang = document.createElement('span'); lang.className = 'lumyn-code__lang'; lang.textContent = LANGS[key] || key;
    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'lumyn-code__copy'; btn.textContent = 'Copy'; btn.setAttribute('aria-label', 'Copy code to clipboard');
    btn.addEventListener('click', () => copy(box.querySelector('pre').innerText.replace(/\n$/, ''), btn));
    bar.append(lang, btn); box.classList.add('lumyn-code'); box.prepend(bar);
  });
  // 2. Search hotkeys
  const search = document.querySelector('.lumyn-topbar__search input.sidebar-search');
  if (search) {
    const hint = document.createElement('span'); hint.className = 'lumyn-kbd'; hint.textContent = /Mac/.test(navigator.platform) ? '⌘K' : 'Ctrl K';
    search.parentElement.style.position = 'relative'; search.parentElement.append(hint);
    search.addEventListener('focus', () => hint.hidden = true); search.addEventListener('blur', () => hint.hidden = false);
    addEventListener('keydown', (e) => {
      const typing = /input|textarea|select/i.test(document.activeElement?.tagName);
      if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') || (e.key === '/' && !typing)) { e.preventDefault(); search.focus(); search.select(); }
    });
  }
  // 3. On this page: progress readout, moving marker, actions
  const tocs = document.querySelector('.toc-sticky');
  const art = document.querySelector('article');
  if (tocs && art) {
    const title = tocs.querySelector('.toc-title-container');
    const pct = document.createElement('span'); pct.className = 'lumyn-toc__pct'; title.append(pct);
    const prog = document.createElement('div'); prog.className = 'lumyn-toc__progress'; prog.innerHTML = '<i></i>'; title.after(prog);
    const tree = tocs.querySelector('.toc-tree'); const mark = document.createElement('i'); mark.className = 'lumyn-toc__mark'; tree.append(mark);
    const acts = document.createElement('div'); acts.className = 'lumyn-toc__actions';
    acts.innerHTML = '<button type="button" data-a="top">Back to top ↑</button><button type="button" data-a="link">Copy link</button><a href="https://github.com/Lumyn-Labs" rel="noopener">Report an issue ↗</a>';
    tocs.querySelector('.toc-tree-container').after(acts);
    acts.addEventListener('click', (e) => { const a = e.target.dataset?.a; if (a === 'top') scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); if (a === 'link') { navigator.clipboard?.writeText(location.href).then(() => { e.target.textContent = 'Copied'; setTimeout(() => e.target.textContent = 'Copy link', 1600); }, () => {}); } });
    const bar = prog.firstChild;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight; const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      bar.style.transform = `scaleX(${p})`; pct.textContent = Math.round(p * 100) + '%';
      const cur = tree.querySelector('li.scroll-current > a, li.current > a');
      if (cur) { const tr = tree.getBoundingClientRect(), r = cur.getBoundingClientRect(); mark.style.transform = `translateY(${r.top - tr.top}px)`; mark.style.height = r.height + 'px'; mark.style.opacity = 1;
        const box = tocs.getBoundingClientRect(); if (r.top < box.top + 80 || r.bottom > box.bottom - 80) cur.scrollIntoView({ block: 'center' }); }
    };
    let q = 0; const tick = () => { cancelAnimationFrame(q); q = requestAnimationFrame(update); };
    addEventListener('scroll', tick, { passive: true }); addEventListener('resize', tick); tick(); setTimeout(tick, 300);
  }
})();
