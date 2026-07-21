/* PayCalc — light/dark theme toggle.
   Remembers the choice in the browser; defaults to the device's setting.
   Does not touch any pay calculations. */
(function () {
  var KEY = 'paycalc-theme';
  var root = document.documentElement;

  function apply(theme) {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
  }

  // Pick the starting theme: saved choice first, otherwise the device setting.
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  apply(saved || (prefersDark ? 'dark' : 'light'));

  function current() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  var btn;
  function refreshButton() {
    if (!btn) return;
    var dark = current() === 'dark';
    btn.textContent = dark ? '☀' : '☾'; // ☀ when dark (offer light), ☾ when light
    var label = dark ? 'Switch to light mode' : 'Switch to dark mode';
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  }

  function toggle() {
    var next = current() === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
    refreshButton();
  }

  function addButton() {
    var bar = document.querySelector('.topbar-in');
    if (!bar) return;
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'themebtn';
    btn.addEventListener('click', toggle);
    bar.appendChild(btn);
    refreshButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addButton);
  } else {
    addButton();
  }
})();
