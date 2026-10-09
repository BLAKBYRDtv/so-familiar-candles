(function () {
  /* Where orders go when there's no order server. Put her email here, e.g. 'name@gmail.com'.
     Left empty, customers are asked to send their order by Instagram message instead. */
  var ORDER_EMAIL = '';

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
    { id: 'holiday', name: 'Holiday', color: 'var(--c-holiday)' },
    { id: 'thanks', name: 'Thanksgiving', color: 'var(--c-thanks)' },
    { id: 'newyear', name: 'New Year & Spirit', color: 'var(--c-newyear)' },
    { id: 'memory', name: 'In Loving Memory', color: 'var(--c-memory)' },
    { id: 'game', name: 'Game Day', color: 'var(--c-game)' },
    { id: 'everyday', name: 'Everyday', color: 'var(--c-everyday)' }
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

    { id: 'sunday', c: 'game', name: 'Sunday Ritual', notes: 'Leather, cedar and a little smoke', price: 32, label: { main: 'Sunday', sub: 'is a ritual', color: '#D7B46A', bg: 'black', accent: '#2E6B4E' } },
    { id: 'opening', c: 'game', name: 'Opening Day', notes: 'Fresh-cut grass and a worn leather glove', price: 30, label: { main: 'Opening Day', sub: 'fresh-cut grass & leather', color: '#1F2E6B', accent: '#B8283C' } },
    { id: 'team', c: 'game', name: 'Your Team, Your Colors', notes: 'Your team name and colors on the label. Build it in “Make it yours.”', price: 34, label: { main: 'Team Name', sub: 'every sunday', color: '#F3E7D3', bg: 'black', style: 'bold', accent: '#C9A04A' }, badge: 'Personalized', custom: true },

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
    var media = p.img ? '<img src="' + p.img + '" alt="' + esc(alt) + '" loading="lazy">' : mockHTML(p.label, alt);
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
  function selectTab(id) {
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
      if (key === 'bg') ink.value = B.bg === 'black' ? '#D7B46A' : (B.bg === 'kraft' ? '#3A2414' : '#B08A3E');
      renderPreview();
    });
  }
  seg('bgSeg', 'bg', 'b'); seg('styleSeg', 'style', 's');
  [line1, line2, ink, accent, cSize].forEach(function (el) { el.addEventListener('input', renderPreview); });
  function cSz() { return SIZES.filter(function (s) { return s.id === cSize.value; })[0]; }
  function renderPreview() {
    preview.innerHTML = mockHTML({ main: line1.value.trim() || 'Your words', sub: line2.value.trim(), color: ink.value, bg: B.bg, style: B.style, accent: accent.value }, 'Preview of your custom label on a So Familiar amber jar');
    document.getElementById('cPrice').textContent = '$' + (BASE + cSz().add);
  }
  function presetFrom(p) {
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
    var bgName = { white: 'white label', kraft: 'kraft label', black: 'black label' }[B.bg];
    var words = line1.value.trim() || 'Your words', s = cSz();
    addItem({ key: 'custom-' + Date.now(), name: 'Custom “' + words + '”, ' + s.name, sub: bgName + ', ' + B.style + ' lettering' + (line2.value.trim() ? ', “' + line2.value.trim() + '”' : '') + ', ' + ink.options[ink.selectedIndex].text.toLowerCase() + ' text' + (accent.value ? ', ' + accent.options[accent.selectedIndex].text.toLowerCase() + ' stripe' : '') + ', ' + cScent.value, price: BASE + s.add });
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
