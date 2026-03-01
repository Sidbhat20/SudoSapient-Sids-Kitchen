/** @type {import('next').NextConfig} */

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const BASE_PATH = isGitHubActions ? "/SudoSapient-Sids-Kitchen" : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: BASE_PATH,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
