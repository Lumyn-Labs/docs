/* The book's ordered-dither field. Whole cells only; `cell` sets the size in CSS px (default 12). One canvas pixel is one cell.
   pattern="field"  the System-gradient wave, thinned out around [data-pixel-clear] text and around the drawn pixels of sprites.
   pattern="rise"   a sunset: the gradient glows up from the bottom edge and thins out toward the top.
   `animate` moves the wave slowly; it pauses offscreen and holds still with reduced motion.
   `extend` is a selector for an element below the host that the field continues over (the footer); `clear-also` is a
   selector for more elements to thin the field around.
   img[data-pixel-sprite] is sized to a whole number of cells, snapped onto the grid, and the field keeps clear of its
   opaque pixels (not its bounding box). */
const LUMYN_BAYER = [
  [0,32,8,40,2,34,10,42], [48,16,56,24,50,18,58,26],
  [12,44,4,36,14,46,6,38], [60,28,52,20,62,30,54,22],
  [3,35,11,43,1,33,9,41], [51,19,59,27,49,17,57,25],
  [15,47,7,39,13,45,5,37], [63,31,55,23,61,29,53,21],
];
const LUMYN_STOPS = [[255, 61, 236], [157, 0, 255], [30, 178, 204]];
const smooth = t => { t = Math.min(1, Math.max(0, t)); return t * t * (3 - 2 * t); };

