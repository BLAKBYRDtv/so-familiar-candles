(function () {
  /* Where orders go when there's no order server. Put her email here, e.g. 'name@gmail.com'.
     Left empty, customers are asked to send their order by Instagram message instead. */
  var ORDER_EMAIL = 'Sofamiliarcandles@yahoo.com';

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---------------- Sizes ---------------- */
  var SIZES = [
    { id: '9', name: '9 oz', note: 'single wick, about 50 hours', add: 0 },
    { id: '16', name: '16 oz large', note: 'double wick, about 90 hours', add: 14 },
    { id: '26', name: '26 oz 3-wick', note: 'about 120 hours', add: 28 }
  ];

  /* ---------------- Catalog ---------------- */
  var COLLECTIONS = [
    { id: 'holiday', name: 'Holiday', color: 'var(--c-holiday)', img: 'img/banner-holiday.jpg', line: 'Fir, cranberry and warm spice for the season you wait all year for.' },
    { id: 'thanks', name: 'Thanksgiving', color: 'var(--c-thanks)', img: 'img/banner-thanks.jpg', line: 'For the long table, the full house and everybody coming home.' },
    { id: 'newyear', name: 'New Year & Spirit', color: 'var(--c-newyear)', img: 'img/banner-newyear.jpg', line: 'Light one for your intentions, your prayers and the year ahead.' },
    { id: 'memory', name: 'In Loving Memory', color: 'var(--c-memory)', img: 'img/banner-memory.jpg', line: 'A gentle light for the ones we carry with us. Personalized with their name.' },
    { id: 'game', name: 'Game Day', color: 'var(--c-game)', img: 'img/banner-game.jpg', line: 'Sunday kickoff, opening day, the whole crew on the couch. Your team, your colors.' },
    { id: 'everyday', name: 'Everyday', color: 'var(--c-everyday)', img: 'img/banner-everyday.jpg', line: 'For a slow night in, a hard week, or no reason at all.' }
  ];

  /* img = her real product photo. label = her amber jar photo with this label design. */
  var PRODUCTS = [
    { id: 'wreath', c: 'holiday', name: 'Evergreen Wreath', notes: 'Balsam fir, cedar and sugared cranberry', price: 32, img: 'img/wreath.jpg' },
    { id: 'seasons', c: 'holiday', name: 'Seasons Greetings', notes: 'Spruce, vanilla bean and fresh snow', price: 32, img: 'img/seasons.jpg' },
    { id: 'bow', c: 'holiday', name: 'Candy Cane Bow', notes: 'Peppermint and sweet cream', price: 32, img: 'img/bow.jpg' },
    { id: 'silent', c: 'holiday', name: 'Silent Night', notes: 'Frankincense, myrrh and warm amber', price: 30, label: { main: 'Silent Night', sub: 'frankincense & myrrh', color: '#1F2E6B', accent: '#B8283C' }, badge: 'New' },

    { id: 'gather', c: 'thanks', name: 'Gather', notes: 'Pumpkin, clove and brown butter', price: 30, label: { main: 'Gather', sub: 'pumpkin & clove', color: '#8A4A1C', bg: 'kraft' }, badge: 'New' },
    { id: 'grateful', c: 'thanks', name: 'Grateful', notes: 'Apple cider and cinnamon stick', price: 30, label: { main: 'Grateful', sub: 'apple cider & cinnamon', color: '#9A6A2A' }, badge: 'New' },
    { id: 'harvest', c: 'thanks', name: 'Harvest Table', notes: 'Maple, toasted pecan and sweet potato pie', price: 30, label: { main: 'Harvest', sub: 'maple & toasted pecan', color: '#3A2414', style: 'classic', bg: 'kraft' }, badge: 'New' },

    { id: 'breathe', c: 'newyear', name: 'Breathe', notes: 'Eucalyptus, spearmint and sea salt', price: 30, img: 'img/breathe.jpg' },
    { id: 'breathe2', c: 'newyear', name: 'Breathe, set of two', notes: 'Eucalyptus, spearmint and sea salt', price: 54, img: 'img/breathe-pair.jpg' },
    { id: 'mercies', c: 'newyear', name: 'New Mercies', notes: 'White sage, cedar and morning citrus', price: 30, label: { main: 'New Mercies', sub: 'every morning', color: '#B08A3E' }, badge: 'New' },
    { id: 'peace', c: 'newyear', name: 'Peace Be Still', notes: 'Lavender, chamomile and rain', price: 30, label: { main: 'Peace', sub: 'be still', color: '#2C4A6B' }, badge: 'New' },
    { id: 'intentions', c: 'newyear', name: '2027 Intentions', notes: 'Champagne, pear and white musk', price: 32, label: { main: '2027', sub: 'intentions', color: '#D7B46A', style: 'classic', bg: 'black' }, badge: 'New' },

    { id: 'forever', c: 'memory', name: 'Forever Loved', notes: 'Soft cotton and white tea. Add their name in “Make it yours.”', price: 34, label: { main: 'Forever Loved', sub: 'in loving memory', color: '#2C4A6B' }, badge: 'Personalized', custom: true },
    { id: 'lightforyou', c: 'memory', name: 'A Light for You', notes: 'Vanilla, sandalwood and honey', price: 30, label: { main: 'A light for you', sub: 'vanilla & sandalwood', color: '#B08A3E' } },

    { id: 'sunday', c: 'game', name: 'Sunday Ritual', notes: 'Leather, cedar and a little smoke', price: 32, black: { decal: 'football' } },
    { id: 'opening', c: 'game', name: 'Opening Day', notes: 'Fresh-cut grass and a worn leather glove', price: 32, black: { decal: 'baseball' } },
    { id: 'courtside', c: 'game', name: 'Courtside', notes: 'Hardwood, cedar and a touch of cologne', price: 32, black: { decal: 'basketball' }, badge: 'New' },
    { id: 'tailgate', c: 'game', name: 'Tailgate', notes: 'Hickory smoke, bourbon and brown sugar', price: 32, black: { decal: 'tailgate' }, badge: 'New' },
    { id: 'team', c: 'game', name: 'Hometown Colors', notes: 'Your city or crew name in your team colors, printed on matte black. Build it in “Make it yours.”', price: 36, black: { decal: 'city', main: 'DMV', sub: 'burgundy & gold forever', color: '#F3E7D3', c1: '#7A1F2B', c2: '#E2B33C' }, badge: 'Personalized', custom: true },

    { id: 'muse', c: 'everyday', name: 'Muse', notes: 'Rose, oud and amber', price: 32, img: 'img/muse.jpg' },
    { id: 'ucan', c: 'everyday', name: 'U Can & Will', notes: 'Citrus, ginger and green tea', price: 26, img: 'img/ucanwill.jpg' }
  ];

  var SCENTS = ['Balsam fir & cranberry', 'Spruce & vanilla bean', 'Peppermint & sweet cream', 'Frankincense & myrrh', 'Pumpkin & clove', 'Apple cider & cinnamon', 'Eucalyptus & spearmint', 'White sage & citrus', 'Lavender & chamomile', 'Champagne & pear', 'Soft cotton & white tea', 'Vanilla & sandalwood', 'Leather & cedar', 'Rose, oud & amber', 'Unscented'];

  function colorOf(c) { for (var i = 0; i < COLLECTIONS.length; i++) if (COLLECTIONS[i].id === c) return COLLECTIONS[i].color; }

  /* Her amber jar photo with a label laid over the real label */
  function labelHTML(l) {
    return '<div class="lbl lbl-' + (l.bg || 'white') + ' lbl-' + (l.style || 'script') + '" style="--ink-c:' + l.color + '">' +
      '<span class="main" style="font-size:' + mainSize(l) + 'cqw">' + esc(l.main) + '</span>' +
      (l.accent ? '<span class="bar" style="background:' + l.accent + '"></span>' : '') +
      (l.sub ? '<span class="sub">' + esc(l.sub) + '</span>' : '') + '</div>';
  }
  function mainSize(l) {
    var n = Math.max(3, (l.main || '').length), st = l.style || 'script';
    if (st === 'bold') return Math.min(6.4, 44 / n).toFixed(2);
    if (st === 'classic') return Math.min(7, 52 / n).toFixed(2);
    return Math.min(10, 70 / n).toFixed(2);
  }
  /* Her matte black jar photo with a printed design */
  var CX = 355, CY = 470;
  function svgText(t, y, size, fill, extra) { return '<text x="' + CX + '" y="' + y + '" text-anchor="middle" fill="' + fill + '" font-size="' + size + '" ' + (extra || '') + '>' + esc(t) + '</text>'; }
  var SERIF = 'font-family="Fraunces, Georgia, serif"', SANS = 'font-family="Manrope, system-ui, sans-serif"';
  function decalSVG(d) {
    var W = '#F4F1EA', s = '';
    if (d.decal === 'football') {
      s = '<g transform="translate(' + CX + ' ' + (CY - 40) + ') rotate(-18)"><ellipse rx="96" ry="54" fill="none" stroke="' + W + '" stroke-width="7"/>' +
        '<path d="M-70 -30 Q0 -44 70 -30 M-70 30 Q0 44 70 30" fill="none" stroke="' + W + '" stroke-width="4" opacity=".7"/>' +
        '<line x1="-34" y1="0" x2="34" y2="0" stroke="' + W + '" stroke-width="6"/>' + [-24, -8, 8, 24].map(function (x) { return '<line x1="' + x + '" y1="-11" x2="' + x + '" y2="11" stroke="' + W + '" stroke-width="5"/>'; }).join('') + '</g>' +
        svgText('SUNDAY', CY + 92, 62, W, SERIF + ' font-weight="700" letter-spacing="6"') + svgText('is a ritual', CY + 128, 19, '#D7B46A', SANS + ' font-weight="600" letter-spacing="3"');
    } else if (d.decal === 'baseball') {
      s = '<g transform="translate(' + CX + ' ' + (CY - 40) + ')"><circle r="74" fill="' + W + '"/>' +
        '<path d="M-48 -56 C-22 -24 -22 24 -48 56 M48 -56 C22 -24 22 24 48 56" fill="none" stroke="#C8243A" stroke-width="5" stroke-dasharray="7 6"/></g>' +
        svgText('OPENING DAY', CY + 92, 44, W, SERIF + ' font-weight="700" letter-spacing="4"') + svgText('fresh-cut grass & leather', CY + 126, 17, '#D7B46A', SANS + ' font-weight="600" letter-spacing="2"');
    } else if (d.decal === 'basketball') {
      s = '<g transform="translate(' + CX + ' ' + (CY - 40) + ')"><circle r="74" fill="#E07B2C"/>' +
        '<g fill="none" stroke="#1A1416" stroke-width="5"><line x1="-74" y1="0" x2="74" y2="0"/><line x1="0" y1="-74" x2="0" y2="74"/><path d="M-52 -52 C-24 -20 -24 20 -52 52 M52 -52 C24 -20 24 20 52 52"/></g></g>' +
        svgText('COURTSIDE', CY + 92, 50, W, SERIF + ' font-weight="700" letter-spacing="5"') + svgText('hardwood & cedar', CY + 126, 17, '#D7B46A', SANS + ' font-weight="600" letter-spacing="2"');
    } else if (d.decal === 'tailgate') {
      var fl = function (x, h, c) { return '<path d="M' + x + ' ' + (CY + 10) + ' C' + (x - 26) + ' ' + (CY - 20) + ' ' + (x - 6) + ' ' + (CY - h) + ' ' + x + ' ' + (CY - h - 30) + ' C' + (x + 8) + ' ' + (CY - h) + ' ' + (x + 30) + ' ' + (CY - 24) + ' ' + x + ' ' + (CY + 10) + ' Z" fill="' + c + '"/>'; };
      s = fl(CX - 46, 70, '#E07B2C') + fl(CX, 110, '#F5A524') + fl(CX + 46, 70, '#E07B2C') +
        '<rect x="' + (CX - 110) + '" y="' + (CY + 22) + '" width="220" height="5" rx="2.5" fill="' + W + '" opacity=".8"/>' +
        svgText('TAILGATE', CY + 86, 56, W, SERIF + ' font-weight="700" letter-spacing="5"') + svgText('hickory smoke & bourbon', CY + 120, 17, '#D7B46A', SANS + ' font-weight="600" letter-spacing="2"');
    } else {
      var t = d.main || 'Your words', n = Math.max(2, t.length), fs = Math.min(110, 300 / (n * 0.62));
      s = svgText(t, CY + 10, fs.toFixed(0), d.color || W, SERIF + ' font-weight="700" letter-spacing="3"') +
        (d.c1 ? '<rect x="' + (CX - 120) + '" y="' + (CY + 34) + '" width="240" height="12" rx="3" fill="' + d.c1 + '"/>' : '') +
        (d.c2 ? '<rect x="' + (CX - 120) + '" y="' + (CY + (d.c1 ? 50 : 34)) + '" width="240" height="12" rx="3" fill="' + d.c2 + '"/>' : '') +
        (d.sub ? svgText(d.sub, CY + 98, 19, '#D7B46A', SANS + ' font-weight="600" letter-spacing="2"') : '');
    }
    return s;
  }
  function blackHTML(d, alt) {
    return '<div class="mock mock-black"><img src="img/black-jar.jpg" alt="' + esc(alt) + '" loading="lazy">' +
      '<svg class="print" viewBox="0 0 606 755" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + decalSVG(d) + '</svg></div>';
  }
  function mockHTML(l, alt) {
    return '<div class="mock"><img src="img/breathe.jpg" alt="' + esc(alt) + '" loading="lazy">' + labelHTML(l) + '</div>';
  }

  /* ---------------- Hero ---------------- */
  var hero = document.getElementById('hero');
  var frame = document.getElementById('heroFrame');
  var capEl = document.getElementById('heroCaption');
  var SLIDES = [
    { src: 'img/wreath.jpg', cap: 'Evergreen Wreath, from the Holiday collection' },
    { src: 'img/muse.jpg', cap: 'Muse, from the Everyday collection' },
    { src: 'img/seasons.jpg', cap: 'Seasons Greetings, from the Holiday collection' },
    { src: 'img/breathe.jpg', cap: 'Breathe, from the New Year & Spirit collection' },
    { src: 'img/bow.jpg', cap: 'Candy Cane Bow, from the Holiday collection' }
  ];
  var slideEls = SLIDES.map(function (s, i) {
    var d = document.createElement('div');
    d.className = 'slide' + (i === 0 ? ' on' : '');
    d.innerHTML = '<img src="' + s.src + '" alt="' + esc(s.cap.split(',')[0]) + ' candle by So Familiar"' + (i ? ' loading="lazy"' : '') + '>';
    frame.insertBefore(d, frame.querySelector('.flicker'));
    return d;
  });
  var cur = 0;
  capEl.textContent = SLIDES[0].cap;
  requestAnimationFrame(function () { setTimeout(function () { hero.classList.add('lit'); }, reduce ? 0 : 300); });
  if (!reduce) setInterval(function () {
    var prev = slideEls[cur]; cur = (cur + 1) % SLIDES.length;
    var next = slideEls[cur];
    next.classList.remove('on'); void next.offsetWidth; next.classList.add('on');
    prev.classList.remove('on');
    capEl.textContent = SLIDES[cur].cap;
  }, 5200);

  /* top bar turns solid after the hero */
  var bar = document.getElementById('topbar');
  function onScroll() { bar.classList.toggle('solid', scrollY > innerHeight * .8); }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------------- Collections ---------------- */
  var tabs = document.getElementById('tabs'), grid = document.getElementById('grid');
  COLLECTIONS.forEach(function (c, i) {
    var b = document.createElement('button');
    b.className = 'tab'; b.type = 'button'; b.setAttribute('role', 'tab'); b.dataset.c = c.id;
    b.style.setProperty('--c', c.color); b.textContent = c.name;
    b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    b.addEventListener('click', function () { selectTab(c.id); });
    tabs.appendChild(b);
  });
  var sizeOpts = SIZES.map(function (s) { return '<option value="' + s.id + '">' + s.name + '</option>'; }).join('');
  PRODUCTS.forEach(function (p) {
    var el = document.createElement('article');
    el.className = 'card'; el.dataset.c = p.c;
    var alt = p.name + ' candle by So Familiar';
    var media = p.img ? '<img src="' + p.img + '" alt="' + esc(alt) + '" loading="lazy">' : (p.black ? blackHTML(p.black, alt) : mockHTML(p.label, alt));
    el.innerHTML = '<div class="media">' + media + (p.badge ? '<span class="badge">' + p.badge + '</span>' : '') + '</div>' +
      '<h3>' + esc(p.name) + '</h3><p class="notes">' + esc(p.notes) + '</p>' +
      (p.custom ? '' : '<label class="size-pick"><span class="visually-hidden">Size for ' + esc(p.name) + '</span><select>' + sizeOpts + '</select></label>') +
      '<div class="buy"><span class="price">$' + p.price + '</span><button class="add" type="button">' + (p.custom ? 'Personalize' : 'Add to order') + '</button></div>';
    var sel = el.querySelector('select'), priceEl = el.querySelector('.price');
    function sz() { return SIZES.filter(function (s) { return s.id === (sel ? sel.value : '9'); })[0]; }
    if (sel) sel.addEventListener('change', function () { priceEl.textContent = '$' + (p.price + sz().add); });
    el.querySelector('.add').addEventListener('click', function (e) {
      if (p.custom) { document.getElementById('custom').scrollIntoView(); presetFrom(p); return; }
      var s = sz();
      addItem({ key: p.id + '-' + s.id, name: p.name + ', ' + s.name, sub: p.notes.split('.')[0], price: p.price + s.add });
      flashBtn(e.currentTarget);
    });
    grid.appendChild(el);
  });
  var banner = document.getElementById('collBanner');
  function selectTab(id) {
    var col = COLLECTIONS.filter(function (c) { return c.id === id; })[0];
    if (banner && col) {
      banner.innerHTML = '<img src="' + col.img + '" alt="">' +
        '<div class="cb-text"><h3>' + esc(col.name) + '</h3><p>' + esc(col.line) + '</p></div>';
      banner.classList.remove('show'); void banner.offsetWidth; banner.classList.add('show');
    }
    tabs.querySelectorAll('.tab').forEach(function (t) { t.setAttribute('aria-selected', t.dataset.c === id ? 'true' : 'false'); });
    grid.querySelectorAll('.card').forEach(function (c) { c.hidden = c.dataset.c !== id; });
  }
  selectTab('holiday');
  function flashBtn(b) { b.classList.add('added'); b.textContent = 'Added'; setTimeout(function () { b.classList.remove('added'); b.textContent = 'Add to order'; }, 1400); }

  /* ---------------- Builder ---------------- */
  var B = { bg: 'white', style: 'script' };
  var preview = document.getElementById('preview');
  var line1 = document.getElementById('line1'), line2 = document.getElementById('line2'), ink = document.getElementById('ink'), accent = document.getElementById('accent'), cScent = document.getElementById('cScent'), cSize = document.getElementById('cSize');
  var BASE = 34;
  SCENTS.forEach(function (s) { var o = document.createElement('option'); o.textContent = s; cScent.appendChild(o); });
  cScent.value = 'Soft cotton & white tea';
  SIZES.forEach(function (s) { var o = document.createElement('option'); o.value = s.id; o.textContent = s.name + ' (' + s.note + ')'; cSize.appendChild(o); });
  function setSeg(id, attr, val) { document.querySelectorAll('#' + id + ' button').forEach(function (x) { x.setAttribute('aria-pressed', x.dataset[attr] === val ? 'true' : 'false'); }); }
  function seg(id, key, attr) {
    document.getElementById(id).addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      B[key] = b.dataset[attr]; setSeg(id, attr, B[key]);
      if (key === 'bg') ink.value = B.bg === 'jar' ? '#F3E7D3' : B.bg === 'black' ? '#D7B46A' : (B.bg === 'kraft' ? '#3A2414' : '#B08A3E');
      renderPreview();
    });
  }
  seg('bgSeg', 'bg', 'b'); seg('styleSeg', 'style', 's');
  [line1, line2, ink, accent, cSize].forEach(function (el) { el.addEventListener('input', renderPreview); });
  function cSz() { return SIZES.filter(function (s) { return s.id === cSize.value; })[0]; }
  function renderPreview() {
    preview.innerHTML = B.bg === 'jar'
      ? blackHTML({ decal: 'city', main: line1.value.trim() || 'Your words', sub: line2.value.trim(), color: ink.value, c1: accent.value, c2: B.c2 }, 'Preview of your custom design on a So Familiar matte black jar')
      : mockHTML({ main: line1.value.trim() || 'Your words', sub: line2.value.trim(), color: ink.value, bg: B.bg, style: B.style, accent: accent.value }, 'Preview of your custom label on a So Familiar amber jar');
    document.getElementById('cPrice').textContent = '$' + ((B.bg === 'jar' ? 36 : BASE) + cSz().add);
  }
  function presetFrom(p) {
    if (p.black) {
      B.bg = 'jar'; B.c2 = p.black.c2; setSeg('bgSeg', 'b', 'jar');
      line1.value = p.black.main; line2.value = p.black.sub; ink.value = p.black.color; accent.value = '';
      for (var i = 0; i < accent.options.length; i++) if (accent.options[i].value.toLowerCase() === p.black.c1.toLowerCase()) accent.value = p.black.c1;
      if (!accent.value) { var o = document.createElement('option'); o.value = p.black.c1; o.textContent = 'Burgundy'; accent.appendChild(o); accent.value = p.black.c1; }
      cScent.value = 'Leather & cedar';
      renderPreview(); line1.focus({ preventScroll: true }); line1.select(); return;
    }
    B.c2 = '';
    var l = p.label;
    B.bg = l.bg || 'white'; B.style = l.style || 'script';
    setSeg('bgSeg', 'b', B.bg); setSeg('styleSeg', 's', B.style);
    line1.value = p.id === 'forever' ? 'Mama' : l.main; line2.value = p.id === 'forever' ? 'always with us' : l.sub;
    ink.value = l.color; accent.value = l.accent || '';
    cScent.value = p.id === 'team' ? 'Leather & cedar' : 'Soft cotton & white tea';
    renderPreview(); line1.focus({ preventScroll: true }); line1.select();
  }
  renderPreview();
  document.getElementById('addCustom').addEventListener('click', function (e) {
    var bgName = { white: 'white label', kraft: 'kraft label', black: 'black label', jar: 'matte black jar' }[B.bg];
    var words = line1.value.trim() || 'Your words', s = cSz();
    addItem({ key: 'custom-' + Date.now(), name: 'Custom “' + words + '”, ' + s.name, sub: bgName + ', ' + B.style + ' lettering' + (line2.value.trim() ? ', “' + line2.value.trim() + '”' : '') + ', ' + ink.options[ink.selectedIndex].text.toLowerCase() + ' text' + (accent.value ? ', ' + accent.options[accent.selectedIndex].text.toLowerCase() + ' stripe' : '') + ', ' + cScent.value, price: (B.bg === 'jar' ? 36 : BASE) + s.add });
    var b = e.currentTarget; b.textContent = 'Added to your order'; setTimeout(function () { b.textContent = 'Add to my order'; }, 1600);
  });

  /* ---------------- Cart ---------------- */
  var cart = [];
  var list = document.getElementById('cartList'), pill = document.getElementById('cartPill'), countEl = document.getElementById('cartCount');
  function addItem(it) {
    var found = cart.filter(function (c) { return c.key === it.key; })[0];
    if (found) found.qty++; else cart.push(Object.assign({ qty: 1 }, it));
    renderCart();
    pill.classList.remove('bump'); void pill.offsetWidth; pill.classList.add('bump');
  }
  function renderCart() {
    var n = 0, sum = 0;
    list.innerHTML = '';
    if (!cart.length) list.innerHTML = '<li class="empty">Your order is empty. Add candles from the collections above, or design your own.</li>';
    cart.forEach(function (c, i) {
      n += c.qty; sum += c.qty * c.price;
      var li = document.createElement('li');
      li.innerHTML = '<div><div class="item-name"></div><div class="item-sub"></div></div><div class="qty-ctl"><button type="button" aria-label="One fewer">−</button><span>' + c.qty + '</span><button type="button" aria-label="One more">+</button></div>';
      li.querySelector('.item-name').textContent = c.name + ' ($' + c.price + ')';
      li.querySelector('.item-sub').textContent = c.sub;
      var btns = li.querySelectorAll('button');
      btns[0].addEventListener('click', function () { c.qty--; if (c.qty <= 0) cart.splice(i, 1); renderCart(); });
      btns[1].addEventListener('click', function () { c.qty++; renderCart(); });
      list.appendChild(li);
    });
    countEl.textContent = n;
    document.getElementById('cartTotal').hidden = !cart.length;
    document.getElementById('cartSum').textContent = '$' + sum + ' plus shipping';
    document.getElementById('itemsField').value = cart.map(function (c) { return c.qty + ' x ' + c.name + ' ($' + c.price + ') - ' + c.sub; }).join('\n');
  }
  renderCart();

  /* ---------------- Submit ---------------- */
  var form = document.getElementById('orderForm'), err = document.getElementById('formError');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    err.style.display = 'none';
    if (!cart.length) { err.textContent = 'Add at least one candle to your order first.'; err.style.display = 'block'; document.getElementById('collections').scrollIntoView(); return; }
    var data = {}; new FormData(form).forEach(function (v, k) { data[k] = v; });
    data.total = cart.reduce(function (s, c) { return s + c.qty * c.price; }, 0);
    var btn = document.getElementById('sendBtn'); btn.disabled = true; btn.textContent = 'Sending…';
    fetch('/api/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); done(true); })
      .catch(function () {
        var local = !/^https?:/.test(location.protocol) || /claude|localhost|usercontent/.test(location.hostname);
        if (local) { done(false); return; }
        var summary = 'New So Familiar order\n\nName: ' + data.name + '\nEmail: ' + data.email + '\nPhone: ' + (data.phone || '-') +
          '\nShip to: ' + data.address + '\nNeed by: ' + (data.needby || '-') + '\n\n' + data.items + '\n\nEstimated total: $' + data.total + ' plus shipping\nNotes: ' + (data.notes || '-');
        if (ORDER_EMAIL) {
          location.href = 'mailto:' + ORDER_EMAIL + '?subject=' + encodeURIComponent('Candle order from ' + data.name) + '&body=' + encodeURIComponent(summary);
          doneMail();
        } else {
          doneDM(summary);
        }
      });
  });
  function doneMail() {
    document.getElementById('formCard').innerHTML = '<div class="form-done"><h3>Almost done.</h3><p>Your email app just opened with your order filled in. Press send, and you’ll hear back within 24 hours with your total and a payment link.</p><p class="form-note">Didn’t open? Email us at <a href="mailto:' + ORDER_EMAIL + '">' + ORDER_EMAIL + '</a>.</p></div>';
    cart = []; countEl.textContent = '0';
  }
  function doneDM(summary) {
    var card = document.getElementById('formCard');
    card.innerHTML = '<div class="form-done"><h3>One last step.</h3><p>Copy your order and send it to us in an Instagram message. We’ll reply within 24 hours with your total and a payment link.</p>' +
      '<textarea readonly rows="9" style="width:100%;margin:8px 0 16px;font:inherit;font-size:.9rem;padding:12px;border-radius:14px;border:1.5px solid var(--line);background:var(--frost)"></textarea>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><button type="button" class="btn btn-plum" id="copyOrder">Copy my order</button><a class="btn btn-ember" href="https://ig.me/m/sofamiliarcandles" target="_blank" rel="noopener">Open Instagram</a></div></div>';
    var ta = card.querySelector('textarea'); ta.value = summary;
    card.querySelector('#copyOrder').addEventListener('click', function () {
      ta.select();
      (navigator.clipboard ? navigator.clipboard.writeText(summary) : Promise.reject()).catch(function () { document.execCommand('copy'); });
      this.textContent = 'Copied';
    });
  }
  function done(sent) {
    document.getElementById('formCard').innerHTML = '<div class="form-done"><h3>Your order is in.</h3><p>' +
      (sent ? 'Thank you. You’ll get an email within 24 hours with your total and a payment link. Once that’s done, your candles go into the next pour.'
            : 'This is a preview, so nothing was sent. On the live site, the order goes straight to So Familiar and you’ll hear back within 24 hours with a total and payment link.') + '</p></div>';
    cart = []; countEl.textContent = '0';
  }
})();
