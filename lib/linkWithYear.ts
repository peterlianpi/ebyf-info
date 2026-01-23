export function linkWithYear(href: string, year: number): string {
  const separator = href.includes('?') ? '&' : '?';
  return `${href}${separator}year=${year}`;
}