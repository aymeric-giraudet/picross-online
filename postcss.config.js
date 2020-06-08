const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: [
      "./components/**/*.tsx",
      "./components/**/*.js",
      "./pages/**/*.tsx",
    ],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
];

module.exports = {
  plugins: [
    "tailwindcss",
    "postcss-preset-env",
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
  ],
};
