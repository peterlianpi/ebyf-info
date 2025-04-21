export function getFilterByTab(tabLabel) {
  switch (tabLabel) {
    case "Sisan":
      return { keywords: "blood" };
    case "Library":
      return { keywords: "library" };
    case "Mopuan":
      return { keywords: "mopuan" };
    default:
      return {};
  }
}
