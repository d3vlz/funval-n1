/** tailwind-3d-plugin.js */
module.exports = function({ addUtilities, theme }) {
  addUtilities({
    '.perspective':      { perspective: theme('perspective.DEFAULT') },
    '.preserve-3d':      { 'transform-style': theme('transformStyle.preserve-3d') },
    '.backface-hidden':  { 'backface-visibility': theme('backfaceVisibility.hidden') },
    '.rotate-y-180':     { transform: 'rotateY(180deg)' },
  }, ['responsive','hover']);
};
