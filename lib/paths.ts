/** Public assets need the project path when hosted on GitHub Pages. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function publicPath(path: `/${string}`): string {
  return `${basePath}${path}`;
}
