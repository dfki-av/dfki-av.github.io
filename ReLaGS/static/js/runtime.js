(function () {
  'use strict';

  // ── Data from Tab. 7 — index order: [Time (min), Storage (MB), GPU Mem. (GB)] ──
  var METRICS   = ['Time (min)', 'Storage (MB)', 'GPU Mem. (GB)'];
  var UNITS     = ['min', 'MB', 'GB'];

  var rf        = [60.0, 500.0, 32.0];  // RelationField (inseparable)
  var sceneRec  = [11.0,  52.2,  3.2];  // Ours – Scene Rec.
  var langDist  = [ 1.5,  10.6,  7.5];  // Ours – Lang. Distill.
  var sceneGr   = [ 0.1,   2.2,  3.0];  // Ours – Scene Graph
  var oursTotal = [12.6,  65.0,  7.5];  // Stage totals

  // ── Stat cards ──
  var CARDS = [
    { id: 'time', i: 0 },
    { id: 'disk', i: 1 },
    { id: 'gpu',  i: 2 }
  ];

  CARDS.forEach(function (c) {
    var el = document.getElementById('note-' + c.id);
    if (!el) return;
    var ratio = (rf[c.i] / oursTotal[c.i]).toFixed(1);
    el.innerHTML =
      'RelationField uses <strong>' + ratio + '&times;</strong> more'
      + ' (' + rf[c.i] + '\u202f' + UNITS[c.i]
      + ' vs ' + oursTotal[c.i] + '\u202f' + UNITS[c.i] + ')';
  });

  // ── Chart ──
  // Normalise each metric relative to RelationField (= 100 %)
  function n(val, i) { return (val / rf[i]) * 100; }

  var ctx = document.getElementById('runtimeChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: METRICS,
      datasets: [
        {
          label: 'RelationField',
          data: rf.map(function (v, i) { return n(v, i); }),
          backgroundColor: '#2c5f8a',
          borderRadius: { topLeft: 4, topRight: 4 },
          stack: 'rf',
          rawVals: rf,
          units: UNITS
        },
        {
          label: 'Ours \u2013 Scene Rec.',
          data: sceneRec.map(function (v, i) { return n(v, i); }),
          backgroundColor: '#5bc4f5',
          stack: 'ours',
          rawVals: sceneRec,
          units: UNITS
        },
        {
          label: 'Ours \u2013 Lang. Distill.',
          data: langDist.map(function (v, i) { return n(v, i); }),
          backgroundColor: '#d4c76a',
          stack: 'ours',
          rawVals: langDist,
          units: UNITS
        },
        {
          label: 'Ours \u2013 Scene Graph',
          data: sceneGr.map(function (v, i) { return n(v, i); }),
          backgroundColor: '#e07a7a',
          borderRadius: { topLeft: 4, topRight: 4 },
          stack: 'ours',
          rawVals: sceneGr,
          units: UNITS
        }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index' },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: { family: "'Google Sans', sans-serif", size: 11 },
            padding: 14,
            usePointStyle: true,
            pointStyleWidth: 10
          }
        },
        tooltip: {
          callbacks: {
            label: function (c) {
              var raw = c.dataset.rawVals[c.dataIndex];
              var u   = c.dataset.units[c.dataIndex];
              return '  ' + c.dataset.label + ': ' + raw + '\u202f' + u;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: "'Google Sans', sans-serif", size: 12 } }
        },
        y: {
          stacked: true,
          max: 115,
          grid: { color: 'rgba(0,0,0,0.04)' },
          ticks: { display: false },
          border: { display: false }
        }
      }
    },
    plugins: [{
      // Draw absolute totals above each bar group
      id: 'groupTotals',
      afterDatasetsDraw: function (chart) {
        var c2 = chart.ctx;
        [
          { dsIdx: 0, vals: rf,        color: '#1a3d5c' },
          { dsIdx: 3, vals: oursTotal, color: '#2c7a4b' }
        ].forEach(function (g) {
          chart.getDatasetMeta(g.dsIdx).data.forEach(function (bar, i) {
            c2.save();
            c2.font        = "700 11px 'Google Sans', sans-serif";
            c2.fillStyle   = g.color;
            c2.textAlign   = 'center';
            c2.fillText(g.vals[i] + '\u202f' + UNITS[i], bar.x, bar.y - 6);
            c2.restore();
          });
        });
      }
    }]
  });

})();
