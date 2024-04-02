import keepPreset from "keep-react/preset";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [keepPreset],
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ['./src/**/*.{html,js}'],
//   theme: {
//     ...require('keep-react/preset').theme,
//     colors: {
//       ...require('tailwindcss/colors'),
//       primary: {
//         100: '#f8f5fd',
//         200: '#e4def6',
//         300: '#cfc3ef',
//         400: '#b6a1e4',
//         500: '#9d7ad8',
//         600: '#9164cc',
//         700: '#7c4bb6',
//         800: '#673e99',
//         900: '#56357d',
//       },
//     },
//     ...require('keep-react/preset').theme,
//   },
// }