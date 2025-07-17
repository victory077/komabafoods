// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            // アニメーション用の設定
            keyframes: {
              'fade-in': {
                '0%': { opacity: '0.5' },
                '100%': { opacity: '1' },
              },
            },
            animation: {
              'fade-in': 'fade-in 0.5s ease-in-out',
            },
          },
    },
    // 👇 ここに追記します
    plugins: [
      require('@tailwindcss/typography'),
    ],
  }