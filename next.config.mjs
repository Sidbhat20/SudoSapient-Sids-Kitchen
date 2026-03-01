/** @type {import('next').NextConfig} */

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubActions ? "/SudoSapient-Sids-Kitchen" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
