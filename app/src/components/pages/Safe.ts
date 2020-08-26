export const Safe = {
  area: "main",
  layout: {
    areas: "'aside main' 'footer footer'",
    columns: "20rem 1fr",
    rows: "1fr 4rem",
  },
  children: [
    {
      area: "aside",
      component: "OmoNavAside",
    },
    {
      area: "main",
      component: "OmoTransactions",
    },
    {
      area: "footer",
      component: "OmoNavBottom",
    },
  ],
};
