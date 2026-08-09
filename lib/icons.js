// Minimal inline SVG icon set. No external icon font / CDN dependency —
// keeps the site fast, offline-safe, and easy to theme with currentColor.

const ICONS = {
  home: '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9"/>',
  heart:
    '<path d="M12 20.5s-7.5-4.6-9.7-9.3C.7 7.7 2.4 4.5 5.7 4a4.9 4.9 0 0 1 6.3 2 4.9 4.9 0 0 1 6.3-2c3.3.5 5 3.7 3.4 7.2C19.5 15.9 12 20.5 12 20.5Z"/>',
  basket:
    '<path d="M4 10h16l-1.5 9.2a2 2 0 0 1-2 1.8H7.5a2 2 0 0 1-2-1.8L4 10Z"/><path d="M8 10 10 4"/><path d="M16 10 14 4"/><path d="M2 10h20"/>',
  graduation:
    '<path d="M2 8 12 3l10 5-10 5-10-5Z"/><path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/><path d="M22 8v6"/>',
  route:
    '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.2 16.8 15.8 7.2"/><path d="M13 6h3.5a2.5 2.5 0 0 1 0 5H12"/>',
  people:
    '<circle cx="8.5" cy="8" r="3.2"/><circle cx="16.2" cy="9.2" r="2.6"/><path d="M2.5 20c.6-3.4 3-5.4 6-5.4s5.4 2 6 5.4"/><path d="M14.7 14.9c2.4.2 4.2 2 4.8 5.1"/>',
  check: '<path d="M5 12.5 10 17 19 7"/>',
  arrow: '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
  close: '<path d="M6 6l12 12"/><path d="M18 6 6 18"/>',
  phone:
    '<path d="M5 4h3.2l1.4 4.4-2 1.6a12 12 0 0 0 6.4 6.4l1.6-2 4.4 1.4V19a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.2 2 2 0 0 1 5 4Z"/>',
  mail: '<path d="M3.5 5.5h17v13h-17Z"/><path d="M4 6l8 7 8-7"/>',
  pin: '<path d="M12 21s7-6.3 7-11.7A7 7 0 0 0 5 9.3C5 14.7 12 21 12 21Z"/><circle cx="12" cy="9.3" r="2.4"/>',
  shield:
    '<path d="M12 3l8 3v6c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V6l8-3Z"/><path d="M8.5 12l2.4 2.4L15.5 9"/>',
  doc: '<path d="M7 3h7l5 5v13H7Z"/><path d="M14 3v5h5"/><path d="M9.5 13h5"/><path d="M9.5 16.5h5"/>',
  chart: '<path d="M4 20V10"/><path d="M11 20V4"/><path d="M18 20v-7"/><path d="M2 20h20"/>',
};

function icon(name, opts = {}) {
  const { size = 22, className = "icon", strokeWidth = 1.7 } = opts;
  const body = ICONS[name] || ICONS.check;
  return `<svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

module.exports = { icon };