class LumynPixels extends HTMLElement {
  connectedCallback() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.imageRendering = 'pixelated';
    this.replaceChildren(this.canvas);
    this.motion = matchMedia('(prefers-reduced-motion: reduce)');
    this.observer = new ResizeObserver(() => this.layout());
    this.observer.observe(this);
    this.watched().forEach(element => this.observer.observe(element));
    this.sprites().forEach(img => img.addEventListener('load', () => this.layout()));
    if (this.hasAttribute('animate')) {
      this.view = new IntersectionObserver(([entry]) => { this.visible = entry.isIntersecting; this.run(); });
      this.view.observe(this);
      this.motion.addEventListener('change', () => this.run());
    }
    document.fonts.ready.then(() => { if (this.isConnected) this.layout(); });
    // The footer is parsed after this element, so pick up the elements below it once the page has loaded.
    const settle = () => { if (this.isConnected) { this.watched().forEach(element => this.observer.observe(element)); this.layout(); } };
    if (document.readyState === 'complete') settle(); else addEventListener('load', settle, { once: true });
  }
  watched() { return [...this.parentElement.querySelectorAll('[data-pixel-clear]'), ...this.also(), ...this.below()]; }
  also() { const q = this.getAttribute('clear-also'); return q ? [...document.querySelectorAll(q)] : []; }
  below() { const q = this.getAttribute('extend'); const el = q && document.querySelector(q); return el ? [el] : []; }
  sprites() { return [...this.parentElement.querySelectorAll('[data-pixel-sprite]')].filter(sprite => !sprite.hidden); }
  disconnectedCallback() { this.observer.disconnect(); this.view?.disconnect(); cancelAnimationFrame(this.raf); }
  run() {
    cancelAnimationFrame(this.raf);
    if (!this.visible || this.motion.matches) { this.paint(0); return; }
    const step = now => { if (now - (this.last || 0) > 60) { this.last = now; this.paint(now / 1000); } this.raf = requestAnimationFrame(step); };
    this.raf = requestAnimationFrame(step);
  }
  // cell="4" or, to change with the viewport, cell="4 1360, 3 450, 2 0" (cell size, then the min-width it applies from).
  // sprite-cell optionally preserves the art's scale when the field uses larger pixels.
  cellSize(attribute = 'cell') {
    const list = (this.getAttribute(attribute) || this.getAttribute('cell') || '12').split(',').map(part => part.trim().split(/\s+/).map(Number));
    const hit = list.find(([, from]) => from === undefined || matchMedia(`(min-width: ${from}px)`).matches) || list[list.length - 1];
    return hit[0] || 12;
  }
  layout() {
    const cell = this.cellSize(), extra = this.below().reduce((sum, el) => sum + el.offsetHeight, 0);
    const cols = Math.floor(this.clientWidth / cell), rows = Math.floor((this.clientHeight + extra) / cell);
    this.cell = cell; this.cols = cols; this.rows = rows;
    if (!cols || !rows) return;
    this.canvas.width = cols;
    this.canvas.height = rows;
    this.canvas.style.width = `${cols * cell}px`;
    this.canvas.style.height = `${rows * cell}px`;
    this.image = new ImageData(cols, rows);
    this.pixels = new Uint32Array(this.image.data.buffer);
    this.colors = Uint32Array.from({ length: cols }, (_, x) => this.color(x / Math.max(1, cols - 1)));
    this.ramp = Uint32Array.from({ length: 256 }, (_, i) => this.color(i / 255));
    this.fitSprites();
    this.buildFade();
    this.paint(this.last ? this.last / 1000 : 0);
  }
  fitSprites() {
    const { cell } = this, spriteCell = this.cellSize('sprite-cell');
    this.sprites().forEach(img => {
      const art = img.naturalWidth || Number(img.getAttribute('width'));
      if (!art) return;
      img.style.translate = '';
      img.style.width = `${art * spriteCell}px`;
      img.closest('.lumyn-fan__card')?.style.setProperty('--art-h', `${(img.naturalHeight || Number(img.getAttribute('height'))) * spriteCell}px`);
      const at = img.getBoundingClientRect(), origin = this.getBoundingClientRect();
      const x = at.left - origin.left, y = at.top - origin.top;
      img.style.translate = `${Math.round(x / cell) * cell - x}px ${Math.round(y / cell) * cell - y}px`;
    });
  }
  // Distance (in cells) from every cell to the nearest marked cell, two-pass chamfer.
  distance(marked) {
    const { cols, rows } = this, out = new Float32Array(cols * rows).fill(1e9), D = 1.4142;
    for (let i = 0; i < out.length; i++) if (marked[i]) out[i] = 0;
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const i = y * cols + x; let d = out[i];
      if (x) d = Math.min(d, out[i - 1] + 1);
      if (y) { d = Math.min(d, out[i - cols] + 1); if (x) d = Math.min(d, out[i - cols - 1] + D); if (x < cols - 1) d = Math.min(d, out[i - cols + 1] + D); }
      out[i] = d;
    }
    for (let y = rows - 1; y >= 0; y--) for (let x = cols - 1; x >= 0; x--) {
      const i = y * cols + x; let d = out[i];
      if (x < cols - 1) d = Math.min(d, out[i + 1] + 1);
      if (y < rows - 1) { d = Math.min(d, out[i + cols] + 1); if (x < cols - 1) d = Math.min(d, out[i + cols + 1] + D); if (x) d = Math.min(d, out[i + cols - 1] + D); }
      out[i] = d;
    }
    return out;
  }
  mark(marked, left, top, right, bottom) {
    const { cell, cols, rows } = this;
    const x0 = Math.max(0, Math.floor(left / cell)), x1 = Math.min(cols - 1, Math.ceil(right / cell)), y0 = Math.max(0, Math.floor(top / cell)), y1 = Math.min(rows - 1, Math.ceil(bottom / cell));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) marked[y * cols + x] = 1;
  }
  buildFade() {
    this.fade = null;
    const { cell, cols, rows } = this, origin = this.getBoundingClientRect();
    const text = new Uint8Array(cols * rows), art = new Uint8Array(cols * rows);
    let anyText = false, anyArt = false;
    const targets = [...this.parentElement.querySelectorAll('[data-pixel-clear]'), ...this.also()];
    targets.forEach(element => {
      const range = document.createRange();
      range.selectNodeContents(element);
      const rects = element.matches('button, input, select, img, ul, .button, .lumyn-btn, .list-payment, .disclosure__button, .localization-selector') ? [element.getBoundingClientRect()] : [...range.getClientRects()];
      const padding = element.matches('.lumyn-btn') ? cell : 0;
      rects.filter(rect => rect.width && rect.height).forEach(rect => {
        this.mark(text, rect.left - origin.left - padding, rect.top - origin.top - padding, rect.right - origin.left + padding, rect.bottom - origin.top + padding); anyText = true;
      });
    });
    this.sprites().forEach(img => {
      const at = img.getBoundingClientRect(), x0 = Math.round((at.left - origin.left) / cell), y0 = Math.round((at.top - origin.top) / cell);
      try {
        const w = img.naturalWidth || img.width, h = img.naturalHeight || img.height, scratch = document.createElement('canvas');
        scratch.width = w; scratch.height = h;
        const ctx = scratch.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img.closest('lumyn-board')?.pixelMask || img, 0, 0);
        const alpha = ctx.getImageData(0, 0, w, h).data;
        const scaleX = at.width / w / cell, scaleY = at.height / h / cell;
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
          const gx = x0 + Math.floor(x * scaleX), gy = y0 + Math.floor(y * scaleY);
          if (alpha[(y * w + x) * 4 + 3] > 16 && gx >= 0 && gx < cols && gy >= 0 && gy < rows) art[gy * cols + gx] = 1;
        }
      } catch (error) {
        this.mark(art, at.left - origin.left, at.top - origin.top, at.right - origin.left, at.bottom - origin.top);   // tainted canvas: fall back to the box
      }
      anyArt = true;
    });
    if (!anyText && !anyArt) return;
    const rise = this.getAttribute('pattern') === 'rise', textSoft = rise ? 90 : cols * cell < 760 ? 40 : 72, floor = 0, artSoft = 36;
    const dt = anyText ? this.distance(text) : null, da = anyArt ? this.distance(art) : null;
    this.fade = new Float32Array(cols * rows);
    for (let i = 0; i < this.fade.length; i++) {
      const ft = dt ? floor + (1 - floor) * smooth(dt[i] * cell / textSoft) : 1, fa = da ? smooth((da[i] * cell - 4) / artSoft) : 1;
      this.fade[i] = Math.min(ft, fa);
    }
  }
  color(t) {
    const k = t < .6 ? t / .6 : (t - .6) / .4, [a, b] = t < .6 ? [LUMYN_STOPS[0], LUMYN_STOPS[1]] : [LUMYN_STOPS[1], LUMYN_STOPS[2]];
    const [r, g, bl] = a.map((value, i) => Math.round(value + (b[i] - value) * k));
    return (255 << 24) | (bl << 16) | (g << 8) | r;
  }
  paint(time) {
    const { cols, rows, pixels, colors, fade } = this;
    if (!cols || !rows || !pixels) return;
    const pattern = this.getAttribute('pattern'), drift = time * .35;
    pixels.fill(0);
    for (let y = 0; y < rows; y++) {
      const v = y / rows, row = LUMYN_BAYER[y & 7];
      for (let x = 0; x < cols; x++) {
        const t = x / Math.max(1, cols - 1);
        let density;
        if (pattern === 'rise') {
          // a sunset: nothing at the top, a smooth glow that thickens toward the bottom and ends in a solid horizon
          const base = Math.min(1, Math.max(0, (v - .04) / .96));
          density = Math.pow(base, 1.8) * .62 + smooth((v - .945) / .04) * .9 + .04 * Math.sin(t * 9 + drift) * base;
        } else {
          const u = t * 4.65 - drift;
          density = (.2 + .8 * smooth((Math.abs(2 * t - 1) - .25) / .6)) * Math.min(.8, Math.max(0, .5 + .8 * (Math.sin(3.2 * u + 2.2 * Math.sin(3 * v + .64 + drift * .6) - .4) * .9 + (.45 - v) * .5)));
        }
        if (pattern !== 'rise') density *= Math.pow(1 - smooth((v - .38) / .62), 1.4);   // dither out toward the bottom edge instead of ending on a line
        if (fade) density *= fade[y * cols + x];
        if ((row[x & 7] + .5) / 64 < density) {
          // sunset hue: hot at the horizon, purple above it, a little cyan only high and to the right
          pixels[y * cols + x] = pattern === 'rise' ? this.ramp[Math.min(255, Math.max(0, Math.round(((1 - v) * 1.0 + t * .2 - .04) * 255)))] : colors[x];
        }
      }
    }
    const context = this.canvas.getContext('2d');
    context.putImageData(this.image, 0, 0);
    // Keep a hard, whole-cell clearance around CTA boxes, independent of the soft text fade.
    const canvasRect = this.canvas.getBoundingClientRect();
    if (canvasRect.width && canvasRect.height) {
      const scaleX = cols / canvasRect.width, scaleY = rows / canvasRect.height;
      this.parentElement.querySelectorAll('.lumyn-btn[data-pixel-clear]').forEach(button => {
        const rect = button.getBoundingClientRect();
        const left = Math.floor((rect.left - canvasRect.left) * scaleX) - 2;
        const top = Math.floor((rect.top - canvasRect.top) * scaleY) - 2;
        const right = Math.ceil((rect.right - canvasRect.left) * scaleX) + 2;
        const bottom = Math.ceil((rect.bottom - canvasRect.top) * scaleY) + 2;
        context.clearRect(left, top, right - left, bottom - top);
      });
    }
  }
}
customElements.define('lumyn-pixels', LumynPixels);
