export const SDUI_RESPONSE = {
  title: "Dashboard",
  widgets: [
    {
      type: "infoCard",
      title: "Sales",
      value: "$25,000",
      trend: "up",
      description: "Compared to last month",
    },
    {
      type: "table",
      title: "Latest Orders",
      columns: ["ID", "Product", "Customer", "Total"],
      rows: [
        [1001, "iPhone 12", "John Doe", "$799"],
        [1002, "Samsung S21", "Jane Smith", "$699"],
      ],
    },
  ],
};
