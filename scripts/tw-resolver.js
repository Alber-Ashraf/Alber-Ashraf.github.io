const path = require('path');
const fs = require('fs');

const portfolioRoot = path.resolve(__dirname, '..');
const twIndexCss = path.join(portfolioRoot, 'node_modules', 'tailwindcss', 'index.css');

globalThis.__tw_resolve = function (id, from) {
  if (id === 'tailwindcss' || id === 'tailwindcss/index.css') {
    return twIndexCss;
  }
  if (id.startsWith('tailwindcss/')) {
    const rel = id.slice('tailwindcss/'.length);
    const resolved = path.join(portfolioRoot, 'node_modules', 'tailwindcss', rel);
    if (fs.existsSync(resolved)) return resolved;
  }
  if (id.startsWith('.') || id.startsWith('/')) {
    const full = path.resolve(from || portfolioRoot, id);
    if (fs.existsSync(full)) return full;
  }
  return null;
};
