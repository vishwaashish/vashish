/** @type {import('tailwindcss').Config} */
module.exports = {
  // future: {
  //   hoverOnlyWhenSupported: true,
  // },
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      'light',
      // {
      //   dark: {
      //     ...require('daisyui/src/theming/themes')['[data-theme=dark]'],
      //   },
      // },
      // 'cupcake',
      // 'wireframe',
      // 'dracula',
      {
        dracula: {
          ...require('daisyui/src/theming/themes')['[data-theme=dracula]'],
          primary: 'hsl(259 94% 51%)',
        },
      },
      // 'night',
      // 'black',
      // 'business',
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    // darkTheme: 'light', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
  },
  theme: {},
}
