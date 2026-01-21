export function getFilterByTab(tabLabel: string): { keywords?: string } {
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
