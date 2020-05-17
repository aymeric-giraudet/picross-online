const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: ["./components/**/*.tsx", "./pages/**/*.tsx"],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    whitelist: ['body']
  },
];

module.exports = {
  plugins: [
    "tailwindcss",
    "postcss-preset-env",
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
  ],
};
