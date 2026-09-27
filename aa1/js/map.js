if (typeof L === 'undefined') {
  document.querySelector('#map-status').textContent =
    'O mapa precisa de conexão com a internet para carregar.';
}
else {
  const map = L.map('map', {
    minZoom: 2,
    maxZoom: 12,
    worldCopyJump: true
  }).setView([15, 0], 2);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
}
