/**
 * Asset URL Resolver
 * 
 * Safely prepends Vite's base URL (e.g. '/Caramel-Website/' on GitHub Pages
 * or '/' on Vercel/Local) so static assets in public/ never 404 on subpaths.
 */
export function assetUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
}
