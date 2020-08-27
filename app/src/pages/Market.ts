export const Market = {
  layout: {
    areas: "'header' 'main' 'footer'",
    columns: "1fr",
    rows: "4rem 1fr 4rem",
  },
  children: [
    {
      area: "header",
      component: "OmoShopHeader",
    },
    {
      area: "main",
      component: "OmoMarketProducts",
    },
    {
      area: "footer",
      component: "OmoNavBottom",
    },
  ],
};
