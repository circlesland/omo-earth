export const Home = {
  area: "main",
  layout: {
    areas: "'top' 'main'",
    columns: "1fr",
    rows: "2rem 1fr",
  },
  children: [
    {
      area: "top",
      component: "OmoNavTop",
    },
    {
      area: "main",
      component: "OmoLanding",
    },
  ],
};
