/** @type {import('tailwindcss').Config} */
const { join } = require('path');
module.exports = {
  content: [
    join(
      __dirname,
      '{src,app,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

