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
  // darkMode: "class",

  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'wireframe',
      'dracula',
      {
        night: {
          ...require('daisyui/src/theming/themes')['[data-theme=night]'],
        },
      },
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'light', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
  theme: {
    // extend: {
    //   colors: {
    //     // primary: 'var(--primary)',
    //     maindark: 'var(--maindark)',
    //     dark: 'var(--dark)',
    //     darker: 'var(--darker)',
    //     semidark: 'var(--semidark)',
    //     grey: 'var(--grey)',
    //     offwhite: 'var(--offwhite)',
    //   },
    // },
  },
}
