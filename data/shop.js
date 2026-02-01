export const layouts = [
  {
    className: "sw-layout-list list-layout",
    dataValueGrid: "1",
    iconClass: "icon icon-list",
    display: "d-block", // always
  },
  {
    className: "sw-layout-2",
    dataValueGrid: "2",
    iconClass: "icon-grid-2",
    display: "d-md-none", // mobile only
  },
  {
    className: "sw-layout-3",
    dataValueGrid: "3",
    iconClass: "icon-grid-3",
    display: "d-none d-md-block d-xl-none", // tablet only
  },
  // {
  //   className: "sw-layout-4",
  //   dataValueGrid: "4",
  //   iconClass: "icon-grid-4",
  // },
  // {
  //   className: "sw-layout-5",
  //   dataValueGrid: "5",
  //   iconClass: "icon-grid-5",
  // },
  {
    className: "sw-layout-6",
    dataValueGrid: "6",
    iconClass: "icon-grid-6",
    display: "d-none d-xl-block", // desktop + hub
  },
];

export const sortingOptions = [
  { text: "Default" },

  { text: "Alphabetically, A-Z" },
  { text: "Alphabetically, Z-A" },
  { text: "Price, low to high" },
  { text: "Price, high to low" },
];
