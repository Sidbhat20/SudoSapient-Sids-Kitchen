const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Prepend the correct basePath to a public asset path.
 * On local dev basePath is "", on GitHub Pages it is "/SudoSapient-Sids-Kitchen".
 */
export const ap = (path) => `${basePath}${path}`;
