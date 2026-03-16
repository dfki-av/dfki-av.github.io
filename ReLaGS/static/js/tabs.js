(function () {
  'use strict';

  // ── Category switching (Structural / Relational) ──
  document.querySelectorAll('.cat-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.dataset.cat;

      document.querySelectorAll('.cat-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      document.querySelectorAll('.cat-panel').forEach(function (p) {
        p.classList.add('cat-hidden');
      });
      document.getElementById('cat-' + cat).classList.remove('cat-hidden');
    });
  });

  // ── Scene switching (Scene 1 / Scene 2 within each category) ──
  document.querySelectorAll('.scene-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat   = btn.dataset.cat;
      var scene = btn.dataset.scene;

      document.querySelectorAll('.scene-btn[data-cat="' + cat + '"]').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      document.querySelectorAll('[id^="' + cat + '-"]').forEach(function (el) {
        el.classList.add('scene-hidden');
      });
      document.getElementById(cat + '-' + scene).classList.remove('scene-hidden');
    });
  });

})();
